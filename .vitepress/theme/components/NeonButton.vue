<template>
  <a :href="href" class="neon-button" :class="{ 'neon-button-outlined': outlined }">
    <span class="neon-button-text">
      <slot></slot>
    </span>
    <span class="neon-button-border"></span>
  </a>
</template>

<script setup>
defineProps({
  href: {
    type: String,
    default: '#'
  },
  outlined: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.neon-button {
  position: relative;
  display: inline-flex;
  padding: 0.75rem 2rem;
  margin: 0.5rem;
  overflow: hidden;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--neon-color);
  border: none;
  border-radius: 4px;
  background-color: rgba(15, 23, 42, 0.7);
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: 0.9rem;
  justify-content: center;
  align-items: center;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  z-index: 1;
  min-width: 160px;
  text-align: center;
  white-space: nowrap;
}

.neon-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--neon-color);
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.neon-button:hover, .neon-button:active {
  color: #111;
  text-shadow: none;
  box-shadow: 0 0 25px var(--neon-color);
}

.neon-button:hover::before, .neon-button:active::before {
  opacity: 1;
}

.neon-button-text {
  position: relative;
  z-index: 2;
}

.neon-button-outlined {
  background-color: transparent;
  box-shadow: inset 0 0 0 2px var(--neon-color);
}

.neon-button-outlined:hover, .neon-button-outlined:active {
  background-color: var(--neon-color);
  box-shadow: 0 0 25px var(--neon-color);
}

.neon-button-border {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: inset 0 0 0 0 var(--neon-color);
  transition: box-shadow 0.3s ease;
}

.neon-button:hover .neon-button-border, .neon-button:active .neon-button-border {
  box-shadow: inset 0 0 0 4px var(--neon-color);
}

@media (max-width: 768px) {
  .neon-button {
    padding: 0.6rem 1.5rem;
    font-size: 0.8rem;
    letter-spacing: 1.5px;
    min-width: 140px;
  }
}

@media (max-width: 480px) {
  .neon-button {
    padding: 0.5rem 1.2rem;
    font-size: 0.75rem;
    letter-spacing: 1px;
    margin: 0.3rem;
    width: 90%;
    min-width: auto;
  }
}
</style> 