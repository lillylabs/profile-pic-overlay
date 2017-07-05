<template>
  <form>
    <input type="file" name="file" id="file" class="inputfile"></input>
    <label for="file" id="button" class="button is-primary is-medium">
      <span>{{ button.default }}</span>
    </label>
  </form>
</template>

<script>

export default {
  props: ['button'],
  data() {
    return {

    };
  }
};

</script>

<style scoped>
.inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.inputfile:focus+label {
  outline: 1px dotted #000;
  outline: -webkit-focus-ring-color auto 5px;
}
</style>
