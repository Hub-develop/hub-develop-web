<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import type { Project } from '@/content/site'
import { statusMeta } from '@/content/projects'
import { relativeTime } from '@/utils/format'
import { t } from '@/i18n/ui'

defineProps<{ project: Project }>()
const emit = defineEmits<{ (e: 'dismiss'): void }>()

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('dismiss')
}

onMounted(() => {
  document.documentElement.style.overflow = 'hidden'
  window.addEventListener('keydown', onKey)
})
onUnmounted(() => {
  document.documentElement.style.overflow = ''
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <div class="overlay" @click.self="emit('dismiss')">
    <div class="detail" role="dialog" aria-modal="true" :aria-label="project.name">
      <button class="detail__close" type="button" aria-label="关闭" @click="emit('dismiss')">
        ✕
      </button>

      <div class="detail__head">
        <span class="tag tag--accent">{{ project.tag }}</span>
        <span class="badge" :class="'badge--' + project.status">
          <span class="badge__dot"></span>{{ statusMeta[project.status].label }}
        </span>
      </div>

      <h3 class="detail__name">{{ project.name }}</h3>
      <p class="detail__summary">{{ project.summary }}</p>

      <div class="detail__meta">
        <span v-if="project.github.language" class="detail__lang">{{ project.github.language }}</span>
        <span v-if="project.github.stars > 0">★ {{ project.github.stars }}</span>
        <span class="detail__upd">{{ t('card.updated') }} {{ relativeTime(project.github.pushedAt) }}</span>
        <span v-if="project.github.license">· {{ project.github.license }}</span>
      </div>

      <ul v-if="project.description.length" class="detail__desc">
        <li v-for="(p, i) in project.description" :key="i">{{ p }}</li>
      </ul>

      <ul v-if="project.highlights.length" class="detail__hl">
        <li v-for="(h, i) in project.highlights" :key="i">{{ h }}</li>
      </ul>

      <ul class="detail__stack">
        <li v-for="s in project.stack" :key="s" class="tag">{{ s }}</li>
        <li v-for="s in project.extraTags" :key="s" class="tag">{{ s }}</li>
      </ul>

      <div class="detail__actions">
        <RouterLink class="btn btn--primary" :to="`/projects/${project.slug}`">
          {{ t('card.viewDetails') }}
        </RouterLink>
        <a
          v-for="l in project.links"
          :key="l.label"
          class="btn"
          :class="l.variant === 'solid' ? 'btn--primary' : 'btn--ghost'"
          :href="l.href"
          target="_blank"
          rel="noopener"
          >{{ l.label }}</a
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: rgba(6, 7, 11, 0.55);
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  animation: fade 0.2s ease;
}
@keyframes fade {
  from {
    opacity: 0;
  }
}
.detail {
  position: relative;
  width: min(640px, 100%);
  max-height: 86vh;
  overflow-y: auto;
  background: var(--bg-soft);
  border: 1px solid var(--line-strong);
  border-radius: var(--radius);
  padding: 2.2rem 2.2rem 2rem;
  box-shadow: var(--shadow-hover);
  animation: pop 0.22s cubic-bezier(0.22, 1, 0.36, 1);
}
@keyframes pop {
  from {
    opacity: 0;
    transform: translateY(14px) scale(0.985);
  }
}
.detail__close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.04);
  color: var(--ink-soft);
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.18s ease, color 0.18s ease, border-color 0.18s ease;
}
.detail__close:hover {
  background: var(--ink);
  color: var(--dark);
  border-color: var(--ink);
}
.detail__head {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1rem;
}
.detail__name {
  font-size: 1.7rem;
  font-weight: 850;
  letter-spacing: -0.025em;
  line-height: 1.12;
}
.detail__summary {
  color: var(--ink-soft);
  font-size: 1rem;
  margin-top: 0.6rem;
}
.detail__meta {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  flex-wrap: wrap;
  font-family: var(--mono);
  font-size: 0.78rem;
  color: var(--muted);
  margin: 1rem 0 1.2rem;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid var(--line);
}
.detail__lang {
  color: var(--accent-ink);
  font-weight: 600;
}
.detail__upd {
  margin-left: auto;
}
.detail__desc {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  color: var(--ink-soft);
  font-size: 0.95rem;
}
.detail__hl {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1.2rem 0 0;
  padding: 0 0 0 1.1rem;
  list-style: disc;
  color: var(--ink-soft);
  font-size: 0.92rem;
}
.detail__stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 1.3rem 0 1.6rem;
}
.detail__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}
</style>
