<template>
  <header>
    <h1 v-if="title.image" class="title">
      <img class="logo" :src="title.image" :title="title.text"></img>
    </h1>
    <h1 v-else class="title">
      {{ title.text || title }}
    </h1>
    <h2 v-if="subtitle" class="subtitle">{{ subtitle }}</h2>
    <div class="content">
      {{ content }}
    </div>
  </header>
</template>

<script>

export default {
  data() {
    return {
      title: this.$store.state.content.title,
      subtitle: this.$store.state.content.subtitle,
      content: this.$store.state.content.intro
    };
  }
};

</script>

<style scoped>
.title {
  font-weight: bold;
}

.subtitle {
  margin-bottom: 0.5rem;
}

.content {
  margin-bottom: 2rem;
}

.logo {
  max-width: 100%;
  max-height: 120px;
  margin-bottom: -1%;
  margin-left: -2%;
}
</style>
