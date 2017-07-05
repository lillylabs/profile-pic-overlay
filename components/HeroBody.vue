<template>
  <div class="container">
    <div class="columns">
      <div class="column is-one-third">
        <intro :title="$store.state.content.title" :subtitle="$store.state.content.subtitle" :content="$store.state.content.prompt"></intro>
        <upload-photo :button="$store.state.content.buttons.upload"></upload-photo>
      </div>
      <div class="column is-one-quarter" v-for="filter in $store.state.content.filters">
        <photo :button="$store.state.content.buttons.download" :filter="filter" :photo="$store.state.content.photo"></photo>
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
