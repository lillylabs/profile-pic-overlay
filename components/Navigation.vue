<template>
  <div>
    <a class="nav-item" v-for="item in items" :href="item.href" :title="item.label">
      <span v-if="!item.iconOnly">{{ item.label }}&nbsp;</span>
      <span :class="['icon', item.iconOnly ? '' : 'is-small']">
        <i :class="['fa', item.icon]"></i>
      </span>
    </a>
  </div>
</template>

<script>

export default {
  props: ['items'],
  data: function () {
    return {

    }
  }
}
</script>
