<script setup lang="ts">
const tags = [
  '跨平台',
  '.NET / Avalonia',
  'Flutter',
  'Spring Boot',
  'Docker',
  'TypeScript',
  'ChromiumOS',
]
</script>

<template>
  <section id="top" class="hero">
    <div class="hero__grid grid-bg" aria-hidden="true"></div>
    <div class="container hero__inner">
      <div class="hero__copy">
        <p class="hero__kicker">为开源开发者打造跨平台、可持续迭代的工程底座</p>
        <p class="hero__term">
          <span class="hero__term-user">guest@hub-develop</span><span class="hero__term-path">:~$</span>
          whoami<span class="hero__cursor" aria-hidden="true"></span>
        </p>
        <h1 class="hero__title">Hub-develop</h1>
        <p class="hero__sub">源自 CodeHub 的上游组织。</p>
        <ul class="hero__tags">
          <li v-for="t in tags" :key="t" class="tag">{{ t }}</li>
        </ul>
        <div class="hero__actions">
          <a class="btn btn--primary" href="#projects">查看核心项目</a>
          <a class="btn btn--ghost" href="https://github.com/Hub-develop" target="_blank" rel="noopener">
            在 GitHub 关注
          </a>
        </div>
      </div>

      <div class="hero__visual" aria-hidden="true">
        <div class="term">
          <div class="term__bar">
            <span class="term__dot term__dot--r"></span>
            <span class="term__dot term__dot--y"></span>
            <span class="term__dot term__dot--g"></span>
            <span class="term__title">hub-develop — zsh</span>
          </div>
          <pre class="term__body"><span class="c-cmd">$ hub-develop --about</span>
<span class="c-key">org</span>        <span class="c-val">Hub-develop</span>
<span class="c-key">upstream</span>   <span class="c-val">CodeHub</span>
<span class="c-key">focus</span>      <span class="c-val">cross-platform · server · docs · os</span>
<span class="c-key">repos</span>      <span class="c-num">6</span> public
<span class="c-key">status</span>     <span class="c-ok">● building</span>
<span class="c-cmd">$ </span><span class="hero__cursor hero__cursor--sm"></span></pre>
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
  font-family: var(--mono);
  font-size: 0.9rem;
  color: var(--muted);
  margin-bottom: 0.9rem;
}
.hero__term-user {
  color: var(--accent-ink);
  font-weight: 600;
}
.hero__term-path {
  color: var(--ink);
}
.hero__cursor {
  display: inline-block;
  width: 9px;
  height: 1.05em;
  margin-left: 4px;
  vertical-align: -2px;
  background: var(--ink);
  animation: blink 1.1s steps(1) infinite;
}
.hero__cursor--sm {
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
.c-cmd {
  color: #e6e9f5;
}
.c-key {
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
</style>
