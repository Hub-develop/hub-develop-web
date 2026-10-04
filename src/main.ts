import { createApp } from 'vue'
import type { Directive } from 'vue'
import App from './App.vue'
import './style.css'

const reveal: Directive<HTMLElement> = {
  mounted(el) {
    el.classList.add('reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('reveal--in')
            io.unobserve(el)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
  },
}

createApp(App).directive('reveal', reveal).mount('#app')
