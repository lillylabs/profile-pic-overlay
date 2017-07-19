<template>
  <a class="nav-item" :href="item.href" :title="item.label">
    <span class="icon">
      <i :class="['fa', item.icon]"></i>
    </span>
    <span v-if="!item.iconOnly">{{ item.label }}&nbsp;</span>
  </a>
</template>

<script>

export default {
  props: ['item'],
  data() {
    return {

    };
  }
};
</script>
