import type { ArchitectureLayer } from '@/types';

export const projectArchitectures: Record<string, ArchitectureLayer[]> = {
  'kinolin-tool': [
    { id: 'ui', labelKey: 'project.architecture.ui', items: ['Vue 3', 'Vite', 'Element Plus', 'i18n / Theme'] },
    { id: 'core', labelKey: 'project.architecture.core', items: ['imagetracerjs', 'esm-potrace-wasm', 'Canvas / File APIs'] },
    { id: 'data', labelKey: 'project.architecture.data', items: ['IndexedDB', 'Zip export', 'Local-only pipeline'] },
    { id: 'platform', labelKey: 'project.architecture.platform', items: ['Cloudflare Workers', 'Per-route SEO HTML'] },
  ],
  videobrowser: [
    { id: 'ui', labelKey: 'project.architecture.ui', items: ['Android Views', 'Address bar', 'Player controls'] },
    { id: 'core', labelKey: 'project.architecture.core', items: ['WebView', 'Ad rule engine', 'Media3 ExoPlayer'] },
    { id: 'data', labelKey: 'project.architecture.data', items: ['DownloadManager', 'SAF', 'Bookmarks / History'] },
    { id: 'test', labelKey: 'project.architecture.test', items: ['JUnit', 'Espresso', 'Playback contracts'] },
  ],
  sokoban: [
    { id: 'ui', labelKey: 'project.architecture.ui', items: ['Flutter widgets', 'Responsive board', 'On-screen controls'] },
    { id: 'core', labelKey: 'project.architecture.core', items: ['Game rules', 'Deadlock detection', 'Hint search'] },
    { id: 'data', labelKey: 'project.architecture.data', items: ['JSON import', 'Local save', 'Level generator'] },
    { id: 'test', labelKey: 'project.architecture.test', items: ['Unit tests', 'Widget tests'] },
  ],
  'wechat-resume-app': [
    { id: 'ui', labelKey: 'project.architecture.ui', items: ['Mini Program pages', 'Visual editor', 'Poster / print'] },
    { id: 'core', labelKey: 'project.architecture.core', items: ['Resume data service', 'Validation', 'Theme config'] },
    { id: 'data', labelKey: 'project.architecture.data', items: ['Local cache', 'Assets', 'Feedback store'] },
    { id: 'platform', labelKey: 'project.architecture.platform', items: ['Cloud-dev ready', 'Admin board'] },
  ],
  budget: [
    { id: 'ui', labelKey: 'project.architecture.ui', items: ['Home', 'Ledger', 'Analysis', 'Profile'] },
    { id: 'core', labelKey: 'project.architecture.core', items: ['Budget rules', 'Fen integer math', 'Status thresholds'] },
    { id: 'data', labelKey: 'project.architecture.data', items: ['Local records', 'Budget history'] },
    { id: 'platform', labelKey: 'project.architecture.platform', items: ['Cloud-dev quickstart'] },
  ],
  sphere: [
    { id: 'runtime', labelKey: 'project.architecture.runtime', items: ['Three.js', 'WebGL', 'Web Audio'] },
    { id: 'core', labelKey: 'project.architecture.core', items: ['Procgen tracks', 'Chunk rendering', 'Collision'] },
    { id: 'data', labelKey: 'project.architecture.data', items: ['Level state', 'High score', 'localStorage'] },
  ],
  'game-web': [
    { id: 'ui', labelKey: 'project.architecture.ui', items: ['Next.js App Router', 'React 19', 'Tailwind CSS 4'] },
    { id: 'core', labelKey: 'project.architecture.core', items: ['next-intl', 'Content routes', 'SEO metadata'] },
    { id: 'platform', labelKey: 'project.architecture.platform', items: ['Cloudflare Workers', 'Wrangler'] },
  ],
  'astro-two': [
    { id: 'ui', labelKey: 'project.architecture.ui', items: ['Astro 4', 'Tailwind', 'React islands'] },
    { id: 'core', labelKey: 'project.architecture.core', items: ['MDX', 'astro-i18n', 'Pagefind'] },
    { id: 'platform', labelKey: 'project.architecture.platform', items: ['Static output', 'Sitemap'] },
  ],
  'portfolio-website': [
    { id: 'ui', labelKey: 'project.architecture.ui', items: ['Vue 3', 'Naive UI', 'Tailwind'] },
    { id: 'core', labelKey: 'project.architecture.core', items: ['Vue Router', 'Pinia', 'Vue I18n'] },
    { id: 'data', labelKey: 'project.architecture.data', items: ['src/data', 'SEO / RSS', 'Structured content'] },
    { id: 'platform', labelKey: 'project.architecture.platform', items: ['Vite', 'Cloudflare / Pages'] },
  ],
  'client-build-pipeline': [
    { id: 'core', labelKey: 'project.architecture.core', items: ['Rust kernel', 'Tauri', 'npm scripts'] },
    { id: 'data', labelKey: 'project.architecture.data', items: ['Version records', 'Package checks'] },
    { id: 'platform', labelKey: 'project.architecture.platform', items: ['MSIX', 'Microsoft Store', 'Steam'] },
  ],
  'website-payment-system': [
    { id: 'ui', labelKey: 'project.architecture.ui', items: ['Astro / Next.js sites', 'Admin UI'] },
    { id: 'core', labelKey: 'project.architecture.core', items: ['Checkout', 'Webhook', 'Entitlements'] },
    { id: 'platform', labelKey: 'project.architecture.platform', items: ['Cloudflare Pages / R2', 'CDN'] },
  ],
  'python-automation': [
    { id: 'ui', labelKey: 'project.architecture.ui', items: ['Tkinter tools'] },
    { id: 'core', labelKey: 'project.architecture.core', items: ['Excel processing', 'Retry / logs'] },
    { id: 'platform', labelKey: 'project.architecture.platform', items: ['Task Scheduler', 'systemd', 'PyInstaller'] },
  ],
};

export function getProjectArchitecture(id: string): ArchitectureLayer[] {
  return projectArchitectures[id] ?? [];
}
