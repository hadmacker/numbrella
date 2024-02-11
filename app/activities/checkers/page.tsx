'use client'

import React, { useState } from "react";

const xColor = '#60A5FA';
const oColor = '#EC4899';
const cellDarkBgColor = '#666';

type Board = (string | null)[][];

const initializeBoard = (): Board => {
  const board: Board = Array(8).fill(null).map(() => Array(8).fill(null));
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (i < 3 && (i + j) % 2 === 1) {
        board[i][j] = 'red';
      } else if (i > 4 && (i + j) % 2 === 1) {
        board[i][j] = 'black';
      }
    }
  }
  return board;
};

const CheckersPage: React.FC = () => {
  const [board, setBoard] = useState<Board>(initializeBoard());
  const [selectedPiece, setSelectedPiece] = useState<[number, number] | null>(null);

  const handleCellClick = (i: number, j: number) => {
    if (selectedPiece) {
      const newBoard = [...board];
      const [oldI, oldJ] = selectedPiece;
      newBoard[oldI][oldJ] = null;
      newBoard[i][j] = board[oldI][oldJ];
      setBoard(newBoard);
      setSelectedPiece(null);
    } else if (board[i][j]) {
      setSelectedPiece([i, j]);
    }
  };

  return (
    <div>
      {board.map((row, i) => (
        <div key={i} style={{ display: 'flex' }}>
          {row.map((cell, j) => (
            <div
              key={j}
              onClick={() => handleCellClick(i, j)}
              style={{
                width: '60px',
                height: '60px',
                border: '1px solid black',
                backgroundColor: (i + j) % 2 === 1 ? cellDarkBgColor : 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {cell && (
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: cell,
                    border: '2px solid gray',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CheckersPage;