'use client'

import React, { useRef, useEffect, useState } from 'react';

let isMatrix = false;
let urlParams;

if (typeof window !== 'undefined') {
  urlParams = new URLSearchParams(window.location.search);
  isMatrix = urlParams.get('matrix') === '1';
}

const maxNewRaindrops = isMatrix ? 30 : 5;
const maxRaindrops = isMatrix ? 300 : 30;
const bubbleBackground = isMatrix ? '#9F9' : '#333';
const bubbleBackgroundFlash = isMatrix ? '#DFD' : '#FFF';
const badZeroColor = isMatrix ? '#DFD' : '#FFF';
const bubbleCountColor = isMatrix ? '#030' : 'white';
const zeroWeight = -10;
const minFontSize = 30;
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
  collided: boolean;
};

const RainCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [raindrops, setRaindrops] = useState<Raindrop[]>([]);
  const [excludeArea, setExcludeArea] = useState<{ x: number; y: number } | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const dragCoords = useRef({ x: 0, y: 0});
  const [dragging, setDragging] = useState(false);
  const [bubbleValue, setBubbleValue] = useState(0);
  const [bubbleRadius, setBubbleRadius] = useState(50);
  const [bubbleFlash, setBubbleFlash] = useState(false);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();

      const x = rect.width / 2;
      const y = rect.height / 2;
      dragCoords.current = { x, y };
    }
  }, [dimensions]);

  useEffect(() => {
    const preventDefault = (e: { preventDefault: () => any; }) => e.preventDefault();
    document.addEventListener('touchmove', preventDefault, { passive: false });
  
    return () => {
      document.removeEventListener('touchmove', preventDefault);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
  
    function isInsideBubble(x: number, y: number) {
      const dx = x - dragCoords.current.x;
      const dy = y - dragCoords.current.y;
      return Math.sqrt(dx * dx + dy * dy) < bubbleRadius; // Assuming the bubble's radius is 50
    }
  
    function handleMouseDown(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (isInsideBubble(x, y)) {
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
    }
  
    function handleTouchStart(e: TouchEvent) {
      const rect = canvas.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const y = e.touches[0].clientY - rect.top;
      if (isInsideBubble(x, y)) {
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
        .filter(drop => drop.y < canvas.height && !drop.collided)
        .forEach((drop, dropIndex) => {
        const digits = Array.from(drop.value.toString());
        let xOffset = 0;
        digits.forEach((digit, index) => {
          ctx.beginPath();
          ctx.font = `bold ${drop.fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`;
          ctx.fillStyle = digitColors[parseInt(digit, 10) as keyof typeof digitColors] || 'white'; // Use the color corresponding to the digit, or white if the digit is not in the mapping
          if(drop.value == 0) {
            ctx.fillStyle = badZeroColor;
          }
          ctx.fillText(digit, drop.x + xOffset, drop.y); // Draw the digit
          ctx.stroke();
          xOffset += ctx.measureText(digit).width; // Update the xOffset for the next digit
        });
      
        drop.y += drop.speed;

        const dx = drop.x - dragCoords.current.x;
        const dy = drop.y - dragCoords.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < bubbleRadius && !drop.collided) { // Check if the drop has not collided before
          // The drop is inside the bubble and has not collided before, mark it as collided
          drop.collided = true;
      
          // Increment bubbleValue or reset if hits a zero
          if(drop.value == 0) {
            setBubbleValue(0);
            setBubbleFlash(true);
            setTimeout(() => setBubbleFlash(false), 100);
          } else {
            setBubbleValue(prevBubbleValue => {
              const newBubbleValue = prevBubbleValue + drop.value;
              if(newBubbleValue > highScore) {
                setHighScore(newBubbleValue);
              }
              return newBubbleValue;
            });
          }
        }

        ctx.beginPath();
        ctx.arc(dragCoords.current.x, dragCoords.current.y, bubbleRadius, 0, 2 * Math.PI);
        ctx.fillStyle = bubbleFlash ? bubbleBackgroundFlash : bubbleBackground;
        ctx.fill();
        ctx.font = `bold ${minFontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = bubbleCountColor;
        ctx.fillText(bubbleValue.toString(), dragCoords.current.x, dragCoords.current.y);
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, [raindrops, excludeArea, bubbleRadius, bubbleFlash, bubbleValue, highScore, dimensions]);

  useEffect(() => {
    function generateValue() {
      const newValue = Math.floor(Math.random() * 99) + zeroWeight;

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
          fontSize: Math.floor(Math.random() * (72 - minFontSize + 1)) + minFontSize,
          collided: false,
        }));
        setRaindrops((prevRaindrops) => [...prevRaindrops, ...newRaindrops]);
      }
    }, 500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ overflow: 'hidden', height: '100vh', width: '100vw' }}>
      <span style={{ marginRight: '80px' }}>High Score: {highScore}</span><span>Current Score: {bubbleValue}</span>
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