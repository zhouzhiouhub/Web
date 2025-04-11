<template>
  <div class="tech-hero">
    <div class="tech-hero-content">
      <slot></slot>
    </div>
    <div class="scanline"></div>
    <div class="tech-hero-glitch"></div>
    <div class="corners">
      <div class="corner top-left"></div>
      <div class="corner top-right"></div>
      <div class="corner bottom-left"></div>
      <div class="corner bottom-right"></div>
    </div>
  </div>
</template>

<script setup>
// No additional script logic needed
</script>

<style scoped>
.tech-hero {
  position: relative;
  padding: 4rem 2rem;
  overflow: hidden;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(10, 15, 24, 0.95) 100%);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  margin: 1rem auto;
  max-width: 1200px;
  border: 1px solid rgba(0, 180, 255, 0.2);
}

.tech-hero-content {
  position: relative;
  z-index: 2;
}

/* 扫描线效果 */
.scanline {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: rgba(0, 180, 255, 0.3);
  box-shadow: 0 0 15px rgba(0, 180, 255, 0.5);
  opacity: 0.8;
  z-index: 1;
  animation: scanlineAnimation 4s linear infinite;
}

@keyframes scanlineAnimation {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(2000%);
  }
}

/* 故障效果 */
.tech-hero-glitch {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 1;
  opacity: 0.05;
  background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
  pointer-events: none;
  animation: glitchEffect 8s infinite linear alternate;
}

@keyframes glitchEffect {
  0%, 100% {
    opacity: 0.05;
    transform: translate(0);
  }
  92% {
    opacity: 0.1;
    transform: translate(3px, 5px);
  }
  94% {
    opacity: 0.15;
    transform: translate(-3px, -5px);
  }
  96% {
    opacity: 0.2;
    transform: translate(5px, -2px);
  }
  98% {
    opacity: 0.25;
    transform: translate(-5px, 2px);
  }
}

/* 角落装饰 */
.corners .corner {
  position: absolute;
  width: 30px;
  height: 30px;
  border-color: var(--vp-c-brand);
  opacity: 0.6;
}

.corner.top-left {
  top: 10px;
  left: 10px;
  border-top: 2px solid;
  border-left: 2px solid;
}

.corner.top-right {
  top: 10px;
  right: 10px;
  border-top: 2px solid;
  border-right: 2px solid;
}

.corner.bottom-left {
  bottom: 10px;
  left: 10px;
  border-bottom: 2px solid;
  border-left: 2px solid;
}

.corner.bottom-right {
  bottom: 10px;
  right: 10px;
  border-bottom: 2px solid;
  border-right: 2px solid;
}

@media (max-width: 768px) {
  .tech-hero {
    padding: 3rem 1.5rem;
    margin: 0.5rem auto;
    border-radius: 8px;
  }
  
  .corners .corner {
    width: 20px;
    height: 20px;
  }
}

@media (max-width: 480px) {
  .tech-hero {
    padding: 2rem 1rem;
    margin: 0.5rem 0.5rem;
    box-shadow: 0 15px 30px -12px rgba(0, 0, 0, 0.5);
  }
  
  .corners .corner {
    width: 15px;
    height: 15px;
  }
  
  .scanline {
    height: 2px;
  }
}
</style>