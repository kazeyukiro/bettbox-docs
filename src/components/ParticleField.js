import React, {useEffect, useRef} from 'react';

/**
 * Hero 背景粒子网络：漂浮节点 + 邻近连线，
 * 亮/暗主题自动换色，尊重 prefers-reduced-motion。
 */
export default function ParticleField({className = ''}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let raf = 0;
    let running = true;
    let points = [];

    const scheme = () =>
      document.documentElement.getAttribute('data-theme') === 'dark'
        ? {dot: [150, 158, 205], line: [120, 128, 180], maxDot: 0.55, maxLine: 0.2}
        : {dot: [69, 78, 117], line: [69, 78, 117], maxDot: 0.4, maxLine: 0.14};

    const seed = () => {
      const count = Math.min(64, Math.max(30, Math.round((width * height) / 26000)));
      points = Array.from({length: count}, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        r: 1.1 + Math.random() * 1.5,
      }));
    };

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (reduced) draw();
    };

    const LINK = 132;

    const draw = () => {
      const c = scheme();
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        for (let j = i + 1; j < points.length; j++) {
          const q = points[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            const a = (1 - d / LINK) * c.maxLine;
            ctx.strokeStyle = `rgba(${c.line[0]},${c.line[1]},${c.line[2]},${a})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
      for (const p of points) {
        ctx.fillStyle = `rgba(${c.dot[0]},${c.dot[1]},${c.dot[2]},${c.maxDot})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      if (!running) return;
      for (const p of points) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -8) p.x = width + 8;
        if (p.x > width + 8) p.x = -8;
        if (p.y < -8) p.y = height + 8;
        if (p.y > height + 8) p.y = -8;
      }
      draw();
      raf = requestAnimationFrame(step);
    };

    const onVisibility = () => {
      if (reduced) return;
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else {
        running = true;
        raf = requestAnimationFrame(step);
      }
    };

    // 主题切换时刷新画布配色
    const observer = new MutationObserver(() => {
      if (reduced) draw();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);

    if (!reduced) {
      raf = requestAnimationFrame(step);
    } else {
      draw();
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
