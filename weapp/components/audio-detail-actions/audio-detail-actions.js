Component({
  properties: {
    isPlaying: {
      type: Boolean,
      value: false,
    },
    isStarting: {
      type: Boolean,
      value: false,
    },
    playImageUrl: {
      type: String,
      value: "",
    },
    stopPlayImageUrl: {
      type: String,
      value: "",
    },
    loadingImageUrl: {
      type: String,
      value: "",
    },
    downloadImageUrl: {
      type: String,
      value: "",
    },
    playText: {
      type: String,
      value: "",
    },
    pauseText: {
      type: String,
      value: "",
    },
    downloadText: {
      type: String,
      value: "",
    },
  },

  methods: {
    handleTogglePlay() {
      this.triggerEvent("toggleplay");
    },

    handleDownloadTap() {
      this.triggerEvent("download");
    },
  },
});
