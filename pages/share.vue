<template>
  <div class="columns">
    <div class="column">
      <photo :image="image" :overlay="overlay"></photo>
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
import CopyModal from '~components/parts/CopyModal.vue';
import Filter from '~assets/services/image.service';

const Download = require('downloadjs');

export default {
  components: {
    Photo,
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
      overlay: state => state.overlay,
      uploading: state => state.uploading,
      download: state => state.content.buttons.download,
      upload: state => state.content.buttons.upload,
      share: state => state.content.share
    })
  },
  methods: {
    filterImage: function () {
      return Filter.overlay(this.image, this.overlay);
    },
    downloadImage: function () {
      this.modal = true;
      this.downloading = true;
      this.filterImage().then(filtredImage => {
        Download(filtredImage, this.download.fileName, 'image/jpeg');
        this.downloading = false;
      });
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
