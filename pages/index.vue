<template>
  <div class="app">
    <div class="hero is-fullheight">
  
      <main class="hero-body">
        <hero-body></hero-body>
      </main>
  
      <div class="hero-foot">
        <hero-foot></hero-foot>
      </div>
    </div>
  
    <footer class="footer">
      <about></about>
    </footer>
  </div>
</template>

<script>
import About from '~components/About.vue'
import HeroBody from '~components/HeroBody.vue'
import HeroFoot from '~components/HeroFoot.vue'

export default {
  components: {
    About,
    HeroBody,
    HeroFoot
  }
}
</script>

<style scoped>

</style>
