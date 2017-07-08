<template>
  <div class="container">
    <div class="columns">
      <div class="column is-one-third">
        <intro :title="$store.state.content.title" :subtitle="$store.state.content.subtitle" :content="$store.state.content.prompt"></intro>
      </div>
      <div class="column is-half">
        <div class="columns is-mobile" v-if="!$store.state.filteredImages.uploaded">
          <div class="column is-half" v-for="index of ['man', 'woman']" :key="index">
            <div class="image is-square">
              <img v-show="$store.state.filteredImages[index]" :src="$store.state.filteredImages[index]"></img>
            </div>
            <upload-image :button="$store.state.content.buttons.upload" :filter-key="index"></upload-image>
          </div>
        </div>
  
        <div class="columns" v-if="$store.state.filteredImages.uploaded">
          <div class="column is-half">
            <div class="image is-square">
              <img :src="$store.state.filteredImages.uploaded"></img>
            </div>
            <download :button="$store.state.content.buttons.download " :data-url="$store.state.filteredImages.uploaded" fileName="'test'">
            </download>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Download from '~components/parts/Download.vue';
import Intro from '~components/parts/Intro.vue';
import UploadImage from '~components/parts/UploadImage.vue';

export default {
  components: {
    Download,
    Intro,
    UploadImage
  },
  data() {
    return {

    };
  },
  computed: {
    uploadedImage: function () {
      return this.$store.state.uploadedImage.src;
    }
  },
  watch: {

  },
  mounted() {
    for (var key of Object.keys(this.$store.state.content.avatars)) {
      this.$store.dispatch('filterImage', {
        id: key,
        image: this.$store.state.content.avatars[key],
        filter: this.$store.state.content.filters[key]
      });
    }
  }
};
</script>

<style scoped>
.columns {
  align-items: center;
}

.column:first-child {
  margin-left: auto;
}

.column:last-child {
  margin-right: auto;
}

.image {
  margin-bottom: 1rem;
}
</style>
