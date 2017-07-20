<template>
  <div>
    <h2 class="title has-text-centered">{{ title }}</h2>
    <div class="tabs is-fullwidth">
      <ul>
        <li v-for="(option, key) in options" :key="key" :class="{ 'is-active' : key === selectedOption }">
          <a @click="selectedOption = key">{{ option.label }}</a>
        </li>
      </ul>
    </div>
    <div v-for="(option, key) in options" :key="key" v-show="key === selectedOption">
      <facebook-modal v-if="key === 'facebook'" :image="image" :text="suggestion.text" :option="option" :facebook="facebook"></facebook-modal>
      <share-modal v-else :image="image" :suggestion="suggestion" :option="option" :save="download"></share-modal>
    </div>
  </div>
</template>

<script>

import { mapState, mapMutations } from 'vuex';

import Photo from '~components/Photo.vue';
import FacebookModal from '~components/FacebookModal.vue';
import ShareModal from '~components/ShareModal.vue';

// const Download = require('downloadjs');

export default {
  components: {
    Photo,
    FacebookModal,
    ShareModal
  },
  data() {
    return {
      selectedOption: 'facebook'
    };
  },
  computed: {
    ...mapState({
      image: state => state.filteredImage,
      title: state => state.content.steps.share.title,
      options: state => state.content.steps.share.options,
      suggestion: state => state.content.steps.share.suggestion,
      download: state => state.content.steps.share.download,
      facebook: state => state.facebook
    })
  },
  methods: {
    ...mapMutations([
      'setSelectedStep'
    ])
  },
  fetch({ store, redirect }) {
    if (!store.state.filteredImage) {
      return redirect('/');
    }
  },
  mounted() {
    this.setSelectedStep('share');
  }
};
</script>

<style scoped>
div {
  max-width: 32rem;
  margin: 0 auto;
}
</style>
