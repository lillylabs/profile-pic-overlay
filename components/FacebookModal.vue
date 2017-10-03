<template>
  <div :class="['modal', isActive ? 'is-active': '']">
    <div class="modal-background" @click="close"></div>
    <div class="modal-content has-text-centered">
      <h1 class="title">{{ option.label }}</h1>
      <ol>
        <li>
          <p class="image is-128x128">
            <img :src="image"></img>
          </p>
        </li>
        <li>
          <h2 v-show="supported.clipboard">
            <button ref="copyButton" class="button is-small" :data-clipboard-text="suggestion.text">
              <span class="icon is-small">
                <i :class="[ 'fa', suggestion.icon] "></i>
              </span>
              <span>&nbsp;{{ suggestion.title }}</span>
            </button>
            <div v-show="status.copied" class="button is-small is-static">
              <span class="icon is-small">
                <i class="fa fa-check"></i>
              </span>
            </div>
          </h2>
          <h2 v-show="!supported.clipboard">
            {{ suggestion.title }}
          </h2>
          <p class="text">{{ suggestion.text }}</p>
        </li>
        <li>
          <hr/>
          <p class="text">{{ suggestion.instruction }}</p>
          <textarea class="textarea" v-model="text" :disabled="status.sharing || status.shared"></textarea>
          <button v-show="!status.shared" class="button is-info" @click="share" :class="{ 'is-loading': status.sharing, 'is-static': !facebook.initialized }">
            <span>{{ option.submit }}</span>
          </button>
          <button v-show="status.shared" class="button is-static" @click="share">
            <span>{{ option.done }}</span>
            <span class="icon is-small" v-show="status.shared">
              <i class="fa fa-check"></i>
            </span>
          </button>
        </li>
      </ol>

      <button @click="close" class="modal-close is-large"></button>
    </div>
  </div>
</template>

<script>

const Clipboard = require('clipboard');

import { mapState, mapMutations } from 'vuex';
import Facebook from '../services/facebook.service';

export default {
  props: [
    'option',
    'suggestion',
    'image',
    'isActive'
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
    close() {
      this.$emit('close');
      this.status = {};
    },
    uploadImage() {
      this.setStatus('sharing', true);
      Facebook.post(this.facebook.authResponse.accessToken, this.image, this.text)
        .then(response => {
          this.setStatus('sharing', false);
          this.setStatus('shared', true);
        })
        .catch(error => {
          this.setStatus('sharing', false);
          console.error('Facebook post', error);
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
            console.error('Facebook login', error);
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
p {
  font-size: 0.8rem;
  margin: 0.5rem auto;
}

ol {
  list-style: none;
}

hr {
  margin: 0 auto;
  margin-bottom: 1rem;
  max-width: 4rem;
}

li:not(:last-child) {
  margin-bottom: 1.5rem;
}

li:not(:last-child) p {
  max-width: 19rem;
  margin-bottom: 0.75rem;
}

.columns {
  margin-bottom: 0;
}

textarea {
  height: 100%;
  text-align: center;
  margin-bottom: 1rem;
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
</style>

