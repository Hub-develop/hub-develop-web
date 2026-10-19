import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

createApp(App).mount('#app')

// 等「阿里妈妈方圆体」就绪后再淡入页面，消除字体换脸闪烁（FOUT）。
// 显式触发该字体面加载；最多等 1.5s 兜底，避免弱网下长时间空白。
const reveal = () => document.getElementById('app')?.classList.add('ready')
if (document.fonts && typeof document.fonts.load === 'function') {
  const fontReady = document.fonts
    .load('800 1em "Alimama FangYuanTi VF"')
    .then(() => document.fonts.ready)
    .catch(() => {})
  Promise.race([fontReady, new Promise((r) => setTimeout(r, 1500))])
    .then(reveal)
    .catch(reveal)
} else {
  reveal()
}
