<template>
  <div class="image is-square">
    <img :v-show="image" class="grayscale" :src="image"></img>
    <img :v-show="image" :src="overlay"></img>
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
