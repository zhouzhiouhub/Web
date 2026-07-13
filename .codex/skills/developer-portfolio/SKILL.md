---
name: developer-portfolio
description: "构建、扩展、重构、审查或编写个人开发者官网项目，技术栈包括 Vue 3、TypeScript、Vite、Vue Router、Tailwind CSS、Naive UI、主题切换、国际化、SEO 和可扩展多页面架构。用户请求开发者主页、作品集页面、项目展示、博客/简历/联系页面、科技风界面、深色/浅色/系统主题、i18n 或此类网站的架构约束时使用。"
---

# 开发者官网

使用此 skill 开发现代个人开发者门户网站。默认技术路线为 Vue 3 + TypeScript，目标是实现科技风视觉、主题切换、国际化、SEO 和长期可扩展架构。

## 工作流程

1. 修改前先检查当前仓库。阅读 `package.json`、Vite/Tailwind/TypeScript 配置、路由、主题、语言包、数据文件，以及相关页面和组件。
2. 如果仓库存在 `AGENT.md`、`AGENTS.md` 或其它项目文档，先阅读并作为项目本地规则执行。
3. 按任务需要加载参考文档，不要一次性加载无关内容：
   - 需要了解产品范围、页面路由、模块规划、目录约定和路线图时，读取 `references/project-blueprint.md`。
   - 需要了解编码规则、主题/i18n 保护、测试、Git 和交付要求时，读取 `references/implementation-guardrails.md`。
   - 需要设计 UI、布局、视觉风格、响应式和可访问性时，读取 `references/design-system.md`。
4. 优先沿用现有代码模式，不要随意发明新架构。
5. 保持修改聚焦，完成后使用项目已有脚本验证；如果缺少脚本，给出明确的手动验证步骤。

## 不可破坏的约束

- 除非用户明确要求，否则使用 Vue 3、TypeScript、Vite、Vue Router、Tailwind CSS 和 Naive UI。
- 默认使用 Composition API 和 `<script setup lang="ts">`。
- 用户可见文案必须进入国际化系统。
- 颜色、背景、表面、阴影、边框等主题敏感样式必须进入主题系统。
- 结构化作品集数据不要堆在页面组件中，通常放在 `src/data/`。
- 共享类型放在 `src/types/`。
- 可复用逻辑按职责放在 `src/hooks/`、`src/utils/` 或 stores 中。
- 未经用户明确同意，不要替换架构、路由模型、主题系统或国际化系统。

## 交付说明

完成任务后说明：

- 修改了哪些文件。
- 实现或修复了什么。
- 如何验证。
- 是否还有风险、缺失脚本或未完成项。
