/**
 * View Transition Helper
 * Integrates CSS View Transitions API with graceful fallback for browsers without native support.
 */
export function navigateWithViewTransition(callback: () => void | Promise<void>) {
  if (
    typeof document !== 'undefined' &&
    'startViewTransition' in document &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return (document as any).startViewTransition(async () => {
      await callback();
    });
  } else {
    return Promise.resolve(callback());
  }
}
