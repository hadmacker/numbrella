'use client'

import React, { useRef, useEffect, useState } from 'react';

interface Raindrop {
  x: number;
  y: number;
  speed: number;
}

const RainCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [raindrops, setRaindrops] = useState<Raindrop[]>([]);
  const [excludeArea, setExcludeArea] = useState<{ x: number; y: number } | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw raindrops
      raindrops.forEach((drop) => {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + 1);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 3;
        ctx.stroke();

        drop.y += drop.speed;
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, [raindrops, excludeArea]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newRaindrops: Raindrop[] = Array.from({ length: 10 }, () => ({
        x: Math.random() * canvasRef.current!.width,
        y: 0,
        speed: Math.random() * 5 + 2,
      }));
      setRaindrops((prevRaindrops) => [...prevRaindrops, ...newRaindrops]);
    }, 500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ overflow: 'hidden', height: '100vh', width: '100vw' }}>
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      style={{ border: '1px solid #000' }}
    />
    </div>
  );
};

export default RainCanvas;