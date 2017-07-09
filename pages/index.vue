<template>
  <div class="container">
    <div class="columns is-mobile">
      <div class="column">
        <photo :image="man" :title="'Title'"></photo>
        <upload :button="upload" :filter-key="'man'"></upload>
      </div>
      <div class="column is-narrow"></div>
      <div class="column">
        <photo :image="woman" :title="'Title'"></photo>
        <upload :button="upload" :filter-key="'woman'"></upload>
      </div>
    </div>
  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex';
import Photo from '~components/parts/Photo.vue';
import Upload from '~components/parts/Upload.vue';

export default {
  components: {
    Photo,
    Upload
  },
  computed: {
    ...mapState({
      man: state => state.filteredImages.man,
      woman: state => state.filteredImages.woman,
      upload: state => state.content.buttons.upload
    })
  },
  methods: {
    ...mapActions([
      'filterImage'
    ])
  },
  mounted() {
    for (var key of Object.keys(this.$store.state.content.avatars)) {
      const payload = {
        id: key,
        image: this.$store.state.content.avatars[key],
        overlay: this.$store.state.content.filters[key]
      };
      this.filterImage(payload);
    }
  }
};
</script>

<style scoped>
.columns {
  justify-content: center;
}

@media screen and (min-width: 769px) {
  .column:not(.is-narrow) {
    max-width: 45vh;
    min-width: 20rem;
  }
}
</style>
