Component({
  properties: {
    visible: {
      type: Boolean,
      value: false,
    },
    closing: {
      type: Boolean,
      value: false,
    },
    value: {
      type: String,
      value: "",
    },
    topOffset: {
      type: Number,
      value: 56,
    },
    rightOffset: {
      type: Number,
      value: 16,
    },
  },

  methods: {
    noop() {},

    handleMaskTap() {
      this.triggerEvent("close");
    },

    handleInput(event) {
      this.triggerEvent("inputchange", {
        value: event.detail.value || "",
      });
    },

    handleSubmit() {
      this.triggerEvent("submit");
    },
  },
});
