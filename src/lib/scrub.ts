/**
 * Scrub values across the site are tuned against Lenis, which smooths the
 * scroll itself on desktop; a little catch-up lag on top of that reads as
 * cinematic. Touch devices scroll natively with no smoothing underneath, so
 * the same lag has nothing to blend into — the animation just trails the
 * finger. There, follow the scroll position exactly.
 */
export const scrubFor = (desktop: number | boolean): number | boolean =>
  window.matchMedia('(pointer: coarse)').matches ? true : desktop;
