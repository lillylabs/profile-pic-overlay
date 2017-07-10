<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        <photo :image="image" :title="'Title'"></photo>
        <download :button="download" :image="image" :fileName="'Test'"></download>
      </div>
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
      download: state => state.content.buttons.download
    })
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
