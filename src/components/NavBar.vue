<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const scrolled = ref(false)
const onScroll = () => {
  scrolled.value = window.scrollY > 12
}
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="nav" :class="{ 'nav--scrolled': scrolled }">
    <div class="nav__inner">
      <a class="nav__brand" href="#top">
        <span class="nav__logo">HD</span>
        <span class="nav__name">Hub-develop</span>
      </a>
      <nav class="nav__links">
        <a href="#about">关于</a>
        <a href="#projects">项目</a>
        <a class="nav__gh" href="https://github.com/Hub-develop" target="_blank" rel="noopener"
          >GitHub ↗</a
        >
      </nav>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  transition: background 0.2s ease, box-shadow 0.2s ease, backdrop-filter 0.2s ease;
}
.nav--scrolled {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: saturate(180%) blur(12px);
  box-shadow: 0 1px 0 var(--border);
}
.nav__inner {
  max-width: 1080px;
  margin: 0 auto;
  padding: 0.9rem 1.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav__brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 800;
  letter-spacing: -0.01em;
}
.nav__logo {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--primary), var(--primary-2));
  color: #fff;
  font-size: 0.8rem;
  font-weight: 800;
}
.nav__links {
  display: flex;
  align-items: center;
  gap: 1.4rem;
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--text-soft);
}
.nav__links a:hover {
  color: var(--primary);
}
.nav__gh {
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  border: 1px solid var(--border);
}
.nav__gh:hover {
  border-color: var(--primary);
}
@media (max-width: 560px) {
  .nav__links a:not(.nav__gh) {
    display: none;
  }
}
</style>
