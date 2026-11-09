/*
Copyright (c) 2026 Sabareesh M (saba1207B). All Rights Reserved.

This source code is proprietary and confidential.

Unauthorized copying, redistribution, modification, or use — including
any use for artificial intelligence / machine learning training —
is strictly prohibited.

See the LICENSE and COPYRIGHT files in the repository root for full terms.
*/

import React, { useEffect, useRef } from 'react';

/**
 * ChocolateLiquidBackground
 *
 * Procedurally recreates the exact liquid boundary shown in the reference image:
 * - Rich, glossy, viscous molten dark chocolate dripping from the top edge-to-edge
 * - Exact silhouette reproduction:
 *   - Smooth organic horizontal waves across 0% to 100% width
 *   - Large rounded chocolate drip descending near left-center (x ≈ 42.5%, y ≈ 80%)
 *   - Secondary rounded dip at right-center (x ≈ 74%, y ≈ 30.6%)
 *   - Soft, viscous, naturally rounded liquid edges
 * - Multi-layer chocolate lighting:
 *   - Volumetric dual contact & diffuse drop shadow cast onto #FFF0E5
 *   - Rich dark cacao body gradient (#160A05 -> #241209 -> #3D1D0E -> #542814)
 *   - Dynamic shifting glossy surface reflection wash
 *   - 3D cylindrical specular highlight along the left spine of the long drip
 *   - Meniscus rim reflection highlight tracing the bottom liquid boundary
 * - Gentle viscous procedural undulation via requestAnimationFrame
 * - Respects prefers-reduced-motion
 */
