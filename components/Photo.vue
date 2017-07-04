<template>
  <div class="photo">
    <div class="image is-square">
      <img :src="$store.state.photo.src"></img>
      <canvas width=" 1000 " height="1000 " :data-filter="filter " data-image="$store.state.photo.src "></canvas>
    </div>
    <a class="button is-static " :download="$store.state.photo.title ">
      <span>{{ $store.state.buttons.download.default }}&nbsp;</span>
      <span class=" icon ">
        <i class="fa fa-download "></i>
      </span>
    </a>
  </div>
</template>

<script>

export default {
  props: ['filter'],
  data: function () {
    return {

    }
  }
}
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
