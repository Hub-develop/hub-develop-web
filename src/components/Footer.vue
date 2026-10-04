<script setup lang="ts">
import { site } from '@/content/site'

const year = new Date().getFullYear()
const f = site.footer
</script>

<template>
  <footer class="foot">
    <div class="foot__grid" aria-hidden="true"></div>
    <div class="foot__glow" aria-hidden="true"></div>

    <div class="container foot__inner">
      <p class="prompt foot__prompt">
        <span class="prompt__user">{{ f.term.user }}@{{ f.term.host }}</span
        ><span class="prompt__path">:~$</span> {{ f.term.cmd
        }}<span class="cursor" aria-hidden="true"></span>
      </p>

      <RouterLink class="foot__mark" to="/" :aria-label="f.wordmark">
        {{ f.wordmark }}
      </RouterLink>

      <div class="foot__row">
        <p class="foot__copy">
          © {{ year }}
          <a class="foot__copy-link" :href="site.brand.repo" target="_blank" rel="noopener">{{
            f.copyrightName
          }}</a>
          · {{ f.note }}
        </p>
        <nav class="foot__nav" aria-label="页脚导航">
          <RouterLink v-for="n in site.nav" :key="n.to" :to="n.to">{{ n.label }}</RouterLink>
          <a :href="site.brand.repo" target="_blank" rel="noopener">GitHub</a>
        </nav>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.foot {
  position: relative;
  overflow: hidden;
  background: var(--dark);
  color: var(--dark-ink);
  padding: 5rem 0 2.4rem;
  isolation: isolate;
}

/* 网格 */
.foot__grid {
  position: absolute;
  inset: 0;
  z-index: -2;
  background-image: linear-gradient(to right, var(--dark-line-soft) 1px, transparent 1px),
    linear-gradient(to bottom, var(--dark-line-soft) 1px, transparent 1px);
  background-size: 54px 54px;
  -webkit-mask-image: radial-gradient(ellipse 105% 95% at 50% 105%, #000 28%, transparent 76%);
  mask-image: radial-gradient(ellipse 105% 95% at 50% 105%, #000 28%, transparent 76%);
}

/* 底部极光 */
.foot__glow {
  position: absolute;
  inset: auto 0 -34% 0;
  height: 78%;
  z-index: -1;
  background: radial-gradient(closest-side, rgba(99, 102, 241, 0.55), transparent 70%) 28% 82% /
      52% 92% no-repeat,
    radial-gradient(closest-side, rgba(168, 85, 247, 0.42), transparent 70%) 58% 92% / 56% 82%
      no-repeat,
    radial-gradient(closest-side, rgba(56, 189, 248, 0.34), transparent 70%) 82% 68% / 46% 72%
      no-repeat;
  filter: blur(28px);
  opacity: 0.8;
  animation: drift 18s ease-in-out infinite alternate;
}
@keyframes drift {
  from {
    transform: translate3d(-3%, 0, 0) scale(1);
  }
  to {
    transform: translate3d(3%, -4%, 0) scale(1.08);
  }
}

.foot__inner {
  position: relative;
  z-index: 1;
}

.foot__prompt {
  margin-bottom: 0.4rem;
}
.foot__prompt .prompt__user {
  color: #a5b4fc;
}
.foot__prompt .prompt__path {
  color: var(--dark-ink);
}
.cursor {
  display: inline-block;
  width: 8px;
  height: 1em;
  margin-left: 4px;
  vertical-align: -2px;
  background: var(--dark-ink);
  animation: blink 1.1s steps(1) infinite;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}

/* 超大白色字标 */
.foot__mark {
  display: block;
  font-size: clamp(3rem, 13vw, 10rem);
  font-weight: 850;
  letter-spacing: -0.045em;
  line-height: 0.95;
  margin: 1.2rem 0 2.4rem;
  background: linear-gradient(180deg, #ffffff 28%, #737a95 130%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  transition: opacity 0.25s ease;
  width: fit-content;
}
.foot__mark:hover {
  opacity: 0.85;
}

.foot__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
  flex-wrap: wrap;
  border-top: 1px solid var(--dark-line);
  padding-top: 1.6rem;
}
.foot__copy {
  color: var(--dark-muted);
  font-size: 0.88rem;
}
.foot__copy-link {
  color: var(--dark-ink);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.foot__nav {
  display: flex;
  gap: 1.2rem;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--dark-muted);
  flex-wrap: wrap;
}
.foot__nav a {
  transition: color 0.18s ease;
}
.foot__nav a:hover {
  color: var(--dark-ink);
}

@media (max-width: 640px) {
  .foot {
    padding: 3.6rem 0 2rem;
  }
}
</style>
