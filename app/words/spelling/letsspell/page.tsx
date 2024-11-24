'use client'

import React, { useEffect, useState, useRef } from "react";
import { PrettyChar } from '../../../prettyChar'

const pretty = PrettyChar.allCharacters();

const words = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const correctColor = '#32CD32';
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
  const [userInput, setUserInput] = useState<string>('');
  const [nextWordMessage, setNextWordMessage] = useState<string>('Next Word');
  const [peekNextWord, setPeekNextWord] = useState<string>('');
  
  const handleNextWord = () => {
    const currentIndex = words.indexOf(selectedWord ?? "");
    const nextIndex = (currentIndex + 1) % words.length;
    activateWord(words[nextIndex]);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const levelParam = params.get('level');
    setLevel(levelParam);
    activateWord(words[0]);

    // Prevent the entire page from scrolling
    document.body.style.overflow = 'hidden';

    // Cleanup on component unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const renderColoredText = () => {
    const userInputNsc = userInput.toLowerCase();
    return (selectedWord ?? "").split("").map((char, index) => {
      const isCorrect = userInputNsc[index] === char.toLowerCase();
      return (
        <span key={index} style={{ color: isCorrect ? correctColor : 'white' }}>
          {char[index] || char }
        </span>
      );
    });
  };

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
      setUserInput('');
      const input = document.querySelector('input');
      if (input) {
        input.focus();
      }
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

  const activateWord = (word: string) => {
    setSelectedWord(word);
    const currentIndex = words.indexOf(word ?? "");
    const nextIndex = (currentIndex + 1) % words.length;
    const nextWord = words[nextIndex];
    setPeekNextWord(nextWord);

    setUserInput('');
    const input = document.querySelector('input');
    if (input) {
      input.focus();
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="p-5 text-center tracking-wide font-mono text-4xl md:text-5xl font-black text-white">
        Spelling Explorer
      </h1>
      <a href="/words/spelling" 
        className={`p-4 ml-2 bg-gray-600`}
      >Back to list</a>
      <div className="flex w-full max-w-6xl overflow-hidden">
        <div className="w-1/4 p-4 h-full overflow-y-auto h-full">
          <h3 className="text-2xl font-bold mb-4">{level}</h3>
          <ul>
            {words.map((month) => (
              <li key={month} className="mb-2">
                <button
                  className={`p-2 w-full text-left ${selectedWord === month ? 'bg-blue-500 text-white' : 'bg-gray-600'}`}
                  onClick={() => activateWord(month)}
                >
                  {month}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-3/4 p-4">
        <h3 className="text-2xl font-bold mb-4">Spell: </h3>
          <h3 className="text-6xl font-bold mb-4">{renderColoredText()}</h3>
          <div>
            <input
              type="text"
              value={userInput}
              maxLength={(selectedWord?.length ?? 10) * 3}
              onChange={handleInputChange}
              className="p-4 text-2xl border border-gray-300 rounded w-full h-16" // Increased padding, font size, and height
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
      <button
          className="mt-2 ml-4 p-4 bg-blue-500 text-white rounded"
          onClick={handleNextWord}
        >
          {"Next Word: " + peekNextWord}
        </button>
    </div>
  );
};

export default LetsSpell;