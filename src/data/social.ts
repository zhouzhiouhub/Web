import type { SocialLink } from '@/types';
import { SITE_CSDN, SITE_CV, SITE_GITHUB } from '@/data/site';

export const socialLinks: SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    labelKey: 'social.github',
    icon: 'github',
    iconSrc: '/github.svg',
    url: SITE_GITHUB,
  },
  {
    id: 'csdn',
    label: 'CSDN',
    labelKey: 'social.csdn',
    icon: 'csdn',
    iconScale: 1.5,
    iconSrc: '/csdn.svg',
    url: SITE_CSDN,
  },
  {
    id: 'email',
    label: 'Email',
    labelKey: 'social.email',
    icon: 'mail',
    iconSrc: '/email.svg',
    url: '/contact',
    sensitive: true,
    placement: 'contact',
  },
  {
    id: 'phone',
    label: 'Phone',
    labelKey: 'social.phone',
    icon: 'phone',
    iconSrc: '/phone.svg',
    url: '/contact',
    sensitive: true,
    placement: 'contact',
  },
  {
    id: 'cv',
    label: 'CV',
    labelKey: 'social.cv',
    icon: 'globe',
    iconSrc: '/cv.svg',
    url: SITE_CV,
  },
];

export const footerSocialLinks = socialLinks.filter((link) => link.placement !== 'contact');
export const contactSocialLinks = socialLinks.filter((link) => !link.sensitive);
