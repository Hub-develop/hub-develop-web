<script setup lang="ts">
import { computed } from 'vue'
import { site } from '@/content/site'
import { renderRich } from '@/utils/rich'
import { render } from '@/utils/template'
import { buildVars } from '@/content/vars'

const h = computed(() => site.hero)
/** 变量上下文（响应式：GitHub 数据运行时刷新后会自动更新） */
const vars = computed(() => buildVars())
/** 渲染文案里的 {{ 变量 | 过滤器 }} */
const r = (t?: string) => render(t, vars.value)
/** 渲染「先模板、后 **强调**」的富文本 */
const rich = (t?: string) => renderRich(r(t))
</script>

<template>
  <section class="hero">
    <div class="hero__grid grid-bg" aria-hidden="true"></div>
    <div class="container hero__inner">
      <div class="hero__copy">
        <p class="hero__kicker">{{ r(h.kicker) }}</p>
        <p class="prompt hero__term">
          <span class="prompt__user">{{ h.term.user }}@{{ h.term.host }}</span
          ><span class="prompt__path">:~$</span> {{ r(h.term.cmd)
          }}<span class="cursor" aria-hidden="true"></span>
        </p>
        <h1 class="hero__title">{{ r(h.title) }}</h1>
        <p class="hero__sub">{{ r(h.subtitle) }}</p>
        <p class="hero__lead" v-html="rich(h.lead)"></p>

        <ul class="hero__tags">
          <li v-for="t in h.tags" :key="t" class="tag">{{ r(t) }}</li>
        </ul>

        <div class="hero__actions">
          <RouterLink class="btn btn--primary" :to="h.primaryCta.to">
            {{ h.primaryCta.label }}
          </RouterLink>
          <RouterLink class="btn btn--ghost" :to="h.secondaryCta.to">
            {{ h.secondaryCta.label }}
          </RouterLink>
        </div>
      </div>

      <div class="hero__visual" aria-hidden="true">
        <div class="term">
          <div class="term__bar">
            <span class="term__dot term__dot--r"></span>
            <span class="term__dot term__dot--y"></span>
            <span class="term__dot term__dot--g"></span>
            <span class="term__title">{{ r(h.terminal.title) }}</span>
          </div>
          <!-- 每行来自 site.hero.terminal.lines，文本支持 {{ 变量 }} 模板 -->
          <div class="term__body">
            <div v-for="(line, i) in h.terminal.lines" :key="i" class="term__line">
              <template v-if="line.type === 'blank'">&nbsp;</template>
              <template v-else-if="line.type === 'kv'">
                <span class="c-key">{{ r(line.key) }}</span
                ><span :class="'c-' + (line.tone || 'val')">{{ r(line.value) }}</span>
              </template>
              <template v-else-if="line.type === 'cmd'">
                <span class="c-cmd">{{ r(line.text) }}</span
                ><span v-if="line.cursor" class="cursor cursor--sm"></span>
              </template>
              <span v-else :class="'c-' + (line.tone || 'val')">{{ r(line.text) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  padding: 9.5rem 0 5rem;
  overflow: hidden;
}
.hero__grid {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.hero__inner {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: 3rem;
  align-items: center;
}

.hero__kicker {
  color: var(--muted);
  font-size: 0.95rem;
  margin-bottom: 1.1rem;
}
.hero__term {
  margin-bottom: 0.9rem;
}
.cursor {
  display: inline-block;
  width: 9px;
  height: 1.05em;
  margin-left: 4px;
  vertical-align: -2px;
  background: var(--ink);
  animation: blink 1.1s steps(1) infinite;
}
.cursor--sm {
  width: 8px;
  height: 0.95em;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}

.hero__title {
  font-size: clamp(2.7rem, 7vw, 4.6rem);
  font-weight: 850;
  letter-spacing: -0.035em;
  line-height: 1;
}
.hero__sub {
  color: var(--ink-soft);
  font-size: clamp(1.05rem, 2vw, 1.3rem);
  margin-top: 0.9rem;
}
.hero__lead {
  color: var(--muted);
  font-size: 1rem;
  max-width: 52ch;
  margin-top: 0.9rem;
}
.hero__lead :deep(strong) {
  color: var(--ink);
}
.hero__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1.5rem 0 1.9rem;
}
.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
}

/* ---------- terminal window ---------- */
.term {
  border: 1px solid var(--line);
  border-radius: 14px;
  background: #0d0f16;
  box-shadow: var(--shadow-hover);
  overflow: hidden;
}
.term__bar {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.7rem 0.9rem;
  background: #151824;
  border-bottom: 1px solid #22263a;
}
.term__dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
}
.term__dot--r {
  background: #ff5f57;
}
.term__dot--y {
  background: #febc2e;
}
.term__dot--g {
  background: #28c840;
}
.term__title {
  margin-left: 0.6rem;
  font-family: var(--mono);
  font-size: 0.76rem;
  color: #7a8199;
}
.term__body {
  margin: 0;
  padding: 1.1rem 1.15rem 1.3rem;
  font-family: var(--mono);
  font-size: 0.82rem;
  line-height: 1.85;
  color: #c7cce0;
  overflow-x: auto;
}
.term__line {
  white-space: pre;
  min-height: 1.85em;
}
.c-cmd {
  color: #e6e9f5;
}
.c-key {
  display: inline-block;
  min-width: 9ch;
  color: #8b93ad;
}
.c-val {
  color: #9fd0ff;
}
.c-num {
  color: #f0b866;
}
.c-ok {
  color: #4ade80;
}

@media (max-width: 900px) {
  .hero {
    padding-top: 8rem;
  }
  .hero__inner {
    grid-template-columns: 1fr;
    gap: 2.4rem;
  }
  .hero__visual {
    max-width: 560px;
  }
}
@media (max-width: 480px) {
  .term__body {
    font-size: 0.72rem;
    padding: 0.9rem 0.9rem 1.1rem;
  }
}
</style>
