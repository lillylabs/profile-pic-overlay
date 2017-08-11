<template>
  <div>
  </div>
</template>

<script>
if (process.BROWSER_BUILD) {
  var Croppie = require('croppie');
}

export default {
  props: ['image', 'overlay', 'orientation', 'size'],
  methods: {
    getCroppedImage: function () {
      return this.croppie.result({ type: 'base64', size: { width: this.size, height: this.size } });
    },
    updateImage: function () {
      this.croppie.bind({
        url: this.image,
        orientation: this.orientation,
        zoom: 0
      }).then(() => {
        this.croppie.setZoom(0);
      });
    }
  },
  mounted() {
    var el = this.$el;
    this.croppie = new Croppie(el, {
      enableOrientation: true,
      enforceBoundary: true,
      viewport: {
        width: this.$el.offsetWidth,
        height: this.$el.offsetWidth
      },
      boundary: {
        width: this.$el.offsetWidth,
        height: this.$el.offsetWidth
      }
    });
    this.updateImage();
    el.querySelector('.cr-viewport').style.backgroundImage = `url(${this.overlay})`;
  }
};
</script>

<style scoped>

</style>
