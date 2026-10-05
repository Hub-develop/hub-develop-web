<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { LOCALES, locale, setLocale, type Locale } from '@/i18n'

const open = ref(false)
const root = ref<HTMLElement | null>(null)

function choose(code: Locale) {
  setLocale(code)
  open.value = false
}

function onDocClick(e: MouseEvent) {
  if (root.value && !root.value.contains(e.target as Node)) open.value = false
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') open.value = false
}

onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKey)
})
</script>

<template>
  <div ref="root" class="lang" :class="{ 'lang--open': open }">
    <button
      type="button"
      class="lang__btn"
      :aria-expanded="open"
      aria-haspopup="listbox"
      aria-label="语言 / Language"
      @click="open = !open"
    >
      <svg
        class="lang__globe"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.6"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3c2.6 2.7 2.6 15.3 0 18M12 3c-2.6 2.7-2.6 15.3 0 18" />
      </svg>
      <span class="lang__current">{{ LOCALES.find((l) => l.code === locale)?.native }}</span>
      <span class="lang__caret" aria-hidden="true">▾</span>
    </button>

    <Transition name="lang-pop">
      <ul v-show="open" class="lang__menu" role="listbox" aria-label="选择语言 / Select language">
        <li
          v-for="l in LOCALES"
          :key="l.code"
          role="option"
          :aria-selected="l.code === locale"
        >
          <button
            type="button"
            class="lang__item"
            :class="{ 'is-on': l.code === locale }"
            @click="choose(l.code)"
          >
            {{ l.native }}
          </button>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style scoped>
.lang {
  position: relative;
}
.lang__btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  height: 34px;
  padding: 0 0.62rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--bg-soft);
  color: var(--ink);
  font: inherit;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.16s ease, background 0.16s ease;
}
.lang__btn:hover {
  border-color: var(--accent);
}
.lang__globe {
  color: var(--ink-soft);
  flex: none;
}
.lang__current {
  white-space: nowrap;
}
.lang__caret {
  font-size: 0.7rem;
  color: var(--ink-soft);
  transition: transform 0.18s ease;
}
.lang--open .lang__caret {
  transform: rotate(180deg);
}
.lang__menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 148px;
  margin: 0;
  padding: 0.3rem;
  list-style: none;
  background: rgba(10, 11, 16, 0.96);
  border: 1px solid var(--line);
  border-radius: 12px;
  backdrop-filter: blur(14px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.45);
  z-index: 60;
}
.lang__item {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.5rem 0.7rem;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--ink);
  font: inherit;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.14s ease;
}
.lang__item:hover {
  background: var(--bg-soft);
}
.lang__item.is-on {
  color: var(--accent);
}
.lang-pop-enter-active,
.lang-pop-leave-active {
  transition: opacity 0.16s ease, transform 0.16s ease;
}
.lang-pop-enter-from,
.lang-pop-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
