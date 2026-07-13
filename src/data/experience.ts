import type { Experience } from '@/types';

export const experiences: Experience[] = [
  {
    id: 'guangyuzhou',
    company: '深圳市光宇宙科技有限公司',
    role: '软件开发 / 工具链与交付工程师',
    start: '2024-06',
    end: '2026-07',
    current: false,
    description: '负责多款客户端/桌面端软件的构建、打包、发布、检测与分发，维护官网、后台、订阅支付系统和自动化工具链。',
    highlights: [
      '负责多款桌面端软件打包发布，覆盖官网、CDN、对象存储、Microsoft Store / Steam 等渠道',
      '维护 Rust / Tauri 构建流程，包括内核编译、前端构建、插件处理、安装包生成与版本号管理',
      '维护官网、下载页、更新日志、博客、多语言页面发布流程，支持下载入口校验与缓存刷新',
      '参与用户管理、会员订阅、支付订单、Webhook 回调和权益同步系统维护',
      '开发 Python 自动化工具，覆盖订单汇总、日志下载、邮箱验证码监听、Excel 处理等场景',
      '维护 Linux 服务器系统服务、定时任务、网站监控、证书续签和 AI 技术支持服务',
    ],
    tech: ['Rust', 'Tauri', 'TypeScript', 'Next.js', 'Astro', 'Python', 'Cloudflare', 'Nginx', 'systemd'],
  },
];
