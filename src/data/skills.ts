import type { Skill } from '@/types';

export const skills: Skill[] = [
  // Mobile
  { id: 'kotlin', name: 'Kotlin', category: 'mobile', level: 'advanced' },
  { id: 'android', name: 'Android', category: 'mobile', level: 'advanced' },
  { id: 'flutter', name: 'Flutter / Dart', category: 'mobile', level: 'advanced' },
  { id: 'wechat-miniprogram', name: '微信小程序', category: 'mobile', level: 'advanced' },
  { id: 'media3', name: 'Media3 ExoPlayer', category: 'mobile', level: 'intermediate' },
  { id: 'gradle', name: 'Gradle Kotlin DSL', category: 'mobile', level: 'intermediate' },

  // Frontend
  { id: 'vue', name: 'Vue 3', category: 'frontend', level: 'expert' },
  { id: 'react', name: 'React', category: 'frontend', level: 'advanced' },
  { id: 'typescript', name: 'TypeScript', category: 'frontend', level: 'expert' },
  { id: 'nextjs', name: 'Next.js', category: 'frontend', level: 'advanced' },
  { id: 'astro', name: 'Astro', category: 'frontend', level: 'advanced' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', level: 'expert' },
  { id: 'threejs', name: 'Three.js', category: 'frontend', level: 'intermediate' },

  // Desktop
  { id: 'rust', name: 'Rust', category: 'desktop', level: 'intermediate' },
  { id: 'tauri', name: 'Tauri', category: 'desktop', level: 'advanced' },
  { id: 'msix', name: 'MSIX', category: 'desktop', level: 'intermediate' },

  // Backend
  { id: 'node', name: 'Node.js', category: 'backend', level: 'advanced' },
  { id: 'fastapi', name: 'FastAPI', category: 'backend', level: 'intermediate' },
  { id: 'postgresql', name: 'PostgreSQL', category: 'backend', level: 'intermediate' },
  { id: 'redis', name: 'Redis', category: 'backend', level: 'intermediate' },

  // DevOps
  { id: 'cloudflare', name: 'Cloudflare', category: 'devops', level: 'advanced' },
  { id: 'nginx', name: 'Nginx', category: 'devops', level: 'intermediate' },
  { id: 'systemd', name: 'Linux systemd', category: 'devops', level: 'intermediate' },
  { id: 'git', name: 'Git', category: 'devops', level: 'expert' },
  { id: 'ci-cd', name: 'CI/CD', category: 'devops', level: 'advanced' },

  // Language
  { id: 'javascript', name: 'JavaScript', category: 'language', level: 'expert' },
  { id: 'python', name: 'Python', category: 'language', level: 'advanced' },
  { id: 'go', name: 'Go', category: 'language', level: 'beginner' },
];
