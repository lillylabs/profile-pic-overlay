<template>
  <div :class="['modal', isActive ? 'is-active': '']">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-content">
      <div class="box">
        <article class="media">
          <figure class="media-left">
            <p class="image is-128x128">
              <img :src="image">
            </p>
          </figure>
          <div class="media-content">
            <div class="field">
              <p class="control">
                <textarea class="textarea" v-model="userText" :disabled="disabled"></textarea>
              </p>
            </div>
            <nav class="level">
              <div class="level-left">
                <div class="level-item">
                  <button class="button is-info" @click="share" :class="{ 'is-loading': disabled }">Del på Facebook</button>
                </div>
                <div class="level-item">
                  <button class="button" @click="closeModal" :disabled="disabled">Avbryt</button>
                </div>
              </div>
            </nav>
          </div>
        </article>
      </div>
    </div>
    <button class="modal-close is-large" @click="closeModal"></button>
  </div>
</template>

<script>

import axios from 'axios';
import Filter from '~assets/services/image.service';

export default {
  props: [
    'option',
    'text',
    'isActive',
    'image'
  ],
  data() {
    return {
      sharing: false,
      userText: null
    };
  },
  computed: {
    disabled() {
      return this.sharing || !this.image;
    }
  },
  methods: {
    closeModal: function () {
      this.$emit('update:isActive', false);
      this.sharing = false;
    },
    share: function () {
      this.sharing = true;
      this.loginFacebook()
        .then(authResponse => {
          return this.uploadToFacebook(authResponse.accessToken);
        })
        .then(response => {
          this.sharing = false;
          this.closeModal();
        })
        .catch(error => {
          this.sharing = false;
          console.log(error);
        });
    },
    uploadToFacebook(accessToken) {
      const blob = Filter.dataURItoBlob(this.image);
      var fd = new FormData();
      fd.append('access_token', accessToken);
      fd.append('filename', 'test.jpeg');
      fd.append('source', blob);
      fd.append('message', this.userText);
      return axios.post('https://graph.facebook.com/me/photos', fd);
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
    }
  },
  mounted() {
    this.userText = this.text;
  }
};
</script>

<style scoped>
.image {
  margin-bottom: 0;
}
</style>

