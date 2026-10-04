<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const show = ref(false)
const onScroll = () => {
  show.value = window.scrollY > 480
}
const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <Transition name="btt">
    <button v-show="show" class="btt" type="button" aria-label="回到顶部" @click="toTop">
      <span aria-hidden="true">↑</span>
    </button>
  </Transition>
</template>

<style scoped>
.btt {
  position: fixed;
  right: 1.6rem;
  bottom: 1.6rem;
  z-index: 60;
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 1px solid var(--line-strong);
  background: var(--dark);
  color: #fff;
  font-size: 1.1rem;
  cursor: pointer;
  box-shadow: 0 10px 26px rgba(11, 11, 15, 0.28);
  transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
}
.btt:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 34px rgba(11, 11, 15, 0.34);
}
.btt:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
.btt-enter-active,
.btt-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}
.btt-enter-from,
.btt-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.9);
}

@media (max-width: 640px) {
  .btt {
    right: 1rem;
    bottom: 1rem;
  }
}
</style>
