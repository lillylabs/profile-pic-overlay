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
          <nuxt-link class="nav-item" :to="item.href" v-for="(item, key) in $store.state.content.nav.internal " :key="key" :item="item">
            <span v-if="item.icon" class="icon">
              <i :class="['fa', item.icon]"></i>
            </span>
            <span vs </nuxt-link>
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
          <li v-for="(key, index) in $store.state.steps.keys" :key="key" :class="{ 'is-active': $store.state.steps.selected === key, 'is-static': isStatic(key) }">
            <nuxt-link :to="key === 'index' ? '/' : key">
              {{ index+1 }}.&nbsp;
              <span>{{ $store.state.content.steps[key].label }}</span>
            </nuxt-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import NavItem from '~/components/NavItem.vue';

export default {
  components: {
    NavItem
  },
  methods: {
    isStatic(key) {
      return (key === 'edit' && !this.$store.state.image) || (key === 'share' && !this.$store.state.filteredImage);
    }
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

.navbar-brand {
  width: 100%;
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  box-shadow: 0 -1px 2px rgba(10, 10, 10, 0.1);
  padding: 0.5rem 0;
  z-index: 1000;
}

.is-active {
  font-weight: bold;
}

.is-static {
  pointer-events: none;
  opacity: 0.5;
}

.hero {
  padding: 65px 0;
}

.nav-item:nth-child(2) {
  margin-left: auto;
}
</style>
