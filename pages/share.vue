<template>
  <div class="container">
    <div class="columns is-mobile">
      <div class="column">
        <photo :image="filteredImage" :title="'Title'"></photo>
        <download :button="download" :image="filteredImage" :fileName="'Test'"></download>
      </div>
    </div>
  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex';

import Photo from '~components/parts/Photo.vue';
import Download from '~components/parts/Download.vue';

export default {
  components: {
    Photo,
    Download
  },
  computed: {
    ...mapState({
      image: state => state.uploadedImage.src,
      filteredImage: state => state.filteredImages.uploaded,
      overlay: state => state.content.filters[state.selectedOverlay],
      download: state => state.content.buttons.download
    })
  },
  methods: {
    ...mapActions([
      'filterImage'
    ])
  },
  mounted() {
    const payload = {
      id: 'uploaded',
      image: this.image,
      overlay: this.overlay
    };
    this.filterImage(payload);
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
