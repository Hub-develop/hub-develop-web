<script setup lang="ts">
import { projects } from '@/data/projects'
</script>

<template>
  <section id="projects" class="projects">
    <div class="projects__inner">
      <h2 class="section__title">项目矩阵</h2>
      <p class="projects__sub">Hub-develop 旗下正在推进与维护的核心仓库。</p>
      <div class="projects__grid">
        <article v-for="p in projects" :key="p.name" class="card">
          <div class="card__head">
            <h3 class="card__name">{{ p.name }}</h3>
            <span class="card__tag" :class="'card__tag--' + p.status">{{ p.tag }}</span>
          </div>
          <p class="card__desc">{{ p.description }}</p>
          <ul class="card__stack">
            <li v-for="s in p.stack" :key="s">{{ s }}</li>
          </ul>
          <a class="card__link" :href="p.repo" target="_blank" rel="noopener">了解更多 →</a>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects {
  padding: 4rem 1.4rem 5rem;
  background: var(--bg-soft);
}
.projects__inner {
  max-width: 1080px;
  margin: 0 auto;
}
.projects__sub {
  color: var(--text-soft);
  margin: 0 0 2rem;
}
.projects__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.3rem;
}
.card {
  display: flex;
  flex-direction: column;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: var(--shadow);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12);
}
.card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
}
.card__name {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 800;
}
.card__tag {
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  white-space: nowrap;
}
.card__tag--active {
  background: rgba(99, 102, 241, 0.12);
  color: var(--primary);
}
.card__tag--maintained {
  background: rgba(16, 185, 129, 0.12);
  color: #059669;
}
.card__tag--beta {
  background: rgba(245, 158, 11, 0.14);
  color: #d97706;
}
.card__desc {
  color: var(--text-soft);
  font-size: 0.93rem;
  margin: 0.8rem 0 1rem;
  flex: 1;
}
.card__stack {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  padding: 0;
  margin: 0 0 1rem;
}
.card__stack li {
  font-size: 0.75rem;
  padding: 0.22rem 0.55rem;
  border-radius: 8px;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  color: var(--text-soft);
}
.card__link {
  font-weight: 700;
  color: var(--primary);
  font-size: 0.92rem;
}
.card__link:hover {
  color: var(--primary-2);
}
</style>
