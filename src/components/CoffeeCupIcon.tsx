/*
Copyright (c) 2026 Sabareesh M (saba1207B). All Rights Reserved.

This source code is proprietary and confidential.

Unauthorized copying, redistribution, modification, or use — including
any use for artificial intelligence / machine learning training —
is strictly prohibited.

See the LICENSE and COPYRIGHT files in the repository root for full terms.
*/

interface CoffeeCupIconProps {
  className?: string;
  size?: number;
}

/**
 * CoffeeCupIcon
 * Authentic brand icon extracted from The Daily Brew's original logo:
 * Features a hand-drawn coffee cup crowned with heart-shaped curling steam.
 * Uses CSS mask with currentColor so it seamlessly adapts to both light and dark backgrounds.
 */
export default function CoffeeCupIcon({ className = 'size-6', size }: CoffeeCupIconProps) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block bg-current transition-colors duration-500 ${className}`}
      style={{
        width: size,
        height: size,
        maskImage: "url('/assets/images/cup-icon-espresso.png')",
        WebkitMaskImage: "url('/assets/images/cup-icon-espresso.png')",
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
      }}
    />
  );
}

