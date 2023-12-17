'use client'

import React, { useRef, useEffect, useState } from 'react';

const DrawingCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [color, setColor] = useState<string>('black');
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

    // Setup canvas only once when the component is mounted
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth * 0.95;
      canvas.height = window.innerHeight * 0.8;
      const context = canvas.getContext('2d');
      if (!context) return;
      context.fillStyle = 'white'; // Set canvas background color to white
      context.fillRect(0, 0, canvas.width, canvas.height);
    };
  
    setCanvasSize(); // Set initial size
  
    // Update canvas size when window size changes
    window.addEventListener('resize', setCanvasSize);  

    const context = canvas.getContext('2d');
    if (!context) return;

    context.fillStyle = 'white'; // Set canvas background color to white
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.lineCap = 'round';
    context.strokeStyle = color;
    context.lineWidth = 2;

    contextRef.current = context;

      // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  // Change stroke style whenever color changes
  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = color;
    }
  }, [color]);

  const startDrawing = (event: { touches?: any; clientX?: any; clientY?: any; }) => {
    const { clientX, clientY } = event.touches ? event.touches[0] : event;
    if (contextRef.current) {
      contextRef.current.beginPath();
      contextRef.current.moveTo(clientX, clientY);
    }
    setIsDrawing(true);
  };

  const draw = (event: { touches?: any; clientX?: any; clientY?: any; }) => {
    if (!isDrawing) return;
    const { clientX, clientY } = event.touches ? event.touches[0] : event;
    if (contextRef.current) {
      contextRef.current.lineTo(clientX, clientY);
      contextRef.current.stroke();
    }
  };

  const endDrawing = () => {
    if (contextRef.current) {
      contextRef.current.closePath();
    }
    setIsDrawing(false);
  };

  const exportImage = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const image = canvas.toDataURL('image/png');
    
    // Open the image in a new tab or trigger a download
    const link = document.createElement('a');
    link.href = image;
    link.download = 'drawing.png';
    link.click();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;

    context.fillStyle = 'white'; // Set fill color to white
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div>
      <div style={{ 
        border: '1px solid black', 
        backgroundColor: '#222222'}}>
          <label>Select Color: </label>
          <input
            style={{border: '1px solid white'}}
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={endDrawing}
        style={{ border: '1px solid black' }}
      />
      <button 
      style={{ padding: '10px', backgroundColor: '#555', border: '1px solid #ccc', borderRadius: '5px' }} 
      className="m-1"
      onClick={exportImage}>Export as Image</button>
      <button 
      style={{ padding: '10px', backgroundColor: '#555', border: '1px solid #ccc', borderRadius: '5px' }} 
      className="m-1"
      onClick={clearCanvas}>Clear</button>
    </div>
  );
};

export default DrawingCanvas;
