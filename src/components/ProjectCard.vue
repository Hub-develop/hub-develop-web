<script setup lang="ts">
import type { Project } from '@/content/site'
import { statusMeta } from '@/content/projects'
import { relativeTime } from '@/utils/format'

defineProps<{ project: Project }>()
</script>

<template>
  <article class="card pcard" v-reveal>
    <div class="pcard__head">
      <span class="tag tag--accent">{{ project.tag }}</span>
      <span class="badge" :class="'badge--' + project.status">
        <span class="badge__dot"></span>{{ statusMeta[project.status].label }}
      </span>
    </div>

    <h3 class="pcard__name">
      <RouterLink :to="`/projects/${project.slug}`">{{ project.name }}</RouterLink>
    </h3>
    <p class="pcard__desc">{{ project.summary }}</p>

    <ul class="pcard__stack">
      <li v-for="s in project.stack" :key="s" class="tag">{{ s }}</li>
    </ul>

    <p class="pcard__meta">
      <span v-if="project.github.language" class="pcard__lang">{{ project.github.language }}</span>
      <span v-if="project.github.stars > 0">★ {{ project.github.stars }}</span>
      <span class="pcard__upd">更新于 {{ relativeTime(project.github.pushedAt) }}</span>
    </p>

    <div class="pcard__foot">
      <RouterLink class="link-arrow" :to="`/projects/${project.slug}`">查看详情</RouterLink>
      <div class="pcard__links">
        <a
          v-for="l in project.links"
          :key="l.label"
          class="pcard__link"
          :href="l.href"
          target="_blank"
          rel="noopener"
          >{{ l.label }}</a
        >
      </div>
    </div>
  </article>
</template>

<style scoped>
.pcard {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
}
.pcard__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
}
.pcard__name {
  font-size: 1.24rem;
  font-weight: 800;
  letter-spacing: -0.015em;
  margin-top: 1rem;
}
.pcard__name a {
  transition: color 0.18s ease;
}
.pcard__name a:hover {
  color: var(--accent-ink);
}
.pcard__desc {
  color: var(--ink-soft);
  font-size: 0.93rem;
  margin: 0.7rem 0 1.1rem;
  flex: 1;
}
.pcard__stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1.2rem;
}
.pcard__meta {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  flex-wrap: wrap;
  font-family: var(--mono);
  font-size: 0.76rem;
  color: var(--muted);
  margin-bottom: 0.9rem;
}
.pcard__lang {
  color: var(--accent-ink);
  font-weight: 600;
}
.pcard__upd {
  margin-left: auto;
}
.pcard__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
  flex-wrap: wrap;
  padding-top: 1rem;
  border-top: 1px solid var(--line);
}
.pcard__links {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.pcard__link {
  font-size: 0.82rem;
  font-weight: 650;
  padding: 0.38rem 0.8rem;
  border-radius: 999px;
  border: 1px solid var(--line-strong);
  color: var(--ink);
  transition: border-color 0.18s ease, background 0.18s ease, color 0.18s ease;
}
.pcard__link:hover {
  border-color: var(--ink);
  background: var(--ink);
  color: #fff;
}
</style>
