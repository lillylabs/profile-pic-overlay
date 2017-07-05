<template>
  <div class="photo">
    <div class="image is-square">
      <img :src="photo.src"></img>
      <canvas width="1000" height="1000" :data-filter="filter " data-image="photo.src"></canvas>
    </div>
    <a class="button is-static " :download="photo.title">
      <span>{{ button.default }}&nbsp;</span>
      <span class=" icon ">
        <i :class="['fa', button.icon]"></i>
      </span>
    </a>
  </div>
</template>

<script>

export default {
  props: ['button', 'filter', 'photo'],
  data() {
    return {

    };
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
