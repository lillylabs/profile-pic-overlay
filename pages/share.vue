<template>
  <div class="columns">
    <div class="column">
      <croppie ref="croppie" v-if="image" :image="image" :overlay="overlay" :orientation="orientation"></croppie>
      <nuxt-link class="button" to="/">
        <span class="icon is-small">
          <i class="fa fa-chevron-left"></i>
        </span>
        <span>&nbsp;{{ upload.new }}</span>
      </nuxt-link>
      <button class="button" :class="{ 'is-static': downloading }" @click="downloadImage">
        <span>{{ download.default }}&nbsp;</span>
        <span class=" icon ">
          <i :class="[ 'fa', download.icon] "></i>
        </span>
      </button>
    </div>
    <copy-modal :title="share.suggestion.title" :text="share.suggestion.text" :button="share.copy" :is-active.sync="modal"></copy-modal>
  </div>
</template>

<script>

import { mapState } from 'vuex';

import Photo from '~components/parts/Photo.vue';
import Croppie from '~components/parts/Croppie.vue';
import CopyModal from '~components/parts/CopyModal.vue';
import Filter from '~assets/services/image.service';

const Download = require('downloadjs');

export default {
  components: {
    Photo,
    Croppie,
    CopyModal
  },
  data() {
    return {
      modal: false,
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
    downloadImage: function () {
      this.modal = true;
      this.downloading = true;
      this.$refs.croppie.getCroppedImage().then(base64 => {
        Filter.overlay(base64, this.overlay).then(image => {
          Download(image, this.download.fileName + '.jpeg', 'image/jpeg');
          this.downloading = false;
        });
      });
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
}

.column:last-child {
  text-align: left;
}

.content {
  margin-top: 1em;
}

@media screen and (min-width: 769px) {
  .column {
    max-width: 45vh;
    min-width: 20rem;
  }
}
</style>
