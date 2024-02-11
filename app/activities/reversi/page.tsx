'use client'

import React, { useEffect, useState } from 'react';

const xColor = '#60A5FA';
const oColor = '#EC4899';

type Board = (0 | 1 | 2)[][]; // 0 for empty, 1 for player 1, 2 for player 2

const initializeBoard = (): Board => {
  const initialBoard: Board = Array(8).fill(0).map(() => Array(8).fill(0));
  initialBoard[3][3] = initialBoard[4][4] = 1; // Player 1's initial pieces
  initialBoard[3][4] = initialBoard[4][3] = 2; // Player 2's initial pieces
  return initialBoard;
};

export default function ReversiPage() {
  const [board, setBoard] = useState<Board>(initializeBoard());
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [validMoves, setValidMoves] = useState<number[][]>([]);
  const [winner, setWinner] = useState<'X' | 'O' | null>(null);
  const [gameOver, setGameOver] = useState(false);

  const directions = [
    [-1, 0], // up
    [1, 0], // down
    [0, -1], // left
    [0, 1], // right
    [-1, -1], // up-left
    [-1, 1], // up-right
    [1, -1], // down-left
    [1, 1] // down-right
  ];

  const handleCellClick = (row: number, col: number) => {
    if (board[row][col] !== 0) {
      console.log('Cell is not empty');
      return; // Cell is not empty
    }

    let newBoard = [...board];
    let validMove = false;

    for (let [dx, dy] of directions) {
      let x = row + dx;
      let y = col + dy;
      let toFlip = [];

      while (x >= 0 && x < 8 && y >= 0 && y < 8 && newBoard[x][y] === (3 - currentPlayer)) {
        toFlip.push([x, y]);
        x += dx;
        y += dy;
      }

      if (x >= 0 && x < 8 && y >= 0 && y < 8 && newBoard[x][y] === currentPlayer && toFlip.length > 0) {
        validMove = true;
        for (let [x, y] of toFlip) {
          newBoard[x][y] = currentPlayer;
        }
      }
    }

    if (!validMove) {
      console.log('Invalid move');
      return;
    }

    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);
    const nextPlayer = currentPlayer === 1 ? 2 : 1;
    const nextValidMoves = calculateValidMoves(nextPlayer);
    setValidMoves(nextValidMoves);
  
    if (nextValidMoves.length === 0) {
      setGameOver(true);
      const player1Pieces = countPieces(1);
      const player2Pieces = countPieces(2);
      const winner = player1Pieces > player2Pieces ? 'X' : 'O';
      setWinner(winner);
    } else {
      // Switch the current player
      setCurrentPlayer(nextPlayer);
    }
  };

  const countPieces = (player: 1 | 2) => {
    let count = 0;
    for (let row of board) {
      for (let cell of row) {
        if (cell === player) {
          count++;
        }
      }
    }
    return count;
  };

  const calculateValidMoves = (player: 1 | 2) => {
    let validMoves = [];
  
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if(winner != null) continue;
        if (board[i][j] !== 0) continue;
  
        for (let [dx, dy] of directions) {
          let x = i + dx;
          let y = j + dy;
          let toFlip = [];
  
          while (x >= 0 && x < 8 && y >= 0 && y < 8 && board[x][y] === (3 - player)) {
            toFlip.push([x, y]);
            x += dx;
            y += dy;
          }
  
          if (x >= 0 && x < 8 && y >= 0 && y < 8 && board[x][y] === player && toFlip.length > 0) {
            validMoves.push([i, j]);
            break;
          }
        }
      }
    }
      
    return validMoves;
  };

  useEffect(() => {
    setValidMoves(calculateValidMoves(currentPlayer));
  }, [board, currentPlayer]);
  
  const startNewGame = () => {
    setBoard(initializeBoard());
    setCurrentPlayer(1);
    setWinner(null);
    setGameOver(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} className="tracking-wide font-mono text-2xl md:text-l lg:text-4xl font-black">
      <h2>Reversi Game</h2>
      {!gameOver && <p style={{ color: currentPlayer === 1 ? xColor : oColor }} className="tracking-wide font-mono text-2xl md:text-l lg:text-2xl font-black">
        Current Player: {currentPlayer === 1 ? 'X' : 'O'}
        </p>
      }
      {gameOver && <p style={{ color: winner === 'X' ? xColor : oColor }} className="tracking-wide font-mono text-2xl md:text-l lg:text-2xl font-black">
        Winner: {winner}
        </p>
      }
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {board.map((row, i) => (
          <div key={i} style={{ display: 'flex' }}>
            {row.map((cell, j) => (
              <button 
                key={j} 
                className="w-8 h-8 md:w-8 md:h-8 lg:w-16 lg:h-16 tracking-wide font-mono text-l md:text-l lg:text-7xl font-black" 
                onClick={() => handleCellClick(i, j)}
                style={{ 
                  // width: '70px', 
                  // height: '70px', 
                  border: '1px solid white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: cell === 1 ? xColor : cell === 2 ? oColor : oColor,
                  backgroundColor: validMoves.some(([x, y]) => x === i && y === j) ? '#444' : 'black'
                }}
              >
                {cell === 0 ? ' ' : cell === 1 ? 'X' : 'O'}
              </button>
            ))}
          </div>
        ))}
      </div>
      <button className="tracking-wide font-mono text-2xl md:text-1xl lg:text-2xl font-black"
      onClick={startNewGame}
      style={{ 
        margin: '10px 0',
        padding: '10px'
      }}
    >
      Start New Game
    </button>
    </div>
  );
}