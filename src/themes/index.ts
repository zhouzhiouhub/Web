import type { GlobalThemeOverrides } from 'naive-ui';

/* ===== CSS Variable-based Tokens ===== */

export const themeTokens = {
  light: {
    primary: 'rgb(14, 116, 144)',
    primaryHover: 'rgb(21, 94, 117)',
    accent: 'rgb(139, 92, 246)',
    background: 'rgb(249, 250, 251)',
    surface: 'rgb(255, 255, 255)',
    surfaceRaised: 'rgb(243, 244, 246)',
    foreground: 'rgb(17, 24, 39)',
    muted: 'rgb(75, 85, 99)',
    border: 'rgb(229, 231, 235)',
  },
  dark: {
    primary: 'rgb(34, 211, 238)',
    primaryHover: 'rgb(6, 182, 212)',
    accent: 'rgb(167, 139, 250)',
    background: 'rgb(10, 12, 20)',
    surface: 'rgb(17, 24, 39)',
    surfaceRaised: 'rgb(31, 41, 55)',
    foreground: 'rgb(243, 244, 246)',
    muted: 'rgb(156, 163, 175)',
    border: 'rgb(55, 65, 81)',
  },
} as const;

/* ===== Naive UI Theme Overrides ===== */

export const lightThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: themeTokens.light.primary,
    primaryColorHover: themeTokens.light.primaryHover,
    primaryColorPressed: themeTokens.light.primaryHover,
    bodyColor: themeTokens.light.background,
    cardColor: themeTokens.light.surface,
    modalColor: themeTokens.light.surface,
    popoverColor: themeTokens.light.surface,
    textColorBase: themeTokens.light.foreground,
    textColor1: themeTokens.light.foreground,
    textColor2: themeTokens.light.foreground,
    textColor3: themeTokens.light.muted,
    borderColor: themeTokens.light.border,
    dividerColor: themeTokens.light.border,
  },
  Tag: {
    textColorPrimary: themeTokens.light.foreground,
    colorPrimary: 'rgba(14, 116, 144, 0.12)',
  },
};

export const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: themeTokens.dark.primary,
    primaryColorHover: themeTokens.dark.primaryHover,
    primaryColorPressed: themeTokens.dark.primaryHover,
    bodyColor: themeTokens.dark.background,
    cardColor: themeTokens.dark.surface,
    modalColor: themeTokens.dark.surface,
    popoverColor: themeTokens.dark.surface,
    textColorBase: themeTokens.dark.foreground,
    textColor1: themeTokens.dark.foreground,
    textColor2: themeTokens.dark.foreground,
    textColor3: themeTokens.dark.muted,
    borderColor: themeTokens.dark.border,
    dividerColor: themeTokens.dark.border,
  },
};
