const { RESOURCE_LINKS } = require("../../utils/resource-links.js");
const { toRpx } = require("../../utils/unit-conversion.js");
const { SHAPE_OPTIONS, drawShapePath } = require("../../utils/shape-cut.js");
const {
  cleanupRewardedVideoAd,
  createRewardedVideoAd,
  showRewardedVideoAd,
} = require("../../utils/unlock-download.js");

const CANVAS_ID = "shapeCutCanvas";
const EXPORTED_IMAGE_SIZE = 900;
const PAGE_HORIZONTAL_PADDING = 16;
const CARD_HORIZONTAL_PADDING = 16;
const SHAPE_CUT_FREE_SAVE_STORAGE_KEY = "shape_cut_daily_free_save_v1";
const SHAPE_CUT_DAILY_FREE_SAVE_LIMIT = 1;
const FRAME_INSET = 18;
const MIN_FRAME_SIZE = 120;
const SHARE_TITLE = "图片裁剪透明底头像贴纸工具";

function formatToday() {
  const date = new Date();
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getShapeCutFreeSaveState() {
  const today = formatToday();

  try {
    const state = wx.getStorageSync(SHAPE_CUT_FREE_SAVE_STORAGE_KEY);
    const usedCount =
      state && typeof state === "object" && state.date === today ? Number(state.usedCount) || 0 : 0;

    return {
      limit: SHAPE_CUT_DAILY_FREE_SAVE_LIMIT,
      usedCount,
      remainingCount: Math.max(0, SHAPE_CUT_DAILY_FREE_SAVE_LIMIT - usedCount),
      isExhausted: usedCount >= SHAPE_CUT_DAILY_FREE_SAVE_LIMIT,
    };
  } catch (error) {
    return {
      limit: SHAPE_CUT_DAILY_FREE_SAVE_LIMIT,
      usedCount: 0,
      remainingCount: SHAPE_CUT_DAILY_FREE_SAVE_LIMIT,
      isExhausted: false,
    };
  }
}

function consumeShapeCutFreeSaveChance() {
  const today = formatToday();
  const state = getShapeCutFreeSaveState();

  if (state.isExhausted) {
    return {
      allowed: false,
      ...state,
    };
  }

  const nextUsedCount = state.usedCount + 1;

  try {
    wx.setStorageSync(SHAPE_CUT_FREE_SAVE_STORAGE_KEY, {
      date: today,
      usedCount: nextUsedCount,
    });
  } catch (error) {}

  return {
    allowed: true,
    ...getShapeCutFreeSaveState(),
  };
}

function clamp(value, min, max) {
  return Math.min(Math.max(Number(value) || 0, min), max);
}

function normalizeDecimal(value) {
  return Math.round((Number(value) || 0) * 100) / 100;
}

function getExportDimensions(shapeId, frameWidth, frameHeight) {
  if (shapeId === "rect" || shapeId === "capsule") {
    const safeFrameWidth = Number(frameWidth) || EXPORTED_IMAGE_SIZE;
    const safeFrameHeight = Number(frameHeight) || EXPORTED_IMAGE_SIZE * 0.72;
    const exportWidth = 1400;
    const exportHeight = Math.max(1, Math.round((safeFrameHeight / safeFrameWidth) * exportWidth));

    return {
      width: exportWidth,
      height: exportHeight,
    };
  }

  return {
    width: EXPORTED_IMAGE_SIZE,
    height: EXPORTED_IMAGE_SIZE,
  };
}

function getPreviewAspectRatio(shapeId, frameWidth, frameHeight) {
  if (shapeId === "rect" || shapeId === "capsule") {
    const safeFrameWidth = Number(frameWidth) || EXPORTED_IMAGE_SIZE;
    const safeFrameHeight = Number(frameHeight) || EXPORTED_IMAGE_SIZE;

    return `${Math.max(1, (safeFrameHeight / safeFrameWidth) * 100)}%`;
  }

  return "100%";
}

function getSourceRectFromFrame(options) {
  const editorWidth = Math.max(1, Number(options.editorWidth) || 0);
  const editorHeight = Math.max(1, Number(options.editorHeight) || 0);
  const sourceWidth = Math.max(1, Number(options.sourceWidth) || 0);
  const sourceHeight = Math.max(1, Number(options.sourceHeight) || 0);
  const borderInset = 0;
  const safeFrameX = Number(options.frameX) || 0;
  const safeFrameY = Number(options.frameY) || 0;
  const safeFrameWidth = Number(options.frameWidth) || 0;
  const safeFrameHeight = Number(options.frameHeight) || 0;
  const innerFrameX = clamp(safeFrameX + borderInset, 0, editorWidth);
  const innerFrameY = clamp(safeFrameY + borderInset, 0, editorHeight);
  const innerFrameWidth = clamp(safeFrameWidth - borderInset * 2, 1, editorWidth);
  const innerFrameHeight = clamp(safeFrameHeight - borderInset * 2, 1, editorHeight);

  return {
    x: (innerFrameX / editorWidth) * sourceWidth,
    y: (innerFrameY / editorHeight) * sourceHeight,
    width: (innerFrameWidth / editorWidth) * sourceWidth,
    height: (innerFrameHeight / editorHeight) * sourceHeight,
  };
}

function getEditorViewportHeight(imageWidth, imageHeight, viewportWidth) {
  const safeImageWidth = Number(imageWidth) || 1;
  const safeImageHeight = Number(imageHeight) || 1;
  const safeViewportWidth = Number(viewportWidth) || 0;
  return Math.max(1, Math.round((safeImageHeight / safeImageWidth) * safeViewportWidth));
}

function getDefaultFrameSize(shapeId, viewportWidth, viewportHeight) {
  const availableWidth = Math.max(1, viewportWidth - FRAME_INSET * 2);
  const availableHeight = Math.max(1, viewportHeight - FRAME_INSET * 2);
  const minFrameWidth = Math.min(MIN_FRAME_SIZE, viewportWidth);
  const minFrameHeight = Math.min(MIN_FRAME_SIZE, viewportHeight);

  if (shapeId === "rect") {
    const width = availableWidth;
    const height = Math.max(
      Math.min(minFrameHeight, availableHeight),
      Math.min(availableHeight, width * 0.72),
    );

    return {
      width: normalizeDecimal(width),
      height: normalizeDecimal(height),
    };
  }

  if (shapeId === "capsule") {
    const width = availableWidth;
    const height = Math.max(
      Math.min(minFrameHeight, availableHeight),
      Math.min(availableHeight, width * 0.58),
    );

    return {
      width: normalizeDecimal(width),
      height: normalizeDecimal(height),
    };
  }

  const size = normalizeDecimal(
    Math.max(Math.min(minFrameWidth, minFrameHeight), Math.min(availableWidth, availableHeight)),
  );
  return {
    width: size,
    height: size,
  };
}

function clampFrameRect(frameRect, viewportWidth, viewportHeight) {
  const minFrameWidth = Math.min(MIN_FRAME_SIZE, viewportWidth);
  const minFrameHeight = Math.min(MIN_FRAME_SIZE, viewportHeight);
  const width = clamp(frameRect?.width, minFrameWidth, viewportWidth);
  const height = clamp(frameRect?.height, minFrameHeight, viewportHeight);

  return {
    x: normalizeDecimal(clamp(frameRect?.x, 0, Math.max(0, viewportWidth - width))),
    y: normalizeDecimal(clamp(frameRect?.y, 0, Math.max(0, viewportHeight - height))),
    width: normalizeDecimal(width),
    height: normalizeDecimal(height),
  };
}

function createFrameRect(shapeId, viewportWidth, viewportHeight, previousRect) {
  const size = getDefaultFrameSize(shapeId, viewportWidth, viewportHeight);
  const centerX = previousRect ? previousRect.x + previousRect.width / 2 : viewportWidth / 2;
  const centerY = previousRect ? previousRect.y + previousRect.height / 2 : viewportHeight / 2;

  return clampFrameRect(
    {
      x: centerX - size.width / 2,
      y: centerY - size.height / 2,
      width: size.width,
      height: size.height,
    },
    viewportWidth,
    viewportHeight,
  );
}

Page({
  data: {
    nativeTemplateAdUnitId: RESOURCE_LINKS.nativeTemplateAdUnitId,
    pageIntroTags: ["工具专区", "透明底图片", "头像贴纸", "自由裁剪"],
    sourceImagePath: "",
    sourceImageWidth: 0,
    sourceImageHeight: 0,
    cropBoxSize: 0,
    cropBoxSizeRpx: 0,
    editorViewportHeight: 0,
    editorViewportHeightRpx: 0,
    editorImageStyle: "",
    frameStyle: "",
    frameWidth: 0,
    frameHeight: 0,
    frameX: 0,
    frameY: 0,
    generatedImagePath: "",
    resultPreviewPaddingTop: "100%",
    canvasStyle: "width: 900px; height: 900px;",
    isGenerating: false,
    isSaving: false,
    freeSaveRemaining: SHAPE_CUT_DAILY_FREE_SAVE_LIMIT,
    saveActionButtonText: "保存图片",
    saveActionHintText: "",
    isRewardSaveRequired: false,
    shapeOptions: SHAPE_OPTIONS,
    currentShapeId: "roundedRect",
    generatedShapeId: "roundedRect",
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
            const editorViewportHeight = getEditorViewportHeight(
              imageInfo.width,
              imageInfo.height,
              this.data.cropBoxSize,
            );
            const frameRect = createFrameRect(
              this.data.currentShapeId,
              this.data.cropBoxSize,
              editorViewportHeight,
            );

            this.setData(
              {
                sourceImagePath: filePath,
                sourceImageWidth: imageInfo.width,
                sourceImageHeight: imageInfo.height,
                editorViewportHeight,
                editorViewportHeightRpx: toRpx(editorViewportHeight),
                frameX: frameRect.x,
                frameY: frameRect.y,
                frameWidth: frameRect.width,
                frameHeight: frameRect.height,
              },
              () => {
                this.syncPreviewState();
                this.updateEditorFrameRect();
                this.refreshSaveActionState();
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

  selectShape(event) {
    const shapeId = event.currentTarget.dataset.shapeId;

    if (!shapeId || shapeId === this.data.currentShapeId) {
      return;
    }

    const frameRect = createFrameRect(
      shapeId,
      this.data.cropBoxSize,
      this.data.editorViewportHeight,
    );

    this.setData(
      {
        currentShapeId: shapeId,
        frameX: frameRect.x,
        frameY: frameRect.y,
        frameWidth: frameRect.width,
        frameHeight: frameRect.height,
      },
      () => {
        this.syncPreviewState();
      },
    );
  },

  handleFrameTouchStart(event) {
    const touch = event.touches?.[0];

    if (!touch) {
      return;
    }

    const touchPoint = this.getLocalTouchPoint(touch);

    this.imageTouchState = null;
    this.frameDragState = {
      touchX: touchPoint.x,
      touchY: touchPoint.y,
      frameX: this.data.frameX,
      frameY: this.data.frameY,
    };
  },

  handleFrameTouchMove(event) {
    const touch = event.touches?.[0];

    if (!touch || !this.frameDragState) {
      return;
    }

    const touchPoint = this.getLocalTouchPoint(touch);
    const frameRect = clampFrameRect(
      {
        x: this.frameDragState.frameX + (touchPoint.x - this.frameDragState.touchX),
        y: this.frameDragState.frameY + (touchPoint.y - this.frameDragState.touchY),
        width: this.data.frameWidth,
        height: this.data.frameHeight,
      },
      this.data.cropBoxSize,
      this.data.editorViewportHeight,
    );

    this.setData(
      {
        frameX: frameRect.x,
        frameY: frameRect.y,
      },
      () => {
        this.syncPreviewState();
      },
    );
  },

  handleFrameTouchEnd() {
    this.frameDragState = null;
  },

  getFrameRect() {
    return {
      x: this.data.frameX,
      y: this.data.frameY,
      width: this.data.frameWidth,
      height: this.data.frameHeight,
    };
  },

  syncPreviewState() {
    if (!this.data.sourceImagePath || !this.data.cropBoxSize || !this.data.editorViewportHeight) {
      return;
    }

    const exportDimensions = getExportDimensions(
      this.data.currentShapeId,
      this.data.frameWidth,
      this.data.frameHeight,
    );

    this.setData({
      editorImageStyle: [
        `width:${this.data.cropBoxSize}px`,
        `height:${this.data.editorViewportHeight}px`,
        "left:0px",
        "top:0px",
      ].join(";"),
      frameStyle: [
        `left:${this.data.frameX}px`,
        `top:${this.data.frameY}px`,
        `width:${this.data.frameWidth}px`,
        `height:${this.data.frameHeight}px`,
      ].join(";"),
      canvasStyle: `width: ${exportDimensions.width}px; height: ${exportDimensions.height}px;`,
    });
  },

  async generateShapeImage() {
    if (!this.data.sourceImagePath || this.data.isGenerating) {
      return;
    }

    this.setData({
      isGenerating: true,
    });

    try {
      const tempFilePath = await this.exportShapeImage();
      this.setData({
        generatedImagePath: tempFilePath,
        generatedShapeId: this.data.currentShapeId,
        resultPreviewPaddingTop: getPreviewAspectRatio(
          this.data.currentShapeId,
          this.data.frameWidth,
          this.data.frameHeight,
        ),
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

  exportShapeImage() {
    return new Promise((resolve, reject) => {
      const exportDimensions = getExportDimensions(
        this.data.currentShapeId,
        this.data.frameWidth,
        this.data.frameHeight,
      );
      const exportWidth = exportDimensions.width;
      const exportHeight = exportDimensions.height;
      const frameRect = this.getFrameRect();
      const sourceRect = getSourceRectFromFrame({
        shapeId: this.data.currentShapeId,
        editorWidth: this.editorFrameRect?.width || this.data.cropBoxSize,
        editorHeight: this.editorFrameRect?.height || this.data.editorViewportHeight,
        frameX: frameRect.x,
        frameY: frameRect.y,
        frameWidth: frameRect.width,
        frameHeight: frameRect.height,
        sourceWidth: this.data.sourceImageWidth,
        sourceHeight: this.data.sourceImageHeight,
      });

      this.setData(
        {
          canvasStyle: `width: ${exportWidth}px; height: ${exportHeight}px;`,
        },
        () => {
          wx.nextTick(() => {
            const context = wx.createCanvasContext(CANVAS_ID, this);

            context.clearRect(0, 0, exportWidth, exportHeight);
            context.save();
            drawShapePath(context, this.data.currentShapeId, exportWidth, exportHeight);
            context.clip();
            context.drawImage(
              this.data.sourceImagePath,
              sourceRect.x,
              sourceRect.y,
              sourceRect.width,
              sourceRect.height,
              0,
              0,
              exportWidth,
              exportHeight,
            );
            context.restore();

            context.draw(false, () => {
              wx.canvasToTempFilePath(
                {
                  canvasId: CANVAS_ID,
                  width: exportWidth,
                  height: exportHeight,
                  destWidth: exportWidth,
                  destHeight: exportHeight,
                  fileType: "png",
                  success: (res) => resolve(res.tempFilePath),
                  fail: reject,
                },
                this,
              );
            });
          });
        },
      );
    });
  },

  handleSaveActionTap() {
    if (!this.data.generatedImagePath || this.data.isSaving) {
      return;
    }

    const limitState = getShapeCutFreeSaveState();
    this.applySaveActionState(limitState);

    if (!limitState.isExhausted) {
      const consumeResult = consumeShapeCutFreeSaveChance();
      this.applySaveActionState(consumeResult);

      if (consumeResult.allowed) {
        this.startSavingGeneratedImage();
      }

      return;
    }

    createRewardedVideoAd(this, () => {
      this.startSavingGeneratedImage();
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

  startSavingGeneratedImage() {
    this.ensurePhotoAlbumPermission()
      .then(() => {
        this.setData({
          isSaving: true,
        });
        return new Promise((resolve, reject) => {
          wx.saveImageToPhotosAlbum({
            filePath: this.data.generatedImagePath,
            success: resolve,
            fail: reject,
          });
        });
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
        });
        this.refreshSaveActionState();
      });
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
    this.applySaveActionState(getShapeCutFreeSaveState());
  },

  applySaveActionState(limitState) {
    const remainingCount = limitState?.remainingCount ?? SHAPE_CUT_DAILY_FREE_SAVE_LIMIT;
    const isRewardSaveRequired = !!limitState?.isExhausted;
    const saveActionButtonText = isRewardSaveRequired ? "看激励视频后保存" : "免费保存图片";
    const saveActionHintText = this.data.isSaving
      ? "正在保存到相册..."
      : isRewardSaveRequired
        ? "今日免费次数已用完，看激励视频后可继续保存"
        : `今日还可免费保存 ${remainingCount} 次`;

    this.setData({
      freeSaveRemaining: remainingCount,
      isRewardSaveRequired,
      saveActionButtonText,
      saveActionHintText,
    });
  },

  updateEditorFrameRect() {
    wx.nextTick(() => {
      const query = wx.createSelectorQuery().in(this);
      query.select("#shapeCutEditorFrame").boundingClientRect((rect) => {
        if (!rect) {
          return;
        }

        this.editorFrameRect = rect;
      });
      query.exec();
    });
  },

  getLocalTouchPoint(touch) {
    const frameRect = this.editorFrameRect;

    if (!frameRect) {
      return {
        x: Number(touch?.clientX ?? touch?.pageX ?? touch?.x) || 0,
        y: Number(touch?.clientY ?? touch?.pageY ?? touch?.y) || 0,
      };
    }

    return {
      x: normalizeDecimal(
        (Number(touch?.clientX ?? touch?.pageX ?? touch?.x) || 0) - frameRect.left,
      ),
      y: normalizeDecimal(
        (Number(touch?.clientY ?? touch?.pageY ?? touch?.y) || 0) - frameRect.top,
      ),
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
