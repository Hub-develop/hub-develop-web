<script setup lang="ts">
import { site } from '@/content/site'

const about = site.about
</script>

<template>
  <div class="page">
    <div class="container">
      <!-- 头部 -->
      <header class="ahead" v-reveal>
        <p class="section-kicker">{{ about.kicker }}</p>
        <h1 class="ahead__title">{{ about.title }}</h1>
        <div class="ahead__story">
          <p v-for="(p, i) in about.story" :key="i" class="ahead__p">{{ p }}</p>
        </div>
      </header>

      <!-- 统计 -->
      <div class="stats" v-reveal>
        <div v-for="s in about.stats" :key="s.label" class="stat">
          <span class="stat__value">{{ s.value }}</span>
          <span class="stat__label">{{ s.label }}</span>
        </div>
      </div>
    </div>

    <!-- 能力方向 -->
    <section class="section section--soft">
      <div class="container">
        <div class="section-head" v-reveal>
          <p class="section-kicker">// focus</p>
          <h2 class="section-title">专注方向</h2>
          <p class="lead">我们把精力集中在四个方向，每个方向都有对应的项目在支撑。</p>
        </div>

        <div class="caps">
          <article v-for="c in about.capabilities" :key="c.idx" class="card cap" v-reveal>
            <span class="cap__idx">{{ c.idx }}</span>
            <h3 class="cap__title">{{ c.title }}</h3>
            <p class="cap__stack">{{ c.stack }}</p>
            <p class="cap__desc">{{ c.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- 原则 -->
    <section class="section">
      <div class="container">
        <div class="section-head" v-reveal>
          <p class="section-kicker">// principles</p>
          <h2 class="section-title">我们坚持的原则</h2>
        </div>

        <ol class="principles">
          <li v-for="p in about.principles" :key="p.idx" class="pr" v-reveal>
            <span class="pr__idx">{{ p.idx }}</span>
            <div>
              <h3 class="pr__title">{{ p.title }}</h3>
              <p class="pr__desc">{{ p.desc }}</p>
            </div>
          </li>
        </ol>

        <div class="cta" v-reveal>
          <div>
            <h2 class="cta__title">想看我们做了什么？</h2>
            <p class="lead">项目页里有全部正在开发和维护的项目。</p>
          </div>
          <div class="cta__actions">
            <RouterLink class="btn btn--primary" to="/projects">浏览项目</RouterLink>
            <RouterLink class="btn btn--ghost" to="/contact">联系我们</RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page {
  padding: calc(var(--nav-h) + 3.8rem) 0 0;
}
.ahead {
  max-width: 68ch;
}
.ahead__title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 850;
  letter-spacing: -0.03em;
  line-height: 1.08;
}
.ahead__story {
  margin-top: 1.6rem;
  display: grid;
  gap: 0.9rem;
}
.ahead__p {
  color: var(--ink-soft);
  font-size: 1.02rem;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
  margin-top: 2.8rem;
  padding-top: 2rem;
  border-top: 1px solid var(--line);
}
.stat {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.stat__value {
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 850;
  letter-spacing: -0.03em;
  line-height: 1;
}
.stat__label {
  font-family: var(--mono);
  font-size: 0.8rem;
  color: var(--muted);
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

.principles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin-top: 2.6rem;
}
.pr {
  display: flex;
  gap: 1.1rem;
  padding: 1.5rem 1.4rem;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: #fff;
}
.pr__idx {
  font-family: var(--mono);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--accent-ink);
  line-height: 1.2;
}
.pr__title {
  font-size: 1.08rem;
  font-weight: 750;
}
.pr__desc {
  color: var(--ink-soft);
  font-size: 0.93rem;
  margin-top: 0.4rem;
}

.cta {
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
.cta__title {
  font-size: 1.3rem;
  font-weight: 800;
  letter-spacing: -0.015em;
}
.cta__actions {
  display: flex;
  gap: 0.7rem;
  flex-wrap: wrap;
}

@media (max-width: 640px) {
  .cta {
    padding: 1.6rem 1.3rem;
  }
}
</style>
