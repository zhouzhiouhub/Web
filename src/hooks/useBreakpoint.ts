import { breakpointsTailwind, useBreakpoints as useVueUseBreakpoints } from '@vueuse/core';

export function useBreakpoint() {
  const breakpoints = useVueUseBreakpoints(breakpointsTailwind);

  return {
    isMobile: breakpoints.smaller('md'),
    isTablet: breakpoints.between('md', 'lg'),
    isDesktop: breakpoints.greaterOrEqual('lg'),
    isWide: breakpoints.greaterOrEqual('xl'),
    active: breakpoints.active(),
  };
}
