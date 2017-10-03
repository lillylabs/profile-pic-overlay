<template>
  <div class="image is-square">
    <img :class="{ 'grayscale': overlay }" :src="image"></img>
    <img v-if="overlay" :src="overlay"></img>
  </div>
</template>

<script>

export default {
  props: ['image', 'overlay'],
  mounted() {

  }
};

</script>

<style scoped>
.grayscale {
  filter: grayscale(100%);
}
</style>
