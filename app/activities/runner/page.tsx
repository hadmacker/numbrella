'use client'

import { PrettyChar } from '@/app/prettyChar';
import React, { useRef, useEffect, useState } from 'react';

const digitColors = {
  0: '#9CA3AF', // Equivalent to text-gray-400
  1: '#EC4899', // Equivalent to text-pink-500
  2: '#F59E0B', // Equivalent to text-amber-500
  3: '#84CC16', // Equivalent to text-lime-500
  4: '#10B981', // Equivalent to text-emerald-500
  5: '#3B82F6', // Equivalent to text-blue-400
  6: '#6366F1', // Equivalent to text-indigo-600
  7: '#D946EF', // Equivalent to text-fuchsia-500
  8: '#F43F5E', // Equivalent to text-rose-500
  9: '#06B6D4', // Equivalent to text-cyan-400
};

type Raindrop = {
  x: number;
  y: number;
  speed: number;
  value: number;
  fontSize: number;
};

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
      raindrops
        .filter(drop => drop.y < canvas.height)
        .forEach((drop) => {
        const digits = Array.from(drop.value.toString());
        let xOffset = 0;
        digits.forEach((digit, index) => {
          ctx.beginPath();
          ctx.font = `${drop.fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`;
          ctx.fillStyle = digitColors[parseInt(digit, 10) as keyof typeof digitColors] || 'white'; // Use the color corresponding to the digit, or white if the digit is not in the mapping
          ctx.fillText(digit, drop.x + xOffset, drop.y); // Draw the digit
          ctx.stroke();
          xOffset += ctx.measureText(digit).width; // Update the xOffset for the next digit
        });
      
        drop.y += drop.speed;
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, [raindrops, excludeArea]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (raindrops.length < 50) {
        const newRaindrops: Raindrop[] = Array.from({ length: 10 }, () => ({
          x: Math.random() * canvasRef.current!.width,
          y: 0,
          speed: Math.random() * 5 + 2,
          value: Math.floor(Math.random() * 99) + 1,
          fontSize: Math.floor(Math.random() * (72 - 20 + 1)) + 20,
        }));
        setRaindrops((prevRaindrops) => [...prevRaindrops, ...newRaindrops]);
      }
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