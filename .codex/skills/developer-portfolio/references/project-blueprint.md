# 项目蓝图

在创建或扩展页面、模块、数据模型、路由、内容系统或整体架构时读取本文件。

## 项目定位

构建一个个人开发者门户网站，用于展示技术能力、工程判断、项目经验、技术文章、开源成果和个人品牌。

网站气质应当是：

- 科技感。
- 极简。
- 现代。
- 快速。
- 可维护。
- 可扩展。
- 国际化友好。

可参考：

- Vercel。
- Linear。
- Apple。
- GitHub Developer Profile。

## 核心技术栈

使用：

- Vue 3。
- TypeScript。
- Vite。
- Vue Router。
- Tailwind CSS。
- Naive UI。

推荐配套：

- Pinia：管理主题、语言、用户偏好等全局状态。
- Vue I18n：管理多语言文案。
- Markdown 内容体系：承载博客文章和长篇项目说明。
- `@vueuse/core`：处理系统主题、媒体查询、本地存储和浏览器能力。

不要为了小功能引入长期维护成本高的依赖。新增依赖必须能解释用途、收益和维护成本。

## 页面架构

采用多页面路由架构：

```text
/                 首页
/about            关于我
/projects         项目展示
/projects/:id     项目详情
/blog             技术博客
/blog/:slug       文章详情
/playground       实验项目
/opensource       开源项目
/resume           个人简历
/contact          联系方式
```

每个页面应具备：

- 清晰路由。
- 页面级 SEO 元信息。
- 国际化标题和描述。
- 响应式布局。
- 动态数据场景下的空状态、错误状态和加载状态。

## 目录结构

推荐结构：

```text
src/
  assets/
  components/
    common/
    layout/
    business/
    ui/
  layouts/
  pages/
  router/
  stores/
  hooks/
  utils/
  api/
  locales/
  themes/
  types/
  data/
  content/
```

职责说明：

- `assets/`：图片、字体和静态样式资源。
- `components/common/`：跨页面公共组件。
- `components/layout/`：导航、页脚、页面外壳和容器。
- `components/business/`：作品集业务组件，例如项目卡片、技能矩阵、经历时间线、博客卡片。
- `components/ui/`：Naive UI 封装和底层 UI 原语。
- `layouts/`：页面布局框架。
- `pages/`：路由页面。
- `router/`：路由定义和路由元信息。
- `stores/`：全局状态。
- `hooks/`：可复用 Composition API 逻辑。
- `utils/`：无业务状态的纯工具函数。
- `api/`：外部集成和数据适配。
- `locales/`：国际化字典。
- `themes/`：主题 token、CSS variables 和 Naive UI 主题配置。
- `types/`：共享 TypeScript 模型。
- `data/`：结构化作品集数据。
- `content/`：Markdown 或文章内容。

## 数据模型

优先使用结构化数据文件：

```text
src/data/navigation.ts
src/data/projects.ts
src/data/skills.ts
src/data/experience.ts
src/data/blog.ts
src/data/social.ts
```

常见共享类型：

- `Project`。
- `Skill`。
- `Experience`。
- `BlogPost`。
- `SocialLink`。
- `LocaleCode`。
- `ThemeMode`。

作品集数据要为未来的详情页、国际化和搜索能力预留字段。

## 核心模块

技能模块：

- 技术栈。
- 熟练度或信心等级。
- 实际使用场景。
- 代表性成果。

项目模块：

- 项目概览。
- 技术架构。
- 截图或视觉素材。
- 技术难点。
- 解决方案。
- 经验总结。
- 在线地址。
- 源码地址。

经历模块：

- 工作经历。
- 项目经历。
- 成长路径。
- 关键成果。

博客模块：

- Markdown 内容。
- 标签和分类。
- 摘要。
- 阅读时间。
- slug。

实验模块：

- 实验性功能。
- 交互 demo。
- AI 或前端技术探索。
- 可独立扩展的小项目。

## 主题系统

支持：

- 深色模式。
- 浅色模式。
- 跟随系统。

主题状态必须有单一全局来源，并同步：

- 用户偏好持久化。
- 系统偏好检测。
- `html.dark`。
- Tailwind dark mode。
- Naive UI theme。
- CSS variables。

主题 token 覆盖：

- 主色。
- 背景。
- 表面。
- 文本。
- 次级文本。
- 边框。
- 强调色。
- 阴影。
- 圆角。

## 国际化

默认语言：

- `zh-CN`。

预留语言：

- `en-US`。
- `ja-JP`。

用户可见文本放在语言文件中：

```text
src/locales/
  zh-CN.ts
  en-US.ts
  ja-JP.ts
  index.ts
```

需要国际化的内容：

- 导航。
- 页面标题。
- SEO 描述。
- 按钮。
- 表单。
- 空状态。
- 错误提示。
- 项目摘要。
- 技能标签。
- 博客元信息。

## 路线图

MVP 阶段：

- 首页。
- 关于我。
- 项目展示。
- 技能展示。
- 联系方式。
- 深色/浅色/系统主题。
- 中文国际化基础。

增强阶段：

- 博客系统。
- 项目详情页。
- 简历页面。
- Open Graph 元信息。
- sitemap。
- 英文语言包。

长期阶段：

- AI Agent 展示模块。
- 在线代码 demo。
- GitHub 数据同步。
- RSS。
- 搜索。
- 评论。
- CMS。
