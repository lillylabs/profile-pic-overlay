<template>
  <div class="container">
    <a name="about"></a>
    <div class="content" v-html="content"></div>
  </div>
</template>

<script>

var marked = require('marked');

export default {
  data() {
    return {

    };
  },
  computed: {
    content: function () {
      return marked(this.$store.state.content.about);
    }
  }
};
</script>

<style scoped>
.content {
  max-width: 45em;
  margin: 0 auto;
}
</style>
