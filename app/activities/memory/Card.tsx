'use client'

import React, { useState } from "react";
import ReactCardFlip from 'react-card-flip';
import './styles.css';

type CardProps = {
    emoji: string;
  };
  
const Card: React.FC<CardProps> = ({ emoji }) => {
const [isFlipped, setIsFlipped] = useState(false);

const handleClick = () => {
    setIsFlipped(!isFlipped);
};

return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
    <div 
    className="card-back border-4 border-gray-200 rounded-lg p-4 m-2 w-24 h-24 flex items-center justify-center"
    onClick={handleClick}
    >
    <h1 className="text-center tracking-wide font-mono text-4xl lg:text-3xl font-black">&nbsp;</h1>
    </div>

    <div 
    className="card-face bg-blue-200 border-4 border-gray-200 rounded-lg p-4 m-2 w-24 h-24 flex items-center justify-center"
    onClick={handleClick}
    >
    <h1 className="text-center tracking-wide font-mono text-4xl lg:text-3xl font-black">{emoji}</h1>
    </div>
    </ReactCardFlip>
);
};

export default Card;