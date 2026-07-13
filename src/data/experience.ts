import type { Experience } from '@/types';

export const experiences: Experience[] = [
  {
    id: 'senior-frontend',
    company: 'Tech Company',
    role: '高级前端工程师',
    start: '2023-06',
    end: null,
    current: true,
    description: '负责前端架构设计和核心业务开发，主导多个大型项目的技术选型和落地。',
    highlights: [
      '搭建前端微服务架构，支撑 10+ 业务线并行开发',
      '设计组件库和工程化体系，提升团队开发效率 40%',
      '主导性能优化，首屏加载从 3.2s 降至 1.1s',
    ],
    tech: ['Vue 3', 'TypeScript', 'Vite', 'Node.js'],
  },
  {
    id: 'frontend-developer',
    company: 'Startup Inc',
    role: '前端开发工程师',
    start: '2021-03',
    end: '2023-05',
    current: false,
    description: '负责产品前端开发，从 0 到 1 构建多个面向用户的 Web 应用。',
    highlights: [
      '主导核心产品前端架构搭建和迭代',
      '实现可视化拖拽编辑器，支持自定义页面搭建',
      '优化移动端体验，用户留存率提升 25%',
    ],
    tech: ['Vue 2', 'JavaScript', 'Webpack', 'SCSS'],
  },
  {
    id: 'junior-developer',
    company: 'Digital Studio',
    role: '初级前端开发',
    start: '2019-07',
    end: '2021-02',
    current: false,
    description: '参与多个企业官网和营销页面开发，积累前端工程实践经验。',
    highlights: [
      '独立完成 20+ 企业官网页面开发',
      '建立前端代码规范和 review 流程',
      '引入自动化构建和部署流程',
    ],
    tech: ['Vue 2', 'JavaScript', 'Gulp', 'jQuery'],
  },
];
