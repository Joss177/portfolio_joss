import React, { useEffect, useRef, useState } from 'react';

interface RainEffectProps {
  density: number; // 0 to 100
  isStorm: boolean;
  lightningTrigger: number; // Increment to trigger a manual strike
  onLightningStrike?: () => void;
}

interface Drop {
  x: number;
  y: number;
  vy: number;
  len: number;
  opacity: number;
}

interface Splash {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
}

interface LightningBranch {
  points: { x: number; y: number }[];
  width: number;
  color: string;
}

export const RainEffect: React.FC<RainEffectProps> = ({
  density,
  isStorm,
  lightningTrigger,
  onLightningStrike,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dropsRef = useRef<Drop[]>([]);
  const splashesRef = useRef<Splash[]>([]);
  const [flashIntensity, setFlashIntensity] = useState<number>(0);
  const lightningPathRef = useRef<LightningBranch[]>([]);

  // Track lightning triggers
  const lastTriggerRef = useRef(lightningTrigger);

  // Initialize drops
  const initDrops = (width: number, height: number) => {
    const dropsCount = Math.floor((width * height) / 10000) * (density / 100) * 1.5;
    const drops: Drop[] = [];
    for (let i = 0; i < dropsCount; i++) {
      drops.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        vy: 12 + Math.random() * 8 + (isStorm ? 6 : 0),
        len: 15 + Math.random() * 20,
        opacity: 0.15 + Math.random() * 0.35,
      });
    }
    dropsRef.current = drops;
  };

  // Trigger lightning bolt inside canvas
  const triggerLightningBolt = (width: number, height: number) => {
    setFlashIntensity(0.9 + Math.random() * 0.1);
    
    // Play audio/rumble via callback if available
    if (onLightningStrike) {
      onLightningStrike();
    }

    // Generate main lightning path (procedural fractal line)
    const startX = width * 0.2 + Math.random() * width * 0.6;
    const branches: LightningBranch[] = [];
    
    const generateBranch = (sx: number, sy: number, angle: number, length: number, depth: number): { x: number; y: number }[] => {
      const points = [{ x: sx, y: sy }];
      let cx = sx;
      let cy = sy;
      const stepCount = 10 + Math.random() * 15;
      
      for (let i = 1; i <= stepCount; i++) {
        const t = i / stepCount;
        const targetY = sy + length * t;
        const targetX = cx + Math.sin(angle) * (length / stepCount) + (Math.random() * 50 - 25);
        
        cx = targetX;
        cy = targetY;
        points.push({ x: cx, y: cy });

        // Fork branches at random depths
        if (depth < 2 && Math.random() < 0.18 && i < stepCount - 2) {
          const forkAngle = angle + (Math.random() * 1.2 - 0.6);
          const forkPath = generateBranch(cx, cy, forkAngle, length * (1.1 - t) * 0.6, depth + 1);
          branches.push({
            points: forkPath,
            width: Math.max(0.5, 3 - depth * 1.2),
            color: Math.random() > 0.4 ? 'rgba(156, 163, 255, 0.85)' : 'rgba(196, 181, 253, 0.95)',
          });
        }
      }
      return points;
    };

    const mainPath = generateBranch(startX, 0, Math.PI / 2, height * 0.9, 0);
    branches.unshift({
      points: mainPath,
      width: 4.5,
      color: '#ffffff',
    });

    lightningPathRef.current = branches;

    // Decay flash after standard thunder patterns
    let duration = 300 + Math.random() * 300;
    const startTime = Date.now();

    const updateFlash = () => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / duration;
      if (progress >= 1) {
        setFlashIntensity(0);
        lightningPathRef.current = [];
        // Second quick stroke 65% of the time (strobe lightning)
        if (Math.random() < 0.6) {
          setTimeout(() => {
            setFlashIntensity(0.7);
            const secondaryX = startX + (Math.random() * 100 - 50);
            const secondaryBranches = [{
              points: generateBranch(secondaryX, 0, Math.PI / 2 + (Math.random() * 0.4 - 0.2), height * 0.85, 1),
              width: 2.5,
              color: 'rgba(219, 234, 254, 0.9)',
            }];
            lightningPathRef.current = secondaryBranches;
            
            setTimeout(() => {
              setFlashIntensity(0);
              lightningPathRef.current = [];
            }, 120);
          }, 150 + Math.random() * 100);
        }
      } else {
        // Flicker effect
        const flicker = Math.sin(progress * Math.PI * 6.5) * 0.15;
        setFlashIntensity(Math.max(0, (1 - progress) * 0.8 + flicker));
        requestAnimationFrame(updateFlash);
      }
    };
    requestAnimationFrame(updateFlash);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    initDrops(width, height);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      initDrops(width, height);
    };

    window.addEventListener('resize', handleResize);

    const updateAndRender = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw lightning flashes and branch strikes if present
      if (flashIntensity > 0) {
        // Radial aura in center of lightning strike
        ctx.fillStyle = `rgba(139, 92, 246, ${flashIntensity * 0.13})`; // Purple lightning haze
        ctx.fillRect(0, 0, width, height);
        
        const grad = ctx.createRadialGradient(width / 2, 0, 10, width / 2, height / 2, width);
        grad.addColorStop(0, `rgba(191, 219, 254, ${flashIntensity * 0.22})`); // Soft blue ambient flash
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        // Rendering the actual lightning branches
        lightningPathRef.current.forEach((branch) => {
          if (branch.points.length < 2) return;
          ctx.beginPath();
          ctx.moveTo(branch.points[0].x, branch.points[0].y);
          for (let i = 1; i < branch.points.length; i++) {
            ctx.lineTo(branch.points[i].x, branch.points[i].y);
          }
          
          ctx.lineWidth = branch.width;
          ctx.strokeStyle = branch.color;
          ctx.shadowColor = 'rgba(147, 197, 253, 0.9)';
          ctx.shadowBlur = 15;
          ctx.stroke();
          
          // Outer neon glow stroke
          ctx.lineWidth = branch.width * 2.5;
          ctx.strokeStyle = 'rgba(79, 70, 229, 0.3)'; // Indigo shadow glow
          ctx.stroke();
        });
        
        // Reset shadows
        ctx.shadowBlur = 0;
      }

      // 2. Animate falling rain
      const drops = dropsRef.current;
      ctx.strokeStyle = isStorm ? 'rgba(165, 180, 252, 0.32)' : 'rgba(156, 163, 175, 0.22)';
      ctx.lineWidth = 1.25;
      ctx.lineCap = 'round';

      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        
        // Draw splash-trail
        ctx.beginPath();
        // Slightly skewed line due to wind in storms
        const windX = isStorm ? 2.5 : 0.8;
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + windX * (d.len / 10), d.y + d.len);
        ctx.strokeStyle = `rgba(147, 197, 253, ${d.opacity})`;
        ctx.stroke();

        // Update position
        d.y += d.vy;
        d.x += isStorm ? 1.5 : 0.5;

        // Splash on ground collision
        if (d.y > height - 12) {
          if (Math.random() < 0.2 && splashesRef.current.length < 120) {
            splashesRef.current.push({
              x: d.x,
              y: height - Math.random() * 8,
              vx: Math.random() * 4 - 2 + (isStorm ? 1 : 0),
              vy: -Math.random() * 4 - 2,
              radius: 0.8 + Math.random() * 1.5,
              alpha: d.opacity * 0.8,
            });
          }
          // Reset drop to top
          d.y = -d.len - Math.random() * 50;
          d.x = Math.random() * width;
        }
      }

      // 3. Render splashes
      const splashes = splashesRef.current;
      for (let i = splashes.length - 1; i >= 0; i--) {
        const s = splashes[i];
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(191, 219, 254, ${s.alpha})`;
        ctx.fill();

        // Update splash kinematics
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.25; // gravity parameter
        s.alpha -= 0.04;

        if (s.alpha <= 0) {
          splashes.splice(i, 1);
        }
      }

      // 4. Soft electrical floating ambient sparks or grid nodes
      if (isStorm && Math.random() < 0.03) {
        ctx.fillStyle = 'rgba(236, 72, 153, 0.6)'; // Pink electric speckles
        ctx.fillRect(Math.random() * width, Math.random() * height, 2.5, 2.5);
      }

      animationId = requestAnimationFrame(updateAndRender);
    };

    updateAndRender();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [density, isStorm, flashIntensity]);

  // Handle manual/external lightning trigger strikes
  useEffect(() => {
    if (lightningTrigger > lastTriggerRef.current) {
      lastTriggerRef.current = lightningTrigger;
      const canvas = canvasRef.current;
      if (canvas) {
        triggerLightningBolt(canvas.width, canvas.height);
      }
    }
  }, [lightningTrigger]);

  // Auto trigger random lightning bolt in high storms
  useEffect(() => {
    if (!isStorm) return;
    
    const triggerRandom = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        triggerLightningBolt(canvas.width, canvas.height);
      }
      // Wait between 10 to 25 seconds for the next strike
      const nextDelay = 10000 + Math.random() * 15000;
      lightningTimer = setTimeout(triggerRandom, nextDelay);
    };

    let lightningTimer = setTimeout(triggerRandom, 12000 + Math.random() * 8000);

    return () => clearTimeout(lightningTimer);
  }, [isStorm]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10">
      <canvas ref={canvasRef} className="w-full h-full block" />
      
      {/* Dynamic Storm flash screen cover layer */}
      <div 
        className="fixed inset-0 pointer-events-none transition-colors duration-75 z-40" 
        style={{
          backgroundColor: `rgba(219, 234, 254, ${flashIntensity * 0.15})`,
        }}
      />
    </div>
  );
};
