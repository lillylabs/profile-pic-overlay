<template>
  <div class="columns">
    <div class="column">
      <photo :image="image.original" :title="'Title'"></photo>
      <photo :image="image.filtered" :title="'Title'"></photo>
      <nuxt-link class="button" to="/">
        <span class="icon is-small">
          <i class="fa fa-chevron-left"></i>
        </span>
        <span>{{ upload.new }}</span>
      </nuxt-link>
      <span @click="showModal">
        <download class="button" :button="download" :image="image"></download>
      </span>
    </div>
    <copy-modal :title="share.suggestion.title" :text="share.suggestion.text" :button="share.copy" :is-active.sync="modal"></copy-modal>
  </div>
</template>

<script>

import { mapState } from 'vuex';

import Photo from '~components/parts/Photo.vue';
import CopyModal from '~components/parts/CopyModal.vue';
import Download from '~components/parts/Download.vue';

export default {
  components: {
    Photo,
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
    showModal: function () {
      this.modal = true;
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
