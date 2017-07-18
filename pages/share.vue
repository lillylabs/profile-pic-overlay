<template>
  <div class="columns">
    <div class="column">
      <croppie ref="croppie" v-if="image" :image="image" :overlay="overlay" :orientation="orientation"></croppie>
      <nuxt-link class="button is-small is-link" to="/">
        {{ upload.new }}
      </nuxt-link>
    </div>
    <div class="column">
      <h2 class="title is-5">{{ share.title}}</h2>
      <div>
        <button class="button" v-for="option in this.options" :key="option" @click="openModal(option)">
          <span class="icon is-small">
            <i :class="[ 'fa', share.options[option].icon] "></i>
          </span>
          <span>{{ share.options[option].label }}</span>
        </button>
      </div>
      <div class="content">
        <button class="button is-small is-link" :class="{ 'is-static': downloading }" @click="downloadImage">
          <span>{{ share.save.label }}</span>
        </button>
      </div>
    </div>
    <copy-modal :suggestion="share.suggestion" :is-active.sync="modal.copy"></copy-modal>
    <facebook-modal :option="share.options['facebook']" :image="filteredImage" :text="share.suggestion.text" :is-active.sync="modal.facebook"></facebook-modal>
    <share-modal :option="share.options['twitter']" :image="filteredImage" :suggestion="share.suggestion" :save="share.save" :is-active.sync="modal.twitter"></share-modal>
    <share-modal :option="share.options['instagram']" :image="filteredImage" :suggestion="share.suggestion" :save="share.save" :is-active.sync="modal.instagram"></share-modal>
  </div>
</template>

<script>

import { mapState } from 'vuex';

import Photo from '~components/parts/Photo.vue';
import Croppie from '~components/parts/Croppie.vue';
import CopyModal from '~components/parts/CopyModal.vue';
import FacebookModal from '~components/parts/FacebookModal.vue';
import Filter from '~assets/services/image.service';
import ShareModal from '~components/parts/ShareModal.vue';

const Download = require('downloadjs');

export default {
  components: {
    Photo,
    Croppie,
    CopyModal,
    FacebookModal,
    ShareModal
  },
  data() {
    return {
      modal: {
        copy: false,
        facebook: false,
        twitter: false,
        instagram: false
      },
      filteredImage: null,
      copied: false,
      downloading: false,
      hasFilesystem: false
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
    }),
    options: function () {
      return this.hasFilesystem ? ['facebook', 'twitter'] : ['facebook', 'twitter', 'instagram'];
    }
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
    downloadImage() {
      this.modal.copy = true;
      this.downloading = true;
      this.filterCroppedImage().then(image => {
        Download(image, this.share.save.fileName + '.jpeg', 'image/jpeg');
        this.downloading = false;
      });
    },
    openModal(key) {
      console.log(key);
      this.filterCroppedImage();
      this.modal[key] = true;
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
