<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { Project } from '@/content/site'
import { statusMeta } from '@/content/projects'
import ProjectModal from './ProjectModal.vue'

defineProps<{
  projects: Project[]
  kicker?: string
  title?: string
}>()

const section = ref<HTMLElement | null>(null)
const rail = ref<HTMLElement | null>(null)
const railInner = ref<HTMLElement | null>(null)
const selected = ref<Project | null>(null)

let rafId: number | null = null

/** 语言 → 主题色（卡片左侧强调条 / 标签），无匹配回退薄荷绿 */
const LANG_COLORS: Record<string, string> = {
  'C#': '#68217A',
  'C++': '#f34b7d',
  C: '#8a8f98',
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Vue: '#41b883',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Java: '#b07219',
  Dart: '#00b4ab',
  Kotlin: '#a97bff',
  Rust: '#dea584',
  Go: '#00ADD8',
  Swift: '#F05138',
  PowerShell: '#012456',
}
function themeColor(p: Project): string {
  const lang = p.github.language
  if (lang && LANG_COLORS[lang]) return LANG_COLORS[lang]
  const hit = p.stack.find((s) => LANG_COLORS[s])
  return hit ? LANG_COLORS[hit] : '#6feec2'
}

function paint() {
  if (!railInner.value || !rail.value || !section.value) return
  const vh = window.innerHeight
  // 窄屏：原生横滑，不固定页面
  if (window.innerWidth < 768) {
    section.value.style.height = ''
    railInner.value.style.transform = 'translateX(0)'
    return
  }
  const max = Math.max(0, railInner.value.scrollWidth - rail.value.clientWidth)
  // 让 section 提供与横向位移 1:1 的「滚动跑道」：钉住期间滚动 max 像素，轨道正好走完
  section.value.style.height = `${vh + max}px`
  const rect = section.value.getBoundingClientRect()
  // 仅在 section 被钉住（rect.top ≤ 0）之后才开始横向滑动，避免「提前滑动」
  const scrolled = Math.min(max, Math.max(0, -rect.top))
  let p = max > 0 ? scrolled / max : 0
  p = p * p * (3 - 2 * p) // smoothstep：起止更柔和
  railInner.value.style.transform = `translateX(${-p * max}px)`
}

function onScroll() {
  if (rafId) cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(paint)
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
  paint()
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  if (rafId) cancelAnimationFrame(rafId)
})

function open(p: Project) {
  selected.value = p
}
function close() {
  selected.value = null
}
</script>

<template>
  <section ref="section" class="rail-section">
    <div class="rail-sticky">
      <div class="container">
        <div class="rail-head">
          <div>
            <p v-if="kicker" class="section-kicker">{{ kicker }}</p>
            <h2 v-if="title" class="section-title">{{ title }}</h2>
          </div>
        </div>
      </div>

      <div ref="rail" class="rail">
        <div ref="railInner" class="rail-inner">
          <button
            v-for="p in projects"
            :key="p.slug"
            class="rcard"
            :style="{ '--theme': themeColor(p) }"
            type="button"
            @click="open(p)"
          >
            <div class="rcard__head">
              <span class="tag tag--accent">{{ p.tag }}</span>
              <span class="badge" :class="'badge--' + p.status">
                <span class="badge__dot"></span>{{ statusMeta[p.status].label }}
              </span>
            </div>
            <h3 class="rcard__name">{{ p.name }}</h3>
            <p class="rcard__desc">{{ p.summary }}</p>
            <ul class="rcard__stack">
              <li v-for="s in p.stack.slice(0, 3)" :key="s" class="tag">{{ s }}</li>
            </ul>
            <div class="rcard__foot">
              <span class="rcard__meta">
                <template v-if="p.github.language">{{ p.github.language }}</template>
                <template v-if="p.github.stars > 0"> · ★ {{ p.github.stars }}</template>
              </span>
              <span class="rcard__go">查看 →</span>
            </div>
          </button>
        </div>
      </div>

      <div class="container">
        <p class="rail-hint">横向滑动 / 滚动浏览全部项目 · 点击卡片查看详情</p>
      </div>
    </div>

    <ProjectModal v-if="selected" :project="selected" @dismiss="close" />
  </section>
</template>

<style scoped>
.rail-section {
  position: relative; /* 高度由 JS 设为 vh + max，提供横向滑动的滚动跑道 */
}
.rail-sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.4rem;
  overflow: hidden;
}
.rail-head {
  margin-bottom: 0;
}
.rail-head .section-title {
  margin-top: 0.4rem;
}

/* 横向轨道：窄屏原生横滑，宽屏靠视差位移 */
.rail {
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
}
.rail::-webkit-scrollbar {
  display: none;
}
.rail-inner {
  display: inline-flex;
  gap: 1.25rem;
  padding: 0.4rem max(1.5rem, calc((100vw - 1120px) / 2)) 1rem;
  will-change: transform;
}

/* 卡片（竖向，固定宽度，hyliu.me 风格） */
.rcard {
  flex: none;
  width: 320px;
  text-align: left;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background: var(--dark-2);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  border-left: 3px solid var(--theme);
  cursor: pointer;
  color: inherit;
  font: inherit;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}
.rcard:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-hover);
  border-color: var(--line-strong);
  border-left-color: var(--theme);
}
.rcard__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
}
.rcard__name {
  font-size: 1.24rem;
  font-weight: 800;
  letter-spacing: -0.015em;
  margin-top: 1rem;
}
.rcard__desc {
  color: var(--ink-soft);
  font-size: 0.9rem;
  margin: 0.7rem 0 1.1rem;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.rcard__stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;
}
.rcard__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
  padding-top: 1rem;
  border-top: 1px solid var(--line);
  font-family: var(--mono);
  font-size: 0.76rem;
  color: var(--muted);
}
.rcard__go {
  color: var(--theme);
  font-weight: 700;
}

.rail-hint {
  margin-top: 0;
  font-size: 0.85rem;
  color: var(--muted);
}

@media (min-width: 768px) {
  .rail {
    overflow: hidden;
  }
}
@media (max-width: 640px) {
  .rail-section {
    padding: 3.6rem 0;
  }
  .rcard {
    width: 84vw;
    max-width: 320px;
  }
}
</style>
