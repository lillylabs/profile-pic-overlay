<template>
  <div class="image is-square">
    <img class="grayscale" :src="image"></img>
    <img :src="overlay"></img>
  </div>
</template>

<script>

export default {
  props: ['image', 'overlay']
};

</script>

<style scoped>
.grayscale {
  filter: grayscale(100%);
}
</style>
