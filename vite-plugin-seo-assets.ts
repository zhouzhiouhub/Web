import type { Plugin } from 'vite';
import { mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';

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

const SEO_PROJECT_IDS = [
  'kinolin-tool',
  'videobrowser',
  'sokoban',
  'wechat-resume-app',
  'budget',
  'sphere',
  'game-web',
  'astro-two',
  'portfolio-website',
  'client-build-pipeline',
  'website-payment-system',
  'python-automation',
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
    ...SEO_PROJECT_IDS.map((id) => `/projects/${id}`),
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

export function seoAssetsPlugin(siteUrl = SITE_DEFAULT_URL): Plugin {
  const writeAssets = (outDir: string) => {
    mkdirSync(outDir, { recursive: true });
    writeFileSync(resolve(outDir, 'sitemap.xml'), buildSitemapXml(siteUrl));
    writeFileSync(resolve(outDir, 'rss.xml'), buildRssXml(siteUrl));
  };

  return {
    name: 'seo-assets',
    configureServer(server) {
      const sitemap = buildSitemapXml(siteUrl);
      const rss = buildRssXml(siteUrl);
      server.middlewares.use((req, res, next) => {
        if (req.url === '/sitemap.xml') {
          res.setHeader('Content-Type', 'application/xml; charset=utf-8');
          res.end(sitemap);
          return;
        }
        if (req.url === '/rss.xml') {
          res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
          res.end(rss);
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
