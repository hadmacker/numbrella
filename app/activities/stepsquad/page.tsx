'use client'

import React, { useEffect, useRef, useState } from "react";
import './styles.css';

type Block = {
  x: number;
  y: number;
  width: number;
  height: number;
  value: number;
};

const blockWidth = 30;
const blockHeight = 30;
const borderStyle = "#333";
const defaultOffsetHeight = 50;

const blockColors: string[] = [
  '#9CA3AF', 
  '#EC4899', 
  '#F59E0B', 
  '#84CC16', 
  '#10B981', 
  '#3B82F6', 
  '#6366F1', 
  '#D946EF', 
  '#F43F5E', 
  '#06B6D4',
];

const Game: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([{ x: 0, y: 0, width: blockWidth, height: blockHeight, value: 0}]);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preventDefault = (e: { preventDefault: () => any; }) => e.preventDefault();
    document.addEventListener('touchmove', preventDefault, { passive: false });
  
    return () => {
      document.removeEventListener('touchmove', preventDefault);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if(!canvas) return;
    
    const context = canvas.getContext('2d');
    if(!context) return;
  
    const redraw = () => {

      const parentElement = document.getElementById('nav');
      const offsetHeight = (parentElement?.offsetHeight || 0) + defaultOffsetHeight;
      canvas.height = window.innerHeight - offsetHeight;

      context.clearRect(0, 0, canvas.width, canvas.height); 
      context.fillStyle = '#F5F5DC';
      context.fillRect(0, 0, canvas.width, canvas.height);
      blocks.map(block => {
        const canvas = canvasRef.current;
        if(!canvas) return;
  
        const context = canvas.getContext('2d')!;
        
        const color = blockColors[block.value % blockColors.length] || '#000000'; 

        const newY = canvas.height - block.height - block.y;

        context.fillStyle = color;
        context.beginPath();
        context.roundRect(block.x, newY, block.width, block.height, 5); 
        context.fill();
        
        context.strokeStyle = borderStyle;
        context.lineWidth = 3; 
        context.stroke();
  
        context.fillStyle = borderStyle;
        context.textAlign = 'center'; 
        context.font = `bold {fontSize}px Arial`; 
        context.fillText(block.value.toString(), block.x + block.width / 2, newY + block.height / 2 + 5);
      });
    };
  
    const interval = setInterval(redraw, 1000/60); 
  
    canvas.addEventListener('click', incrementBlocks);
    canvas.addEventListener('touchstart', incrementBlocks);
  
    return () => {
      clearInterval(interval);
  
      canvas.removeEventListener('click', incrementBlocks);
      canvas.removeEventListener('touchstart', incrementBlocks);
    };
  }, [blocks]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const setCanvasSize = () => {

      const container = containerRef.current;
      if (!container) {
        canvas.width = window.innerWidth * 0.95;
        canvas.height = window.innerHeight * 0.7;
        setSize({ width: canvas.width, height: canvas.height });
      } else {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        setSize({ width: canvas.width, height: canvas.height });      
      }
    };
  
    setCanvasSize();
  
    window.addEventListener('resize', setCanvasSize);  

    const context = canvas.getContext('2d');
    if (!context) return;

    contextRef.current = context;

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  const incrementBlocks = () => {
    setBlocks(b => {
      const count = b.length;
      const x = count * blockWidth;
      const y = count * blockHeight;
      const width = blockWidth;
      const height = blockHeight;
      const value = count;
      console.log(count);
      return [...blocks, { x, y, height, width, value} ];
    });
  };

  return (
    <div id="game-page" className="m-0 top-left-aligned" ref={containerRef} >
        <canvas ref={canvasRef} width={size.width} height={size.height} />
    </div>
  );
};

export default Game;
