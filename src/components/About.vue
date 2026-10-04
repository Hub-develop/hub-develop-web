<script setup lang="ts">
const capabilities = [
  { idx: '01', title: '跨平台桌面', stack: '.NET · Avalonia', desc: '以原生一致的体验，打造真正好用的桌面应用。' },
  { idx: '02', title: '服务端与容器', stack: 'Spring Boot · Docker', desc: '无 UI 启动器 + 网页控制面板，一键拉起与部署。' },
  { idx: '03', title: '文档与框架', stack: 'MD3 · TypeScript', desc: '可复用、可定制的文档框架，跨项目无缝互通。' },
  { idx: '04', title: '操作系统', stack: 'ChromiumOS', desc: '从底层出发，探索更开放、更可控的系统形态。' },
]
</script>

<template>
  <section id="about" class="about">
    <div class="container">
      <div v-reveal class="about__head">
        <p class="section-kicker">// about</p>
        <h2 class="section-title">关于 Hub-develop</h2>
        <p class="lead about__lead">
          Hub-develop 是 <strong>CodeHub 的上游组织</strong>，定位于底层能力与研究。我们把通用、可复用的工程能力沉淀在这里，再以更产品化的形态在 CodeHub 下对外发布。
        </p>
      </div>

      <div class="about__grid">
        <article v-for="c in capabilities" :key="c.idx" v-reveal class="cap">
          <span class="cap__idx">{{ c.idx }}</span>
          <h3 class="cap__title">{{ c.title }}</h3>
          <p class="cap__stack">{{ c.stack }}</p>
          <p class="cap__desc">{{ c.desc }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  padding: 5.5rem 0 4.5rem;
  border-top: 1px solid var(--line);
}
.about__lead {
  margin-top: 1.1rem;
  max-width: 60ch;
}
.about__lead strong {
  color: var(--accent-ink);
}
.about__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 1rem;
  margin-top: 2.6rem;
}
.cap {
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 1.5rem 1.4rem;
  background: #fff;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}
.cap:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
  border-color: var(--line-strong);
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
</style>
