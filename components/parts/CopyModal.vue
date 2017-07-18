<template>
  <div :class="['modal', isActive ? 'is-active': '']">
    <div @click="closeModal" class="modal-background"></div>
    <div class="modal-card">
      <section class="modal-card-body">
        <div class="content">
          <h4>{{ title }}</h4>
          <p>{{ text }}</p>
          <textarea ref="textarea" v-model="text"></textarea>
        </div>
        <button v-on:click.stop="copyText" :class="['button', copied ? 'is-static' : '']" data-clipboard-target="">
          <span v-if="!copied" class="icon is-small">
            <i :class="['fa', button.icon]"></i>
          </span>
          <span>&nbsp;{{ copied ? button.done : button.default }}</span>
        </button>
      </section>
    </div>
    <button class="modal-close is-large"></button>
  </div>
</template>

<script>

export default {
  props: [
    'title',
    'text',
    'button',
    'isActive'
  ],
  data() {
    return {
      copied: false
    };
  },
  methods: {
    closeModal: function () {
      this.$emit('update:isActive', false);
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
</style>

