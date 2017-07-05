<template>
  <div class="photo">
    <div class="image is-square">
      <img v-if="!$store.state.uploadedImage.dataUrl" :src="image.src"></img>
      <img v-if="$store.state.uploadedImage.dataUrl" :src="$store.state.uploadedImage.dataUrl"></img>
    </div>
    <a class="button is-static " :download="image.title">
      <span>{{ button.default }}&nbsp;</span>
      <span class=" icon ">
        <i :class="['fa', button.icon]"></i>
      </span>
    </a>
  </div>
</template>

<script>

export default {
  props: ['button', 'filter', 'image'],
  data() {
    return {
      filteredImage: null
    };
  },
  watch: {
    photo() {

    }
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

.image.is-square canvas {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 100%;
}
</style>
