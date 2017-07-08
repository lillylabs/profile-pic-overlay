<template>
  <div class="share">
    <a class="button" :download="fileName" :href="dataUrl">
      <span>{{ button.default }}&nbsp;</span>
      <span class=" icon ">
        <i :class="[ 'fa', button.icon] "></i>
      </span>
    </a>
  </div>
</template>

<script>

export default {
  props: ['button', 'dataUrl', 'fileName']
};

</script>

<style scoped>
.share {
  text-align: center;
  position: relative;
}
</style>
