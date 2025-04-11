import DefaultTheme from 'vitepress/theme'
import './styles/custom.css'
import TechHero from './components/TechHero.vue'
import TechFeature from './components/TechFeature.vue'
import ParticleBackground from './components/ParticleBackground.vue'
import NeonButton from './components/NeonButton.vue'

export default {
  extends: DefaultTheme, // 使用 extends 替代展开运算符
  enhanceApp({ app }) {
    app.component('TechHero', TechHero)
    app.component('TechFeature', TechFeature)
    app.component('ParticleBackground', ParticleBackground)
    app.component('NeonButton', NeonButton)
  }
}