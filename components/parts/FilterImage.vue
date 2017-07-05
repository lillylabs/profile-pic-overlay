<template>
  <div class="photo">
    <div class="image is-square">
      <img :src="image"></img>
      <img :src="filteredImage"></img>
    </div>
    <a class="button is-static " download="bla">
      <span>{{ button.default }}&nbsp;</span>
      <span class=" icon ">
        <i :class="['fa', button.icon]"></i>
      </span>
    </a>
  </div>
</template>

<script>

import { filter } from '~assets/services/image.service';

export default {
  props: ['button', 'filter'],
  data() {
    return {
      mounted: false,
      filteredImage: null
    };
  },
  computed: {
    image: function () {
      return this.$store.state.uploadedImage.src || this.$store.state.content.photo.src;
    }
  },
  watch: {
    image: function (val) {
      filter(val, this.filter)
        .then(src => {
          this.filteredImage = src;
        });
    }
  },
  mounted() {
    filter(this.image, this.filter)
      .then(src => {
        this.filteredImage = src;
      });
  }
};

</script>

<style scoped>
.photo {
  text-align: center;
}

.button {
  margin-top: 1rem;
}
</style>
