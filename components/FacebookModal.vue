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
          <textarea class="textarea" v-model="userText" :disabled="sharing || shared"></textarea>
        </p>
        <div class="actions">
          <button v-if="!shared" class="button is-info" @click="share" :class="{ 'is-loading': sharing }">
            <span>{{ option.submit }}</span>
          </button>
          <button v-if="shared" class="button is-static" @click="share">
            <span class="icon is-small" v-if="shared">
              <i class="fa fa-check"></i>
            </span>
            <span>{{ option.done }}</span>
          </button>
        </div>
      </div>
    </div>
  </article>
</template>

<script>

import Facebook from '../services/facebook.service';

export default {
  props: [
    'option',
    'text',
    'image',
    'facebook'
  ],
  data() {
    return {
      shared: false,
      sharing: false,
      userText: null
    };
  },
  computed: {

  },
  methods: {
    uploadImage(authResponse) {
      this.sharing = true;
      console.log('response', authResponse);
      console.log('facebook', this.facebook);
      const accessToken = authResponse ? authResponse.accessToken : this.facebook.authResponse.accessToken;
      Facebook.post(accessToken, this.image, this.userText)
        .then(response => {
          this.shared = true;
          console.log(response);
        })
        .catch(error => {
          this.sharing = false;
          console.log(error);
        });
    },
    share() {
      if (this.facebook.connected && this.facebook.publishActions) {
        this.uploadImage();
      } else {
        Facebook.login('publish_actions')
          .then(response => {
            this.uploadImage(response);
          })
          .catch(error => {
            console.log(error);
          });
      };
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

.actions {
  margin-top: 0.5rem;
}

.field {
  position: relative;
}
</style>

