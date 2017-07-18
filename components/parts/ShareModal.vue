<template>
  <div :class="['modal', isActive ? 'is-active': '']">
    <div @click="closeModal" class="modal-background"></div>
    <div class="modal-content">
      <div class="box has-text-left">
        <h1 class="title is-5">{{ option.title }}</h1>
        <ol>
          <li v-if="hasFilesystem">
            <h2>
              <button @click="downloadImage " class="button is-small">
                <span class="icon is-small">
                  <i :class="[ 'fa', save.icon] "></i>
                </span>
                <span>&nbsp;{{ save.title }}</span>
              </button>
              <span v-show="status.downloaded" class="button is-static is-small">
                <span class="icon is-small">
                  <i class="fa fa-check"></i>
                </span>
              </span>
            </h2>
          </li>
          <li v-if="!hasFilesystem">
            <h2>
              {{ save.title }}
              <span v-show="status.downloaded" class="button is-static is-small">
                <span class="icon is-small">
                  <i class="fa fa-check"></i>
                </span>
              </span>
            </h2>
            <p>{{ save.instructions }}</p>
            <p class="image is-128x128" v-on:mouseup="status.downloaded = true" v-on:touchend="status.downloaded = true">
              <img :src="image"></img>
            </p>
          </li>
          <li>
            <h2>
              <button ref="copyButton" class="button is-small" data-clipboard-target=".text">
                <span class="icon is-small">
                  <i :class="[ 'fa', suggestion.icon] "></i>
                </span>
                <span>&nbsp;{{ suggestion.title }}</span>
              </button>
              <span v-show="status.copied" class="button is-static is-small">
                <span class="icon is-small">
                  <i class="fa fa-check"></i>
                </span>
              </span>
              <small v-if="message.copy">{{ message.copy }}</small>
            </h2>
            <p class="text">{{ suggestion.text }}</p>
          </li>
          <li>
            <h2>
              <a @click="shareImage" class="button is-small">
                <span class="icon is-small">
                  <i :class="[ 'fa', option.icon]"></i>
                </span>
                <span>&nbsp;{{ option.title }}</span>
              </a>
              <span v-show="status.shared" class="button is-static is-small">
                <span class="icon is-small">
                  <i class="fa fa-check"></i>
                </span>
              </span>
            </h2>
            <p>{{ option.instructions }}</p>
          </li>
        </ol>
      </div>
    </div>
    <button @click="closeModal" class="modal-close is-large"></button>
  </div>
</template>

<script>

const Clipboard = require('clipboard');
const Download = require('downloadjs');

export default {
  props: [
    'option',
    'image',
    'save',
    'suggestion',
    'isActive',
    'hasFilesystem'
  ],
  data() {
    return {
      message: {},
      status: {}
    };
  },
  methods: {
    closeModal() {
      this.$emit('update:isActive', false);
      this.status = {};
      this.message = {};
    },
    downloadImage(e) {
      console.log(e);
      Download(this.image, this.save.fileName + '.jpeg', 'image/jpeg');
      this.$set(this.status, 'downloaded', true);
    },
    shareImage(e) {
      console.log(this.option.url);
      setTimeout(() => {
        window.open(this.option.url.web, '_blank');
      }, 25);
      window.open(this.option.url.app, '_self');
      this.$set(this.status, 'shared', true);
    }
  },
  mounted() {
    const clipboard = new Clipboard(this.$refs.copyButton);

    clipboard.on('success', e => {
      this.$set(this.status, 'copied', true);
      e.clearSelection();
    });

    clipboard.on('error', e => {
      this.$set(this.message, 'copy', 'Please manually copy selected text');
      console.log('Clipboard unsucessful', e);
    });
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
  margin-left: 2rem;
}

p {
  font-size: 0.8rem;
  margin: 0.5rem 0;
}

li:not(:last-child) {
  margin-bottom: 1.5rem;
}
</style>

