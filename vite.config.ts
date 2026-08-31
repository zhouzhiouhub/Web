import { defineConfig, loadEnv } from 'vite';
import type { Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslint from 'vite-plugin-eslint';
import svgLoader from 'vite-svg-loader';
import autoImport from 'unplugin-auto-import/dist/vite.js';
import { resolve } from 'path';
import { injectHomePrerenderShell, seoAssetsPlugin, SITE_DEFAULT_URL } from './vite-plugin-seo-assets';

function inlineCssPlugin(): Plugin {
  return {
    name: 'inline-css',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx.bundle) return html;

        const nextHtml = html.replace(
          /<script type="module" crossorigin src="/g,
          '<script type="module" crossorigin fetchpriority="high" src="',
        );

        const stylesheetLinks = [...html.matchAll(/<link\s[^>]*rel="stylesheet"[^>]*>/g)];
        if (!stylesheetLinks.length) return injectHomePrerenderShell(nextHtml);

        const hrefs = stylesheetLinks.map((match) => {
          const href = match[0].match(/href="([^"]+)"/)?.[1];
          return href ? href.replace(/^\//, '') : '';
        }).filter(Boolean);

        const css = Object.values(ctx.bundle)
          .filter((item) => item.type === 'asset' && hrefs.includes(item.fileName))
          .map((item) => {
            if (item.type !== 'asset') return '';
            return typeof item.source === 'string'
              ? item.source
              : new TextDecoder().decode(item.source);
          })
          .join('\n');

        if (!css) return injectHomePrerenderShell(nextHtml);

        return injectHomePrerenderShell(
          nextHtml
            .replace(/<link\s[^>]*rel="stylesheet"[^>]*>/g, '')
            .replace('</head>', `<style>${css}</style>\n  </head>`),
        );
      },
    },
  };
}

export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const isDev = mode === 'development';
  const siteUrl = (process.env.VITE_SITE_URL || SITE_DEFAULT_URL).replace(/\/$/, '');

  return defineConfig({
    base: process.env.VITE_BASE_PUBLIC_PATH,
    plugins: [
      vue(),
      seoAssetsPlugin(siteUrl),
      inlineCssPlugin(),
      // Only run ESLint in dev mode for faster builds
      ...(isDev ? [eslint({ cache: false })] : []),
      svgLoader(),
      autoImport({
        imports: [
          'vue',
          'vue-router',
          'pinia',
          '@vueuse/core',
        ],
        dts: 'auto-imports.d.ts',
        eslintrc: {
          enabled: true,
        },
        dirs: [
          './src/components',
          './src/hooks',
        ],
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    build: {
      target: 'es2022',
      cssMinify: true,
      modulePreload: {
        polyfill: false,
        resolveDependencies: (_filename, deps) => deps.filter((dep) => (
          !/NaiveAppProvider|use-memo|use-message|FormItem|\/merge-|\/Card-|\/Button-|\/Tag-|\/Empty-|\/light-/.test(dep)
        )),
      },
    },
  });
};
