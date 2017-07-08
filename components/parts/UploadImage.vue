<template>
  <form>
    <input type="file" name="file" id="file" @change="filesChange($event.target.files)" :disabled="loading"></input>
    <label v-on:click="select" for="file" accept="image/*" id="button" :class="['button', 'is-primary', 'is-medium', loading ? 'is-loading' : '']" :disabled="loading">
      <span>{{ button.default }}</span>
    </label>
  </form>
</template>

<script>

export default {
  props: ['button', 'filterKey', 'avatar'],
  data() {
    return {
      uploadedFile: null,
      test: this.filterKey
    };
  },
  computed: {
    loading() {
      return this.$store.state.uploadedImage.status === 'IN_PROGRESS';
    }
  },
  methods: {
    select: function () {
      this.$store.commit('selectedFilter', this.filterKey);
    },
    filesChange: function (files) {
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
  },
  mounted() {
    console.log('MOUNTED', this.filterKey);
  }
};

</script>

<style scoped>
form {
  text-align: center;
}

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
