<template>
  <div class="columns">
    <input type="file" name="file" id="file" @change="filesChange($event.target.files) "></input>
    <div class="column" v-for="key in keys" :key="key ">
      <label for="file" v-on:click="selectOverlay(key) ">
        <photo :image="images[key].filtered "></photo>
        <div class="button">
          <span>{{ button.default }}&nbsp;</span>
          <span class=" icon ">
            <i :class="[ 'fa', button.icon] "></i>
          </span>
        </div>
      </label>
    </div>
  </div>
</template>

<script>

import { mapState, mapActions, mapMutations } from 'vuex';
import Photo from '~components/parts/Photo.vue';

export default {
  components: {
    Photo
  },
  data() {
    return {
      keys: ['man', 'woman']
    };
  },
  computed: {
    ...mapState({
      images: state => state.images,
      button: state => state.content.buttons.upload
    })
  },
  methods: {
    ...mapActions([
      'filterImage',
      'uploadFile'
    ]),
    ...mapMutations([
      'uploadError'
    ]),
    selectOverlay: function (selectedKey) {
      this.$store.commit('imageOverlay', { key: 'uploaded', overlay: this.images[selectedKey].overlay });
    },
    filesChange: function (files) {
      // handle file changes
      var file = files ? files[0] : null;

      if (!file) {
        this.uploadError(new Error('No file'));
        return;
      }

      if (!file.type.match('image.*')) {
        this.uploadError(new Error('File is not an image'));
        return;
      }
      this.uploadFile(file);
    }
  },
  watch: {
    'images.uploaded.original': function (original) {
      if (original) {
        this.filterImage('uploaded');
        this.$router.push('share');
      }
    }
  },
  mounted() {
    for (var key of this.keys) {
      this.filterImage(key);
    }
  }
};
</script>

<style scoped>
.columns {
  justify-content: center;
}

input {
  opacity: 0;
  position: absolute;
  height: 0;
  width: 0;
}

.column:not(.is-narrow) {
  max-width: 20rem;
  margin: 0 auto;
}

@media screen and (min-width: 769px) {
  .column:not(.is-narrow) {
    max-width: 45vh;
    min-width: 20rem;
    margin: 0 1rem;
  }
}
</style>
