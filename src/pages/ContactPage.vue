<script setup lang="ts">
import { ref } from 'vue'
import { site } from '@/content/site'

const c = site.contact
const copied = ref<string | null>(null)

async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    copied.value = text
    setTimeout(() => (copied.value = null), 1600)
  } catch {
    copied.value = null
  }
}
</script>

<template>
  <div class="page">
    <div class="container">
      <header class="chead" v-reveal>
        <p class="section-kicker">{{ c.kicker }}</p>
        <h1 class="chead__title">{{ c.title }}</h1>
        <p class="lead">{{ c.lead }}</p>
      </header>

      <div class="channels">
        <a
          v-for="ch in c.channels"
          :key="ch.label"
          class="card chan"
          :href="ch.href"
          target="_blank"
          rel="noopener"
          v-reveal
        >
          <span class="chan__mark" aria-hidden="true">{{ ch.mark }}</span>
          <span class="chan__label">{{ ch.label }}</span>
          <span class="chan__value">{{ ch.value }}</span>
          <span class="chan__desc">{{ ch.desc }}</span>
        </a>
      </div>

      <!-- 复制邮箱（真实可用） -->
      <div class="copy" v-reveal>
        <span class="copy__label">邮箱地址</span>
        <code class="copy__code">{{ site.brand.email }}</code>
        <button class="btn btn--ghost btn--sm" type="button" @click="copy(site.brand.email)">
          {{ copied === site.brand.email ? '已复制' : '复制' }}
        </button>
      </div>
    </div>

    <section class="section section--soft">
      <div class="container">
        <div class="section-head" v-reveal>
          <p class="section-kicker">// join</p>
          <h2 class="section-title">{{ c.join.title }}</h2>
        </div>
        <ol class="steps">
          <li v-for="s in c.join.steps" :key="s.idx" class="step" v-reveal>
            <span class="step__idx">{{ s.idx }}</span>
            <h3 class="step__title">{{ s.title }}</h3>
            <p class="step__desc">{{ s.desc }}</p>
          </li>
        </ol>

        <div class="cta" v-reveal>
          <div>
            <h2 class="cta__title">准备好了吗？</h2>
            <p class="lead">前往 GitHub 组织，挑一个你感兴趣的项目开始吧。</p>
          </div>
          <a class="btn btn--primary" :href="site.brand.repo" target="_blank" rel="noopener">
            打开 GitHub 组织
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page {
  padding: calc(var(--nav-h) + 3.8rem) 0 4rem;
}
.chead {
  max-width: 62ch;
}
.chead__title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 850;
  letter-spacing: -0.03em;
  line-height: 1.08;
}

.channels {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.1rem;
  margin-top: 2.6rem;
}
.chan {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1.6rem 1.5rem;
}
.chan__mark {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: var(--accent-soft);
  color: var(--accent-ink);
  font-family: var(--mono);
  font-weight: 700;
  margin-bottom: 0.6rem;
}
.chan__label {
  font-weight: 750;
  font-size: 1.05rem;
}
.chan__value {
  font-family: var(--mono);
  font-size: 0.86rem;
  color: var(--accent-ink);
}
.chan__desc {
  color: var(--muted);
  font-size: 0.9rem;
  margin-top: 0.3rem;
}

.copy {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  flex-wrap: wrap;
  margin-top: 1.6rem;
  padding: 1rem 1.2rem;
  border: 1px dashed var(--line-strong);
  border-radius: var(--radius-sm);
}
.copy__label {
  font-family: var(--mono);
  font-size: 0.78rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
}
.copy__code {
  font-family: var(--mono);
  font-size: 0.9rem;
  color: var(--ink);
}
.copy .btn {
  margin-left: auto;
}

.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
  margin-top: 2.6rem;
}
.step {
  padding: 1.5rem 1.4rem;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: #fff;
}
.step__idx {
  font-family: var(--mono);
  font-size: 0.8rem;
  color: var(--accent-ink);
}
.step__title {
  font-size: 1.1rem;
  font-weight: 750;
  margin-top: 0.6rem;
}
.step__desc {
  color: var(--ink-soft);
  font-size: 0.92rem;
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
  background: #fff;
}
.cta__title {
  font-size: 1.3rem;
  font-weight: 800;
  letter-spacing: -0.015em;
}

@media (max-width: 640px) {
  .cta {
    padding: 1.6rem 1.3rem;
  }
}
</style>
