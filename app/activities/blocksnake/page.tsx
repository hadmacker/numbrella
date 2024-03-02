'use client'

// This page is a children's game named "Number Snake"
// It should render a canvas where numbered blocks fall at a consistent velocity from top to bottom.
// The velocity is constant among all blocks. blocks can be randomly placed on the canvas but all move at the same speed.
// Blocks are all the same size. The Canvas should be able to fit 5 blocks wide.
// The canvas may need to be resized to fit a portrait iphone and a landscape ipad screen. Any other screens can use one of the two modes described, it doesn't matter to me which.
// Blocks that are no longer visible on the canvas after falling should be removed from the canvas.
// Block values are randomly generated between 1 and 10.
// The player can use touch or mouse to control a circle on the screen. It has a number above it starting with 100.
// The player's circle can move in all directions. The game should be responsive to touch and mouse input.
// When the block collides with the circle, it subtracts from the player's score the amount within the square.
// The game ends when the player's score reaches 0. If the player's score should go below 0, it stays 0 and game ends immediately.
// The game should have a stopwatch that times how long the game runs before the player reaches 0. This can be considered the high score. This should be saved using useState. It does not need to be persisted.
// When the game ends, show a modal message using react-modal, that shows the time it took to reach 0 and the high score.
// The game should have a button to restart the game in the modal message.


import React, { useEffect, useRef, useState } from "react";
import Modal from 'react-modal';
import './styles.css';
import {throttle} from "lodash";


const blocksWidePortrait = 5;
const blocksWideLandscape = 8;
const blocksHigh = 10;
const defaultSpeed = 4;
const startingGenerateSpeedModifier = 0.025;
const difficultyIncrementor = 20000;
const playerSize = 10;

type Block = {
  x: number;
  y: number;
  width: number;
  height: number;
  value: number;
  speed: number;
};

type Player = {
  x: number;
  y: number;
  radius: number;
};

const blockColors: Record<number, string> = {
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
  10: '#9CA3AF', // Equivalent to text-cyan-400
};

