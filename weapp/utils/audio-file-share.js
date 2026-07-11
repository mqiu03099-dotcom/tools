function buildAudioFileName(prefix, id) {
  return `${prefix}-${id}.mp3`;
}

function buildAudioLocalFilePath() {
  return `${wx.env.USER_DATA_PATH}/milk-frog-audio-detail-${Date.now()}.mp3`;
}

function prepareAudioFileForShare(audio, fileNamePrefix, onReady) {
  const audioFileName = buildAudioFileName(fileNamePrefix, audio.id);
  const audioFilePath = buildAudioLocalFilePath();

  wx.showLoading({
    title: "语音准备中",
    mask: true,
  });

  wx.downloadFile({
    url: audio.src,
    filePath: audioFilePath,
    success: (downloadRes) => {
      const downloadedFilePath = downloadRes.filePath || downloadRes.tempFilePath || audioFilePath;

      wx.hideLoading();
      onReady({
        fileName: audioFileName,
        filePath: downloadedFilePath,
      });
    },
  });
}

module.exports = {
  prepareAudioFileForShare,
};
