<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer__inner">
      <div>
        <span class="footer__brand">Hub-develop</span>
        <p class="footer__note">CodeHub 的上游开源组织</p>
      </div>
      <nav class="footer__links">
        <a href="#top">首页</a>
        <a href="#about">关于</a>
        <a href="#projects">项目</a>
        <a href="https://github.com/Hub-develop" target="_blank" rel="noopener">GitHub</a>
      </nav>
    </div>
    <p class="footer__copy">© {{ year }} Hub-develop · 以开源之名构建。</p>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--border);
  background: var(--bg);
  padding: 2.6rem 1.4rem 2rem;
}
.footer__inner {
  max-width: 1080px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}
.footer__brand {
  font-weight: 800;
  font-size: 1.1rem;
}
.footer__note {
  margin: 0.2rem 0 0;
  color: var(--text-soft);
  font-size: 0.88rem;
}
.footer__links {
  display: flex;
  gap: 1.3rem;
  font-weight: 600;
  color: var(--text-soft);
  font-size: 0.92rem;
}
.footer__links a:hover {
  color: var(--primary);
}
.footer__copy {
  max-width: 1080px;
  margin: 1.6rem auto 0;
  color: var(--text-soft);
  font-size: 0.82rem;
}
</style>
