<template>
  <div class="container">
    <div class="columns">
      <div class="column is-one-third">
        <intro :title="$store.state.content.title" :subtitle="$store.state.content.subtitle" :content="$store.state.content.prompt"></intro>
        <upload-image :button="$store.state.content.buttons.upload"></upload-image>
      </div>
      <div class="column is-one-quarter" v-for="filter in $store.state.content.filters">
        <filter-image :button="$store.state.content.buttons.download" :filter="filter" :image="$store.state.content.photo.src"></filter-image>
      </div>
    </div>
  </div>
</template>

<script>
import FilterImage from '~components/parts/FilterImage.vue';
import Intro from '~components/parts/Intro.vue';
import UploadImage from '~components/parts/UploadImage.vue';

export default {
  components: {
    FilterImage,
    Intro,
    UploadImage
  },
  data() {
    return {

    };
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
</style>
