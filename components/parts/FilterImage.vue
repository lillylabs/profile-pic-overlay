<template>
  <div class="photo">
    <div class="image is-square">
      <img :src="image"></img>
      <img v-show="filteredImage" :src="filteredImage " :class="[ loading ? 'is-loading' : ''] " :disabled="loading "></img>
    </div>
    <a class="button is-static " download="bla ">
      <span>{{ button.default }}&nbsp;</span>
      <span class=" icon ">
        <i :class="[ 'fa', button.icon] "></i>
      </span>
    </a>
  </div>
</template>

<script>

export default {
  props: ['button', 'filter', 'id'],
  computed: {
    image: function () {
      return this.$store.state.uploadedImage.src || this.filter.image;
    },
    loading: function () {
      return this.$store.state.filteredImageStatus[this.id] === 'IN_PROGRESS';
    },
    filteredImage: function () {
      return this.$store.state.filteredImage[this.id];
    }
  },
  watch: {
    image: function (val) {
      this.$store.dispatch('filterImage', { id: this.id, image: val, filter: this.filter.overlay });
    }
  },
  mounted() {
    this.$store.dispatch('filterImage', { id: this.id, image: this.image, filter: this.filter.overlay });
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
