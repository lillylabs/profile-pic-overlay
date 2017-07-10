<template>
  <a class="nav-item" :href="item.href" :title="item.label">
    <span v-if="!item.iconOnly">{{ item.label }}&nbsp;</span>
    <span :class="['icon', item.iconOnly ? '' : 'is-small']">
      <i :class="['fa', item.icon]"></i>
    </span>
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
