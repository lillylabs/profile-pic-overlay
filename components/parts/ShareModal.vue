<template>
  <div :class="['modal', isActive ? 'is-active': '']">
    <div @click="closeModal" class="modal-background"></div>
    <div class="modal-card">
      <section class="modal-content">
        <div class="box has-text-left">
          <h1 class="title is-5">{{ option.title }}</h1>
          <ol>
            <li v-if="isDesktop">
              <h2>
                <button v-on:click.stop="downloadImage " class="button is-small">
                  <span class="icon is-small">
                    <i :class="[ 'fa', save.icon] "></i>
                  </span>
                  <span>&nbsp;{{ save.title }}</span>
                </button>
                <span v-show="downloaded" class="button is-static is-small">
                  <span class="icon is-small">
                    <i class="fa fa-check"></i>
                  </span>
                </span>
              </h2>
            </li>
            <li v-if="!isDesktop">
              <h2>
                {{ save.title }}
                <span v-show="downloaded" class="button is-static is-small">
                  <span class="icon is-small">
                    <i class="fa fa-check"></i>
                  </span>
                </span>
              </h2>
              <p>{{ save.instructions }}</p>
              <p class="image is-128x128" v-on:mouseup="downloaded = true">
                <img :src="image"></img>
              </p>
            </li>
            <li>
              <h2>
                <button v-on:click.stop="copyText" class="button is-small">
                  <span class="icon is-small">
                    <i :class="[ 'fa', suggestion.icon] "></i>
                  </span>
                  <span>&nbsp;{{ suggestion.title }}</span>
                </button>
                <span v-show="copied" class="button is-static is-small">
                  <span class="icon is-small">
                    <i class="fa fa-check"></i>
                  </span>
                </span>
              </h2>
              <p>{{ suggestion.text }}</p>
            </li>
            <li>
              <h2>
                <a @click="shareImage" class="button is-small">
                  <span class="icon is-small">
                    <i :class="[ 'fa', option.icon]"></i>
                  </span>
                  <span>&nbsp;{{ option.title }}</span>
                </a>
                <span v-show="shared" class="button is-static is-small">
                  <span class="icon is-small">
                    <i class="fa fa-check"></i>
                  </span>
                </span>
              </h2>
              <p>{{ option.instructions }}</p>
            </li>
          </ol>
          <textarea ref="textarea" v-model="suggestion.text"></textarea>
        </div>
      </section>
      <button @click="closeModal" class="modal-close is-large"></button>
    </div>
  </div>
</template>

<script>

const Download = require('downloadjs');

export default {
  props: [
    'option',
    'image',
    'save',
    'suggestion',
    'isActive',
    'isDesktop'
  ],
  data() {
    return {
      copied: false,
      shared: false,
      downloaded: false
    };
  },
  methods: {
    closeModal: function () {
      this.$emit('update:isActive', false);
      this.copied = false;
      this.shared = false;
      this.downloaded = false;
    },
    downloadImage() {
      Download(this.image, this.save.fileName + '.jpeg', 'image/jpeg');
      this.downloaded = true;
    },
    copyText: function () {
      console.log(this.$refs.textarea);
      this.$refs.textarea.select();
      try {
        this.copied = document.execCommand('copy');
        var msg = this.copied ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
      } catch (err) {
        console.log('Oops, unable to copy');
      }
      this.$refs.textarea.blur();
    },
    shareImage: function () {
      console.log(this.option.url);
      setTimeout(() => {
        window.open(this.option.url.web, '_blank');
      }, 25);
      window.open(this.option.url.app, '_self');
      this.shared = true;
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

