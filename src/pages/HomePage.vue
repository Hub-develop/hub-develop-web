<script setup lang="ts">
import Hero from '@/components/Hero.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import { site, featuredProjects } from '@/content/site'
import { renderRich } from '@/utils/rich'

const about = site.about
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
            <h2 class="section-title">精选项目</h2>
            <p class="lead">我们正在积极开发与维护的部分项目。</p>
          </div>
          <RouterLink class="link-arrow head__more" to="/projects">全部项目</RouterLink>
        </div>
        <div class="grid">
          <ProjectCard v-for="p in featuredProjects" :key="p.slug" :project="p" />
        </div>
      </div>
    </section>

    <!-- 关于预览 -->
    <section class="section section--soft">
      <div class="container">
        <div class="section-head" v-reveal>
          <p class="section-kicker">// about</p>
          <h2 class="section-title">关于 {{ site.brand.name }}</h2>
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
          <RouterLink class="btn btn--ghost" to="/about">了解更多</RouterLink>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section">
      <div class="container">
        <div class="cta" v-reveal>
          <div>
            <p class="section-kicker">// get in touch</p>
            <h2 class="section-title">想一起做点什么？</h2>
            <p class="lead">无论是反馈问题、交流技术，还是加入协作，都欢迎找到我们。</p>
          </div>
          <div class="cta__actions">
            <RouterLink class="btn btn--primary" to="/contact">联系我们</RouterLink>
            <a class="btn btn--ghost" :href="site.brand.repo" target="_blank" rel="noopener">
              在 GitHub 关注
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
  .cta {
    padding: 1.8rem 1.4rem;
  }
}
</style>
