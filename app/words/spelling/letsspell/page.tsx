'use client'

import React, { useEffect, useState, useRef } from "react";
import { PrettyChar } from '../../../prettyChar'

const pretty = PrettyChar.allCharacters();

const words = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const lineWidth = 2;

const LetsSpell = () => {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("type");
  const [level, setLevel] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>();
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [color] = useState<string>('black');
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const levelParam = params.get('level');
    setSelectedWord(words[0]);
    setLevel(levelParam);
  }, []);

  const initializeContext = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = 'white'; // Set canvas background color to white
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const y = (ctx.canvas.height / 4) * 2;
    ctx.strokeStyle = 'lightgray';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]); // Set dashed line pattern
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(ctx.canvas.width, y);
    ctx.stroke();
    ctx.setLineDash([]); // Reset line dash

    // Draw the selected word at the top left
    ctx.fillStyle = 'black';
    ctx.font = '14px Arial';
    ctx.fillText(selectedWord ?? "", 5, 20);

    ctx.lineCap = 'round';
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
  };

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        setContext(ctx);

      //   const initializeContext = () => {
      //     ctx.fillStyle = 'white'; // Set canvas background color to white
      //     ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      //     const y = (ctx.canvas.height / 4) * 2;
      //     ctx.strokeStyle = 'lightgray';
      //     ctx.lineWidth = 1;
      //     ctx.setLineDash([5, 5]); // Set dashed line pattern
      //     ctx.beginPath();
      //     ctx.moveTo(0, y);
      //     ctx.lineTo(ctx.canvas.width, y);
      //     ctx.stroke();
      //     ctx.setLineDash([]); // Reset line dash

      //     // Draw the selected word at the top left
      //     ctx.fillStyle = 'black';
      //     ctx.font = '20px Arial';
      //     ctx.fillText(selectedWord ?? "", 10, 30);

      //     ctx.lineCap = 'round';
      //     ctx.strokeStyle = color;
      //     ctx.lineWidth = lineWidth;
      //   };
      
      //   initializeContext(); // Set initial size of canvas
      // }

        initializeContext(ctx);
      }
      // Prevent default behavior for touch and mouse events at the document level
      const preventDefault = (e: TouchEvent | MouseEvent) => e.preventDefault();
      document.addEventListener('touchmove', preventDefault as EventListener, { passive: false });
      document.addEventListener('mousemove', preventDefault as EventListener);
  
      // Cleanup event listeners on component unmount
      return () => {
        document.removeEventListener('touchmove', preventDefault);
        document.removeEventListener('mousemove', preventDefault);
      };
      }
    }, []);

  const handleSaveCanvas = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = `${selectedWord}.png`;
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  const handleClearCanvas = () => {
    if (context) {
      initializeContext(context);
      // context.fillStyle = 'white';
      // context.fillRect(0, 0, context.canvas.width, context.canvas.height);

      // const y = (context.canvas.height / 4) * 2;
      // context.strokeStyle = 'lightgray';
      // context.lineWidth = 1;
      // context.setLineDash([5, 5]); // Set dashed line pattern
      // context.beginPath();
      // context.moveTo(0, y);
      // context.lineTo(context.canvas.width, y);
      // context.stroke();
      // context.setLineDash([]); // Reset line dash

    }
  }

  type Event = React.MouseEvent<HTMLCanvasElement, MouseEvent> | React.TouchEvent<HTMLCanvasElement>;

    const getCanvasCoordinates = (event: Event) => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const isTouchEvent = 'touches' in event;
      const { clientX, clientY } = isTouchEvent ? event.touches[0] : event;
  
      // Adjust for any potential scaling or transformations
      const scaleX = canvasRef.current.width / rect.width;
      const scaleY = canvasRef.current.height / rect.height;
  
      return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY,
      };
    }
    return { x: 0, y: 0 };
  };

  const startDrawing = (event: Event ) => {
    event.preventDefault();
    if (context) {
      const { x, y } = getCanvasCoordinates(event);
      context.beginPath();
      context.moveTo(x, y);
      setIsDrawing(true);
    }
  };

  const draw = (event: Event ) => {
    event.preventDefault();
    if (isDrawing && context) {
      const { x, y } = getCanvasCoordinates(event);
      context.lineTo(x, y);
      context.stroke();
    }
  };

  const endDrawing = (event: Event) => {
    event.preventDefault();
    if (context) {
      context.closePath();
    }
    setIsDrawing(false);
  };

  useEffect(() => {
    if (context) {
      initializeContext(context);
    }
  }, [selectedWord, context]);

  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="p-5 text-center tracking-wide font-mono text-4xl md:text-5xl font-black text-white">
        Spelling Explorer
      </h1>
      <a href="/words/spelling" 
        className={`p-4 ml-2 bg-gray-600`}
      >Back to list</a>
      <h2 className="p-5 text-center tracking-wide font-mono text-3xl md:text-4xl font-black text-white">
        {selectedWord}
      </h2>
      <div className="flex w-full max-w-6xl">
      <div className="w-1/4 p-4 h-screen overflow-y-auto">
          <h3 className="text-2xl font-bold mb-4">{level}</h3>
          <a href="/words/spelling" 
            className={`p-4 ml-2 bg-gray-600`}
          >Edit list</a>
          <a href="/words/spelling" 
            className={`p-4 ml-2 bg-gray-600`}
          >Reset</a>
          <ul>
            {words.map((month) => (
              <li key={month} className="mb-2">
                <button
                  className={`p-2 w-full text-left ${selectedWord === month ? 'bg-blue-500 text-white' : 'bg-gray-600'}`}
                  onClick={() => setSelectedWord(month)}
                >
                  {month}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-3/4 p-4">
          <h3 className="text-2xl font-bold mb-4">{selectedWord}</h3>
          <div>
            <input
              type="text"
              className="p-2 border border-gray-300 rounded w-full"
              placeholder="Type the word"
              autoComplete="off"
            />
          </div>
          {activeTab === 'type' && (
            <div>
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={endDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={endDrawing}
                className="border border-gray-300 rounded w-full h-64"
                style={{ touchAction: 'none' }}
              ></canvas>
              <button
                className="mt-2 p-4 bg-blue-500 text-white rounded"
                onClick={handleClearCanvas}
              >
                Clear
              </button>
              <button
                className="mt-2 ml-4 p-4 bg-blue-500 text-white rounded"
                onClick={handleSaveCanvas}
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LetsSpell;