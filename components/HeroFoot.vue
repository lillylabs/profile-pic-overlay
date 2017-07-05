<template>
  <div class="container">
    <nav class="nav">
      <navigation class="nav-left" :items="$store.state.content.nav.left"></navigation>
      <navigation class="nav-center" :items="$store.state.content.nav.center"></navigation>
      <navigation class="nav-right" :items="$store.state.content.nav.right"></navigation>
    </nav>
  </div>
</template>

<script>
import Navigation from '~components/parts/Navigation.vue';

export default {
  components: {
    Navigation
  },
  data() {
    return {

    };
  }
};
</script>

<style scoped>

</style>
