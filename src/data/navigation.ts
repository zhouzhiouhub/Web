import type { NavItem } from '@/types';

export const navItems: NavItem[] = [
  { key: 'home', to: '/', icon: 'home' },
  { key: 'about', to: '/about', icon: 'user' },
  { key: 'projects', to: '/projects', icon: 'code' },
  { key: 'blog', to: '/blog', icon: 'article' },
  { key: 'lab', to: '/lab', icon: 'experiment' },
  { key: 'opensource', to: '/opensource', icon: 'github' },
  { key: 'resume', to: '/resume', icon: 'file' },
  { key: 'contact', to: '/contact', icon: 'mail' },
];
