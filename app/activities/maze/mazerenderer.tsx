// MazeRenderer.tsx
import React, { useEffect, useRef } from 'react';
import MazeGenerator from './MazeGenerator';

interface MazeRendererProps {
  width: number;
  height: number;
}

const MazeRenderer: React.FC<MazeRendererProps> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        const maze = MazeGenerator(width, height);

        maze.forEach((row, rowIndex) => {
          row.forEach((cell, colIndex) => {
            const x = colIndex * 20;
            const y = rowIndex * 20;

            // Mark starting point with green block
            if (rowIndex === 1 && colIndex === 1) {
              ctx.fillStyle = 'green';
              ctx.fillRect(x, y, 20, 20);
              return; // Skip drawing the cell border
            }

            // Mark ending point with red block
            if (rowIndex === height - 2 && colIndex === width - 3) {
              ctx.fillStyle = 'red';
              ctx.fillRect(x, y, 20, 20);
              return; // Skip drawing the cell border
            }

            ctx.fillStyle = cell === 1 ? 'black' : 'white';
            ctx.fillRect(x, y, 20, 20);

            // ctx.strokeStyle = 'black';
            // ctx.strokeRect(x, y, 20, 20);
          });
        });
      }
    }
  }, [width, height]);

  return <canvas ref={canvasRef} width={width * 20} height={height * 20} />;
};

export default MazeRenderer;
