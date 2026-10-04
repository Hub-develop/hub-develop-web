<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const scrolled = ref(false)
const active = ref('top')

let io: IntersectionObserver | null = null
const onScroll = () => {
  scrolled.value = window.scrollY > 8
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  const ids = ['top', 'about', 'projects']
  const sections = ids
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => !!el)
  io = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) active.value = visible.target.id
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] },
  )
  sections.forEach((s) => io!.observe(s))
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  io?.disconnect()
})
</script>

<template>
  <header class="nav" :class="{ 'nav--scrolled': scrolled }">
    <div class="container nav__inner">
      <a class="nav__brand" href="#top">
        <span class="nav__logo">HD</span>
        <span class="nav__name">Hub-develop</span>
      </a>
      <nav class="nav__links">
        <a href="#about" :class="{ 'is-active': active === 'about' }">关于</a>
        <a href="#projects" :class="{ 'is-active': active === 'projects' }">核心项目</a>
      </nav>
      <a class="btn btn--ghost nav__gh" href="https://github.com/Hub-develop" target="_blank" rel="noopener">
        GitHub
      </a>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 50;
  transition: background 0.22s ease, border-color 0.22s ease, backdrop-filter 0.22s ease;
  border-bottom: 1px solid transparent;
}
.nav--scrolled {
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: saturate(180%) blur(14px);
  border-bottom-color: var(--line);
}
.nav__inner {
  display: flex;
  align-items: center;
  gap: 1.4rem;
  height: 66px;
}
.nav__brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}
.nav__logo {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: var(--ink);
  color: #fff;
  font-size: 0.78rem;
  font-weight: 800;
}
.nav__links {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-left: 0.5rem;
  font-weight: 600;
  font-size: 0.94rem;
  color: var(--ink-soft);
}
.nav__links a {
  padding: 0.4rem 0.85rem;
  border-radius: 999px;
  transition: background 0.18s ease, color 0.18s ease;
}
.nav__links a:hover {
  color: var(--ink);
}
.nav__links a.is-active {
  background: var(--bg-soft);
  border: 1px solid var(--line);
  color: var(--ink);
  padding: 0.4rem 0.85rem;
}
.nav__gh {
  margin-left: auto;
  padding: 0.5rem 1rem;
  font-size: 0.88rem;
}
@media (max-width: 620px) {
  .nav__links {
    display: none;
  }
}
</style>
