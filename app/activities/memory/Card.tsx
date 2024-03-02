'use client'

import React, { useState } from "react";
import ReactCardFlip from 'react-card-flip';
import './styles.css';

type CardProps = {
    emoji: string;
    isFlipped: boolean;
    isMatched: boolean;
    onFlip: () => void;
  };  
  
const Card: React.FC<CardProps> = ({ emoji, isFlipped, isMatched, onFlip }) => {

return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div 
        className={`${!isMatched ? 'card-back' : 'card-hidden'} border-4 border-gray-200 rounded-lg p-4 lg:p-4 m-2 lg:m-2 w-24 lg:w-36 h-36 lg:h-36 flex items-center justify-center card-large`}
        onClick={!isMatched ? onFlip : undefined}
        >
        <h1 className="text-center tracking-wide font-mono text-4xl lg:text-5xl font-black">&nbsp;</h1>
        </div>

        <div 
        className="card-face bg-blue-200 border-4 border-gray-200 rounded-lg p-4 lg:p-4 m-2 lg:m-2 w-24 lg:w-36 h-36 lg:h-36 flex items-center justify-center card-large"
        onClick={!isMatched ? onFlip : undefined}
        >
        <h1 className="text-center tracking-wide font-mono text-6xl lg:text-5xl font-black">{emoji}</h1>
        </div>
    </ReactCardFlip>
);
};

export default Card;