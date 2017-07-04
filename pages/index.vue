<template>
  <div class="app">
    <div class="hero is-fullheight">
  
      <main class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-one-third">
              <intro></intro>
            </div>
            <div class="column is-one-quarter" v-for="filter in $store.state.filters">
              <photo :filter="filter"></photo>
            </div>
          </div>
        </div>
      </main>
  
      <div class="hero-foot">
        <div class="container">
          <nav class="nav">
            <navigation class="nav-left" :items="$store.state.nav.left"></navigation>
            <navigation class="nav-center" :items="$store.state.nav.center"></navigation>
            <navigation class="nav-right" :items="$store.state.nav.right"></navigation>
          </nav>
        </div>
      </div>
    </div>
  
    <footer class="footer">
      <about></about>
    </footer>
  </div>
</template>

<script>
import About from '~components/About.vue'
import Intro from '~components/Intro.vue'
import Navigation from '~components/Navigation.vue'
import Photo from '~components/Photo.vue'

export default {
  components: {
    About,
    Photo,
    Intro,
    Navigation
  },
  data: function () {
    return {
      title: '#Campaign'
    }
  }
}
</script>

<style scoped>
.columns {
  align-items: center;
}

.column:first-child {
  margin-left: auto;
}

.column:last-child {
  margin-right: auto;
}
</style>
