const { buildMediaWaterfallSections } = require("../../utils/media-waterfall-sections.js");

Component({
  properties: {
    items: {
      type: Array,
      value: [],
      observer(items) {
        this.updateColumns(items);
      },
    },
  },

  data: {
    sections: [],
  },

  lifetimes: {
    attached() {
      this.updateColumns(this.properties.items);
    },
  },

  methods: {
    updateColumns(items) {
      this.setData({
        sections: buildMediaWaterfallSections(items),
      });
    },

    handleItemTap(event) {
      this.triggerEvent("itemtap", {
        item: event.currentTarget.dataset,
      });
    },
  },
});
