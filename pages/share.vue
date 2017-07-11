<template>
  <div class="columns">
    <div class="column">
      <photo :image="image" :title="'Title'"></photo>
      <nuxt-link class="button" to="/">
        <span class="icon is-small">
          <i class="fa fa-chevron-left"></i>
        </span>
        <span>{{ upload.new }}</span>
      </nuxt-link>
      <span @click="showModal">
        <download class="button" :button="download" :image="image"></download>
      </span>
    </div>
    <div @click="closeModal" :class="['modal', modal ? 'is-active': '']">
      <div class="modal-background"></div>
      <div class="modal-card">
        <section class="modal-card-body">
          <div class="content">
            <h4>{{ share.suggestion.title }}</h4>
            <p>{{ share.suggestion.text }}</p>
            <textarea ref="textarea" v-model="share.suggestion.text"></textarea>
          </div>
          <button v-on:click.stop="copyText" :class="['button', copied ? 'is-static' : '']" data-clipboard-target="">
            <span v-if="!copied" class="icon is-small">
              <i :class="['fa', share.copy.icon]"></i>
            </span>
            <span>&nbsp;{{ copied ? share.copy.done : share.copy.default }}</span>
          </button>
        </section>
      </div>
      <button class="modal-close is-large"></button>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex';

import Photo from '~components/parts/Photo.vue';
import Download from '~components/parts/Download.vue';

export default {
  components: {
    Photo,
    Download
  },
  data() {
    return {
      modal: false,
      copied: false
    };
  },
  computed: {
    ...mapState({
      image: state => state.images.uploaded.filtered,
      download: state => state.content.buttons.download,
      upload: state => state.content.buttons.upload,
      share: state => state.content.share
    })
  },
  methods: {
    showModal: function () {
      this.modal = true;
      this.copied = false;
    },
    closeModal: function () {
      this.modal = false;
      this.copied = false;
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
    }
  },
  fetch({ store, redirect }) {
    if (!store.state.images.uploaded.original) {
      return redirect('/');
    }
  }
};
</script>

<style scoped>
.columns {
  justify-content: center;
}

.column:last-child {
  text-align: left;
}

.content {
  margin-top: 1em;
}

textarea {
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
}

@media screen and (min-width: 769px) {
  .column {
    max-width: 45vh;
    min-width: 20rem;
  }
}
</style>
