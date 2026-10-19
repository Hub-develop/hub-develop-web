<script setup lang="ts">
import { onMounted } from 'vue'
import TimeLight from './TimeLight.vue'
import LinkFab from './LinkFab.vue'

onMounted(() => {
  document.title = 'Hub-develop'
})
</script>

<template>
  <div class="core">
    <TimeLight />
    <div class="core__center">
      <p class="core__kicker">// hub-develop.top</p>
      <h1 class="core__title">Hub-develop</h1>
      <p class="core__tagline">以开源之名，构建连接人、AI 与操作系统的门户。</p>
    </div>
    <LinkFab />
  </div>
</template>

<style scoped>
.core {
  position: relative;
  min-height: 100vh;
  display: grid;
  place-items: center;
  overflow: hidden;
  isolation: isolate;
}
.core__center {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 0 1.5rem;
}
.core__kicker {
  font-family: var(--mono);
  font-size: 0.85rem;
  letter-spacing: 0.16em;
  color: var(--accent);
  margin-bottom: 0.9rem;
}
.core__title {
  font-size: clamp(3rem, 11vw, 7rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 0.95;
  color: var(--ink);
  text-shadow: 0 8px 40px rgba(111, 238, 194, 0.18);
}
.core__tagline {
  margin-top: 1.4rem;
  font-size: clamp(1rem, 2.4vw, 1.25rem);
  color: var(--ink-soft);
  max-width: 30ch;
  margin-left: auto;
  margin-right: auto;
}
</style>
