<template>
  <div>
  </div>
</template>

<script>
if (process.BROWSER_BUILD) {
  var Croppie = require('imports-loader?EXIF=exif-js!croppie');
}

export default {
  props: ['image', 'overlay'],
  methods: {
    getCroppedImage: function () {
      return this.croppie.result('base64', { width: 900, height: 900 });
    }
  },
  mounted() {
    var el = this.$el;
    this.croppie = new Croppie(el, {
      enableExif: true,
      viewport: {
        width: this.$el.offsetWidth,
        height: this.$el.offsetWidth
      },
      boundary: {
        width: this.$el.offsetWidth,
        height: this.$el.offsetWidth
      }
    });
    this.croppie.bind({
      url: this.image
    });
    el.querySelector('.cr-viewport').style.backgroundImage = `url(${this.overlay})`;
  }
};
</script>

<style scoped>

</style>
