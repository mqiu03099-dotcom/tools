const REWARDED_VIDEO_AD_UNIT_ID = "adunit-bb03e86452bb5f5a";

function showRewardVideoLoading() {
  wx.showLoading({
    title: "激励视频加载中",
    mask: true,
  });
}

function hideRewardVideoLoading() {
  wx.hideLoading();
}

function showSavingLoading() {
  wx.showLoading({
    title: "保存中",
    mask: true,
  });
}

function hideSavingLoading() {
  wx.hideLoading();
}

function updateSavingLoading(title = "保存中") {
  wx.showLoading({
    title,
    mask: true,
  });
}

function createRewardedVideoAd(page, onReward, onError = () => {}) {
  if (!wx.createRewardedVideoAd || page.rewardedVideoAd) {
    return;
  }

  page.handleRewardedVideoClose = (res) => {
    hideRewardVideoLoading();

    if (!res || res.isEnded) {
      onReward();
    }
  };

  page.rewardedVideoAd = wx.createRewardedVideoAd({
    adUnitId: REWARDED_VIDEO_AD_UNIT_ID,
  });
  page.rewardedVideoAd.onClose(page.handleRewardedVideoClose);
  page.handleRewardedVideoError = (error) => {
    hideRewardVideoLoading();
    onError(error);
  };
  page.rewardedVideoAd.onError(page.handleRewardedVideoError);
}

function cleanupRewardedVideoAd(page) {
  if (!page.rewardedVideoAd) {
    return;
  }

  hideRewardVideoLoading();
  if (page.handleRewardedVideoClose) {
    page.rewardedVideoAd.offClose(page.handleRewardedVideoClose);
  }
  if (page.handleRewardedVideoError) {
    page.rewardedVideoAd.offError(page.handleRewardedVideoError);
  }
  page.rewardedVideoAd = null;
  page.handleRewardedVideoClose = null;
  page.handleRewardedVideoError = null;
}

function showRewardedVideoAd(page, onLoadRetryFailed = () => {}) {
  if (!page.rewardedVideoAd) {
    return;
  }

  showRewardVideoLoading();
  page.rewardedVideoAd
    .show()
    .then(() => {
      hideRewardVideoLoading();
    })
    .catch(() => {
      page.rewardedVideoAd
        .load()
        .then(() => page.rewardedVideoAd.show())
        .then(() => {
          hideRewardVideoLoading();
        })
        .catch(() => {
          hideRewardVideoLoading();
          onLoadRetryFailed();
        });
    });
}

function startRemoteImageDownload(page, imageUrl, deniedModalContent) {
  if (!imageUrl) {
    return;
  }

  showSavingLoading();
  ensurePhotoAlbumPermission(
    deniedModalContent,
    () => {
      downloadAndSaveSingleImage(imageUrl);
    },
    () => {
      hideSavingLoading();
    },
  );
}

function startRemoteImageBatchDownload(page, imageUrls, deniedModalContent) {
  const validImageUrls = (imageUrls || []).filter(Boolean);

  if (!validImageUrls.length) {
    return;
  }

  updateSavingLoading(`保存中 1/${validImageUrls.length}`);
  wx.getSetting({
    success: (settingRes) => {
      const photoAlbumAuth = settingRes.authSetting["scope.writePhotosAlbum"];

      if (photoAlbumAuth === true) {
        downloadAndSaveImageBatch(validImageUrls);
        return;
      }

      if (photoAlbumAuth === false) {
        hideSavingLoading();
        promptOpenPhotoAlbumSetting(
          deniedModalContent,
          () => {
            downloadAndSaveImageBatch(validImageUrls);
          },
          () => {
            hideSavingLoading();
          },
        );
        return;
      }

      wx.authorize({
        scope: "scope.writePhotosAlbum",
        success: () => {
          downloadAndSaveImageBatch(validImageUrls);
        },
        fail: () => {
          hideSavingLoading();
        },
      });
    },
    fail: () => {
      hideSavingLoading();
    },
  });
}

