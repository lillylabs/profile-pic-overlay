<template>
  <div class="columns">
    <div class="column">
      <croppie ref="croppie" :image="image.original" :overlay="image.overlay"></croppie>
      <nuxt-link class="button" to="/">
        <span class="icon is-small">
          <i class="fa fa-chevron-left"></i>
        </span>
        <span>{{ upload.new }}</span>
      </nuxt-link>
      <button class="button" @click="generate">generate</button>
      <span @click="showModal">
        <download class="button" :button="download" :image="image.filtered"></download>
      </span>
    </div>
    <div class="column">
      <img :src="image.filtered"></img>
    </div>
    <copy-modal :title="share.suggestion.title" :text="share.suggestion.text" :button="share.copy" :is-active.sync="modal"></copy-modal>
  </div>
</template>

<script>

import { mapState, mapActions, mapMutations } from 'vuex';

import Photo from '~components/parts/Photo.vue';
import Croppie from '~components/parts/Croppie.vue';
import CopyModal from '~components/parts/CopyModal.vue';
import Download from '~components/parts/Download.vue';

export default {
  components: {
    Photo,
    Croppie,
    CopyModal,
    Download
  },
  data() {
    return {
      modal: false,
      copied: false
    };
  },
  computed: {
    ...mapState({
      image: state => state.images.uploaded,
      download: state => state.content.buttons.download,
      upload: state => state.content.buttons.upload,
      share: state => state.content.share
    })
  },
  methods: {
    ...mapMutations([
      'croppedImage'
    ]),
    ...mapActions([
      'filterImage'
    ]),
    showModal: function () {
      this.modal = true;
    },
    generate: function () {
      this.$refs.croppie.getCroppedImage().then(base64 => {
        this.croppedImage({ key: 'uploaded', image: base64 });
        this.filterImage('uploaded');
      });
    }
  },
  fetch({ store, redirect }) {
    if (!store.state.images.uploaded.original) {
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
