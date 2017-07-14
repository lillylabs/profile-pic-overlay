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
        <button class="button is-info" v-for="(option, key) in share.options" :key="key" @click="openModal(key)">
          <span class="icon is-small">
            <i :class="[ 'fa', option.icon] "></i>
          </span>
          <span>{{ option.label }}</span>
        </button>
      </div>
      <div class="content">
        <button class="button is-small is-link" :class="{ 'is-static': downloading }" @click="downloadImage">
          <span>{{ download.default }}</span>
        </button>
      </div>
    </div>
    <copy-modal :title="share.suggestion.title" :text="share.suggestion.text" :button="share.copy" :is-active.sync="modal.copy"></copy-modal>
    <share-modal v-for="(option, key) in share.options" :key="key" :option="option" :image="filteredImage" :text="share.suggestion.text" :is-active.sync="modal.facebook" @share="console.log('test')"></share-modal>
  </div>
</template>

<script>

import { mapState } from 'vuex';

import Photo from '~components/parts/Photo.vue';
import Croppie from '~components/parts/Croppie.vue';
import CopyModal from '~components/parts/CopyModal.vue';
import ShareModal from '~components/parts/ShareModal.vue';
import Filter from '~assets/services/image.service';

const Download = require('downloadjs');

export default {
  components: {
    Photo,
    Croppie,
    CopyModal,
    ShareModal
  },
  data() {
    return {
      modal: {
        copy: false,
        facebook: false
      },
      filteredImage: null,
      copied: false,
      downloading: false
    };
  },
  computed: {
    ...mapState({
      image: state => state.image,
      orientation: state => state.orientation,
      overlay: state => state.overlay,
      uploading: state => state.uploading,
      download: state => state.content.buttons.download,
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
    downloadImage() {
      this.modal.copy = true;
      this.downloading = true;
      this.filterCroppedImage().then(image => {
        Download(image, this.download.fileName + '.jpeg', 'image/jpeg');
        this.downloading = false;
      });
    },
    openModal(key) {
      this.filterCroppedImage();
      this.modal[key] = true;
    }
  },
  watch: {
    image: function (val) {
      console.log('mage', val);
    },
    orientation: function (val) {
      console.log('orientation', val);
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
  margin-top: 1em;
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
