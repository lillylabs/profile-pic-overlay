<template>
  <div class="intro">
    <header>
      <h1 class="title">{{ $store.state.title }}</h1>
      <h2 class="subtitle">{{ $store.state.subtitle }}</h2>
    </header>
    <div class="content">
      {{ $store.state.prompt }}
    </div>
    <form>
      <input type="file" name="file" id="file" class="inputfile"></input>
      <label for="file" id="button" class="button is-primary is-medium">
        <span>{{ $store.state.buttons.upload.default }}</span>
      </label>
    </form>
  </div>
</template>

<script>

export default {
  data: function () {
    return {

    }
  }
}
</script>

<style scoped>
.title {
  font-weight: bold;
}

.content {
  margin-top: 1.5rem;
  margin-bottom: 2rem;
}

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
