<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="page">
    <div class="container nf">
      <p class="prompt nf__term">
        <span class="prompt__user">guest@hub-develop</span><span class="prompt__path">:~$</span>
        cd {{ route.fullPath }}<span class="cursor" aria-hidden="true"></span>
      </p>
      <p class="nf__err">cd: no such file or directory</p>

      <h1 class="nf__code">404</h1>
      <p class="nf__text">你要找的页面不存在，或者已经被移动到别处了。</p>

      <div class="nf__actions">
        <RouterLink class="btn btn--primary" to="/">回到首页</RouterLink>
        <RouterLink class="btn btn--ghost" to="/projects">看看项目</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: calc(var(--nav-h) + 4rem) 0 5rem;
}
.nf {
  max-width: 720px;
}
.nf__term {
  font-size: 0.95rem;
}
.cursor {
  display: inline-block;
  width: 9px;
  height: 1.05em;
  margin-left: 4px;
  vertical-align: -2px;
  background: var(--ink);
  animation: blink 1.1s steps(1) infinite;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}
.nf__err {
  font-family: var(--mono);
  font-size: 0.9rem;
  color: var(--rose-ink);
  margin-top: 0.3rem;
}
.nf__code {
  font-size: clamp(4rem, 16vw, 9rem);
  font-weight: 850;
  letter-spacing: -0.05em;
  line-height: 1;
  margin-top: 1.4rem;
  background: linear-gradient(180deg, var(--ink) 30%, #9aa0ae 130%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  width: fit-content;
}
.nf__text {
  color: var(--ink-soft);
  font-size: 1.05rem;
  margin-top: 0.8rem;
}
.nf__actions {
  display: flex;
  gap: 0.7rem;
  flex-wrap: wrap;
  margin-top: 2rem;
}
</style>
