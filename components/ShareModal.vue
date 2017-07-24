<template>
  <div class="has-text-centered">
    <ol>
      <li v-show="supported.filesystem">
        <h2>
          <button @click="downloadImage " class="button is-small">
            <span class="icon is-small">
              <i :class="[ 'fa', save.icon] "></i>
            </span>
            <span>&nbsp;{{ save.title }}</span>
          </button>
          <div v-show="status.downloaded" class="button is-small is-static">
            <span class="icon is-small">
              <i class="fa fa-check"></i>
            </span>
          </div>
        </h2>
      </li>
      <li v-show="!supported.filesystem">
        <h2>
          {{ save.title }}
        </h2>
        <p>{{ save.instructions }}</p>
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
      <li v-show="option">
        <h2 v-show="option.url">
          <button @click="shareImage" class="button is-small">
            <span class="icon is-small">
              <i :class="[ 'fa', option.icon]"></i>
            </span>
            <span>&nbsp;{{ option.title }}</span>
          </button>
          <div v-show="status.shared" class="button is-small is-static">
            <span class="icon is-small">
              <i class="fa fa-check"></i>
            </span>
          </div>
        </h2>
        <h2 v-show="!option.url">
          {{ option.title }}
        </h2>
        <p>{{ option.instructions }}</p>
      </li>
    </ol>
  </div>
</template>

<script>
/* globals Modernizr */

const Clipboard = require('clipboard');
const Download = require('downloadjs');

export default {
  props: [
    'option',
    'image',
    'save',
    'suggestion'
  ],
  data() {
    return {
      status: {},
      supported: {
        clipboard: true
      }
    };
  },
  computed: {
    title() {
      return this.option ? this.option.title : this.save.title;
    }
  },
  methods: {
    closeModal() {
      this.$emit('update:isActive', false);
      this.status = {};
    },
    downloadImage(error) {
      console.log(error);
      Download(this.image, this.save.fileName + '.jpeg', 'image/jpeg');
      this.setStatus('downloaded');
    },
    setStatus(key) {
      this.$set(this.status, key, true);
    },
    shareImage(e) {
      setTimeout(() => {
        window.open(this.option.url.web, '_blank');
      }, 25);
      window.open(this.option.url.app, '_self');
      this.setStatus('shared');
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
    if (Modernizr.adownload) {
      this.$set(this.supported, 'filesystem', true);
    } else {
      this.$set(this.supported, 'filesystem', false);
    }
  }
};
</script>

<style scoped>
textarea {
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
}

ol {
  margin-left: 1rem;
  list-style: none;
}

p {
  font-size: 0.8rem;
  margin: 0.5rem auto;
  max-width: 19rem;
}

li:not(:last-child) {
  margin-bottom: 1.5rem;
}
</style>

