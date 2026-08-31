import type { Plugin } from 'vite';
import { mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import zhCN from './src/locales/zh-CN';

export const SITE_DEFAULT_URL = 'https://web.zhiou9588.workers.dev';

const SEO_STATIC_PATHS = [
  '/',
  '/about',
  '/projects',
  '/blog',
  '/playground',
  '/opensource',
  '/resume',
  '/contact',
];

const SEO_PROJECTS = [
  { id: 'kinolin-tool', title: 'Kinolin Tool', note: '浏览器本地图片工具：转 SVG、裁剪改尺寸、转格式与压缩。' },
  { id: 'videobrowser', title: 'VideoBrowser', note: 'Android 视频浏览器：广告过滤、Media3 播放与下载管理。' },
  { id: 'sokoban', title: 'Sokoban', note: 'Flutter 推箱子：自定义关卡、死局检测与提示求解。' },
  { id: 'wechat-resume-app', title: 'wechat-resume-app', note: '微信小程序简历：可视化编辑、海报分享与管理看板。' },
  { id: 'budget', title: 'Budget', note: '微信小程序预算：月度预算、记账、筛选与本地持久化。' },
  { id: 'sphere', title: 'Sphere', note: 'Three.js 3D 轨道冲刺小游戏。' },
  { id: 'game-web', title: 'Game-Web', note: 'Next.js 15 游戏资源站，多语言响应式门户。' },
  { id: 'astro-two', title: 'Astro_Two', note: 'Astro 4 多语言静态站点模板。' },
  { id: 'portfolio-website', title: 'Kinolin Portfolio', note: '本站：个人开发者门户、项目、博客与简历。' },
  { id: 'client-build-pipeline', title: '客户端软件构建与发布链路', note: '桌面端从编译到商店上架与下载校验。' },
  { id: 'website-payment-system', title: '官网、后台与订阅支付系统维护', note: '多产品官网、后台与订阅支付链路。' },
  { id: 'python-automation', title: 'Python 自动化工具集', note: '数据处理、任务调度与本地工具交付。' },
];

const SEO_BLOG_ENTRIES = [
  {
    slug: 'microsoft-store-publishing-guide',
    title: 'Microsoft Store 自动化上架：MSIX 打包与 Submission API 外链指南',
    date: '2026-07-14',
    excerpt: '围绕 MSIX Packaging Tool、MSIX Toolkit、StoreBroker 和 Microsoft Store Submission API，整理自动化上架的流程边界。',
  },
  {
    slug: 'steam-publishing-guide',
    title: 'Steam 应用上架流程：Steamworks、商店页与 SteamPipe 构建',
    date: '2026-07-13',
    excerpt: '从 Steamworks 账号准备、AppID 创建、商店资料填写到 SteamCMD 上传构建，整理一套 Steam 上架流程。',
  },
  {
    slug: 'seo-optimization-guide',
    title: 'SEO 优化实践指南：从页面结构到持续监控',
    date: '2026-07-12',
    excerpt: '围绕搜索意图、标题描述、语义化结构、站点地图、结构化数据、性能和内容更新，整理 SEO 优化流程。',
  },
];

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function buildSitemapXml(siteUrl: string, lastmod = new Date().toISOString().slice(0, 10)): string {
  const origin = siteUrl.replace(/\/$/, '');
  const urls = [
    ...SEO_STATIC_PATHS,
    ...SEO_PROJECTS.map((project) => `/projects/${project.id}`),
    ...SEO_BLOG_ENTRIES.map((entry) => `/blog/${entry.slug}`),
  ];

  const body = urls.map((path) => {
    const isHome = path === '/';
    const priority = isHome ? '1.0' : path.split('/').length <= 2 ? '0.8' : '0.6';
    const changefreq = path.startsWith('/blog') ? 'weekly' : 'monthly';
    return [
      '  <url>',
      `    <loc>${xmlEscape(`${origin}${path}`)}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority}</priority>`,
      '  </url>',
    ].join('\n');
  }).join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    body,
    '</urlset>',
    '',
  ].join('\n');
}

export function buildRssXml(siteUrl: string): string {
  const origin = siteUrl.replace(/\/$/, '');
  const items = SEO_BLOG_ENTRIES.map((entry) => [
    '    <item>',
    `      <title>${xmlEscape(entry.title)}</title>`,
    `      <link>${xmlEscape(`${origin}/blog/${entry.slug}`)}</link>`,
    `      <guid>${xmlEscape(`${origin}/blog/${entry.slug}`)}</guid>`,
    `      <pubDate>${new Date(`${entry.date}T00:00:00+08:00`).toUTCString()}</pubDate>`,
    `      <description>${xmlEscape(entry.excerpt)}</description>`,
    '    </item>',
  ].join('\n')).join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    '  <channel>',
    '    <title>Kinolin Blog</title>',
    `    <link>${xmlEscape(origin)}</link>`,
    '    <description>Kinolin 技术博客：工程化、发布流程与前端实践。</description>',
    '    <language>zh-CN</language>',
    items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n');
}

