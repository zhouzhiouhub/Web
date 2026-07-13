import type { Skill } from '@/types';

export const skills: Skill[] = [
  // Frontend
  { id: 'vue', name: 'Vue 3', category: 'frontend', level: 'expert' },
  { id: 'react', name: 'React', category: 'frontend', level: 'advanced' },
  { id: 'typescript', name: 'TypeScript', category: 'frontend', level: 'expert' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', level: 'expert' },
  { id: 'naive-ui', name: 'Naive UI', category: 'frontend', level: 'advanced' },
  { id: 'vite', name: 'Vite', category: 'frontend', level: 'advanced' },

  // Backend
  { id: 'node', name: 'Node.js', category: 'backend', level: 'advanced' },
  { id: 'express', name: 'Express', category: 'backend', level: 'intermediate' },
  { id: 'nestjs', name: 'NestJS', category: 'backend', level: 'intermediate' },
  { id: 'postgresql', name: 'PostgreSQL', category: 'backend', level: 'intermediate' },

  // DevOps
  { id: 'docker', name: 'Docker', category: 'devops', level: 'intermediate' },
  { id: 'git', name: 'Git', category: 'devops', level: 'expert' },
  { id: 'ci-cd', name: 'CI/CD', category: 'devops', level: 'advanced' },
  { id: 'nginx', name: 'Nginx', category: 'devops', level: 'intermediate' },

  // Design
  { id: 'figma', name: 'Figma', category: 'design', level: 'intermediate' },
  { id: 'ui-design', name: 'UI Design', category: 'design', level: 'intermediate' },

  // Language
  { id: 'javascript', name: 'JavaScript', category: 'language', level: 'expert' },
  { id: 'python', name: 'Python', category: 'language', level: 'intermediate' },
  { id: 'go', name: 'Go', category: 'language', level: 'beginner' },
];
