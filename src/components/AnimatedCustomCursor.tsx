import React, { useEffect, useRef } from 'react';

const GOLD_PALETTE = [
  '#FFD700',
  '#FFC107',
  '#FFE082',
  '#FFFA8D',
  '#FFFDF0',
  '#F59E0B',
];

interface StarParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  angle: number;
  type: 'gold-sparkle' | 'gold-dust';
  age: number;
  maxAge: number;
  twinkleSpeed: number;
}

export default function AnimatedCustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cursorRingRef = useRef<HTMLDivElement | null>(null);
  const cursorDotRef = useRef<HTMLDivElement | null>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const prevPos = useRef({ x: -100, y: -100 });
  const isMouseDownRef = useRef(false);
  const isHoveredRef = useRef(false);
  const hasMovedRef = useRef(false);

  useEffect(() => {
    // Disable custom cursor on touchscreens (Android & iOS mobile/tablet)
    const isTouch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const canvas = canvasRef.current;
    const ring = cursorRingRef.current;
    const dot = cursorDotRef.current;
    if (!canvas || !ring || !dot) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number | null = null;
    let ringX = -100;
    let ringY = -100;
    let dotX = -100;
    let dotY = -100;

    const particles: StarParticle[] = [];

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const spawnParticles = (x: number, y: number, count = 2) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.5 + 0.3;
        const isSparkle = Math.random() > 0.55;

        particles.push({
          x: x + (Math.random() - 0.5) * 12,
          y: y + (Math.random() - 0.5) * 12,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.45,
          size: isSparkle ? Math.random() * 3.5 + 2.4 : Math.random() * 1.8 + 1.0,
          color: GOLD_PALETTE[Math.floor(Math.random() * GOLD_PALETTE.length)],
          alpha: 0.95,
          angle: Math.random() * Math.PI,
          type: isSparkle ? 'gold-sparkle' : 'gold-dust',
          age: 0,
          maxAge: 28 + Math.random() * 22,
          twinkleSpeed: 0.16 + Math.random() * 0.22,
        });
      }
    };

    const spawnClickBurst = (x: number, y: number) => {
      const burstCount = 14;
      for (let i = 0; i < burstCount; i++) {
        const angle = (Math.PI * 2 * i) / burstCount + (Math.random() - 0.5) * 0.3;
        const speed = Math.random() * 3.2 + 1.4;
        const isSparkle = Math.random() > 0.4;

        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.35,
          size: isSparkle ? Math.random() * 4.2 + 2.8 : Math.random() * 2.2 + 1.2,
          color: GOLD_PALETTE[Math.floor(Math.random() * GOLD_PALETTE.length)],
          alpha: 1.0,
          angle: Math.random() * Math.PI,
          type: isSparkle ? 'gold-sparkle' : 'gold-dust',
          age: 0,
          maxAge: 32 + Math.random() * 18,
          twinkleSpeed: 0.22,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
        ringX = e.clientX;
        ringY = e.clientY;
        dotX = e.clientX;
        dotY = e.clientY;
        prevPos.current.x = e.clientX;
        prevPos.current.y = e.clientY;
      }

      const dx = e.clientX - prevPos.current.x;
      const dy = e.clientY - prevPos.current.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 5) {
        const count = Math.min(6, Math.max(2, Math.round(dist / 7)));
        spawnParticles(e.clientX, e.clientY, count);
        prevPos.current.x = e.clientX;
        prevPos.current.y = e.clientY;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isMouseDownRef.current = true;
      spawnClickBurst(e.clientX, e.clientY);

      ring.style.width = '42px';
      ring.style.height = '42px';
      ring.style.borderColor = '#FFE082';
      ring.style.boxShadow =
        '0 0 22px rgba(255, 215, 0, 0.75), inset 0 0 10px rgba(255, 215, 0, 0.35)';
      ring.style.backgroundColor = 'rgba(255, 215, 0, 0.08)';

      dot.style.transform = 'translate(-50%, -50%) scale(1.4)';
      dot.style.backgroundColor = '#FFFFFF';
      dot.style.boxShadow = '0 0 12px #FFD700';
    };

    const handleMouseUp = () => {
      isMouseDownRef.current = false;
      const isHover = isHoveredRef.current;
      ring.style.width = isHover ? '38px' : '28px';
      ring.style.height = isHover ? '38px' : '28px';
      ring.style.borderColor = isHover ? '#FFE082' : '#FFD700';
      ring.style.boxShadow = isHover
        ? '0 0 16px rgba(255, 215, 0, 0.65), inset 0 0 8px rgba(255, 215, 0, 0.25)'
        : '0 0 10px rgba(255, 215, 0, 0.45), 0 1px 4px rgba(0, 0, 0, 0.2)';
      ring.style.backgroundColor = isHover ? 'rgba(255, 215, 0, 0.05)' : 'rgba(255, 215, 0, 0.02)';

      dot.style.transform = 'translate(-50%, -50%) scale(1)';
      dot.style.backgroundColor = '#FFE082';
      dot.style.boxShadow = '0 0 8px rgba(255, 215, 0, 0.85)';
    };

    const handlePointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = target.closest('a, button, input, textarea, select, [role="button"]');
      if (isInteractive && !isMouseDownRef.current) {
        isHoveredRef.current = true;
        ring.style.width = '38px';
        ring.style.height = '38px';
        ring.style.borderColor = '#FFE082';
        ring.style.boxShadow =
          '0 0 16px rgba(255, 215, 0, 0.65), inset 0 0 8px rgba(255, 215, 0, 0.25)';
        ring.style.backgroundColor = 'rgba(255, 215, 0, 0.05)';
      }
    };

    const handlePointerOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = target.closest('a, button, input, textarea, select, [role="button"]');
      if (isInteractive && !isMouseDownRef.current) {
        isHoveredRef.current = false;
        ring.style.width = '28px';
        ring.style.height = '28px';
        ring.style.borderColor = '#FFD700';
        ring.style.boxShadow =
          '0 0 10px rgba(255, 215, 0, 0.45), 0 1px 4px rgba(0, 0, 0, 0.2)';
        ring.style.backgroundColor = 'rgba(255, 215, 0, 0.02)';
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.age++;

        const progress = p.age / p.maxAge;
        const fade = Math.max(0, 1 - progress);

        if (p.age >= p.maxAge) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        if (p.type === 'gold-dust') {
          ctx.globalAlpha = Math.max(0, p.alpha * fade);
          ctx.fillStyle = p.color;
          ctx.shadowColor = '#FFD700';
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * (1 - progress * 0.3), 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'gold-sparkle') {
          const twinkle = p.twinkleSpeed || 0.16;
          const twinkleAlpha = p.alpha * fade * (0.65 + 0.35 * Math.sin(p.age * twinkle));
          ctx.globalAlpha = Math.max(0, Math.min(1, twinkleAlpha));
          ctx.fillStyle = p.color;
          ctx.shadowColor = '#FFE082';
          ctx.shadowBlur = 8;

          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle + p.age * 0.045);

          const sz = p.size;
          ctx.beginPath();
          ctx.moveTo(0, -sz);
          ctx.lineTo(sz * 0.28, -sz * 0.28);
          ctx.lineTo(sz, 0);
          ctx.lineTo(sz * 0.28, sz * 0.28);
          ctx.lineTo(0, sz);
          ctx.lineTo(-sz * 0.28, sz * 0.28);
          ctx.lineTo(-sz, 0);
          ctx.lineTo(-sz * 0.28, -sz * 0.28);
          ctx.closePath();
          ctx.fill();

          if (sz > 3.4) {
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.arc(0, 0, sz * 0.22, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.restore();
      }

      if (hasMovedRef.current) {
        dotX += (mousePos.current.x - dotX) * 0.85;
        dotY += (mousePos.current.y - dotY) * 0.85;
        dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;

        ringX += (mousePos.current.x - ringX) * 0.38;
        ringY += (mousePos.current.y - ringY) * 0.38;
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      animId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseover', handlePointerOver, { passive: true });
    document.addEventListener('mouseout', handlePointerOut, { passive: true });

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handlePointerOver);
      document.removeEventListener('mouseout', handlePointerOut);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9998] block"
      />
      <div
        ref={cursorRingRef}
        style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          border: '1.5px solid #FFD700',
          position: 'fixed',
          left: 0,
          top: 0,
          boxShadow: '0 0 10px rgba(255, 215, 0, 0.45), 0 1px 4px rgba(0, 0, 0, 0.2)',
          backgroundColor: 'rgba(255, 215, 0, 0.02)',
          transition:
            'width 0.24s cubic-bezier(0.2, 0.8, 0.2, 1), height 0.24s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
          willChange: 'transform',
          zIndex: 9999,
        }}
      />
      <div
        ref={cursorDotRef}
        style={{
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          backgroundColor: '#FFE082',
          position: 'fixed',
          left: 0,
          top: 0,
          boxShadow: '0 0 8px rgba(255, 215, 0, 0.85), 0 0 2px #FFFFFF',
          transition: 'transform 0.15s ease, background-color 0.15s ease, box-shadow 0.15s ease',
          willChange: 'transform',
          zIndex: 10000,
        }}
      />
    </div>
  );
}
