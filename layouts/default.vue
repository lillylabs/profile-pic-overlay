<template>
  <div class="app">
    <div class="hero is-fullheight">
  
      <main class="hero-body">
        <div class="container has-text-centered">
          <heading></heading>
          <nuxt></nuxt>
        </div>
      </main>
  
      <div class="hero-foot">
        <navigation></navigation>
      </div>
    </div>
  
    <footer class="footer">
      <about></about>
    </footer>
  </div>
</template>

<script>
import About from '~components/About.vue';
import Heading from '~components/Heading.vue';
import Navigation from '~components/Navigation.vue';

export default {
  components: {
    About,
    Heading,
    Navigation
  }
};

</script>

<style>
.image+form .button,
.image+.button {
  margin-top: 1rem;
}
</style>
