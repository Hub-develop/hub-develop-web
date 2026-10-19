<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let raf = 0
let running = true

type Blob = { x: number; y: number; r: number; vx: number; vy: number; hue: [number, number, number] }
let blobs: Blob[] = []
let W = 0
let H = 0

// 深色里的「光阴流转」：薄荷绿 / 翡翠 / 蓝 / 紫的极光光斑缓慢游走
const PALETTE: [number, number, number][] = [
  [111, 238, 194], // 薄荷（hub 强调）
  [43, 189, 134], // 翡翠（code）
  [56, 132, 255], // 蓝
  [124, 92, 255], // 紫
]

function resize() {
  const c = canvas.value
  if (!c) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  W = window.innerWidth
  H = window.innerHeight
  c.width = Math.floor(W * dpr)
  c.height = Math.floor(H * dpr)
  c.style.width = W + 'px'
  c.style.height = H + 'px'
  ctx = c.getContext('2d')
  if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  initBlobs()
}

function initBlobs() {
  const count = 6
  blobs = Array.from({ length: count }, (_, i) => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.max(W, H) * (0.28 + Math.random() * 0.22),
    vx: (Math.random() - 0.5) * 0.24,
    vy: (Math.random() - 0.5) * 0.24,
    hue: PALETTE[i % PALETTE.length],
  }))
}

function draw() {
  if (!ctx) return
  ctx.clearRect(0, 0, W, H)
  ctx.globalCompositeOperation = 'lighter'
  for (const b of blobs) {
    b.x += b.vx
    b.y += b.vy
    if (b.x < -b.r) b.x = W + b.r
    if (b.x > W + b.r) b.x = -b.r
    if (b.y < -b.r) b.y = H + b.r
    if (b.y > H + b.r) b.y = -b.r
    const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r)
    const [r, gg, bl] = b.hue
    g.addColorStop(0, `rgba(${r},${gg},${bl},0.20)`)
    g.addColorStop(0.5, `rgba(${r},${gg},${bl},0.07)`)
    g.addColorStop(1, `rgba(${r},${gg},${bl},0)`)
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.globalCompositeOperation = 'source-over'
}

function loop() {
  if (!running) return
  draw()
  raf = requestAnimationFrame(loop)
}

onMounted(() => {
  const c = canvas.value
  if (!c) return
  ctx = c.getContext('2d')
  if (!ctx) return
  resize()
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) {
    draw()
    return
  }
  raf = requestAnimationFrame(loop)
  window.addEventListener('resize', resize)
  document.addEventListener('visibilitychange', () => {
    running = !document.hidden
    if (running && !reduce) raf = requestAnimationFrame(loop)
  })
})

onBeforeUnmount(() => {
  running = false
  cancelAnimationFrame(raf)
  window.removeEventListener('resize', resize)
})
</script>

<template>
  <canvas ref="canvas" class="time-light" aria-hidden="true"></canvas>
</template>

<style scoped>
.time-light {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  display: block;
}
</style>
