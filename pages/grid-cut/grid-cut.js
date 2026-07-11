const { RESOURCE_LINKS } = require("../../utils/resource-links.js");
const { toRpx } = require("../../utils/unit-conversion.js");
const {
  clampCropOffset,
  getCropStateAfterScale,
  createDefaultSquareCrop,
  buildNineGridSlices,
} = require("../../utils/grid-cut.js");
const {
  cleanupRewardedVideoAd,
  createRewardedVideoAd,
  showRewardedVideoAd,
} = require("../../utils/unlock-download.js");

const CANVAS_ID = "gridCutCanvas";
const GRID_COUNT = 9;
const EXPORTED_CELL_SIZE = 600;
const PAGE_HORIZONTAL_PADDING = 16;
const CARD_HORIZONTAL_PADDING = 16;
const GRID_CUT_MAX_ZOOM = 4;
const GRID_CUT_FREE_SAVE_STORAGE_KEY = "grid_cut_daily_free_save_v1";
const GRID_CUT_DAILY_FREE_SAVE_LIMIT = 1;
const SHARE_TITLE = "朋友圈九宫格切图一键保存";

function formatToday() {
  const date = new Date();
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getGridCutFreeSaveState() {
  const today = formatToday();

  try {
    const state = wx.getStorageSync(GRID_CUT_FREE_SAVE_STORAGE_KEY);
    const usedCount =
      state && typeof state === "object" && state.date === today ? Number(state.usedCount) || 0 : 0;

    return {
      limit: GRID_CUT_DAILY_FREE_SAVE_LIMIT,
      usedCount,
      remainingCount: Math.max(0, GRID_CUT_DAILY_FREE_SAVE_LIMIT - usedCount),
      isExhausted: usedCount >= GRID_CUT_DAILY_FREE_SAVE_LIMIT,
    };
  } catch (error) {
    return {
      limit: GRID_CUT_DAILY_FREE_SAVE_LIMIT,
      usedCount: 0,
      remainingCount: GRID_CUT_DAILY_FREE_SAVE_LIMIT,
      isExhausted: false,
    };
  }
}

function consumeGridCutFreeSaveChance() {
  const today = formatToday();
  const state = getGridCutFreeSaveState();

  if (state.isExhausted) {
    return {
      allowed: false,
      ...state,
    };
  }

  const nextUsedCount = state.usedCount + 1;

  try {
    wx.setStorageSync(GRID_CUT_FREE_SAVE_STORAGE_KEY, {
      date: today,
      usedCount: nextUsedCount,
    });
  } catch (error) {}

  return {
    allowed: true,
    ...getGridCutFreeSaveState(),
  };
}

Page({
  data: {
    nativeTemplateAdUnitId: RESOURCE_LINKS.nativeTemplateAdUnitId,
    pageIntroTags: ["九宫格专区", "朋友圈拼图", "手动裁切", "一键保存"],
    sourceImagePath: "",
    sourceImageWidth: 0,
    sourceImageHeight: 0,
    cropSize: 0,
    cropOffsetX: 0,
    cropOffsetY: 0,
    cropBoxSize: 0,
    cropBoxSizeRpx: 0,
    editorImageStyle: "",
    generatedImages: [],
    isGenerating: false,
    isSaving: false,
    savingProgressCurrent: 0,
    savingProgressTotal: 0,
    freeSaveRemaining: GRID_CUT_DAILY_FREE_SAVE_LIMIT,
    saveActionButtonText: "保存九宫格",
    saveActionHintText: "",
    isRewardSaveRequired: false,
  },

  onLoad() {
    const systemInfo = wx.getSystemInfoSync();
    const pageBodyWidth = systemInfo.screenWidth - PAGE_HORIZONTAL_PADDING * 2;
    const cardInnerWidth = Math.max(0, pageBodyWidth - CARD_HORIZONTAL_PADDING * 2);
    const cropBoxSize = Math.min(cardInnerWidth, 311);

    this.setData({
      cropBoxSize,
      cropBoxSizeRpx: toRpx(cropBoxSize, systemInfo),
    });
    this.showShareMenu();
    this.refreshSaveActionState();
  },

  onShow() {
    this.refreshSaveActionState();
  },

  onUnload() {
    cleanupRewardedVideoAd(this);
  },

  onShareAppMessage() {
    return {
      title: SHARE_TITLE,
      imageUrl: RESOURCE_LINKS.logoImageUrl,
    };
  },

  onShareTimeline() {
    return {
      title: SHARE_TITLE,
      query: "",
      imageUrl: RESOURCE_LINKS.logoImageUrl,
    };
  },

  showShareMenu() {
    if (!wx.showShareMenu) {
      return;
    }

    wx.showShareMenu({
      menus: ["shareAppMessage", "shareTimeline"],
    });
  },

  chooseSourceImage() {
    this.pickImageFilePath()
      .then((filePath) => {
        if (!filePath) {
          return;
        }

        wx.getImageInfo({
          src: filePath,
          success: (imageInfo) => {
            const cropState = createDefaultSquareCrop(imageInfo.width, imageInfo.height);

            this.setData(
              {
                sourceImagePath: "",
                sourceImageWidth: 0,
                sourceImageHeight: 0,
                cropSize: 0,
                cropOffsetX: 0,
                cropOffsetY: 0,
                editorImageStyle: "",
              },
              () => {
                this.setData(
                  {
                    sourceImagePath: filePath,
                    sourceImageWidth: imageInfo.width,
                    sourceImageHeight: imageInfo.height,
                    cropSize: cropState.cropSize,
                    cropOffsetX: cropState.offsetX,
                    cropOffsetY: cropState.offsetY,
                  },
                  () => {
                    this.syncPreviewState();
                    this.updateCropFrameRect();
                  },
                );
              },
            );
          },
          fail: () => {
            wx.showToast({
              title: "图片读取失败，请重试",
              icon: "none",
            });
          },
        });
      })
      .catch(() => {
        wx.showToast({
          title: "打开相册失败",
          icon: "none",
        });
      });
  },

  handleCropTouchStart(event) {
    if (!this.data.sourceImagePath) {
      return;
    }

    const touches = event.touches || [];
    if (!touches.length) {
      return;
    }

    if (touches.length >= 2) {
      const centerPoint = this.getTouchCenterPoint(touches);
      const touchDistance = this.getTouchDistance(touches);

      if (!touchDistance) {
        return;
      }

      this.dragStartPoint = null;
      this.pinchStartState = {
        distance: touchDistance,
        cropSize: this.data.cropSize,
        offsetX: this.data.cropOffsetX,
        offsetY: this.data.cropOffsetY,
        centerX: centerPoint.x,
        centerY: centerPoint.y,
      };
      return;
    }

    const touch = touches[0];
    const touchPoint = this.getTouchPoint(touch);
    this.dragStartPoint = {
      x: touchPoint.x,
      y: touchPoint.y,
      offsetX: this.data.cropOffsetX,
      offsetY: this.data.cropOffsetY,
    };
    this.pinchStartState = null;
  },

  handleCropTouchMove(event) {
    const touches = event.touches || [];

    if (touches.length >= 2 && this.data.cropSize && this.data.cropBoxSize) {
      if (!this.pinchStartState) {
        this.handleCropTouchStart(event);
      }

      if (!this.pinchStartState?.distance) {
        return;
      }

      const currentDistance = this.getTouchDistance(touches);

      if (!currentDistance) {
        return;
      }

      const nextCropSize = this.pinchStartState.cropSize * (this.pinchStartState.distance / currentDistance);
      const nextCropState = getCropStateAfterScale(
        {
          imageWidth: this.data.sourceImageWidth,
          imageHeight: this.data.sourceImageHeight,
          cropSize: this.pinchStartState.cropSize,
          offsetX: this.pinchStartState.offsetX,
          offsetY: this.pinchStartState.offsetY,
          maxZoom: GRID_CUT_MAX_ZOOM,
        },
        {
          viewportSize: this.data.cropBoxSize,
          centerX: this.pinchStartState.centerX,
          centerY: this.pinchStartState.centerY,
          nextCropSize,
        },
      );

      this.setData(
        {
          cropSize: nextCropState.cropSize,
          cropOffsetX: nextCropState.offsetX,
          cropOffsetY: nextCropState.offsetY,
        },
        () => {
          this.syncPreviewState();
        },
      );
      return;
    }

    if (!this.dragStartPoint || !this.data.cropSize || !this.data.cropBoxSize) {
      return;
    }

    const touch = touches[0];
    if (!touch) {
      return;
    }

    const touchPoint = this.getTouchPoint(touch);
    const previewScale = this.data.cropBoxSize / this.data.cropSize;
    const deltaX = (touchPoint.x - this.dragStartPoint.x) / previewScale;
    const deltaY = (touchPoint.y - this.dragStartPoint.y) / previewScale;
    const nextOffset = clampCropOffset(
      {
        imageWidth: this.data.sourceImageWidth,
        imageHeight: this.data.sourceImageHeight,
        cropSize: this.data.cropSize,
      },
      this.dragStartPoint.offsetX - deltaX,
      this.dragStartPoint.offsetY - deltaY,
    );

    this.setData(
      {
        cropOffsetX: nextOffset.offsetX,
        cropOffsetY: nextOffset.offsetY,
      },
      () => {
        this.syncPreviewState();
      },
    );
  },

  handleCropTouchEnd(event) {
    const touches = event.touches || [];

    if (touches.length >= 2) {
      this.handleCropTouchStart(event);
      return;
    }

    if (touches.length === 1) {
      const touch = touches[0];
      const touchPoint = this.getTouchPoint(touch);
      this.dragStartPoint = {
        x: touchPoint.x,
        y: touchPoint.y,
        offsetX: this.data.cropOffsetX,
        offsetY: this.data.cropOffsetY,
      };
      this.pinchStartState = null;
      return;
    }

    this.dragStartPoint = null;
    this.pinchStartState = null;
  },

  syncPreviewState() {
    if (!this.data.sourceImagePath || !this.data.cropSize || !this.data.cropBoxSize) {
      return;
    }

    const editorScale = this.data.cropBoxSize / this.data.cropSize;
    const editorImageWidth = this.data.sourceImageWidth * editorScale;
    const editorImageHeight = this.data.sourceImageHeight * editorScale;
    const editorImageLeft = -(this.data.cropOffsetX * editorScale);
    const editorImageTop = -(this.data.cropOffsetY * editorScale);
    this.setData({
      editorImageStyle: [
        `width:${editorImageWidth}px`,
        `height:${editorImageHeight}px`,
        `left:${editorImageLeft}px`,
        `top:${editorImageTop}px`,
      ].join(";"),
    });
  },

  async generateGridImages() {
    if (!this.data.sourceImagePath || this.data.isGenerating) {
      return;
    }

    this.setData({
      isGenerating: true,
    });

    try {
      const slices = buildNineGridSlices({
        cropSize: this.data.cropSize,
        offsetX: this.data.cropOffsetX,
        offsetY: this.data.cropOffsetY,
      });

      const generatedImages = [];
      for (const slice of slices) {
        const tempFilePath = await this.exportSliceImage(slice);
        generatedImages.push({
          key: `generated-${slice.index}`,
          index: slice.index + 1,
          path: tempFilePath,
        });
      }

      this.setData({
        generatedImages,
      });
    } catch (error) {
      wx.showToast({
        title: "生成失败，请重试",
        icon: "none",
      });
    } finally {
      this.setData({
        isGenerating: false,
      });
    }
  },

  exportSliceImage(slice) {
    return new Promise((resolve, reject) => {
      const context = wx.createCanvasContext(CANVAS_ID, this);

      context.clearRect(0, 0, EXPORTED_CELL_SIZE, EXPORTED_CELL_SIZE);
      context.drawImage(
        this.data.sourceImagePath,
        slice.sourceX,
        slice.sourceY,
        slice.sourceSize,
        slice.sourceSize,
        0,
        0,
        EXPORTED_CELL_SIZE,
        EXPORTED_CELL_SIZE,
      );
      context.draw(false, () => {
        wx.canvasToTempFilePath(
          {
            canvasId: CANVAS_ID,
            width: EXPORTED_CELL_SIZE,
            height: EXPORTED_CELL_SIZE,
            destWidth: EXPORTED_CELL_SIZE,
            destHeight: EXPORTED_CELL_SIZE,
            fileType: "png",
            success: (res) => resolve(res.tempFilePath),
            fail: reject,
          },
          this,
        );
      });
    });
  },

  handleSaveActionTap() {
    if (!this.data.generatedImages.length || this.data.isSaving) {
      return;
    }

    const limitState = getGridCutFreeSaveState();
    this.applySaveActionState(limitState);

    if (!limitState.isExhausted) {
      const consumeResult = consumeGridCutFreeSaveChance();
      this.applySaveActionState(consumeResult);

      if (consumeResult.allowed) {
        this.startSavingGeneratedImages();
      }

      return;
    }

    createRewardedVideoAd(this, () => {
      this.startSavingGeneratedImages();
    });

    if (!this.rewardedVideoAd) {
      wx.showToast({
        title: "激励视频加载中，请稍后再试",
        icon: "none",
      });
      return;
    }

    showRewardedVideoAd(this, () => {
      wx.showToast({
        title: "激励视频加载失败，请稍后再试",
        icon: "none",
      });
    });
  },

  startSavingGeneratedImages() {
    this.ensurePhotoAlbumPermission()
      .then(() => {
        this.setData({
          isSaving: true,
          savingProgressCurrent: 0,
          savingProgressTotal: this.data.generatedImages.length || GRID_COUNT,
        });
        return this.saveImagesSequentially(this.data.generatedImages.map((item) => item.path));
      })
      .then(() => {
        wx.showToast({
          title: "已保存到相册",
          icon: "success",
        });
      })
      .catch(() => {
        wx.showToast({
          title: "保存失败，请稍后重试",
          icon: "none",
        });
      })
      .finally(() => {
        this.setData({
          isSaving: false,
          savingProgressCurrent: 0,
          savingProgressTotal: 0,
        });
        this.refreshSaveActionState();
      });
  },

  saveImagesSequentially(paths) {
    return paths.reduce((promise, filePath, index) => {
      return promise.then(
        () =>
          new Promise((resolve, reject) => {
            this.setData(
              {
                savingProgressCurrent: index + 1,
              },
              () => {
                this.applySaveActionState(getGridCutFreeSaveState());
              },
            );

            wx.saveImageToPhotosAlbum({
              filePath,
              success: resolve,
              fail: reject,
            });
          }),
      );
    }, Promise.resolve());
  },

  ensurePhotoAlbumPermission() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: (settingRes) => {
          const hasPermission = settingRes.authSetting["scope.writePhotosAlbum"];

          if (hasPermission === true) {
            resolve();
            return;
          }

          if (hasPermission === false) {
            wx.openSetting({
              success: (openSettingRes) => {
                if (openSettingRes.authSetting["scope.writePhotosAlbum"]) {
                  resolve();
                  return;
                }

                reject(new Error("Photo album permission denied"));
              },
              fail: reject,
            });
            return;
          }

          wx.authorize({
            scope: "scope.writePhotosAlbum",
            success: resolve,
            fail: reject,
          });
        },
        fail: reject,
      });
    });
  },

  refreshSaveActionState() {
    this.applySaveActionState(getGridCutFreeSaveState());
  },

  applySaveActionState(limitState) {
    const remainingCount = limitState?.remainingCount ?? GRID_CUT_DAILY_FREE_SAVE_LIMIT;
    const isRewardSaveRequired = !!limitState?.isExhausted;
    const saveActionButtonText = isRewardSaveRequired
      ? "看激励视频后保存"
      : "免费保存九宫格";
    const saveActionHintText = this.data.isSaving
      ? `正在保存第 ${this.data.savingProgressCurrent || 1}/${this.data.savingProgressTotal || this.data.generatedImages.length || GRID_COUNT} 张...`
      : isRewardSaveRequired
        ? "今日免费已用完，看激励视频继续保存"
        : `今日免费 ${remainingCount} 次，用完看激励视频继续保存`;

    this.setData({
      freeSaveRemaining: remainingCount,
      isRewardSaveRequired,
      saveActionButtonText,
      saveActionHintText,
    });
  },

  updateCropFrameRect() {
    wx.nextTick(() => {
      const query = wx.createSelectorQuery().in(this);
      query.select("#gridCutEditorFrame").boundingClientRect((rect) => {
        if (!rect) {
          return;
        }

        this.cropFrameRect = rect;
      });
      query.exec();
    });
  },

  getTouchDistance(touches) {
    if (!touches || touches.length < 2) {
      return 0;
    }

    const firstTouch = touches[0];
    const secondTouch = touches[1];
    const firstTouchPoint = this.getTouchPoint(firstTouch);
    const secondTouchPoint = this.getTouchPoint(secondTouch);
    const deltaX = secondTouchPoint.x - firstTouchPoint.x;
    const deltaY = secondTouchPoint.y - firstTouchPoint.y;

    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  },

  getTouchCenterPoint(touches) {
    if (!touches || !touches.length) {
      return {
        x: this.data.cropBoxSize / 2,
        y: this.data.cropBoxSize / 2,
      };
    }

    const firstTouch = touches[0];
    const secondTouch = touches[1] || touches[0];
    const firstTouchPoint = this.getTouchPoint(firstTouch);
    const secondTouchPoint = this.getTouchPoint(secondTouch);
    const clientCenterX = (firstTouchPoint.x + secondTouchPoint.x) / 2;
    const clientCenterY = (firstTouchPoint.y + secondTouchPoint.y) / 2;
    const frameRect = this.cropFrameRect;
    const localX = frameRect ? clientCenterX - frameRect.left : this.data.cropBoxSize / 2;
    const localY = frameRect ? clientCenterY - frameRect.top : this.data.cropBoxSize / 2;

    return {
      x: Math.min(Math.max(0, localX), this.data.cropBoxSize),
      y: Math.min(Math.max(0, localY), this.data.cropBoxSize),
    };
  },

  getTouchPoint(touch) {
    return {
      x: Number(touch?.clientX ?? touch?.pageX ?? touch?.x) || 0,
      y: Number(touch?.clientY ?? touch?.pageY ?? touch?.y) || 0,
    };
  },

  pickImageFilePath() {
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        count: 1,
        sizeType: ["compressed", "original"],
        sourceType: ["album"],
        success: (res) => {
          resolve(res.tempFilePaths?.[0] || "");
        },
        fail: (error) => {
          if (error?.errMsg && error.errMsg.includes("cancel")) {
            resolve("");
            return;
          }

          reject(error);
        },
      });
    });
  },
});
