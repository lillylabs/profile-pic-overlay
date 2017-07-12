<template>
  <div>
  </div>
</template>

<script>
if (process.BROWSER_BUILD) {
  var Croppie = require('croppie');
}

export default {
  props: ['image', 'overlay', 'croppedImage'],
  mounted() {
    console.log('mounted', this.$el.offsetWidth);
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
  }
};
</script>

<style scoped>

</style>