const Game: React.FC = () => {
  const [score, setScore] = useState(100);
  const [highScore, setHighScore] = useState(0);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [gameStatus, setGameStatus] = useState('running');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [player, setPlayer] = useState<Player>({ x: 0, y: 0, radius: playerSize });
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [rectSize, setRectSize] = useState({ width: 0, height: 0 });
  const [boundingBox, setBoundingBox] = useState({ left: 0, top: 0, width: 0, height: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [generateSpeedModifier, setGenerateSpeedModifier] = useState(startingGenerateSpeedModifier);
  const [blocksWide, setBlocksWide] = useState(blocksWidePortrait);
  const [gameTime, setGameTime] = useState(0);
  const [fontSize, setFontSize] = useState(36);

  useEffect(() => {
    Modal.setAppElement('#game-page');
  }, []);

  useEffect(() => {
    if (score <= 0) {
      setIsModalOpen(true);
      setGameStatus('stopped');
    }
  }, [score]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setScore(100);
    setBlocks([]);
    setGenerateSpeedModifier(startingGenerateSpeedModifier)
    setGameStatus('running');
    setStartTime(Date.now());
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth * 0.95;
      canvas.height = window.innerHeight * 0.7;
      setSize({ width: canvas.width, height: canvas.height });
      const context = canvas.getContext('2d');
      if (!context) return;
      context.fillStyle = 'white'; // Set canvas background color to white
      context.fillRect(0, 0, canvas.width, canvas.height);
      setPlayer({ x: canvas.width / 2, y: canvas.height - canvas.height / 4, radius: playerSize })

       // Detect orientation and set blocksWide
      const isPortrait = window.innerHeight > window.innerWidth;
      setBlocksWide(isPortrait ? blocksWidePortrait : blocksWideLandscape);
      setFontSize(isPortrait ? 36 : 48);
    };
  
    setCanvasSize(); // Set initial size
  
    // Update canvas size when window size changes
    window.addEventListener('resize', setCanvasSize);  

    const context = canvas.getContext('2d');
    if (!context) return;

    context.fillStyle = 'white'; // Set canvas background color to white
    context.fillRect(0, 0, canvas.width, canvas.height);

    contextRef.current = context;

      // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const context = canvas.getContext('2d')!;

      // Clear the canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = '#F5F5DC';
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Draw the player's circle
      context.beginPath();
      context.arc(player.x, player.y, player.radius, 0, 2 * Math.PI);
      context.fill();

      // Draw the blocks
      blocks.forEach(block => {
        context.fillStyle = block.value <= 5 ? '#EF0000' : '#667788';
        context.fillRect(block.x, block.y, block.width, block.height);
      });
    }
  }, [blocks, blocksWide]);

  function generateBlock() {
    const value = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
    const width = rectSize.width; // 200;
    const height = rectSize.height; // 100;
    //const x = Math.random() * (window.innerWidth - width); // Random x position
    const columnWidth = size.width / blocksWide;
    let x = 0; // x position
    let attempts = 0; // Number of attempts to find a non-overlapping position

    do {
      x = Math.floor(Math.random() * blocksWide) * columnWidth; // Random x position
      attempts++;
    } while (blocks.some(block => Math.abs(block.x - x) < width) && attempts < 10);
  
    const y = 0; // Start at the top of the screen
  
    const speed = generateSpeed();
    setBlocks(blocks => [...blocks, { x, y, width, height, value, speed } as Block]);
  }

  useEffect(() => {
    const difficultyInterval = setInterval(() => {
      setGenerateSpeedModifier(value => value += 0.025);
    }, difficultyIncrementor); // 60 FPS
  }, []);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      setGameTime(Math.floor((Date.now() - startTime) / 1000));
      if (gameStatus === 'stopped') {
        // Stop the game loop
        clearInterval(gameLoop);
        return;
      }

      // Generate a new block every second
      if (Math.random() < 1 / 60 + generateSpeedModifier) {
        generateBlock();
      }
  
      setBlocks(blocks => blocks
        .map(block => {
          // Check for collision with player
          const dx = block.x + block.width / 2 - (player.x - boundingBox.left);
          const dy = block.y + block.height / 2 - (player.y - boundingBox.top);
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < block.width / 2 + player.radius) {
            setScore(score => Math.max(score - block.value, 0)); // Don't let the score go below 0
            return null; // Remove block from blocks array
          } else {
            return { ...block, y: block.y + block.speed } as Block;
          }
        })
        .filter((block): block is Block => block !== null)
      );
    }, 1000 / 60); // 60 FPS
  
    return () => clearInterval(gameLoop);
  }, [score, blocks, gameStatus]);

  useEffect(() => {
    const canvas = canvasRef.current;
  
    if (canvas) {
      const context = canvas.getContext('2d')!;
      const rect = canvas.getBoundingClientRect();
      setBoundingBox(rect);
      setRectSize({ width: rect.width / blocksWide, height: rect.height / blocksHigh });

      // Clear the canvas
      context.fillStyle = '#F5F5DC';
      context.fillRect(0, 0, canvas.width, canvas.height);
  
      // Draw the player's circle
      context.beginPath();
      context.arc(player.x - rect.left, player.y - rect.top, player.radius, 0, 2 * Math.PI);
      context.fillStyle = '#000000'; // Set the color to black
      context.fill();

      // Draw the player's score
      context.fillStyle = '#000000'; // Set the color to black
      context.textAlign = 'center'; // Center the text
      context.font = 'bold 36px Arial'; // Set the font size and family
      context.fillText(score.toString(), player.x - rect.left, player.y - rect.top - player.radius - 10);
  
      // Draw the blocks
      blocks.forEach(block => {
        const color = blockColors[block.value] || '#000000'; // Use a default color if the block's value is not in the dictionary

        // Draw the block
        context.fillStyle = color;
        context.beginPath();
        context.roundRect(block.x, block.y, block.width, block.height, 10); // 10 is the border radius
        context.fill();

        // Draw the block's border
        context.strokeStyle = '#000000'; // Set the color to black
        context.lineWidth = 5; // Set the line width
        context.stroke();

        // Draw the block's value
        context.fillStyle = '#000000'; // Set the color to black
        context.textAlign = 'center'; // Center the text
        context.font = `bold {fontSize}px Arial`; // Set the font size, weight, and family
        context.fillText(block.value.toString(), block.x + block.width / 2, block.y + block.height / 2 + 10);
      });
    }
  }, [blocks, player]);

  if (typeof CanvasRenderingContext2D !== 'undefined') {
    CanvasRenderingContext2D.prototype.roundRect = function (x: number, y: number, w: number, h: number, r: number) {
      if (w < 2 * r) {
        r = w / 2;
      }
      if (h < 2 * r) {
        r = h / 2;
      }
      this.beginPath();
      this.moveTo(x + r, y);
      this.arcTo(x + w, y, x + w, y + h, r);
      this.arcTo(x + w, y + h, x, y + h, r);
      this.arcTo(x, y + h, x, y, r);
      this.arcTo(x, y, x + w, y, r);
      this.closePath();
      return this;
    }
  }

  const handleMouseMove = throttle((event: React.MouseEvent) => {
    setPlayer(player => ({ ...player, x: event.clientX, y: event.clientY }));
  }, 100); // Throttle to 100ms
  
  const handleTouchMove = throttle((event: React.TouchEvent) => {
    setPlayer(player => ({ ...player, x: event.touches[0].clientX, y: event.touches[0].clientY }));
  }, 100); // Throttle to 100ms

  return (
    <div id="game-page" className="m-0">
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="You Win!"
        className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800 bg-opacity-75"
      >
        <div className="bg-white rounded-lg w-full md:w-1/2 lg:w-1/3 mx-auto p-8">
          <h2 className="text-center font-mono text-6xl lg:text-5xl font-black mb-2 text-black">
            You win!
          </h2>
          <h3 className="text-center font-mono text-4xl lg:text-5xl font-black mb-2 text-black">
          Game over after {gameTime} seconds.
          </h3>
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white text-6xl font-bold py-2 px-4 rounded mx-auto block"
            onClick={() => {
              handleCloseModal();
            }}
          >
            New Game
          </button>
        </div>

      </Modal>
       <div ref={containerRef} id="gamecanvas" className="canvas-container" onMouseMove={handleMouseMove} onTouchMove={handleTouchMove}>
        <canvas ref={canvasRef} width={size.width} height={size.height} />
      </div>
    </div>
  );
};

export default Game;

function generateSpeed() {
  //Math.random() * 2 + 1; // Random speed between 1 and 3
  return defaultSpeed;
}
