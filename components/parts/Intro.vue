<template>
  <div>
    <header>
      <h1 v-if="title.image" class="title">
        <img class="logo" :src="title.image" :title="title.text"></img>
      </h1>
      <h1 v-else class="title">
        {{ title.text || title }}
      </h1>
      <h2 v-if="subtitle" class="subtitle">{{ subtitle }}</h2>
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

.title:not(.is-spaced)+.subtitle {
  margin-top: -0.75rem;
}

.content {
  margin-top: 1rem;
  margin-bottom: 2rem;
}

.logo {
  max-height: 50px;
}
</style>
