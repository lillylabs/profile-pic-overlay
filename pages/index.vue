<template>
  <div class="columns">
    <input type="file" accept="image/*" name="file" id="file" @change="filesChange($event.target.files)"></input>
    <div class="column" v-for="(avatar, key) in avatars" :key="key ">
      <label for="file" v-on:click="selectOverlay(key)">
        <photo :image="avatars[key]" :overlay="overlays[key]"></photo>
        <div class="button">
          <span>{{ button.default }}&nbsp;</span>
          <span class=" icon ">
            <i :class="[ 'fa', button.icon] "></i>
          </span>
        </div>
      </label>
      <button @click="useProfilePic(key)" class="button is-link is-small">{{ facebook.default }}</button>
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

    };
  },
  computed: {
    ...mapState({
      avatars: state => state.content.avatars,
      overlays: state => state.content.filters,
      button: state => state.content.buttons.upload,
      facebook: state => state.content.buttons.profile
    })
  },
  methods: {
    ...mapActions([
      'uploadFile'
    ]),
    ...mapMutations([
      'addError',
      'setOverlay',
      'setOrientation'
    ]),
    selectOverlay: function (selectedKey) {
      console.log('select overlay');
      this.fileDialogOpen = true;
      this.setOverlay(this.overlays[selectedKey]);
    },
    useProfilePic: function (selectedKey) {
      this.setOverlay(this.overlays[selectedKey]);
      console.log('profile pic');
      /* globals FB */
      FB.login(function () {
        // Note: The call will only work if you accept the permission request
        FB.api('/me/feed', 'post', { message: 'Hello, world!' });
      }, { scope: 'publish_actions' });
    },
    filesChange: function (files) {
      // handle file changes
      var file = files ? files[0] : null;

      if (!file) {
        this.addError(new Error('No file'));
        return;
      }

      if (!file.type.match('image.*')) {
        this.addError(new Error('File is not an image'));
        return;
      }

      const EXIF = require('exif-js');
      const that = this;
      EXIF.getData(file, function () {
        that.setOrientation(EXIF.getTag(this, 'Orientation'));
      });

      this.uploadFile(file);
      this.$router.push('share');
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

button {
  margin-top: 0.25rem;
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
