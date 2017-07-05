<template>
  <div class="container">
    <div class="columns">
      <div class="column is-one-third">
        <intro :title="$store.state.content.title" :subtitle="$store.state.content.subtitle" :content="$store.state.content.prompt"></intro>
        <upload-image :button="$store.state.content.buttons.upload"></upload-image>
      </div>
      <div class="column is-one-quarter" v-for="filter in $store.state.content.filters">
        <filter-photo :button="$store.state.content.buttons.download" :filter="filter" :photo="$store.state.content.photo"></filter-photo>
      </div>
    </div>
  </div>
</template>

<script>
import FilterPhoto from '~components/parts/FilterPhoto.vue';
import Intro from '~components/parts/Intro.vue';
import UploadImage from '~components/parts/UploadImage.vue';

export default {
  components: {
    FilterPhoto,
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
