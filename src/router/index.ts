import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { site } from '@/content/site'
import { getProject } from '@/content/projects'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
    meta: { title: site.seo.home.title, description: site.seo.home.description },
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('@/pages/ProjectsPage.vue'),
    meta: { title: site.seo.projects.title, description: site.seo.projects.description },
  },
  {
    path: '/projects/:slug',
    name: 'project-detail',
    component: () => import('@/pages/ProjectDetailPage.vue'),
    props: true,
    /** 动态标题：项目名 */
    beforeEnter: (to) => {
      const p = getProject(String(to.params.slug))
      if (!p) {
        return { name: 'project-missing', params: { slug: to.params.slug } }
      }
      return true
    },
    meta: { title: `项目 · ${site.brand.name}` },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/pages/AboutPage.vue'),
    meta: { title: site.seo.about.title, description: site.seo.about.description },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/pages/ContactPage.vue'),
    meta: { title: site.seo.contact.title, description: site.seo.contact.description },
  },
  {
    path: '/projects/unknown/:slug',
    name: 'project-missing',
    component: () => import('@/pages/NotFoundPage.vue'),
    props: true,
    meta: { title: site.seo.notFound.title },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/NotFoundPage.vue'),
    meta: { title: site.seo.notFound.title, description: site.seo.notFound.description },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 80 }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const title = to.meta.title as string | undefined
  document.title = title ?? site.brand.name
  const desc = to.meta.description as string | undefined
  if (desc) {
    const el = document.querySelector('meta[name="description"]')
    if (el) el.setAttribute('content', desc)
  }
})

export default router
