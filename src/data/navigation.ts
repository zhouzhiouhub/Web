import type { NavItem } from '@/types';

export const navItems: NavItem[] = [
  { key: 'nav.home', to: '/', icon: 'home' },
  { key: 'nav.about', to: '/about', icon: 'user' },
  { key: 'nav.projects', to: '/projects', icon: 'code' },
  { key: 'nav.blog', to: '/blog', icon: 'article' },
  { key: 'nav.playground', to: '/playground', icon: 'experiment' },
  { key: 'nav.opensource', to: '/opensource', icon: 'github' },
  { key: 'nav.resume', to: '/resume', icon: 'file' },
  { key: 'nav.contact', to: '/contact', icon: 'mail' },
];
