<template>
  <div class="container">
    <div class="columns">
      <div class="column is-one-third">
        <intro :title="$store.state.title" :subtitle="$store.state.subtitle" :content="$store.state.prompt"></intro>
        <upload-photo :button="$store.state.buttons.upload"></upload-photo>
      </div>
      <div class="column is-one-quarter" v-for="filter in $store.state.filters">
        <photo :button="$store.state.buttons.download" :filter="filter" :photo="$store.state.photo"></photo>
      </div>
    </div>
  </div>
</template>

<script>
import Intro from '~components/parts/Intro.vue'
import Photo from '~components/parts/Photo.vue'
import UploadPhoto from '~components/parts/UploadPhoto.vue'

export default {
  components: {
    Intro,
    Photo,
    UploadPhoto
  },
  data: function () {
    return {

    }
  }
}
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
