export const HOME_HERO_ID = 'home-hero';
export const STATIC_HEADER_ID = 'static-header';

export function hasStaticHomeHero(): boolean {
  return document.getElementById(HOME_HERO_ID) !== null;
}

export function hasStaticHeader(): boolean {
  return document.getElementById(STATIC_HEADER_ID) !== null;
}

export function setNotHomeClass(isHome: boolean): void {
  document.documentElement.classList.toggle('not-home', !isHome);
}

export function syncHomeHeroText(getText: (key: string) => string): void {
  const root = document.getElementById(HOME_HERO_ID);
  if (!root) return;

  const nodes = root.querySelectorAll<HTMLElement>('[data-i18n]');
  nodes.forEach((node) => {
    const key = node.dataset.i18n;
    if (!key) return;
    setElementText(node, getText(key));
  });
}

function setElementText(element: HTMLElement, value: string): void {
  Object.assign(element, { textContent: value });
}
