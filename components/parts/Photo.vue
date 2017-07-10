<template>
  <div class="image is-square">
    <img v-show="image" :src="image" :title="title"></img>
  </div>
</template>

<script>

export default {
  props: ['image', 'title']
};

</script>

<style scoped>

</style>
