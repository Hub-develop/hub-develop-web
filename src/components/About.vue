<template>
  <section id="about" class="about">
    <div class="about__inner">
      <h2 class="section__title">关于 Hub-develop</h2>
      <p class="about__text">
        Hub-develop 是 <strong>CodeHub 的上游组织</strong>，定位于底层能力与研究。我们把通用、可复用的工程能力沉淀在这里，再以更产品化的形态在 CodeHub 下对外发布。
      </p>
      <div class="about__grid">
        <div class="about__card">
          <h3>跨平台桌面</h3>
          <p>以 .NET / Avalonia 打造原生体验一致的桌面应用。</p>
        </div>
        <div class="about__card">
          <h3>服务端 &amp; 容器</h3>
          <p>无 UI 启动器 + 网页面板，一键拉起与容器化部署。</p>
        </div>
        <div class="about__card">
          <h3>文档 &amp; 框架</h3>
          <p>自主 MD3 文档框架，跨项目复用、主题可定制。</p>
        </div>
        <div class="about__card">
          <h3>操作系统</h3>
          <p>基于 ChromiumOS 衍生，探索更开放的系统形态。</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  padding: 5rem 1.4rem;
  max-width: 1080px;
  margin: 0 auto;
}
.about__text {
  color: var(--text-soft);
  font-size: 1.05rem;
  max-width: 720px;
  margin: 0 0 2.4rem;
}
.about__text strong {
  color: var(--text);
}
.about__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.2rem;
}
.about__card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: var(--shadow);
}
.about__card h3 {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
  font-weight: 700;
}
.about__card p {
  margin: 0;
  color: var(--text-soft);
  font-size: 0.95rem;
}
</style>
