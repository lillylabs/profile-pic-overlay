<template>
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
        <p class="control">
          <button class="button is-info" @click="share" :class="{ 'is-loading': disabled }">
            <span>{{ option.submit }}</span>
          </button>
        </p>
      </div>
    </div>
  </article>
</template>

<script>
/* global FB */

import axios from 'axios';
import Filter from '~assets/services/image.service';

export default {
  props: [
    'option',
    'text',
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
    share: function () {
      this.sharing = true;
      this.facebookAauthResponse()
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
    facebookPermissionsGranted(scope, authResponse) {
      var fd = new FormData();
      fd.append('access_token', authResponse.accessToken);
      return axios.get('https://graph.facebook.com/me/permissions', {
        params: {
          access_token: authResponse.accessToken
        }
      })
        .then(response => {
          for (var entry of response.data.data) {
            if (entry.permission === scope && entry.status === 'granted') {
              return true;
            }
          }
          return false;
        })
        .catch(error => {
          console.log(error);
          return false;
        });
    },
    facebookLoginStatus() {
      return new Promise(resolve => {
        FB.getLoginStatus((response) => {
          resolve(response);
        });
      });
    },
    facebookLogin() {
      return new Promise(resolve => {
        FB.login((response) => {
          resolve(response.authResponse);
        }, { scope: 'publish_actions' });
      });
    },
    facebookAauthResponse() {
      return this.facebookLoginStatus().then(response => {
        if (response.status === 'connected') {
          return this.facebookPermissionsGranted('publish_actions', response.authResponse)
            .then(granted => {
              if (granted) {
                return response.authResponse;
              } else {
                return this.facebookLogin();
              }
            });
        } else {
          return this.facebookLogin();
        }
      });
    }
  },
  mounted() {
    this.userText = this.text;
  }
};
</script>

<style scoped>
.media {
  flex-wrap: wrap;
  justify-content: center;
}

.image {
  margin-bottom: 1rem;
}

textarea {
  min-height: 128px;
}

.button {
  margin-top: 0.5rem;
}
</style>

