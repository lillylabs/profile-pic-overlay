<template>
  <div class="columns">
    <no-ssr class="column">
      <croppie ref="croppie" v-if="image" :image="image" :overlay="overlay" :orientation="orientation" :size="size"></croppie>
    </no-ssr>
    <div class="column">
      <div>
        <h2 class="title">{{ title}}</h2>
        <div v-html="content"></div>
      </div>
      <div class="actions">
        <button @click="onContinue" class="button is-primary" :class="{ 'is-loading': filtering }">
          <span>{{ options.continue.label }}</span>
        </button>
        <nuxt-link to="/" class="button is-link is-small" :class="{ 'is-static': filtering }">
          <span>{{ options.back.label }}</span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>

var marked = require('marked');
import { mapState, mapMutations, mapActions } from 'vuex';
import Croppie from '~/components/Croppie.vue';

// const Download = require('downloadjs');

export default {
  components: {
    Croppie
  },
  data() {
    return {
      filtering: false
    };
  },
  computed: {
    ...mapState({
      image: state => state.image,
      filteredImage: state => state.filteredImage,
      size: state => state.size,
      title: state => state.content.steps.edit.title,
      orientation: state => state.orientation,
      overlay: state => state.content.overlay.lg,
      options: state => state.content.steps.edit.options
    }),
    content: function () {
      return marked(this.$store.state.content.steps.edit.content);
    }
  },
  methods: {
    ...mapMutations([
      'setSelectedStep',
      'startFiltering'
    ]),
    ...mapActions([
      'filterImage'
    ]),
    onContinue() {
      this.filtering = true;
      this.$refs.croppie.getCroppedImage().then(base64 => {
        this.filterImage(base64);
      });
    }
  },
  fetch({ store, redirect }) {
    if (!store.state.image) {
      return redirect('/');
    }
  },
  watch: {
    filteredImage(newValue, oldValue) {
      if (newValue) {
        this.$router.push('share');
      }
    }
  },
  mounted() {
    this.setSelectedStep('edit');
  }
};
</script>

<style>

</style>
