<template>
  <div>
  </div>
</template>

<script>
if (process.BROWSER_BUILD) {
  var Croppie = require('croppie');
}

export default {
  props: ['image', 'overlay', 'orientation'],
  methods: {
    getCroppedImage: function () {
      return this.croppie.result('base64', { width: 900, height: 900 });
    },
    updateImage: function () {
      this.croppie.bind({
        url: this.image,
        orientation: this.orientation
      });
    }
  },
  mounted() {
    var el = this.$el;
    this.croppie = new Croppie(el, {
      enableOrientation: true,
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
