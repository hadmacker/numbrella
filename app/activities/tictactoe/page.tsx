'use client'

import React, { useState } from "react";

const xColor = '#60A5FA';
const oColor = '#EC4899';
const xColorClass ='text-blue-400';
const oColorClass = 'text-pink-500';

export default function Page() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [boardColors, setBoardColors] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  
  const handleClick = (i: number) => {
    const boardCopy = [...board];
    const boardColorCopy = [...boardColors];
    if (calculateWinner(board) || boardCopy[i]) return;
    boardCopy[i] = xIsNext ? "X" : "O";
    boardColorCopy[i] = xIsNext ? xColor : oColor;
    setBoard(boardCopy);
    setBoardColors(boardColorCopy);
    setXIsNext(!xIsNext);
  };

const renderSquare = (i: number) => {
  return (
    <button 
      className="w-24 h-24 md:w-16 md:h-16 lg:w-44 lg:h-44 tracking-wide font-mono text-7xl md:text-5xl lg:text-9xl font-black" 
      style={{ 
        border: '1px solid #fff', 
        backgroundColor: '#000', 
        color: boardColors[i]
      }} 
      onClick={() => handleClick(i)}
    >
      <span className="">{board[i]}</span>
    </button>
  );
};

  const winner = calculateWinner(board);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="flex flex-col items-center min-h-screen tracking-wide font-mono text-2xl lg:text-3xl font-black">
      <div>{status}</div>
      <div style={{ display: 'flex' }}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div style={{ display: 'flex' }}>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div style={{ display: 'flex' }}>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button onClick={resetGame}>New Game</button>
    </div>
  );
}

function calculateWinner(squares: any[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}