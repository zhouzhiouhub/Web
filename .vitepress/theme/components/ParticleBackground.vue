<template>
  <div class="particle-background">
    <canvas ref="canvas" class="particles-canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

const canvas = ref(null)
let animationFrame = null
let ctx
let particles = []
let isMobile = false

// 根据设备类型调整粒子数量和连接距离
const particleCount = computed(() => isMobile ? 40 : 80)
const particleColor = 'rgba(0, 180, 255, 0.4)'
const connectionDistance = computed(() => isMobile ? 100 : 150)
const connectionColor = 'rgba(0, 180, 255, 0.15)'

class Particle {
  constructor(x, y, size, speed) {
    this.x = x
    this.y = y
    this.size = size
    this.speed = speed
    this.vx = (Math.random() - 0.5) * this.speed
    this.vy = (Math.random() - 0.5) * this.speed
  }

  update(width, height) {
    this.x += this.vx
    this.y += this.vy

    if (this.x < 0 || this.x > width) {
      this.vx = -this.vx
    }

    if (this.y < 0 || this.y > height) {
      this.vy = -this.vy
    }
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = particleColor
    ctx.fill()
  }
}

function connectParticles(particles, ctx) {
  // 在移动设备上减少连接检查以提高性能
  const step = isMobile ? 2 : 1
  for (let i = 0; i < particles.length; i += step) {
    for (let j = i + 1; j < particles.length; j += step) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < connectionDistance.value) {
        ctx.beginPath()
        ctx.strokeStyle = connectionColor
        ctx.lineWidth = 1
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.stroke()
      }
    }
  }
}

function checkMobile() {
  isMobile = window.innerWidth <= 768
}

function resizeCanvas() {
  if (canvas.value) {
    checkMobile()
    canvas.value.width = window.innerWidth
    canvas.value.height = window.innerHeight

    // 重新初始化粒子位置
    initParticles()
  }
}

function initParticles() {
  particles = []
  if (!canvas.value) return

  const width = canvas.value.width
  const height = canvas.value.height

  for (let i = 0; i < particleCount.value; i++) {
    const size = Math.random() * (isMobile ? 1.5 : 2) + 1
    const x = Math.random() * width
    const y = Math.random() * height
    const speed = Math.random() * (isMobile ? 0.5 : 0.8) + (isMobile ? 0.1 : 0.2)

    particles.push(new Particle(x, y, size, speed))
  }
}

function animate() {
  if (!canvas.value || !ctx) return

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

  for (const particle of particles) {
    particle.update(canvas.value.width, canvas.value.height)
    particle.draw(ctx)
  }

  connectParticles(particles, ctx)
  animationFrame = requestAnimationFrame(animate)
}

onMounted(() => {
  if (canvas.value) {
    checkMobile()
    ctx = canvas.value.getContext('2d')
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    animate()
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeCanvas)
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
})
</script>

<style scoped>
.particle-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  overflow: hidden;
}

.particles-canvas {
  display: block;
  background-color: transparent;
}
</style> 