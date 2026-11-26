import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  rotation: number;
  rotationSpeed: number;
  shape: 'circle' | 'star' | 'cross' | 'diamond';
  pulse: number;
  pulseSpeed: number;
}

interface CelebrationParticlesProps {
  active: boolean;
  particleCount?: number;
  theme?: 'gold' | 'rainbow' | 'stars';
}

const RAINBOW_COLORS = ['#F59E0B', '#10B981', '#3B82F6', '#EC4899', '#8B5CF6', '#F43F5E', '#06B6D4', '#EAB308'];
const GOLD_COLORS = ['#FFD700', '#F59E0B', '#FFA500', '#FDE68A', '#FFFBEB', '#F97316'];

export const CelebrationParticles: React.FC<CelebrationParticlesProps> = ({
  active,
  particleCount = 45,
  theme = 'rainbow',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const colors = theme === 'gold' ? GOLD_COLORS : RAINBOW_COLORS;
    const shapes: ('circle' | 'star' | 'cross' | 'diamond')[] = ['circle', 'star', 'cross', 'diamond'];

    const createParticle = (spawnY?: number): Particle => {
      return {
        x: Math.random() * width,
        y: spawnY !== undefined ? spawnY : Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: -(0.6 + Math.random() * 1.4), // Float upwards
        size: 3 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.3 + Math.random() * 0.7,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.05,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        pulse: Math.random() * Math.PI,
        pulseSpeed: 0.03 + Math.random() * 0.04,
      };
    };

    const particles: Particle[] = Array.from({ length: particleCount }, () => createParticle());

    const drawStar = (cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) => {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.fill();
    };

    const drawDiamond = (cx: number, cy: number, size: number) => {
      ctx.beginPath();
      ctx.moveTo(cx, cy - size);
      ctx.lineTo(cx + size * 0.7, cy);
      ctx.lineTo(cx, cy + size);
      ctx.lineTo(cx - size * 0.7, cy);
      ctx.closePath();
      ctx.fill();
    };

    const drawCross = (cx: number, cy: number, size: number) => {
      ctx.fillRect(cx - size * 0.8, cy - size * 0.2, size * 1.6, size * 0.4);
      ctx.fillRect(cx - size * 0.2, cy - size * 0.8, size * 0.4, size * 1.6);
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx + Math.sin(p.pulse) * 0.5;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.pulse += p.pulseSpeed;

        const currentAlpha = Math.max(0.1, p.alpha * (0.6 + Math.sin(p.pulse) * 0.4));
        const currentSize = p.size * (0.85 + Math.sin(p.pulse) * 0.25);

        // Recycle particle when it floats off the top
        if (p.y < -20 || p.x < -20 || p.x > width + 20) {
          particles[i] = createParticle(height + 10);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = currentAlpha;
        ctx.fillStyle = p.color;

        switch (p.shape) {
          case 'circle':
            ctx.beginPath();
            ctx.arc(0, 0, currentSize * 0.7, 0, Math.PI * 2);
            ctx.fill();
            break;
          case 'star':
            drawStar(0, 0, 5, currentSize * 1.1, currentSize * 0.5);
            break;
          case 'diamond':
            drawDiamond(0, 0, currentSize);
            break;
          case 'cross':
            drawCross(0, 0, currentSize);
            break;
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active, particleCount, theme]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 w-full h-full z-10"
    />
  );
};
