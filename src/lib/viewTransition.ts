/*
Copyright (c) 2026 Sabareesh M (saba1207B). All Rights Reserved.

This source code is proprietary and confidential.

Unauthorized copying, redistribution, modification, or use — including
any use for artificial intelligence / machine learning training —
is strictly prohibited.

See the LICENSE and COPYRIGHT files in the repository root for full terms.
*/

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
