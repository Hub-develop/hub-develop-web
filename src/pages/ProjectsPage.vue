<script setup lang="ts">
import { computed, ref } from 'vue'
import ProjectCard from '@/components/ProjectCard.vue'
import { site, projects } from '@/content/site'
import { t } from '@/i18n/ui'

/** 按「主语言」筛选（语言来自 GitHub，非写死） */
type Filter = string
const filter = ref<Filter>('all')

const languages = computed(() => {
  const set = new Set<string>()
  for (const p of projects) if (p.github.language) set.add(p.github.language)
  return [...set].sort()
})
const hasOther = computed(() => projects.some((p) => !p.github.language))

const filters = computed(() => [
  { key: 'all', label: t('projects.all') },
  ...languages.value.map((l) => ({ key: l, label: l })),
  ...(hasOther.value ? [{ key: '__other__', label: t('projects.other') }] : []),
])

const list = computed(() => {
  if (filter.value === 'all') return projects
  if (filter.value === '__other__') return projects.filter((p) => !p.github.language)
  return projects.filter((p) => p.github.language === filter.value)
})
</script>

<template>
  <div class="page">
    <div class="container">
      <header class="phead" v-reveal>
        <p class="section-kicker">{{ t('projects.kicker') }}</p>
        <h1 class="phead__title">{{ t('projects.title') }}</h1>
        <p class="lead">
          {{ t('projects.lead', { name: site.brand.name }) }}
        </p>
      </header>

      <div class="toolbar" v-reveal>
        <div class="chips" role="tablist" aria-label="按主语言筛选">
          <button
            v-for="f in filters"
            :key="f.key"
            class="chip"
            :class="{ 'chip--on': filter === f.key }"
            type="button"
            role="tab"
            :aria-selected="filter === f.key"
            @click="filter = f.key"
          >
            {{ f.label }}
          </button>
        </div>
        <span class="count">{{ t('projects.count', { n: list.length }) }}</span>
      </div>

      <TransitionGroup name="list" tag="div" class="grid">
        <ProjectCard v-for="p in list" :key="p.slug" :project="p" />
      </TransitionGroup>

      <p v-if="!list.length" class="empty">{{ t('projects.empty') }}</p>

      <div class="tail" v-reveal>
        <div>
          <h2 class="tail__title">{{ t('projects.tailTitle') }}</h2>
          <p class="lead">{{ t('projects.tailLead') }}</p>
        </div>
        <a class="btn btn--primary" :href="site.brand.repo" target="_blank" rel="noopener">
          {{ t('projects.openGithub') }}
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: calc(var(--nav-h) + 3.8rem) 0 4.5rem;
}
.phead {
  max-width: 62ch;
}
.phead__title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 850;
  letter-spacing: -0.03em;
  line-height: 1.08;
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 2.4rem 0 1.6rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--line);
}
.chips {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.chip {
  padding: 0.42rem 1rem;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.05);
  color: var(--ink-soft);
  font-size: 0.88rem;
  font-weight: 650;
  cursor: pointer;
  transition: background 0.18s ease, color 0.18s ease, border-color 0.18s ease;
}
.chip:hover {
  border-color: var(--line-strong);
  color: var(--ink);
}
.chip--on {
  background: var(--accent);
  border-color: var(--accent);
  color: #06281d;
}
.count {
  font-family: var(--mono);
  font-size: 0.82rem;
  color: var(--muted);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
  gap: 1.1rem;
}
.empty {
  color: var(--muted);
  padding: 3rem 0;
  text-align: center;
}

.list-enter-active,
.list-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.list-leave-active {
  position: absolute;
}

.tail {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;
  flex-wrap: wrap;
  margin-top: 3.4rem;
  padding: 2.2rem;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--bg-soft);
}
.tail__title {
  font-size: 1.3rem;
  font-weight: 800;
  letter-spacing: -0.015em;
}

@media (max-width: 640px) {
  .tail {
    padding: 1.6rem 1.3rem;
  }
}
</style>
