<template>
  <div class="columns">
    <div class="column">
      <photo :image="image" :title="'Title'"></photo>
      <nuxt-link class="button" to="/">
        <span class="icon is-small">
          <i class="fa fa-chevron-left"></i>
        </span>
        <span>{{ upload.new }}</span>
      </nuxt-link>
      <download class="button" :button="download" :image="image"></download>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex';

import Photo from '~components/parts/Photo.vue';
import Download from '~components/parts/Download.vue';

export default {
  components: {
    Photo,
    Download
  },
  computed: {
    ...mapState({
      image: state => state.images.uploaded.filtered,
      download: state => state.content.buttons.download,
      upload: state => state.content.buttons.upload
    })
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

@media screen and (min-width: 769px) {
  .column {
    max-width: 45vh;
    min-width: 20rem;
  }
}
</style>
