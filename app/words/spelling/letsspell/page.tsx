'use client'

import React, { useEffect, useState, useRef } from "react";
import { PrettyChar } from '../../../prettyChar'

const pretty = PrettyChar.allCharacters();

const words = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const LetsSpell = () => {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("type");
  const [level, setLevel] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>();
  const [color, setColor] = useState<string>('red');
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const levelParam = params.get('level');
    setSelectedWord(words[0]);
    setLevel(levelParam);

    const canvas = canvasRef.current;
    console.log(canvas);
    if (!canvas) return;

    const initializeCanvas = () => {
      canvas.width = window.innerWidth * 0.95;
      canvas.height = window.innerHeight * 0.7;
      const context = canvas.getContext('2d');
      if (!context) return;
      context.fillStyle = 'white'; // Set canvas background color to white
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.lineCap = 'round';
      context.strokeStyle = color;
      context.lineWidth = 3;
    };
  
    initializeCanvas(); // Set initial size
  }, []);

  const handleSaveCanvas = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = `${selectedWord}.png`;
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  type Event = React.MouseEvent<HTMLCanvasElement, MouseEvent> | React.TouchEvent<HTMLCanvasElement>;

  const startDrawing = (event: Event ) => {
    const isTouchEvent = 'touches' in event;
    const { clientX, clientY } = isTouchEvent ? event.touches[0] : event;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if(contextRef.current) {
      contextRef.current.beginPath();
      contextRef.current.moveTo(clientX - rect.left, clientY - rect.top);
    }
    setIsDrawing(true);
  };

  const draw = (event: Event ) => {
    if (!isDrawing) return;
    const isTouchEvent = 'touches' in event;
    const { clientX, clientY } = isTouchEvent ? event.touches[0] : event;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if(contextRef.current){
      contextRef.current.lineTo(clientX - rect.left, clientY - rect.top);
      contextRef.current.stroke();
    }
  };

  const endDrawing = () => {
    if (contextRef.current) {
      contextRef.current.closePath();
    }
    setIsDrawing(false);
  };

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
        <div className="w-1/2 p-4">
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
        <div className="w-1/2 p-4">
          <h3 className="text-2xl font-bold mb-4">{selectedWord}</h3>
          <div className="mb-4">
            <button
              className={`p-4 ${activeTab === 'type' ? 'bg-blue-600 text-white' : 'bg-gray-600'}`}
              onClick={() => setActiveTab('type')}
            >
              Type
            </button>
            <button
              className={`p-4 ml-2 ${activeTab === 'draw' ? 'bg-blue-500 text-white' : 'bg-gray-600'}`}
              onClick={() => setActiveTab('draw')}
            >
              Draw
            </button>
          </div>
          {activeTab === 'type' && (
            <div>
              <input
                type="text"
                className="p-2 border border-gray-300 rounded w-full"
                placeholder="Type the word"
                autoComplete="off"
              />
            </div>
          )}
          {activeTab === 'draw' && (
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
              ></canvas>
              <button
                className="mt-2 p-2 bg-blue-500 text-white rounded"
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