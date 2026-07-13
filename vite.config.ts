import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslint from 'vite-plugin-eslint';
import stylelint from 'vite-plugin-stylelint';
import svgLoader from 'vite-svg-loader';
import autoImport from 'unplugin-auto-import/dist/vite.js';
import { resolve } from 'path';

export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const isDev = mode === 'development';

  return defineConfig({
    base: process.env.VITE_BASE_PUBLIC_PATH,
    plugins: [
      vue(),
      // Only run ESLint in dev mode for faster builds
      ...(isDev ? [eslint({ cache: false })] : []),
      // Stylelint in dev mode for real-time style feedback
      ...(isDev ? [stylelint({ files: ['src/**/*.{vue,css}'] })] : []),
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
