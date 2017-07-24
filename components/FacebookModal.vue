<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-square">
        <img :src="image">
      </p>
    </figure>
    <div class="media-content">
      <div v-show="!status.entry && supported.clipboard">
        <h3>{{ suggestion.label }}</h3>
        <p>{{ suggestion.text }}</p>
        <div class="actions">
          <button ref="copyButton" @click="setStatus('entry')" class="button is-info" :data-clipboard-text="suggestion.text">
            <span class="icon is-small">
              <i :class="[ 'fa', suggestion.icon] "></i>
            </span>
            <span>&nbsp;{{ suggestion.title }}</span>
          </button>
          <button @click="setStatus('entry')" class="button is-small is-link" :data-clipboard-text="suggestion.text">
            <span>{{ suggestion.alternative }}</span>
          </button>
        </div>
      </div>
      <div v-show="!status.entry && !supported.clipboard">
        <h3>{{ suggestion.title }}</h3>
        <p>{{ suggestion.text }}</p>
        <div class="actions">
          <button @click="setStatus('entry')" class="button is-info">
            <span>{{ suggestion.continue }}</span>
          </button>
        </div>
      </div>
      <div v-show="status.entry">
        <p>{{ this.instructions }}</p>
        <textarea class="textarea" v-model="text" :disabled="status.sharing || status.shared"></textarea>
        <div class="actions">
          <button v-show="!status.shared" class="button is-info" @click="share" :class="{ 'is-loading': status.sharing, 'is-static': !facebook.initialized }">
            <span>{{ option.submit }}</span>
          </button>
          <button v-show="!status.shared && !status.sharing" class="button is-small is-link" @click="reset">
            <span>{{ option.cancel }}</span>
          </button>
          <button v-show="status.shared" class="button is-static" @click="share">
            <span class="icon is-small" v-show="status.shared">
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

const Clipboard = require('clipboard');

import { mapState, mapMutations } from 'vuex';
import Facebook from '../services/facebook.service';

export default {
  props: [
    'option',
    'suggestion',
    'image'
  ],
  data() {
    return {
      text: null,
      supported: {},
      status: {
        copied: false,
        entry: false,
        shared: false,
        sharing: false
      }
    };
  },
  computed: {
    ...mapState({
      facebook: state => state.facebook
    }),
    instructions() {
      if (this.supported.clipboard) {
        return this.status.copied ? this.suggestion.instructions.copied : this.suggestion.instructions.custom;
      } else {
        return this.suggestion.instructions.default;
      }
    }
  },
  methods: {
    ...mapMutations({
      facebookResponse: 'facebook/response',
      facebookPermissions: 'facebook/permissions'
    }),
    uploadImage() {
      this.setStatus('sharing', true);
      Facebook.post(this.facebook.authResponse.accessToken, this.image, this.text)
        .then(response => {
          this.setStatus('sharing', false);
          this.setStatus('shared', true);
        })
        .catch(error => {
          this.setStatus('sharing', false);
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
    },
    reset() {
      this.status = {};
      this.text = null;
    },
    setStatus(key, status = true) {
      this.$set(this.status, key, status);
    },
    initClipboard() {
      console.log('clipboard', this.$refs.copyButton);
      this.clipboard = new Clipboard(this.$refs.copyButton);
      this.clipboard.on('success', e => {
        this.setStatus('copied');
        e.clearSelection();
      });
    }
  },
  mounted() {
    if (Clipboard.isSupported()) {
      this.$set(this.supported, 'clipboard', true);
      this.initClipboard();
    } else {
      this.$set(this.supported, 'clipboard', false);
    }
  }
};
</script>

<style scoped>
@media screen and (max-width: 768px) {
  .media {
    flex-wrap: wrap;
    justify-content: center;
  }
}

.media-left {
  flex-basis: 30%;
}

p {
  font-size: 0.8rem;
  margin: 0.5rem;
  max-width: 19rem;
}

.image {
  margin-bottom: 1rem;
}

.actions {
  margin-top: 1rem;
}

.block {
  margin: -0.25rem;
  margin-top: 0.75rem;
  justify-content: center;
  display: flex;
}

.block .button {
  margin: 0.25rem;
}

.field {
  position: relative;
}

textarea+button {
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>

