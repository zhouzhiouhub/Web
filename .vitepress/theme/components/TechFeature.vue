<template>
  <div class="tech-feature tech-card tech-hover" :class="{ 'glowing-border': glowing }">
    <div class="tech-feature-icon">
      <slot name="icon">
        <div class="default-icon"></div>
      </slot>
    </div>
    <div class="tech-feature-content">
      <h3 class="tech-feature-title">{{ title }}</h3>
      <p class="tech-feature-details">{{ details }}</p>
      <slot></slot>
    </div>
    <div class="tech-feature-line"></div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  glowing: {
    type: Boolean,
    default: false
  }
})
</script>

<style>
.tech-feature {
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: all 0.3s ease;
  position: relative;
}

.tech-feature-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 2.5rem;
  color: var(--vp-c-brand);
}

.default-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: linear-gradient(45deg, var(--vp-c-brand), var(--vp-c-brand-light));
  position: relative;
}

.default-icon::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  border-radius: 50%;
  background: var(--vp-c-bg-soft);
}

.tech-feature-content {
  flex: 1;
}

.tech-feature-title {
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-dark);
  position: relative;
  display: inline-block;
}

.tech-feature-title::after {
  content: '';
  position: absolute;
  bottom: -0.5rem;
  left: 0;
  width: 2.5rem;
  height: 2px;
  background: linear-gradient(to right, var(--vp-c-brand), transparent);
}

.tech-feature-details {
  margin: 0;
  color: var(--vp-c-text-light);
  line-height: 1.6;
}

.tech-feature-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(to right, var(--vp-c-brand), transparent);
  transition: width 0.6s ease;
}

.tech-feature:hover .tech-feature-line {
  width: 100%;
}

/* 提供触摸屏设备的反馈效果 */
@media (hover: none) {
  .tech-feature:active {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 180, 255, 0.2);
  }
  
  .tech-feature:active .tech-feature-line {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .tech-feature-title {
    font-size: 1.2rem;
  }
  
  .tech-feature-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  .default-icon {
    width: 2.5rem;
    height: 2.5rem;
  }
}

@media (max-width: 480px) {
  .tech-feature {
    padding: 1.25rem;
  }
  
  .tech-feature-title {
    font-size: 1.1rem;
  }
  
  .tech-feature-icon {
    font-size: 1.8rem;
    margin-bottom: 0.8rem;
  }
  
  .default-icon {
    width: 2.2rem;
    height: 2.2rem;
  }
  
  .tech-feature-title::after {
    width: 2rem;
  }
}
</style> 