export default function ChocolateLiquidBackground() {
  const pathRef = useRef<SVGPathElement>(null);
  const glossPathRef = useRef<SVGPathElement>(null);
  const rimPathRef = useRef<SVGPathElement>(null);
  const specularPathRef = useRef<SVGPathElement>(null);
  const glossGradientRef = useRef<SVGLinearGradientElement>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Respect user's reduced motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const startTime = performance.now();

    const animate = (now: number) => {
      const t = (now - startTime) * 0.001; // elapsed seconds

      // Gentle viscous perturbations (low amplitude 2px-6px for thick molten chocolate)
      const y0 = 202 + Math.sin(t * 0.65) * 3.0;
      const yDip1 = 212 + Math.sin(t * 0.7 + 0.5) * 3.2;
      const yCrest1 = 85 + Math.sin(t * 0.6 + 1.2) * 2.8;
      const yShoulderL = 165 + Math.sin(t * 0.55 + 1.8) * 3.0;

      // Long drip stretching under gravity and viscous surface tension
      const dripY = 648 + Math.sin(t * 0.45) * 8.0;
      const dripNeckL = 575 + Math.sin(t * 0.5 + 0.3) * 1.5;
      const dripNeckR = 650 + Math.sin(t * 0.5 + 0.8) * 1.5;
      const dripCenter = (dripNeckL + dripNeckR) / 2;

      const yShoulderR = 120 + Math.sin(t * 0.65 + 2.5) * 3.0;
      const yCrest2 = 130 + Math.sin(t * 0.7 + 3.2) * 3.2;
      const ySecondaryDip = 248 + Math.sin(t * 0.55 + 4.1) * 4.5;
      const yCrest3 = 170 + Math.sin(t * 0.65 + 5.0) * 2.8;
      const yEnd = 185 + Math.sin(t * 0.6 + 0.9) * 2.5;

      // 1. Boundary Path (fills the chocolate liquid from top down)
      const boundaryD = `M 0 0 
        L 1440 0 
        L 1440 ${yEnd.toFixed(1)} 
        C 1360 ${(yEnd + 5).toFixed(1)}, 1280 ${(yCrest3 - 10).toFixed(1)}, 1220 ${yCrest3.toFixed(1)} 
        C 1160 ${(yCrest3 + 10).toFixed(1)}, 1120 ${ySecondaryDip.toFixed(1)}, 1070 ${ySecondaryDip.toFixed(1)} 
        C 1010 ${ySecondaryDip.toFixed(1)}, 960 ${(yCrest2 + 10).toFixed(1)}, 900 ${yCrest2.toFixed(1)} 
        C 840 ${(yCrest2 - 10).toFixed(1)}, 780 ${(yShoulderR - 25).toFixed(1)}, 730 ${yShoulderR.toFixed(1)} 
        C 675 ${(yShoulderR + 25).toFixed(1)}, ${(dripNeckR + 1).toFixed(1)} 210, ${dripNeckR.toFixed(1)} 280 
        C ${(dripNeckR + 1).toFixed(1)} 380, ${dripNeckR.toFixed(1)} 520, ${dripNeckR.toFixed(1)} ${(dripY - 68).toFixed(1)} 
        C ${dripNeckR.toFixed(1)} ${(dripY - 23).toFixed(1)}, ${(dripCenter + 30).toFixed(1)} ${dripY.toFixed(1)}, ${dripCenter.toFixed(1)} ${dripY.toFixed(1)} 
        C ${(dripCenter - 30).toFixed(1)} ${dripY.toFixed(1)}, ${dripNeckL.toFixed(1)} ${(dripY - 23).toFixed(1)}, ${dripNeckL.toFixed(1)} ${(dripY - 68).toFixed(1)} 
        C ${dripNeckL.toFixed(1)} 520, ${(dripNeckL - 1).toFixed(1)} 380, ${dripNeckL.toFixed(1)} 280 
        C ${(dripNeckL - 1).toFixed(1)} 240, 565 205, 545 ${yShoulderL.toFixed(1)} 
        C 520 ${(yShoulderL - 50).toFixed(1)}, 450 ${yCrest1.toFixed(1)}, 380 ${yCrest1.toFixed(1)} 
        C 320 ${yCrest1.toFixed(1)}, 280 155, 220 185 
        C 140 ${yDip1.toFixed(1)}, 80 ${y0.toFixed(1)}, 0 ${y0.toFixed(1)} 
        Z`;

      // 2. Meniscus Rim Path along the bottom edge
      const rimD = `M 0 ${y0.toFixed(1)} 
        C 80 ${y0.toFixed(1)}, 140 ${yDip1.toFixed(1)}, 220 185 
        C 280 155, 320 ${yCrest1.toFixed(1)}, 380 ${yCrest1.toFixed(1)} 
        C 450 ${yCrest1.toFixed(1)}, 520 ${(yShoulderL - 50).toFixed(1)}, 545 ${yShoulderL.toFixed(1)} 
        C 565 205, ${(dripNeckL - 1).toFixed(1)} 240, ${dripNeckL.toFixed(1)} 280 
        C ${(dripNeckL - 1).toFixed(1)} 380, ${dripNeckL.toFixed(1)} 520, ${dripNeckL.toFixed(1)} ${(dripY - 68).toFixed(1)} 
        C ${dripNeckL.toFixed(1)} ${(dripY - 23).toFixed(1)}, ${(dripCenter - 30).toFixed(1)} ${dripY.toFixed(1)}, ${dripCenter.toFixed(1)} ${dripY.toFixed(1)} 
        C ${(dripCenter + 30).toFixed(1)} ${dripY.toFixed(1)}, ${dripNeckR.toFixed(1)} ${(dripY - 23).toFixed(1)}, ${dripNeckR.toFixed(1)} ${(dripY - 68).toFixed(1)} 
        C ${dripNeckR.toFixed(1)} 520, ${(dripNeckR + 1).toFixed(1)} 380, ${dripNeckR.toFixed(1)} 280 
        C ${(dripNeckR + 1).toFixed(1)} 210, 675 ${(yShoulderR + 25).toFixed(1)}, 730 ${yShoulderR.toFixed(1)} 
        C 780 ${(yShoulderR - 25).toFixed(1)}, 840 ${(yCrest2 - 10).toFixed(1)}, 900 ${yCrest2.toFixed(1)} 
        C 960 ${(yCrest2 + 10).toFixed(1)}, 1010 ${ySecondaryDip.toFixed(1)}, 1070 ${ySecondaryDip.toFixed(1)} 
        C 1120 ${ySecondaryDip.toFixed(1)}, 1160 ${(yCrest3 + 10).toFixed(1)}, 1220 ${yCrest3.toFixed(1)} 
        C 1280 ${(yCrest3 - 10).toFixed(1)}, 1360 ${(yEnd + 5).toFixed(1)}, 1440 ${yEnd.toFixed(1)}`;

      // 3. Specular highlight running down the cylindrical left spine of the long drip
      const specX = dripNeckL + 9;
      const specD = `M ${specX.toFixed(1)} 190 
        C ${specX.toFixed(1)} 280, ${(specX + 1).toFixed(1)} 440, ${(specX + 2).toFixed(1)} ${(dripY - 78).toFixed(1)} 
        C ${(specX + 3).toFixed(1)} ${(dripY - 38).toFixed(1)}, ${(specX + 6).toFixed(1)} ${(dripY - 18).toFixed(1)}, ${(specX + 14).toFixed(1)} ${(dripY - 14).toFixed(1)} 
        C ${(specX + 10).toFixed(1)} ${(dripY - 22).toFixed(1)}, ${(specX + 8).toFixed(1)} ${(dripY - 42).toFixed(1)}, ${(specX + 7).toFixed(1)} ${(dripY - 82).toFixed(1)} 
        C ${(specX + 5).toFixed(1)} 440, ${(specX + 4).toFixed(1)} 280, ${(specX + 4).toFixed(1)} 190 
        Z`;

      if (pathRef.current) pathRef.current.setAttribute('d', boundaryD);
      if (glossPathRef.current) glossPathRef.current.setAttribute('d', boundaryD);
      if (rimPathRef.current) rimPathRef.current.setAttribute('d', rimD);
      if (specularPathRef.current) specularPathRef.current.setAttribute('d', specD);

      // Shifting gloss wash gradient angle simulating room light reflections
      if (glossGradientRef.current) {
        const x1 = (20 + Math.sin(t * 0.4) * 10).toFixed(1) + '%';
        const x2 = (80 + Math.cos(t * 0.4) * 10).toFixed(1) + '%';
        glossGradientRef.current.setAttribute('x1', x1);
        glossGradientRef.current.setAttribute('x2', x2);
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[65vw] max-h-[100svh] w-full overflow-hidden select-none lg:inset-0 lg:h-full"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 810"
        className="h-full w-full"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Dual Volumetric Drop Shadow onto the pale cream (#FFF0E5) background */}
          <filter id="choc-shadow" x="-10%" y="-10%" width="120%" height="150%">
            {/* Soft ambient shadow */}
            <feDropShadow dx="0" dy="24" stdDeviation="20" floodColor="#220D05" floodOpacity="0.25" />
            {/* Deep contact shadow */}
            <feDropShadow dx="0" dy="8" stdDeviation="7" floodColor="#140602" floodOpacity="0.38" />
          </filter>

          {/* Deep Viscous Dark Chocolate Body Gradient */}
          <linearGradient id="choc-body" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#160A05" />
            <stop offset="30%" stopColor="#241209" />
            <stop offset="65%" stopColor="#35190C" />
            <stop offset="88%" stopColor="#442010" />
            <stop offset="100%" stopColor="#542814" />
          </linearGradient>

          {/* Dynamic Surface Gloss Sheen Wash */}
          <linearGradient id="choc-gloss" ref={glossGradientRef} x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#7E4527" stopOpacity="0.42" />
            <stop offset="45%" stopColor="#4A2313" stopOpacity="0.12" />
            <stop offset="85%" stopColor="#1C0D07" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#6C391E" stopOpacity="0.2" />
          </linearGradient>

          {/* 3D Cylindrical Specular Highlight for the Long Drip */}
          <linearGradient id="drip-specular" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.0" />
            <stop offset="35%" stopColor="#FFF0E5" stopOpacity="0.52" />
            <stop offset="70%" stopColor="#D9A878" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
          </linearGradient>

          {/* Meniscus Rim Highlight along the Liquid Edge */}
          <linearGradient id="rim-highlight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D9A878" stopOpacity="0.25" />
            <stop offset="25%" stopColor="#FFF0E5" stopOpacity="0.45" />
            <stop offset="42%" stopColor="#FFF0E5" stopOpacity="0.8" />
            <stop offset="65%" stopColor="#D9A878" stopOpacity="0.4" />
            <stop offset="74%" stopColor="#FFF0E5" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#D9A878" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* 1. Main Molten Dark Chocolate Liquid Body with Realistic Shadow */}
        <path
          ref={pathRef}
          filter="url(#choc-shadow)"
          d="M 0 0 
             L 1440 0 
             L 1440 185 
             C 1360 190, 1280 160, 1220 170 
             C 1160 180, 1120 248, 1070 248 
             C 1010 248, 960 140, 900 130 
             C 840 120, 780 95, 730 120 
             C 675 145, 651 210, 650 280 
             C 651 380, 650 520, 650 580 
             C 650 625, 642 648, 612 648 
             C 582 648, 574 625, 575 580 
             C 574 520, 575 380, 575 280 
             C 575 240, 565 205, 545 165 
             C 520 115, 450 85, 380 85 
             C 320 85, 280 155, 220 185 
             C 140 215, 80 202, 0 202 
             Z"
          fill="url(#choc-body)"
        />

        {/* 2. Semi-Transparent Glossy Light Wash */}
        <path
          ref={glossPathRef}
          d="M 0 0 
             L 1440 0 
             L 1440 185 
             C 1360 190, 1280 160, 1220 170 
             C 1160 180, 1120 248, 1070 248 
             C 1010 248, 960 140, 900 130 
             C 840 120, 780 95, 730 120 
             C 675 145, 651 210, 650 280 
             C 651 380, 650 520, 650 580 
             C 650 625, 642 648, 612 648 
             C 582 648, 574 625, 575 580 
             C 574 520, 575 380, 575 280 
             C 575 240, 565 205, 545 165 
             C 520 115, 450 85, 380 85 
             C 320 85, 280 155, 220 185 
             C 140 215, 80 202, 0 202 
             Z"
          fill="url(#choc-gloss)"
        />

        {/* 3. Meniscus Specular Rim Highlight along the Bottom Liquid Edge */}
        <path
          ref={rimPathRef}
          d="M 0 202 
             C 80 202, 140 215, 220 185 
             C 280 155, 320 85, 380 85 
             C 450 85, 520 115, 545 165 
             C 565 205, 575 240, 575 280 
             C 574 380, 575 520, 575 580 
             C 574 625, 582 648, 612 648 
             C 642 648, 650 625, 650 580 
             C 650 520, 651 380, 650 280 
             C 651 210, 675 145, 730 120 
             C 780 95, 840 120, 900 130 
             C 960 140, 1010 248, 1070 248 
             C 1120 248, 1160 180, 1220 170 
             C 1280 160, 1360 190, 1440 185"
          fill="none"
          stroke="url(#rim-highlight)"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* 4. 3D Cylindrical Reflection on the Long Drip */}
        <path
          ref={specularPathRef}
          d="M 584 190 
             C 584 280, 585 440, 586 570 
             C 587 610, 590 630, 598 634 
             C 594 626, 592 606, 591 566 
             C 589 440, 588 280, 588 190 
             Z"
          fill="url(#drip-specular)"
        />
      </svg>
    </div>
  );
}
