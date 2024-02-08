'use client'

import React, { useRef, useEffect, useState } from 'react';

const urlParams = new URLSearchParams(window.location.search);
const isMatrix = urlParams.get('matrix') === '1';
const maxNewRaindrops = isMatrix ? 30 : 5;
const maxRaindrops = isMatrix ? 300 : 30;
const bubbleBackground = isMatrix ? '#9F9' : '#FFF';
const digitColors =  isMatrix ? {
  0: '#0f0',
  1: '#1f1',
  2: '#2f2',
  3: '#3f3',
  4: '#4f4',
  5: '#5f5',
  6: '#6f6',
  7: '#7f7',
  8: '#8f8',
  9: '#9f9',
} : {
  0: '#FFF', //'#9CA3AF', // Equivalent to text-gray-400
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
  const dragCoords = useRef({ x: 0, y: 0});
  const [dragging, setDragging] = useState(false);
  const [bubbleValue, setBubbleValue] = useState(0);

  useEffect(() => {
    console.log("1");
    if (canvasRef.current) {
      console.log("2");
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();

      const x = rect.width / 2;
      const y = rect.height / 2;
      dragCoords.current = { x, y };
      console.log(dragCoords);
    }
  }, [dimensions]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
  
    function isInsideBubble(x: number, y: number) {
      console.log(dragCoords.current);
      console.log(x, y);
      const dx = x - dragCoords.current.x;
      const dy = y - dragCoords.current.y;
      return Math.sqrt(dx * dx + dy * dy) < 50; // Assuming the bubble's radius is 50
    }
  
    function handleMouseDown(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (isInsideBubble(x, y)) {
        console.log('inside bubble');
        setDragging(true);
      }
    }
  
    function handleMouseMove(e: MouseEvent) {
      if (dragging) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        dragCoords.current = { x, y };
      }
    }
  
    function handleMouseUp() {
      setDragging(false);
      console.log('exiting bubble');
    }
  
    function handleTouchStart(e: TouchEvent) {
      const rect = canvas.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const y = e.touches[0].clientY - rect.top;
      if (isInsideBubble(x, y)) {
        console.log('inside bubble');
        setDragging(true);
      }
    }
  
    function handleTouchMove(e: TouchEvent) {
      if (dragging) {
        const rect = canvas.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const y = e.touches[0].clientY - rect.top;
        dragCoords.current = { x, y };
      }
    }
  
    function handleTouchEnd() {
      setDragging(false);
      console.log('exiting bubble');
    }
  
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', handleTouchEnd);
  
    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [dragCoords, dragging]);

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
          ctx.font = `bold ${drop.fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`;
          ctx.fillStyle = digitColors[parseInt(digit, 10) as keyof typeof digitColors] || 'white'; // Use the color corresponding to the digit, or white if the digit is not in the mapping
          ctx.fillText(digit, drop.x + xOffset, drop.y); // Draw the digit
          ctx.stroke();
          xOffset += ctx.measureText(digit).width; // Update the xOffset for the next digit
        });
      
        drop.y += drop.speed;

        ctx.beginPath();
        ctx.arc(dragCoords.current.x, dragCoords.current.y, 50, 0, 2 * Math.PI);
        ctx.fillStyle = bubbleBackground;
        ctx.fill();
        ctx.font = 'bold 20px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'black';
        ctx.fillText(bubbleValue.toString(), dragCoords.current.x, dragCoords.current.y);
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, [raindrops, excludeArea]);

  useEffect(() => {
    function generateValue() {
      const newValue = Math.floor(Math.random() * 99) + -10;

      if(newValue < 0) {
        return 0;
      }
      return newValue;
    }

    const interval = setInterval(() => {
      if (raindrops.length < maxRaindrops) {
        const newRaindrops: Raindrop[] = Array.from({ length: maxNewRaindrops }, () => ({
          x: Math.random() * canvasRef.current!.width,
          y: 0,
          speed: Math.random() * 3 + 2,
          value: generateValue(),
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