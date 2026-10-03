<template>
  <section id="top" class="hero">
    <div class="hero__bg" aria-hidden="true"></div>
    <div class="hero__inner">
      <span class="hero__badge">CodeHub 的上游开源组织</span>
      <h1 class="hero__title">Hub-develop</h1>
      <p class="hero__lead">
        我们构建跨平台桌面、服务端、文档框架与操作系统级别的开源基础设施，为下游的
        CodeHub 提供坚实底座。
      </p>
      <div class="hero__actions">
        <a class="btn btn--primary" href="#projects">查看项目</a>
        <a
          class="btn btn--ghost"
          href="https://github.com/Hub-develop"
          target="_blank"
          rel="noopener"
          >在 GitHub 上关注</a
        >
      </div>
      <ul class="hero__stats">
        <li><strong>6+</strong><span>开源项目</span></li>
        <li><strong>5</strong><span>技术方向</span></li>
        <li><strong>∞</strong><span>开源协议</span></li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  padding: 9rem 1.4rem 5rem;
  background: var(--bg-soft);
}
.hero__bg {
  position: absolute;
  inset: -20% -10% auto -10%;
  height: 520px;
  background: radial-gradient(60% 60% at 30% 20%, rgba(99, 102, 241, 0.18), transparent 70%),
    radial-gradient(50% 50% at 80% 10%, rgba(168, 85, 247, 0.16), transparent 70%);
  filter: blur(8px);
  pointer-events: none;
}
.hero__inner {
  position: relative;
  max-width: 880px;
  margin: 0 auto;
  text-align: center;
}
.hero__badge {
  display: inline-block;
  padding: 0.35rem 0.9rem;
  border-radius: 999px;
  background: #fff;
  border: 1px solid var(--border);
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 1.4rem;
}
.hero__title {
  font-size: clamp(2.8rem, 8vw, 5rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  margin: 0;
  background: linear-gradient(135deg, #312e81, var(--primary), var(--primary-2));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hero__lead {
  max-width: 620px;
  margin: 1.2rem auto 0;
  font-size: clamp(1rem, 2vw, 1.18rem);
  color: var(--text-soft);
}
.hero__actions {
  display: flex;
  gap: 0.9rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
}
.hero__stats {
  list-style: none;
  display: flex;
  gap: 2.4rem;
  justify-content: center;
  padding: 0;
  margin: 3rem 0 0;
  flex-wrap: wrap;
}
.hero__stats li {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.hero__stats strong {
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary), var(--primary-2));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hero__stats span {
  font-size: 0.85rem;
  color: var(--text-soft);
}
</style>
