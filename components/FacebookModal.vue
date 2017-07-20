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
          <button v-if="!shared" class="button is-info" @click="share" :class="{ 'is-loading': sharing, 'is-static': !facebook.initialized }">
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

import { mapState, mapMutations } from 'vuex';
import Facebook from '../services/facebook.service';

export default {
  props: [
    'option',
    'text',
    'image'
  ],
  data() {
    return {
      shared: false,
      sharing: false,
      userText: null
    };
  },
  computed: {
    ...mapState({
      facebook: state => state.facebook
    })
  },
  methods: {
    ...mapMutations({
      facebookResponse: 'facebook/response',
      facebookPermissions: 'facebook/permissions'
    }),
    uploadImage() {
      this.sharing = true;
      Facebook.post(this.facebook.authResponse.accessToken, this.image, this.userText)
        .then(response => {
          this.shared = true;
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
          .then(result => {
            this.facebookResponse(result.response);
            this.facebookPermissions(result.permissions);
            this.uploadImage();
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

