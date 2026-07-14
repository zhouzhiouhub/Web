import type { SocialLink } from '@/types';

export const socialLinks: SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    labelKey: 'social.github',
    icon: 'github',
    iconSrc: '/github.svg',
    url: 'https://github.com/zhouzhiouhub',
  },
  {
    id: 'csdn',
    label: 'CSDN',
    labelKey: 'social.csdn',
    icon: 'csdn',
    iconSrc: '/csdn.svg',
    url: 'https://blog.csdn.net/qq_59002866',
  },
  {
    id: 'email',
    label: 'Email',
    labelKey: 'social.email',
    icon: 'mail',
    iconSrc: '/email.svg',
    url: 'mailto:zhouzhiou9588@163.com',
  },
  {
    id: 'phone',
    label: 'Phone',
    labelKey: 'social.phone',
    icon: 'phone',
    iconSrc: '/phone.svg',
    url: 'tel:18026403146',
  },
  {
    id: 'cv',
    label: 'CV',
    labelKey: 'social.cv',
    icon: 'globe',
    iconSrc: '/cv.svg',
    url: 'https://zhouzhiouhub.github.io/CV/',
  },
];
