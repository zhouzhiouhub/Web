import type { Experience } from '@/types';

export const experiences: Experience[] = [
  {
    id: 'guangyuzhou',
    company: '深圳市光宇宙科技有限公司',
    companyKey: 'experience.guangyuzhou.company',
    role: '软件开发 / 工具链与交付工程师',
    roleKey: 'experience.guangyuzhou.role',
    start: '2024-06',
    end: '2026-07',
    current: false,
    description: '负责多款客户端/桌面端软件的构建、打包、发布、检测、分发与下载链路维护，覆盖官网、CDN、对象存储等渠道。',
    descriptionKey: 'experience.guangyuzhou.description',
    highlights: [
      '参与 Microsoft Store 和 Steam 上架发布流程，完成包体准备、商店预检、上传、版本递增、发布说明配置和状态跟进',
      '维护 Rust / Tauri、npm 脚本和 Python 自动化构建流程，参与插件目录清理、包体裁剪、会员授权配置、生产构建和 Staging 验证',
      '维护官网、下载页、更新日志、博客、多语言页面和静态资源发布流程，负责下载入口校验、缓存刷新、页面内容核对和发布回归',
      '参与用户管理、会员订阅、支付订单、Webhook 回调和权益同步相关系统维护，围绕登录、验证码、Session、环境变量和生产安全配置排查风险点',
      '开发 Python 自动化工具，覆盖业务数据处理、重复流程提效、定时任务执行、运行日志排查和本地工具交付',
      '维护 Linux 服务器系统服务、Nginx、systemd 定时任务、网站监控、证书续签、反馈转发和 AI 技术支持服务',
      '参与用户支持流程，处理邮箱、即时通讯、社区、应用商店评论等渠道反馈，协助收集截图、视频、日志并推动问题闭环',
    ],
    highlightsKey: [
      'experience.guangyuzhou.highlight.1',
      'experience.guangyuzhou.highlight.2',
      'experience.guangyuzhou.highlight.3',
      'experience.guangyuzhou.highlight.4',
      'experience.guangyuzhou.highlight.5',
      'experience.guangyuzhou.highlight.6',
      'experience.guangyuzhou.highlight.7',
    ],
    tech: ['Rust', 'Tauri', 'npm scripts', 'TypeScript', 'Next.js', 'Astro', 'Python', 'MSIX', 'Cloudflare Pages / R2', 'Nginx', 'systemd', 'Webhook'],
  },
];
