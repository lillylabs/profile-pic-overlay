<template>
  <form>
    <input type="file" name="file" id="file" @change="filesChange($event.target.files)" :disabled="loading"></input>
    <label for="file" accept="image/*" id="button" :class="['button', 'is-primary', 'is-medium', loading ? 'is-loading' : '']" :disabled="loading">
      <span>{{ button.default }}</span>
    </label>
  </form>
</template>

<script>

export default {
  props: ['button'],
  data() {
    return {
      uploadedFile: null
    };
  },
  computed: {
    loading() {
      return this.$store.state.uploadedImage.status === 'IN_PROGRESS';
    }
  },
  methods: {

    filesChange(files) {
      // handle file changes
      var file = files ? files[0] : null;

      if (!file) {
        this.$store.commit('uploadError', new Error('No file'));
        return;
      }

      if (!file.type.match('image.*')) {
        this.$store.commit('uploadError', new Error('File is not an image'));
        return;
      }

      this.$store.dispatch('uploadFile', file);
    }
  }
};

</script>

<style scoped>
input {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

input:focus+label {
  outline: 1px dotted #000;
  outline: -webkit-focus-ring-color auto 5px;
}
</style>
