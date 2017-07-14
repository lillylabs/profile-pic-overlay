<template>
  <div class="columns">
    <div class="column">
      <croppie ref="croppie" v-if="image" :image="image" :overlay="overlay" :orientation="orientation"></croppie>
      <nuxt-link class="button is-small is-link" to="/">
        {{ upload.new }}
      </nuxt-link>
    </div>
    <div class="column">
      <h2 class="title is-5">{{ share.title}}</h2>
      <div>
        <button class="button is-info" :class="{ 'is-loading': sharing }" v-for="(button, key) in share.buttons" :key="key" @click="shareImage(key)">
          <span>{{ button.label }}&nbsp;</span>
          <span class="icon is-small">
            <i :class="[ 'fa', button.icon] "></i>
          </span>
        </button>
      </div>
      <div class="content">
        <button class="button is-small is-link" :class="{ 'is-static': downloading }" @click="downloadImage">
          <span>{{ download.default }}</span>
        </button>
      </div>
    </div>
    <copy-modal :title="share.suggestion.title" :text="share.suggestion.text" :button="share.copy" :is-active.sync="modal"></copy-modal>
  </div>
</template>

<script>

import { mapState } from 'vuex';

import Photo from '~components/parts/Photo.vue';
import Croppie from '~components/parts/Croppie.vue';
import CopyModal from '~components/parts/CopyModal.vue';
import Filter from '~assets/services/image.service';
import axios from 'axios';

const Download = require('downloadjs');

export default {
  components: {
    Photo,
    Croppie,
    CopyModal
  },
  data() {
    return {
      modal: false,
      copied: false,
      downloading: false,
      sharing: false
    };
  },
  computed: {
    ...mapState({
      image: state => state.image,
      orientation: state => state.orientation,
      overlay: state => state.overlay,
      uploading: state => state.uploading,
      download: state => state.content.buttons.download,
      upload: state => state.content.buttons.upload,
      share: state => state.content.share
    })
  },
  methods: {
    uploadToFacebook(accessToken) {
      return this.filterCroppedImage().then(image => {
        const blob = Filter.dataURItoBlob(image);
        var fd = new FormData();
        fd.append('access_token', accessToken);
        fd.append('filename', 'test.jpeg');
        fd.append('source', blob);
        fd.append('message', this.share.suggestion.text);
        return axios.post('https://graph.facebook.com/me/photos', fd);
      });
    },
    loginFacebook() {
      return new Promise(resolve => {
        /* global FB */
        FB.getLoginStatus((response) => {
          if (response.status === 'connected') {
            resolve(response.authResponse);
          } else {
            FB.login((response) => {
              resolve(response.authResponse);
            });
          }
        });
      });
    },
    shareImage(key) {
      this.sharing = true;
      this.loginFacebook()
        .then(authResponse => {
          return this.uploadToFacebook(authResponse.accessToken);
        })
        .then(response => {
          this.sharing = false;
          console.log(response);
        });
    },
    filterCroppedImage() {
      return new Promise(resolve => {
        this.$refs.croppie.getCroppedImage().then(base64 => {
          Filter.overlay(base64, this.overlay).then(image => {
            resolve(image);
          });
        });
      });
    },
    downloadImage() {
      this.modal = true;
      this.downloading = true;
      this.filterCroppedImage().then(image => {
        Download(image, this.download.fileName + '.jpeg', 'image/jpeg');
        this.downloading = false;
      });
    }
  },
  watch: {
    image: function (val) {
      console.log('mage', val);
    },
    orientation: function (val) {
      console.log('orientation', val);
    }
  },
  fetch({ store, redirect }) {
    if (!store.state.image && !store.state.uploading) {
      return redirect('/');
    }
  }
};
</script>

<style scoped>
.columns {
  justify-content: center;
  align-items: center;
}

.column:last-child {
  text-align: left;
}

.content {
  margin-top: 1em;
}

@media screen and (min-width: 769px) {
  .title {
    margin-top: -4em;
  }
  .column {
    max-width: 45vh;
    min-width: 20rem;
  }
}
</style>
