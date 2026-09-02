# Kinolin Portfolio

个人开发者门户网站 — 展示技术能力、项目经验、技术文章和开源成果。

## 技术栈

- **Vue 3** — Composition API + `<script setup lang="ts">`
- **TypeScript** — 类型安全
- **Vite** — 构建工具
- **Vue Router** — 多页面路由
- **Tailwind CSS** — 原子化 CSS + 主题系统
- **Naive UI** — 组件库
- **Pinia** — 全局状态管理
- **Vue I18n** — 国际化（zh-CN / en-US）
- **@vueuse/core** — 组合式工具

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 类型检查
npm run typecheck

# 构建
npm run build

# 预览构建产物
npm run serve

# 代码检查
npm run lint
npm run lint:fix
```

## 目录结构

```
src/
  assets/          # 字体、图片、样式
    fonts/
    styles/
  components/
    common/        # 主题切换、语言切换等公共组件
    layout/        # 导航、页脚
    business/      # 项目卡片、技能徽章、经历时间线
    ui/            # Naive UI 封装
  layouts/         # 页面布局框架
  pages/           # 路由页面
  router/          # 路由定义
  stores/          # Pinia 状态（主题、语言）
  hooks/           # 组合式逻辑（useTheme, useLocale, useSeo, useBreakpoint）
  utils/           # 纯工具函数
  locales/         # 国际化字典
  themes/          # 主题 token + Naive UI 主题配置
  types/           # 共享 TypeScript 类型
  data/            # 结构化作品集数据
  api/             # 外部集成
  content/         # Markdown 内容
```

## 页面路由

| 路径 | 页面 |
|------|------|
| `/` | 首页 |
| `/about` | 关于我 |
| `/projects` | 项目展示 |
| `/projects/:id` | 项目详情 |
| `/blog` | 技术博客 |
| `/blog/:slug` | 文章详情 |
| `/playground` | 实验项目 |
| `/opensource` | 开源项目 |
| `/resume` | 个人简历 |
| `/contact` | 联系方式 |

## 主题系统

支持三种模式：

- **浅色** (light)
- **深色** (dark)
- **跟随系统** (system)

主题状态通过 Pinia store 统一管理，同步至 Tailwind dark mode、CSS variables 和 Naive UI 主题。

## 国际化

默认语言为 `zh-CN`，预留 `en-US` 和 `ja-JP`。所有用户可见文案通过 `src/locales/` 管理。

## SEO 与订阅

- 每个页面通过 `useSeo` 设置 title、description、Open Graph、Twitter Card、canonical 和 JSON-LD。
- 构建时生成 `sitemap.xml`、`rss.xml` 与符合 llms.txt 规范的 `/llms.txt`（含 H1 与 Markdown 链接，供 AI 智能体浏览）。
- 联系方式在简历页和联系页默认脱敏，邮箱统一为 `zhouzhiou9588@163.com`。

站点地址可用环境变量覆盖：

```bash
VITE_SITE_URL=https://web.zhiou9588.workers.dev
VITE_BASE_PUBLIC_PATH=/
VITE_RAG_URL=https://rag.kinolin.com
```

右下角助手气泡会把问题发到 `rag-worker`（默认 `https://rag.kinolin.com/?text=`）。本地开发未设置 `VITE_RAG_URL` 时，经 Vite 代理 `/__rag` 转发，避免浏览器跨域。生产环境需该 Worker 返回 CORS 头。

## 开发规范

详见 `AGENT.md`。
