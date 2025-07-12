'use client';

import { useMediaQuery } from './useMediaQuery';

const MOBILE_BREAKPOINT = 640;

export function useIsMobile() {
  return useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT}px)`);
}
