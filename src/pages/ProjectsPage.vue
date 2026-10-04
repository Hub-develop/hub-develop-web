<script setup lang="ts">
import { computed, ref } from 'vue'
import ProjectCard from '@/components/ProjectCard.vue'
import { site, projects } from '@/content/site'
import { statusMeta } from '@/content/projects'
import type { ProjectStatus } from '@/content/projects'

type Filter = 'all' | ProjectStatus

const filter = ref<Filter>('all')

const filters: { key: Filter; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'active', label: statusMeta.active.label },
  { key: 'maintained', label: statusMeta.maintained.label },
  { key: 'beta', label: statusMeta.beta.label },
]

const list = computed(() =>
  filter.value === 'all' ? projects : projects.filter((p) => p.status === filter.value),
)
</script>

<template>
  <div class="page">
    <div class="container">
      <header class="phead" v-reveal>
        <p class="section-kicker">// projects</p>
        <h1 class="phead__title">核心项目</h1>
        <p class="lead">
          {{ site.brand.name }} 正在开发与维护的开源项目，覆盖跨平台桌面、服务端、文档框架与操作系统等方向。
        </p>
      </header>

      <div class="toolbar" v-reveal>
        <div class="chips" role="tablist" aria-label="按状态筛选">
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
        <span class="count">{{ list.length }} 个项目</span>
      </div>

      <TransitionGroup name="list" tag="div" class="grid">
        <ProjectCard v-for="p in list" :key="p.slug" :project="p" />
      </TransitionGroup>

      <p v-if="!list.length" class="empty">这个状态下暂时没有项目。</p>

      <div class="tail" v-reveal>
        <div>
          <h2 class="tail__title">有想法，或发现问题？</h2>
          <p class="lead">在对应仓库提 Issue 是参与进来最快的方式。</p>
        </div>
        <a class="btn btn--primary" :href="site.brand.repo" target="_blank" rel="noopener">
          前往 GitHub 组织
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
  background: #fff;
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
  background: var(--ink);
  border-color: var(--ink);
  color: #fff;
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
