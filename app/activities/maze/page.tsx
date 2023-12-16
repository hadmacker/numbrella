'use client'

import React, { useState } from "react";
import MazeRenderer from "./mazerenderer";

export default function Page() {
  const [mazeWidth, setMazeWidth] = useState(10);
  const [mazeHeight, setMazeHeight] = useState(10);
  const [key, setKey] = useState(0);

  function onSetMazeSize(width:number, height: number) {
    setMazeWidth(width);
    setMazeHeight(height);
    setKey(key + 1);
  }

  const isIphone = typeof window !== 'undefined' && window.navigator.userAgent.includes('iPhone');

  return (
    <>
      <div>
        <h2 className="text-center tracking-wide font-mono text-2xl lg:text-3xl font-black">Maze Maker</h2>
      </div>
      <div style={{ 
        border: '1px solid black', 
        backgroundColor: '#222222'}}>
      <div style={{ 
        padding: '10px', 
        margin: '10px',
        display: 'flex',
        justifyContent: 'center'
        }}>
        <button 
        style={{ padding: '10px', backgroundColor: '#555', border: '1px solid #ccc', borderRadius: '5px' }} 
        className="m-1"
        onClick={() => onSetMazeSize(12, 12)}>12x12</button>
        <button 
        style={{ padding: '10px', backgroundColor: '#555', border: '1px solid #ccc', borderRadius: '5px' }} 
        className="m-1"
        onClick={() => onSetMazeSize(20, 20)}>20x20</button>
        {(!isIphone) && (
          <>
            <button 
            style={{ padding: '10px', backgroundColor: '#555', border: '1px solid #ccc', borderRadius: '5px' }} 
            className="m-1"
            onClick={() => onSetMazeSize(30, 25)}>30x20</button>
            <button 
            style={{ padding: '10px', backgroundColor: '#555', border: '1px solid #ccc', borderRadius: '5px' }} 
            className="m-1"
            onClick={() => onSetMazeSize(50, 25)}>50x20</button>
          </>
        )}
      </div>
      <div style={{ 
        display: 'flex',
        justifyContent: 'center'
        }}>
          <ul style={{ 
        display: 'flex',
        justifyContent: 'center'
        }}>
            <li className="mx-5">Green: Maze Start</li>
            <li className="mx-5">Red: Maze End</li>
            <li className="mx-5">White: Path</li>
          </ul>
        </div>
        <div style={{ 
        display: 'flex',
        justifyContent: 'center'
        }}>
        <p>If Green or Red blocks are not connected to the path, the maze is unsolveable. Click on a button to generate another maze.</p>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
          <MazeRenderer width={mazeWidth} height={mazeHeight} key={key} />
      </div>
    </>
  );
}