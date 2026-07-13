import type { Skill } from '@/types';

export const skills: Skill[] = [
  // Mobile
  { id: 'kotlin', name: 'Kotlin', category: 'mobile', url: 'https://kotlinlang.org/' },
  { id: 'android', name: 'Android', category: 'mobile', url: 'https://developer.android.com/' },
  { id: 'flutter', name: 'Flutter / Dart', category: 'mobile', url: 'https://flutter.dev/' },
  { id: 'wechat-miniprogram', name: '微信小程序', category: 'mobile', url: 'https://developers.weixin.qq.com/miniprogram/dev/framework/' },
  { id: 'media3', name: 'Media3 ExoPlayer', category: 'mobile', url: 'https://developer.android.com/media/media3' },
  { id: 'gradle', name: 'Gradle Kotlin DSL', category: 'mobile', url: 'https://docs.gradle.org/current/userguide/kotlin_dsl.html' },

  // Frontend
  { id: 'vue', name: 'Vue 3', category: 'frontend', url: 'https://cn.vuejs.org/' },
  { id: 'react', name: 'React', category: 'frontend', url: 'https://react.dev/' },
  { id: 'typescript', name: 'TypeScript', category: 'frontend', url: 'https://www.typescriptlang.org/' },
  { id: 'nextjs', name: 'Next.js', category: 'frontend', url: 'https://nextjs.org/' },
  { id: 'astro', name: 'Astro', category: 'frontend', url: 'https://astro.build/' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', url: 'https://tailwindcss.com/' },
  { id: 'threejs', name: 'Three.js', category: 'frontend', url: 'https://threejs.org/' },

  // Desktop
  { id: 'rust', name: 'Rust', category: 'desktop', url: 'https://www.rust-lang.org/' },
  { id: 'tauri', name: 'Tauri', category: 'desktop', url: 'https://tauri.app/' },
  { id: 'msix', name: 'MSIX', category: 'desktop', url: 'https://learn.microsoft.com/en-us/windows/msix/' },

  // Backend
  { id: 'node', name: 'Node.js', category: 'backend', url: 'https://nodejs.org/' },
  { id: 'fastapi', name: 'FastAPI', category: 'backend', url: 'https://fastapi.tiangolo.com/' },
  { id: 'postgresql', name: 'PostgreSQL', category: 'backend', url: 'https://www.postgresql.org/' },
  { id: 'redis', name: 'Redis', category: 'backend', url: 'https://redis.io/' },

  // DevOps
  { id: 'cloudflare', name: 'Cloudflare', category: 'devops', url: 'https://www.cloudflare.com/' },
  { id: 'nginx', name: 'Nginx', category: 'devops', url: 'https://nginx.org/' },
  { id: 'systemd', name: 'Linux systemd', category: 'devops', url: 'https://systemd.io/' },
  { id: 'git', name: 'Git', category: 'devops', url: 'https://git-scm.com/' },
  { id: 'ci-cd', name: 'CI/CD', category: 'devops', url: 'https://docs.github.com/en/actions' },

  // Language
  { id: 'javascript', name: 'JavaScript', category: 'language', url: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript' },
  { id: 'python', name: 'Python', category: 'language', url: 'https://www.python.org/' },
  { id: 'go', name: 'Go', category: 'language', url: 'https://go.dev/' },
];
