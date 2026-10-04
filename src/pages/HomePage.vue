<script setup lang="ts">
import { computed } from 'vue'
import Hero from '@/components/Hero.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import { site, featuredProjects } from '@/content/site'
import { renderRich } from '@/utils/rich'
import { useGithub } from '@/content/github'
import { t } from '@/i18n/ui'

const about = site.about

/** GitHub 快照（响应式：运行时刷新后自动更新） */
const { data: gh } = useGithub()
const stacks = computed(() => gh.value.stacks.slice(0, 12))
const tags = computed(() => gh.value.tags)
const maxWeight = computed(() => Math.max(...stacks.value.map((s) => s.weight), 0.0001))
const pct = (w: number) => `${Math.max(4, Math.round((w / maxWeight.value) * 100))}%`
</script>

<template>
  <div>
    <Hero />

    <!-- 精选项目 -->
    <section class="section">
      <div class="container">
        <div class="head" v-reveal>
          <div class="section-head">
            <p class="section-kicker">// featured</p>
            <h2 class="section-title">{{ t('home.featuredTitle') }}</h2>
            <p class="lead">{{ t('home.featuredLead') }}</p>
          </div>
          <RouterLink class="link-arrow head__more" to="/projects">{{ t('home.allProjects') }}</RouterLink>
        </div>
        <div class="grid">
          <ProjectCard v-for="p in featuredProjects" :key="p.slug" :project="p" />
        </div>
      </div>
    </section>

    <!-- 技术栈 & 标签（实时来自 GitHub，非写死） -->
    <section class="section section--soft">
      <div class="container">
          <div class="section-head" v-reveal>
          <p class="section-kicker">// stack</p>
          <h2 class="section-title">{{ t('home.stackTitle') }}</h2>
          <p class="lead">
            {{ t('home.stackLead', { n: gh.totals.repos, m: gh.totals.stacks, k: gh.totals.tags }) }}
          </p>
        </div>

        <ul class="stacks" v-reveal>
          <li v-for="s in stacks" :key="s.name" class="stack">
            <span class="stack__name">{{ s.name }}</span>
            <span class="stack__track">
              <span class="stack__bar" :style="{ width: pct(s.weight) }"></span>
            </span>
            <span class="stack__n">{{ s.repos }} {{ t('home.repoUnit') }}</span>
          </li>
        </ul>

        <div class="taghead" v-reveal>
          <span class="taghead__k">{{ t('home.orgTags') }}</span>
          <ul class="orgtags">
            <li v-for="t in tags" :key="t.name" class="orgtag">{{ t.name }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 关于预览 -->
    <section class="section">
      <div class="container">
        <div class="section-head" v-reveal>
          <p class="section-kicker">// about</p>
          <h2 class="section-title">{{ t('home.aboutTitle', { name: site.brand.name }) }}</h2>
          <p class="lead" v-html="renderRich(about.lead)"></p>
        </div>

        <div class="caps">
          <article v-for="c in about.capabilities" :key="c.idx" class="card cap" v-reveal>
            <span class="cap__idx">{{ c.idx }}</span>
            <h3 class="cap__title">{{ c.title }}</h3>
            <p class="cap__stack">{{ c.stack }}</p>
            <p class="cap__desc">{{ c.desc }}</p>
          </article>
        </div>

        <div class="more" v-reveal>
          <RouterLink class="btn btn--ghost" to="/about">{{ t('home.learnMore') }}</RouterLink>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section">
      <div class="container">
        <div class="cta" v-reveal>
          <div>
            <p class="section-kicker">// get in touch</p>
            <h2 class="section-title">{{ t('home.ctaTitle') }}</h2>
            <p class="lead">{{ t('home.ctaLead') }}</p>
          </div>
          <div class="cta__actions">
            <RouterLink class="btn btn--primary" to="/contact">{{ t('home.contactUs') }}</RouterLink>
            <a class="btn btn--ghost" :href="site.brand.repo" target="_blank" rel="noopener">
              {{ t('home.followGithub') }}
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.4rem;
  flex-wrap: wrap;
}
.head__more {
  margin-bottom: 0.3rem;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
  gap: 1.1rem;
  margin-top: 2.6rem;
}

/* ---------- 技术栈 ---------- */
.stacks {
  display: grid;
  gap: 0.55rem;
  margin-top: 2.4rem;
}
.stack {
  display: grid;
  grid-template-columns: 14ch minmax(0, 1fr) auto;
  align-items: center;
  gap: 1rem;
}
.stack__name {
  font-family: var(--mono);
  font-size: 0.86rem;
  color: var(--ink-soft);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.stack__track {
  height: 9px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid var(--line);
  overflow: hidden;
}
.stack__bar {
  display: block;
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--accent), #34d399);
  transition: width 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
.stack__n {
  font-family: var(--mono);
  font-size: 0.76rem;
  color: var(--muted);
  white-space: nowrap;
}

.taghead {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  flex-wrap: wrap;
  margin-top: 2.2rem;
  padding-top: 1.8rem;
  border-top: 1px solid var(--line);
}
.taghead__k {
  font-family: var(--mono);
  font-size: 0.76rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
}
.orgtags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.orgtag {
  font-family: var(--mono);
  font-size: 0.8rem;
  padding: 0.34rem 0.8rem;
  border-radius: 999px;
  background: var(--accent-soft);
  color: var(--accent-ink);
  border: 1px solid rgba(111, 238, 194, 0.45);
}

.caps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 1rem;
  margin-top: 2.6rem;
}
.cap {
  padding: 1.5rem 1.4rem;
}
.cap__idx {
  font-family: var(--mono);
  font-size: 0.8rem;
  color: var(--accent-ink);
}
.cap__title {
  font-size: 1.12rem;
  font-weight: 750;
  margin-top: 0.7rem;
  letter-spacing: -0.01em;
}
.cap__stack {
  font-family: var(--mono);
  font-size: 0.78rem;
  color: var(--muted);
  margin-top: 0.25rem;
}
.cap__desc {
  color: var(--ink-soft);
  font-size: 0.92rem;
  margin-top: 0.7rem;
}
.more {
  margin-top: 2.2rem;
}

.cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 2.4rem 2.2rem;
  background: var(--bg-soft);
}
.cta__actions {
  display: flex;
  gap: 0.7rem;
  flex-wrap: wrap;
}

@media (max-width: 640px) {
  .stack {
    grid-template-columns: 9ch minmax(0, 1fr) auto;
    gap: 0.6rem;
  }
  .cta {
    padding: 1.8rem 1.4rem;
  }
}
</style>
