<script setup lang="ts">
import { onMounted } from 'vue'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import BackToTop from '@/components/BackToTop.vue'
import { useGithub } from '@/content/github'

const { refresh } = useGithub()

// 构建快照已就位；再按 TTL 尝试一次运行时刷新（失败静默回退到快照）
onMounted(() => {
  refresh().catch(() => undefined)
})
</script>

<template>
  <NavBar />
  <main class="app-main">
    <RouterView v-slot="{ Component, route }">
      <Transition name="page" mode="out-in">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
  </main>
  <Footer />
  <BackToTop />
</template>

<style scoped>
.app-main {
  min-height: 68vh;
}
</style>
