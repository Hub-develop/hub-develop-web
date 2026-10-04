<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import BackToTop from '@/components/BackToTop.vue'
import { useGithub } from '@/content/github'
import { locale } from '@/i18n'
import { site } from '@/content/site'

const { refresh } = useGithub()
const route = useRoute()

// 构建快照已就位；再按 TTL 尝试一次运行时刷新（失败静默回退到快照）
onMounted(() => {
  refresh().catch(() => undefined)
})

// 切换语言时，按当前路由重设 <title> 与 description（路由守卫只在路由变化时触发）
function applyMetaForLocale() {
  const seo = site.seo
  const byName: Record<string, { title: string; description?: string }> = {
    home: seo.home,
    projects: seo.projects,
    about: seo.about,
    contact: seo.contact,
    'project-detail': { title: `${site.brand.name} · ${site.brand.tagline}` },
    'project-missing': seo.notFound,
    'not-found': seo.notFound,
  }
  const m = byName[String(route.name)]
  if (!m) return
  document.title = m.title
  if (m.description) {
    const el = document.querySelector('meta[name="description"]')
    if (el) el.setAttribute('content', m.description)
  }
}
watch(locale, applyMetaForLocale)
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
