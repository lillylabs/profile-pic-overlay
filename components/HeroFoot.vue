<template>
  <div class="container">
    <nav class="nav">
      <navigation class="nav-left" :items="$store.state.nav.left"></navigation>
      <navigation class="nav-center" :items="$store.state.nav.center"></navigation>
      <navigation class="nav-right" :items="$store.state.nav.right"></navigation>
    </nav>
  </div>
</template>

<script>
import Navigation from '~components/parts/Navigation.vue'

export default {
  components: {
    Navigation
  },
  data: function () {
    return {

    }
  }
}
</script>

<style scoped>

</style>
