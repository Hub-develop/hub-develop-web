<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <div class="footer__brand">
        <span class="footer__logo">HD</span>
        <div>
          <p class="footer__name">Hub-develop</p>
          <p class="footer__note">CodeHub 的上游开源组织</p>
        </div>
      </div>
      <nav class="footer__links">
        <a href="#top">首页</a>
        <a href="#about">关于</a>
        <a href="#projects">核心项目</a>
        <a href="https://github.com/Hub-develop" target="_blank" rel="noopener">GitHub</a>
      </nav>
    </div>
    <p class="container footer__copy">© {{ year }} Hub-develop · 以开源之名构建。</p>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--line);
  background: #fff;
  padding: 3rem 0 2.2rem;
}
.footer__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.4rem;
  flex-wrap: wrap;
}
.footer__brand {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}
.footer__logo {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: var(--ink);
  color: #fff;
  font-size: 0.8rem;
  font-weight: 800;
}
.footer__name {
  font-weight: 800;
  letter-spacing: -0.01em;
}
.footer__note {
  color: var(--muted);
  font-size: 0.85rem;
}
.footer__links {
  display: flex;
  gap: 1.3rem;
  font-weight: 600;
  font-size: 0.92rem;
  color: var(--ink-soft);
  flex-wrap: wrap;
}
.footer__links a:hover {
  color: var(--ink);
}
.footer__copy {
  margin-top: 2rem;
  color: var(--muted);
  font-size: 0.82rem;
}
</style>
