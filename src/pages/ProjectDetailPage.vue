<script setup lang="ts">
import { computed } from 'vue'
import { getProject, getProjectNeighbors, statusMeta } from '@/content/projects'

const props = defineProps<{ slug: string }>()

const project = computed(() => getProject(props.slug))
const neighbors = computed(() => getProjectNeighbors(props.slug))
</script>

<template>
  <div class="page">
    <div class="container">
      <template v-if="project">
        <!-- 面包屑 -->
        <nav class="crumb" aria-label="面包屑">
          <RouterLink to="/">首页</RouterLink>
          <span aria-hidden="true">/</span>
          <RouterLink to="/projects">项目</RouterLink>
          <span aria-hidden="true">/</span>
          <span class="crumb__cur">{{ project.name }}</span>
        </nav>

        <!-- 头部 -->
        <header class="dhead" v-reveal>
          <div class="dhead__meta">
            <span class="tag tag--accent">{{ project.tag }}</span>
            <span class="badge" :class="'badge--' + project.status">
              <span class="badge__dot"></span>{{ statusMeta[project.status].label }}
            </span>
          </div>
          <h1 class="dhead__title">{{ project.name }}</h1>
          <p class="dhead__summary">{{ project.summary }}</p>

          <div class="dhead__actions">
            <a
              v-for="l in project.links"
              :key="l.label"
              class="btn"
              :class="l.variant === 'outline' ? 'btn--ghost' : 'btn--primary'"
              :href="l.href"
              target="_blank"
              rel="noopener"
              >{{ l.label }}</a
            >
            <RouterLink class="btn btn--ghost" to="/projects">返回列表</RouterLink>
          </div>
        </header>

        <!-- 正文 + 侧栏 -->
        <div class="body">
          <div class="body__main">
            <section class="block" v-reveal>
              <h2 class="block__title">项目简介</h2>
              <p v-for="(para, i) in project.description" :key="i" class="block__p">{{ para }}</p>
            </section>

            <section class="block" v-reveal>
              <h2 class="block__title">能力亮点</h2>
              <ul class="feat">
                <li v-for="h in project.highlights" :key="h" class="feat__item">
                  <span class="feat__dot" aria-hidden="true"></span>
                  <span>{{ h }}</span>
                </li>
              </ul>
            </section>
          </div>

          <aside class="body__aside">
            <div class="meta card" v-reveal>
              <div class="meta__row">
                <span class="meta__k">状态</span>
                <span class="badge" :class="'badge--' + project.status">
                  <span class="badge__dot"></span>{{ statusMeta[project.status].label }}
                </span>
              </div>
              <p class="meta__hint">{{ statusMeta[project.status].hint }}</p>

              <div class="meta__sep"></div>

              <span class="meta__k">技术栈</span>
              <ul class="meta__stack">
                <li v-for="s in project.stack" :key="s" class="tag">{{ s }}</li>
              </ul>

              <div class="meta__sep"></div>

              <span class="meta__k">相关链接</span>
              <ul class="meta__links">
                <li v-for="l in project.links" :key="l.label">
                  <a :href="l.href" target="_blank" rel="noopener">{{ l.label }} ↗</a>
                </li>
              </ul>
            </div>
          </aside>
        </div>

        <!-- 上一个 / 下一个 -->
        <nav v-if="neighbors.prev || neighbors.next" class="neigh" aria-label="其他项目">
          <RouterLink
            v-if="neighbors.prev"
            class="neigh__item card"
            :to="`/projects/${neighbors.prev.slug}`"
          >
            <span class="neigh__dir">← 上一个</span>
            <span class="neigh__name">{{ neighbors.prev.name }}</span>
          </RouterLink>
          <span v-else class="neigh__spacer"></span>

          <RouterLink
            v-if="neighbors.next"
            class="neigh__item neigh__item--right card"
            :to="`/projects/${neighbors.next.slug}`"
          >
            <span class="neigh__dir">下一个 →</span>
            <span class="neigh__name">{{ neighbors.next.name }}</span>
          </RouterLink>
        </nav>
      </template>

      <!-- 兜底（正常会被路由守卫拦到 404） -->
      <div v-else class="missing">
        <h1>找不到这个项目</h1>
        <p class="lead">slug「{{ props.slug }}」不在项目列表中。</p>
        <RouterLink class="btn btn--primary" to="/projects">浏览全部项目</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: calc(var(--nav-h) + 2.6rem) 0 4.5rem;
}
.crumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--mono);
  font-size: 0.82rem;
  color: var(--muted);
  margin-bottom: 1.6rem;
}
.crumb a:hover {
  color: var(--ink);
}
.crumb__cur {
  color: var(--ink);
}

.dhead__meta {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.dhead__title {
  font-size: clamp(2.2rem, 6vw, 3.6rem);
  font-weight: 850;
  letter-spacing: -0.035em;
  line-height: 1.05;
  margin-top: 1rem;
}
.dhead__summary {
  color: var(--ink-soft);
  font-size: clamp(1rem, 2vw, 1.15rem);
  max-width: 62ch;
  margin-top: 0.9rem;
}
.dhead__actions {
  display: flex;
  gap: 0.7rem;
  flex-wrap: wrap;
  margin-top: 1.8rem;
}

.body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: 2.6rem;
  align-items: start;
  margin-top: 3.4rem;
  padding-top: 2.6rem;
  border-top: 1px solid var(--line);
}
.block + .block {
  margin-top: 2.6rem;
}
.block__title {
  font-size: 1.3rem;
  font-weight: 800;
  letter-spacing: -0.015em;
  margin-bottom: 1rem;
}
.block__p {
  color: var(--ink-soft);
  font-size: 1rem;
  margin-bottom: 1rem;
  max-width: 66ch;
}
.block__p:last-child {
  margin-bottom: 0;
}

.feat {
  display: grid;
  gap: 0.7rem;
}
.feat__item {
  display: flex;
  align-items: flex-start;
  gap: 0.7rem;
  font-size: 0.98rem;
  color: var(--ink-soft);
}
.feat__dot {
  flex: none;
  width: 8px;
  height: 8px;
  margin-top: 0.55rem;
  border-radius: 50%;
  background: var(--accent);
}

.meta {
  padding: 1.4rem;
  position: sticky;
  top: calc(var(--nav-h) + 1.4rem);
}
.meta__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
}
.meta__k {
  display: block;
  font-family: var(--mono);
  font-size: 0.76rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 0.6rem;
}
.meta__hint {
  color: var(--muted);
  font-size: 0.85rem;
  margin-top: 0.5rem;
}
.meta__sep {
  height: 1px;
  background: var(--line);
  margin: 1.2rem 0;
}
.meta__stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.meta__links {
  display: grid;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 650;
}
.meta__links a:hover {
  color: var(--accent-ink);
}

.neigh {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 3.4rem;
}
.neigh__item {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1.2rem 1.4rem;
}
.neigh__item--right {
  text-align: right;
  align-items: flex-end;
}
.neigh__dir {
  font-family: var(--mono);
  font-size: 0.78rem;
  color: var(--muted);
}
.neigh__name {
  font-weight: 750;
  font-size: 1.05rem;
}
.neigh__spacer {
  display: block;
}

.missing {
  padding: 4rem 0;
  display: grid;
  gap: 1rem;
  justify-items: start;
}

@media (max-width: 860px) {
  .body {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .meta {
    position: static;
  }
}
</style>
