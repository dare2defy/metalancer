<script setup lang="ts">
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
</script>

<template>
  <TheHeader />

  <main class="app-main">
    <router-view />
  </main>

  <TheFooter />
</template>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.app-main {
  flex: 1;
}
</style>
