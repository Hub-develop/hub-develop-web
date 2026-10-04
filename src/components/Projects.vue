<script setup lang="ts">
import { projects, statusLabel } from '@/data/projects'
</script>

<template>
  <section id="projects" class="projects">
    <div class="container">
      <div v-reveal class="projects__head">
        <p class="section-kicker">// projects</p>
        <h2 class="section-title">核心项目</h2>
        <p class="lead projects__lead">我们正在开发和维护的项目。</p>
      </div>

      <div class="projects__grid">
        <article v-for="p in projects" :key="p.name" v-reveal class="card">
          <div class="card__head">
            <h3 class="card__name">{{ p.name }}</h3>
            <span class="badge" :class="'badge--' + p.status">
              <span class="badge__dot"></span>{{ statusLabel[p.status] }}
            </span>
          </div>
          <p class="card__desc">{{ p.description }}</p>
          <ul class="card__stack">
            <li v-for="s in p.stack" :key="s" class="tag">{{ s }}</li>
          </ul>
          <div class="card__links">
            <a
              v-for="l in p.links"
              :key="l.label"
              class="card__link"
              :href="l.href"
              target="_blank"
              rel="noopener"
              >{{ l.label }}</a
            >
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects {
  padding: 5rem 0 6rem;
  background: var(--bg-soft);
  border-top: 1px solid var(--line);
}
.projects__lead {
  margin-top: 1rem;
}
.projects__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.1rem;
  margin-top: 2.6rem;
}
.card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-hover);
  border-color: var(--line-strong);
}
.card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
}
.card__name {
  font-size: 1.18rem;
  font-weight: 800;
  letter-spacing: -0.015em;
}
.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.38rem;
  font-size: 0.74rem;
  font-weight: 700;
  padding: 0.24rem 0.6rem;
  border-radius: 999px;
  white-space: nowrap;
}
.badge__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}
.badge--active {
  background: var(--accent-soft);
  color: var(--accent-ink);
}
.badge--maintained {
  background: var(--emerald-soft);
  color: var(--emerald-ink);
}
.badge--beta {
  background: var(--amber-soft);
  color: var(--amber-ink);
}
.card__desc {
  color: var(--ink-soft);
  font-size: 0.93rem;
  margin: 0.85rem 0 1.1rem;
  flex: 1;
}
.card__stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1.2rem;
}
.card__links {
  display: flex;
  gap: 0.55rem;
  flex-wrap: wrap;
}
.card__link {
  font-size: 0.85rem;
  font-weight: 650;
  padding: 0.42rem 0.9rem;
  border-radius: 999px;
  border: 1px solid var(--line-strong);
  color: var(--ink);
  transition: border-color 0.18s ease, background 0.18s ease, color 0.18s ease;
}
.card__link:hover {
  border-color: var(--ink);
  background: var(--ink);
  color: #fff;
}
</style>
