<template>
  <a class="button" :download="button.fileName" :href="image">
    <span>{{ button.default }}&nbsp;</span>
    <span class=" icon ">
      <i :class="[ 'fa', button.icon] "></i>
    </span>
  </a>
</template>

<script>

export default {
  props: ['button', 'image', 'fileName']
};

</script>

<style scoped>
.share {
  text-align: center;
  position: relative;
}
</style>
