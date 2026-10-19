<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)

// 顶级域名的悬浮球：收起时只剩左下角小圆钮，展开后列出子域名
const links = [
  { label: 'xlord', sub: '个人核心站', href: 'https://xlord.hub-develop.top' },
  { label: 'code', sub: '社区门户', href: 'https://code.hub-develop.top' },
  { label: 'GitHub', sub: 'Hub-develop', href: 'https://github.com/Hub-develop' },
]
</script>

<template>
  <div class="fab">
    <transition name="fab">
      <div v-if="open" class="fab-panel">
        <p class="fab-title">子域名</p>
        <a
          v-for="l in links"
          :key="l.href"
          class="fab-item"
          :href="l.href"
          target="_blank"
          rel="noopener"
          @click="open = false"
        >
          <span class="fab-item__name">{{ l.label }}</span>
          <span class="fab-item__sub">{{ l.sub }}</span>
        </a>
      </div>
    </transition>
    <button
      class="fab-btn"
      type="button"
      :aria-expanded="open"
      :aria-label="open ? '收起链接' : '展开子域名链接'"
      @click="open = !open"
    >
      <svg v-if="!open" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>
      <svg v-else viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
    </button>
  </div>
</template>

<style scoped>
.fab {
  position: fixed;
  left: 1.25rem;
  bottom: 1.25rem;
  z-index: 30;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
}
.fab-panel {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 0.7rem;
  min-width: 188px;
  background: rgba(18, 20, 29, 0.82);
  border: 1px solid var(--line-strong);
  border-radius: 16px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
}
.fab-title {
  font-family: var(--mono);
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
  margin: 0 0 0.2rem 0.2rem;
}
.fab-item {
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0.7rem;
  border-radius: 10px;
  transition: background 0.16s ease, transform 0.16s ease;
}
.fab-item:hover {
  background: var(--accent-soft);
  transform: translateX(2px);
}
.fab-item__name {
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--ink);
}
.fab-item__sub {
  font-size: 0.75rem;
  color: var(--muted);
}
.fab-btn {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 1px solid var(--line-strong);
  background: rgba(18, 20, 29, 0.82);
  color: var(--accent);
  cursor: pointer;
  display: grid;
  place-items: center;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.45);
  transition: transform 0.18s ease, border-color 0.18s ease, color 0.18s ease;
}
.fab-btn:hover {
  transform: scale(1.06);
  border-color: var(--accent);
  color: var(--ink);
}
.fab-enter-active,
.fab-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}
.fab-enter-from,
.fab-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