function ensurePhotoAlbumPermission(deniedModalContent, onGranted, onDenied = () => {}) {
  wx.getSetting({
    success: (settingRes) => {
      const photoAlbumAuth = settingRes.authSetting["scope.writePhotosAlbum"];

      if (photoAlbumAuth === true) {
        onGranted();
        return;
      }

      if (photoAlbumAuth === false) {
        hideSavingLoading();
        promptOpenPhotoAlbumSetting(deniedModalContent, onGranted, onDenied);
        return;
      }

      wx.authorize({
        scope: "scope.writePhotosAlbum",
        success: () => {
          onGranted();
        },
        fail: () => {
          hideSavingLoading();
          onDenied();
        },
      });
    },
    fail: () => {
      hideSavingLoading();
      onDenied();
    },
  });
}

function promptOpenPhotoAlbumSetting(deniedModalContent, onGranted, onDenied = () => {}) {
  wx.showModal({
    title: "需要相册权限",
    content: deniedModalContent,
    confirmText: "去开启",
    success: (modalRes) => {
      if (!modalRes.confirm) {
        onDenied();
        return;
      }

      wx.openSetting({
        success: (settingRes) => {
          if (settingRes.authSetting["scope.writePhotosAlbum"]) {
            onGranted();
            return;
          }

          onDenied();
        },
        fail: onDenied,
      });
    },
    fail: onDenied,
  });
}

function downloadAndSaveSingleImage(imageUrl) {
  wx.downloadFile({
    url: imageUrl,
    success: (downloadRes) => {
      if (downloadRes.statusCode !== 200 || !downloadRes.tempFilePath) {
        hideSavingLoading();
        return;
      }

      saveImageToAlbum(downloadRes.tempFilePath);
    },
    fail: () => {
      hideSavingLoading();
    },
  });
}

function downloadAndSaveImageBatch(imageUrls) {
  const total = imageUrls.length;
  let currentIndex = 0;
  let savedCount = 0;

  const saveNext = () => {
    if (currentIndex >= total) {
      hideSavingLoading();
      wx.showToast({
        title: savedCount ? `已保存${savedCount}张` : "保存失败",
        icon: savedCount ? "success" : "none",
      });
      return;
    }

    const imageUrl = imageUrls[currentIndex];
    updateSavingLoading(`保存中 ${currentIndex + 1}/${total}`);
    wx.downloadFile({
      url: imageUrl,
      success: (downloadRes) => {
        if (downloadRes.statusCode !== 200 || !downloadRes.tempFilePath) {
          currentIndex += 1;
          saveNext();
          return;
        }

        saveImageToAlbum(downloadRes.tempFilePath, {
          hideLoadingOnSuccess: false,
          hideLoadingOnFail: false,
          onSuccess: () => {
            savedCount += 1;
            currentIndex += 1;
            saveNext();
          },
          onFail: () => {
            currentIndex += 1;
            saveNext();
          },
        });
      },
      fail: () => {
        currentIndex += 1;
        saveNext();
      },
    });
  };

  saveNext();
}

function saveImageToAlbum(filePath, options = {}) {
  const {
    hideLoadingOnSuccess = true,
    hideLoadingOnFail = true,
    onSuccess = () => {},
    onFail = () => {},
  } = options;

  wx.saveImageToPhotosAlbum({
    filePath,
    success: () => {
      if (hideLoadingOnSuccess) {
        hideSavingLoading();
        wx.showToast({
          title: "已保存到相册",
          icon: "success",
        });
      }

      onSuccess();
    },
    fail: () => {
      if (hideLoadingOnFail) {
        hideSavingLoading();
      }

      onFail();
    },
  });
}

module.exports = {
  cleanupRewardedVideoAd,
  createRewardedVideoAd,
  showRewardedVideoAd,
  startRemoteImageBatchDownload,
  startRemoteImageDownload,
};
