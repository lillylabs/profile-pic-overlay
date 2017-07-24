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
      const markdown = this.$store.state.content[this.$route.params.page];
      return markdown ? marked(markdown) : '';
    }
  },
  mounted() {
    this.setSelectedStep(this.$route.params.page);
  }
};
</script>

<style scoped>
div {
  max-width: 32rem;
  margin: 0 auto;
}
</style>
