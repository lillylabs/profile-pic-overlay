<template>
  <div class="columns">
    <div class="column has-text-centered">
      <croppie ref="croppie" v-if="image" :image="image" :overlay="overlay" :orientation="orientation"></croppie>
      <nuxt-link class="button is-small is-link" to="/">
        {{ upload.new }}
      </nuxt-link>
    </div>
    <div class="column has-text-centered">
      <h2 class="title is-5">{{ share.title}}</h2>
      <div>
        <button class="button" v-for="option in this.options" :key="option" @click="openModal(option)">
          <span v-if="share.options[option].icon" class="icon is-small">
            <i :class="[ 'fa', share.options[option].icon] "></i>
          </span>
          <span>{{ share.options[option].label }}</span>
        </button>
      </div>
      <div class="content">
        <button class="button is-small is-link" @click="openModal('save')">
          <span>{{ share.save.label }}</span>
        </button>
      </div>
    </div>
    <share-modal :image="filteredImage" :suggestion="share.suggestion" :save="share.save" :is-active.sync="modal.save"></share-modal>
    <facebook-modal :option="share.options['facebook']" :image="filteredImage" :text="share.suggestion.text" :is-active.sync="modal.facebook"></facebook-modal>
    <share-modal :option="share.options['twitter']" :image="filteredImage" :suggestion="share.suggestion" :save="share.save" :is-active.sync="modal.twitter"></share-modal>
    <share-modal :option="share.options['custom']" :image="filteredImage" :suggestion="share.suggestion" :save="share.save" :is-active.sync="modal.custom"></share-modal>
  </div>
</template>

<script>

import { mapState } from 'vuex';

import Photo from '~components/parts/Photo.vue';
import Croppie from '~components/parts/Croppie.vue';
import FacebookModal from '~components/parts/FacebookModal.vue';
import Filter from '~assets/services/image.service';
import ShareModal from '~components/parts/ShareModal.vue';

// const Download = require('downloadjs');

export default {
  components: {
    Photo,
    Croppie,
    FacebookModal,
    ShareModal
  },
  data() {
    return {
      modal: {
        copy: false,
        facebook: false,
        twitter: false,
        custom: false
      },
      options: ['facebook', 'twitter', 'custom'],
      filteredImage: null
    };
  },
  computed: {
    ...mapState({
      image: state => state.image,
      orientation: state => state.orientation,
      overlay: state => state.overlay,
      uploading: state => state.uploading,
      upload: state => state.content.buttons.upload,
      share: state => state.content.share
    })
  },
  methods: {
    filterCroppedImage() {
      return new Promise(resolve => {
        this.$refs.croppie.getCroppedImage().then(base64 => {
          Filter.overlay(base64, this.overlay).then(image => {
            this.filteredImage = image;
            resolve(image);
          });
        });
      });
    },
    openModal(key) {
      console.log(key);
      this.filterCroppedImage();
      this.$set(this.modal, key, true);
    }
  },
  fetch({ store, redirect }) {
    if (!store.state.image && !store.state.uploading) {
      return redirect('/');
    }
  }
};
</script>

<style scoped>
.columns {
  justify-content: center;
  align-items: center;
}

.column:last-child {
  text-align: left;
}

.content {
  margin-top: 0.5em;
}

.button {
  margin: 0.25rem;
}

@media screen and (min-width: 769px) {
  .title {
    margin-top: -4em;
  }
  .column {
    max-width: 45vh;
    min-width: 20rem;
  }
}
</style>