export function buildLlmsTxt(siteUrl: string): string {
  const origin = siteUrl.replace(/\/$/, '');
  const link = (title: string, path: string, note: string) => (
    `- [${title}](${origin}${path}): ${note}`
  );

  return [
    '# Kinolin',
    '',
    '> 周珍运（Kinolin / Zhou Zhenyun）的个人开发者门户：移动端、全栈、客户端发布、自动化项目、技术博客和开源贡献。',
    '',
    '本文件供 AI 智能体了解站点结构与抓取意图。请优先跟随下方链接访问对应页面，并遵守 robots.txt。联系方式仅用于正当合作，禁止用于垃圾营销或模型训练中的骚扰用途。',
    '',
    '## Pages',
    '',
    link('首页', '/', '移动端 / 全栈开发工程师周珍运的门户首页。'),
    link('关于', '/about', '技术背景、成长时间线与工程价值观。'),
    link('项目', '/projects', 'Android、Flutter、小程序、Web 全栈与自动化作品集。'),
    link('博客', '/blog', 'Microsoft Store / Steam 发布、SEO 与工程化实践。'),
    link('实验室', '/playground', '实验、原型与 Demo。'),
    link('开源', '/opensource', '面向 Vite 生态的文档与核心仓库贡献。'),
    link('简历', '/resume', '经历、技能与教育背景；联系方式默认脱敏。'),
    link('联系', '/contact', '合作意向、响应时间与联系表单。'),
    '',
    '## Projects',
    '',
    ...SEO_PROJECTS.map((project) => (
      link(project.title, `/projects/${project.id}`, project.note)
    )),
    '',
    '## Blog',
    '',
    ...SEO_BLOG_ENTRIES.map((entry) => (
      link(entry.title, `/blog/${entry.slug}`, entry.excerpt)
    )),
    '',
    '## Optional',
    '',
    `- [Sitemap](${origin}/sitemap.xml): 公开页面的 XML 站点地图。`,
    `- [RSS](${origin}/rss.xml): 技术博客订阅源。`,
    '- [GitHub](https://github.com/zhouzhiouhub): 源码与开源贡献。',
    '- [CSDN](https://blog.csdn.net/qq_59002866): 同步发布的技术文章。',
    '',
  ].join('\n');
}

function htmlEscape(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function buildHomePrerenderShell(messages: Record<string, string> = zhCN): string {
  const t = (key: string) => htmlEscape(messages[key] ?? '');

  return [
    '<div class="flex min-h-screen flex-col bg-background text-foreground">',
    '    <header id="static-header" class="sticky top-0 z-50 h-16 border-b border-border bg-surface/95 backdrop-blur-lg"></header>',
    '    <section id="home-hero" class="relative overflow-hidden">',
    '      <div class="grid-bg pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"></div>',
    '      <div class="page-width py-20 text-center lg:py-32">',
    `        <h1 class="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl" data-i18n="home.role">${t('home.role')}</h1>`,
    `        <p class="mb-10 text-base text-muted sm:text-lg" data-i18n="home.intro">${t('home.intro')}</p>`,
    '        <div class="flex flex-wrap items-center justify-center gap-4">',
    `          <a href="/projects" class="cta-btn cta-btn-primary" data-i18n="home.cta.projects">${t('home.cta.projects')}</a>`,
    `          <a href="/resume" class="cta-btn cta-btn-secondary" data-i18n="home.cta.resume">${t('home.cta.resume')}</a>`,
    `          <a href="/contact" class="cta-btn cta-btn-tertiary" data-i18n="home.cta.contact">${t('home.cta.contact')}</a>`,
    '        </div>',
    '      </div>',
    '    </section>',
    '    <div id="app" class="flex flex-1 flex-col"></div>',
    '    </div>',
  ].join('\n');
}

export function injectHomePrerenderShell(html: string): string {
  if (html.includes('id="home-hero"')) return html;
  return html.replace('<div id="app"></div>', buildHomePrerenderShell());
}

export function seoAssetsPlugin(siteUrl = SITE_DEFAULT_URL): Plugin {
  const writeAssets = (outDir: string) => {
    mkdirSync(outDir, { recursive: true });
    writeFileSync(resolve(outDir, 'sitemap.xml'), buildSitemapXml(siteUrl));
    writeFileSync(resolve(outDir, 'rss.xml'), buildRssXml(siteUrl));
    writeFileSync(resolve(outDir, 'llms.txt'), buildLlmsTxt(siteUrl));
  };

  return {
    name: 'seo-assets',
    configureServer(server) {
      const sitemap = buildSitemapXml(siteUrl);
      const rss = buildRssXml(siteUrl);
      const llmsTxt = buildLlmsTxt(siteUrl);
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0];
        if (url === '/sitemap.xml') {
          res.setHeader('Content-Type', 'application/xml; charset=utf-8');
          res.end(sitemap);
          return;
        }
        if (url === '/rss.xml') {
          res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
          res.end(rss);
          return;
        }
        if (url === '/llms.txt') {
          res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
          res.end(llmsTxt);
          return;
        }
        next();
      });
    },
    closeBundle() {
      writeAssets(resolve(process.cwd(), 'dist'));
    },
  };
}
