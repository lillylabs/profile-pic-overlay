<template>
  <div>
    <header>
      <h1 class="title">{{ title }}</h1>
      <h2 class="subtitle">{{ subtitle }}</h2>
    </header>
    <div class="content">
      {{ content }}
    </div>
  </div>
</template>

<script>

export default {
  props: ['title', 'subtitle', 'content'],
  data() {
    return {

    };
  }
};

</script>

<style scoped>
.title {
  font-weight: bold;
}

.content {
  margin-top: 1.5rem;
  margin-bottom: 2rem;
}
</style>
