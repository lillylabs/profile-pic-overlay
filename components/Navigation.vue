<template>
  <div class="container">
    <nav class="nav">
      <div v-for="(menu, key) in $store.state.content.nav" :key="key" :class="'nav-' + key">
        <nav-item v-for="(item, key) in menu" :key="key" :item="item"></nav-item>
      </div>
    </nav>
  </div>
</template>

<script>
import NavItem from '~components/parts/NavItem.vue';

export default {
  components: {
    NavItem
  },
  data() {
    return {

    };
  }
};
</script>

<style scoped>

</style>
