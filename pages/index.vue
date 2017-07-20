<template>
  <div class="columns">
    <div class="column ">
      <label for="file">
        <photo :image="avatars[0]" :overlay="overlay" :class="{ 'is-static': uploading }"></photo>
      </label>
    </div>
    <div class="column">
      <header>
        <h1 class="title">
          {{ title }}
        </h1>
        <p>
          {{ prompt }}
        </p>
      </header>
      <div class="actions has-text-centered">
        <label for="file" class="button is-primary" :class="{ 'is-loading': uploading }">
          <span>{{ buttons.default.label }}&nbsp;</span>
          <span class=" icon ">
            <i :class="[ 'fa', buttons.default.icon] "></i>
          </span>
        </label>
        <button @click="useProfilePic" class="button is-link is-small" :class="{ 'is-static': uploading || !facebook.initialized }">{{ buttons.facebook.label }}</button>
      </div>
    </div>
    <input type="file" accept="image/*" name="file" id="file" @change="filesChange($event.target.files)"></input>
  </div>
</template>

<script>

import { mapState, mapActions, mapMutations } from 'vuex';
import Photo from '~components/Photo.vue';
import Facebook from '../services/facebook.service';

export default {
  components: {
    Photo
  },
  data() {
    return {
      uploading: false
    };
  },
  computed: {
    ...mapState({
      image: state => state.image,
      title: state => state.content.steps.index.title,
      prompt: state => state.content.steps.index.prompt,
      avatars: state => state.content.avatars,
      overlay: state => state.content.overlay,
      buttons: state => state.content.steps.index.buttons,
      facebook: state => state.facebook
    })
  },
  methods: {
    ...mapActions([
      'uploadFile',
      'useImage'
    ]),
    ...mapMutations({
      addError: 'addError',
      setOrientation: 'setOrientation',
      setSelectedStep: 'setSelectedStep',
      facebookResponse: 'facebook/response'
    }),
    getProfilePic() {
      this.uploading = true;
      Facebook.getProfilePicture(this.facebook.authResponse)
        .then(image => {
          this.useImage(image);
        })
        .catch(error => {
          this.uploading = false;
          console.log(error);
        });
    },
    useProfilePic() {
      if (this.facebook.connected) {
        this.getProfilePic();
      } else {
        Facebook.login()
          .then(response => {
            this.getProfilePic();
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    filesChange: function (files) {
      this.uploading = true;
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
    }
  },
  watch: {
    image(newValue, oldValue) {
      if (newValue) {
        this.$router.push('edit');
      }
    }
  },
  mounted() {
    this.setSelectedStep('index');
  }
};
</script>

<style scoped>
input {
  opacity: 0;
  position: absolute;
  height: 0;
  width: 0;
}

button {
  margin-top: 0.25rem;
}
</style>
