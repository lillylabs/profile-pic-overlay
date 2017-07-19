<template>
  <div class="app">
    <header class="navbar has-shadow">
      <div class="container">
        <div class="navbar-brand">
          <nuxt-link to="/" class="nav-item">
            <img :src="$store.state.content.title.image" alt="Logo">
          </nuxt-link>
          <nav-item v-for="(item, key) in $store.state.content.nav.some " :key="key" :item="item"></nav-item>
          <nav-item v-for="(item, key) in $store.state.content.nav.about " :key="key" :item="item"></nav-item>
        </div>
      </div>
    </header>
    <div class="hero is-fullheight" :class="'is-'+$store.state.steps.selected">
      <main class="hero-body ">
        <div class="container ">
          <nuxt></nuxt>
        </div>
      </main>
    </div>
    <div class="footer ">
      <nav class="breadcrumb has-arrow-separator is-centered">
        <ul>
          <li v-for="(key, index) in $store.state.steps.keys" :key="key" :class="{ 'is-active': ($store.state.steps.selected === key) }">
            <nuxt-link :to="key === 'index' ? '/' : key">
              <span>{{ index+1 }}. {{ $store.state.content.steps[key].label }}</span>
            </nuxt-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import About from '~components/About.vue';
import Heading from '~components/Heading.vue';
import Navigation from '~components/Navigation.vue';
import NavItem from '~components/parts/NavItem.vue';

export default {
  components: {
    About,
    Heading,
    Navigation,
    NavItem
  }
};

</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  box-shadow: 0 1px 2px rgba(10, 10, 10, 0.1);
  padding: 0.5rem 0;
  height: auto;
  z-index: 1000;
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  box-shadow: 0 -1px 2px rgba(10, 10, 10, 0.1);
  padding: 0.5rem 0;
  z-index: 1000;
}

.hero {
  padding: 65px 0;
}

.nav-item:nth-child(2) {
  margin-left: auto;
}
</style>
