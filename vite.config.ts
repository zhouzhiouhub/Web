import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslint from 'vite-plugin-eslint';
import svgLoader from 'vite-svg-loader';
import autoImport from 'unplugin-auto-import/dist/vite.js';
import { resolve } from 'path';
import { seoAssetsPlugin, SITE_DEFAULT_URL } from './vite-plugin-seo-assets';

export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const isDev = mode === 'development';
  const siteUrl = (process.env.VITE_SITE_URL || SITE_DEFAULT_URL).replace(/\/$/, '');

  return defineConfig({
    base: process.env.VITE_BASE_PUBLIC_PATH,
    plugins: [
      vue(),
      seoAssetsPlugin(siteUrl),
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
  });
};
