<template>
  <div class="columns">
    <div class="column ">
      <photo :image="image"></photo>
      <button v-if="supported.filesystem" @click="downloadImage" class="button is-small is-link is-fullwidth">
        <span>{{ download.title }}</span>
      </button>
      <p v-if="!supported.filesystem">
        {{ download.instructions }}
      </p>
    </div>
    <div class="column">
      <header>
        <h1 class="title">
          {{ title }}
        </h1>
      </header>
      <div class="actions">
        <button @click="openModal(key)" class="button" :class="option.class" v-for="(option, key) in options" :key="key">
          <span v-if="option.icon" class="icon">
            <i :class="['fa', option.icon]"></i>
          </span>
          {{ option.label }}
        </button>
      </div>
    </div>
    <div v-for="(option, key) in options" :key="key">
      <facebook-modal v-if="key === 'facebook'" :image="image" :suggestion="suggestion" :option="option" :isActive="modal[key]" @close="closeModal(key)"></facebook-modal>
      <share-modal v-else :image="image" :suggestion="suggestion" :option="option" :save="download" :isActive="modal[key]" @close="closeModal(key)"></share-modal>
    </div>
  </div>
</template>

<script>
/* globals Modernizr */

import { mapState, mapMutations } from 'vuex';

import Photo from '~/components/Photo.vue';
import FacebookModal from '~/components/FacebookModal.vue';
import ShareModal from '~/components/ShareModal.vue';

const Download = require('downloadjs');

export default {
  components: {
    Photo,
    FacebookModal,
    ShareModal
  },
  data() {
    return {
      status: {},
      supported: {},
      modal: {}
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
    ]),
    setStatus(key, status = true) {
      this.$set(this.status, key, status);
    },
    openModal(key) {
      this.$set(this.modal, key, true);
    },
    closeModal(key) {
      console.log('closeModal', key);
      this.$set(this.modal, key, false);
    },
    downloadImage() {
      const status = Download(this.image, this.download.fileName + '.jpeg', 'image/jpeg');
      this.setStatus('downloaded', status);
    }
  },
  fetch({ store, redirect }) {
    if (!store.state.filteredImage) {
      return redirect('/');
    }
  },
  mounted() {
    this.setSelectedStep('share');
    if (Modernizr.adownload) {
      this.$set(this.supported, 'filesystem', true);
    } else {
      this.$set(this.supported, 'filesystem', false);
    }
  }
};
</script>

<style scoped>
.actions .button+.button {
  margin-top: 0.5rem;
}

.icon {
  margin-right: 0.25rem !important;
}

.image+.button {
  margin-top: 0.5rem;
}

.image+p {
  font-size: 0.8rem;
  padding: 0.5rem;
  text-align: center;
}
</style>
