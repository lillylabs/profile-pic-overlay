<template>
  <div class="content" v-html="content">
  </div>
</template>

<script>

var marked = require('marked');
import { mapMutations } from 'vuex';

export default {
  data() {
    return {

    };
  },
  methods: {
    ...mapMutations([
      'setSelectedStep'
    ])
  },
  computed: {
    content: function () {
      return marked(this.$store.state.content.about);
    }
  },
  mounted() {
    this.setSelectedStep('about');
  }
};
</script>

<style scoped>
div {
  max-width: 70vh;
  margin: 0 auto;
}
</style>
