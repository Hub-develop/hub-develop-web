<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { site } from '@/content/site'

const scrolled = ref(false)
const open = ref(false)
const route = useRoute()

const onScroll = () => {
  scrolled.value = window.scrollY > 8
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

// 路由变化时收起移动端菜单
watch(
  () => route.path,
  () => (open.value = false),
)
</script>

<template>
  <header class="nav" :class="{ 'nav--scrolled': scrolled, 'nav--open': open }">
    <div class="container nav__inner">
      <RouterLink class="nav__brand" to="/" aria-label="返回首页">
        <span class="nav__logo">{{ site.brand.short }}</span>
        <span class="nav__name">{{ site.brand.name }}</span>
      </RouterLink>

      <nav class="nav__links" aria-label="主导航">
        <RouterLink v-for="n in site.nav" :key="n.to" :to="n.to">{{ n.label }}</RouterLink>
      </nav>

      <a
        class="btn btn--ghost nav__gh"
        :href="site.brand.repo"
        target="_blank"
        rel="noopener"
      >
        GitHub
      </a>

      <button
        class="nav__burger"
        type="button"
        :aria-expanded="open"
        aria-label="切换菜单"
        @click="open = !open"
      >
        <span></span><span></span><span></span>
      </button>
    </div>

    <Transition name="menu">
      <nav v-show="open" class="nav__mobile" aria-label="移动端导航">
        <div class="container">
          <RouterLink v-for="n in site.nav" :key="n.to" :to="n.to">{{ n.label }}</RouterLink>
          <a :href="site.brand.repo" target="_blank" rel="noopener">GitHub ↗</a>
        </div>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 50;
  transition: background 0.22s ease, border-color 0.22s ease;
  border-bottom: 1px solid transparent;
}
.nav--scrolled,
.nav--open {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: saturate(180%) blur(14px);
  border-bottom-color: var(--line);
}
.nav__inner {
  display: flex;
  align-items: center;
  gap: 1.4rem;
  height: var(--nav-h);
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
.nav__links a.router-link-active {
  background: var(--bg-soft);
  border: 1px solid var(--line);
  color: var(--ink);
}
.nav__gh {
  margin-left: auto;
}
.nav__burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  margin-left: auto;
  padding: 8px;
  background: transparent;
  border: 0;
  cursor: pointer;
}
.nav__burger span {
  display: block;
  width: 20px;
  height: 2px;
  border-radius: 2px;
  background: var(--ink);
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.nav--open .nav__burger span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.nav--open .nav__burger span:nth-child(2) {
  opacity: 0;
}
.nav--open .nav__burger span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}
.nav__mobile {
  border-top: 1px solid var(--line);
  padding: 0.6rem 0 1rem;
}
.nav__mobile .container {
  display: flex;
  flex-direction: column;
}
.nav__mobile a {
  padding: 0.7rem 0.2rem;
  font-weight: 650;
  border-bottom: 1px solid var(--line);
}
.nav__mobile a.router-link-active {
  color: var(--accent-ink);
}
.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 720px) {
  .nav__links,
  .nav__gh {
    display: none;
  }
  .nav__burger {
    display: flex;
  }
}
</style>
