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
import { Play } from "next/font/google";


const blocksWide = 5;
const blocksHigh = 10;
const defaultSpeed = 3;

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
  1: '#FF0000',
  2: '#00FF00',
  3: '#0000FF',
  4: '#FFFF00',
  5: '#00FFFF',
  6: '#FF00FF',
  7: '#C0C0C0',
  8: '#808080',
  9: '#800000',
  10: '#808000',
  // Add more colors if needed
};

const Game: React.FC = () => {
  const [score, setScore] = useState(100);
  const [highScore, setHighScore] = useState(0);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [gameStatus, setGameStatus] = useState('running');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [player, setPlayer] = useState<Player>({ x: 0, y: 0, radius: 10 });
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [rectSize, setRectSize] = useState({ width: 0, height: 0 });
  
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
    const gameLoop = setInterval(() => {
      // TODO: Move blocks, check collisions, update score, end game
    }, 1000 / 60); // 60 FPS

    return () => clearInterval(gameLoop);
  }, [score, blocks, gameStatus]);

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
  }, [blocks]);

  function generateBlock() {
    const value = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
    const width = rectSize.width; // 200;
    const height = rectSize.height; // 100;
    //const x = Math.random() * (window.innerWidth - width); // Random x position
    const columnWidth = size.width / blocksWide;
    const x = Math.floor(Math.random() * blocksWide) * columnWidth; // Random x position
    const y = 0; // Start at the top of the screen
  
    const speed = generateSpeed();
    setBlocks(blocks => [...blocks, { x, y, width, height, value, speed } as Block]);
  }

  useEffect(() => {
    const gameLoop = setInterval(() => {
      // Generate a new block every second
      if (Math.random() < 1 / 60) {
        generateBlock();
      }
  
      setBlocks(blocks => blocks
        .map(block => ({ ...block, y: block.y + block.speed }))
        .filter(block => block.y - block.height <= size.height)
      );
      // TODO: Check collisions, update score, end game
    }, 1000 / 60); // 60 FPS
  
    return () => clearInterval(gameLoop);
  }, [score, blocks, gameStatus]);

  useEffect(() => {
    const canvas = canvasRef.current;
  
    if (canvas) {
      const context = canvas.getContext('2d')!;
      const rect = canvas.getBoundingClientRect();
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
        context.lineWidth = 2; // Set the line width
        context.stroke();

        // Draw the block's value
        context.fillStyle = '#000000'; // Set the color to black
        context.textAlign = 'center'; // Center the text
        context.font = 'bold 20px Arial'; // Set the font size, weight, and family
        context.fillText(block.value.toString(), block.x + block.width / 2, block.y + block.height / 2 + 10);
      });
    }
  }, [blocks, player]);

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

  const handleMouseMove = (event: React.MouseEvent) => {
    setPlayer(player => ({ ...player, x: event.clientX, y: event.clientY }));
  };
  
  const handleTouchMove = (event: React.TouchEvent) => {
    setPlayer(player => ({ ...player, x: event.touches[0].clientX, y: event.touches[0].clientY }));
  };

  return (
    <div>
      <h1>Number Snake</h1>
      <p>Score: {score}</p>
      {gameStatus === 'ended' && (
        <Modal isOpen={true}>
          <h1>Game Over</h1>
          <p>Your score: {score}</p>
          <p>High score: {highScore}</p>
          <button onClick={() => setGameStatus('running')}>Restart</button>
        </Modal>
      )}
       <div ref={containerRef} className="canvas-container" onMouseMove={handleMouseMove} onTouchMove={handleTouchMove}>
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
