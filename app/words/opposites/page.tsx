'use client'

import React, { useEffect, useState } from "react";
import { PrettyChar } from '../../prettyChar'

type OppositeWordsType = { [key: string]: string };

const oppositeWords: OppositeWordsType = {
  "Awake": "Asleep",
  "Begin": "End",
  "Big": "Small",
  "Brave": "Scared",
  "Bright": "Dim",
  "Buy": "Sell",
  "Clean": "Dirty",
  "Day": "Night",
  "Far": "Near",
  "Fast": "Slow",
  "Front": "Back",
  "Top": "Bottom",
  "Full": "Empty",
  "Give": "Take",
  "Happy": "Sad",
  "Hard": "Soft",
  "Healthy": "Sick",
  "Heavy": "Light",
  "High": "Low",
  "Hot": "Cold",
  "In": "Out",
  "Left": "Right",
  "Light": "Dark",
  "Long": "Short",
  "Loud": "Quiet",
  "North": "South",
  "Open": "Closed",
  "Locked": "Unlocked",
  "Push": "Pull",
  "Sharp": "Dull",
  "Simple": "Difficult",
  "Start": "Finish",
  "Strong": "Weak",
  "Sweet": "Sour",
  "Thick": "Thin",
  "True": "False",
  "Up": "Down",
  "Wet": "Dry",
  "Wide": "Narrow",
  "Win": "Lose",
  "Young": "Old",
};

export default function Page() {
   const [currentPair, setCurrentPair] = useState(['', '']);
   const [currentClasses, setCurrentClasses] = useState(['', '']);

  // Function to generate a new random pair
  const generateNewPair = () => {
    const keys = Object.keys(oppositeWords);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    setCurrentPair([randomKey, oppositeWords[randomKey]]);

    let randomClass1, randomClass2;
    do {
      randomClass1 = classes[Math.floor(Math.random() * classes.length)];
      randomClass2 = classes[Math.floor(Math.random() * classes.length)];
    } while (randomClass1 === randomClass2);
    setCurrentClasses([randomClass1, randomClass2]);
  };

  // Generate a new pair when the component mounts
  useEffect(() => {
    generateNewPair();
  });

  const classes = [
    "text-green-300",
  "text-green-400",
  "text-pink-500",
  "text-amber-500",
  "text-lime-500",
  "text-emerald-500",
  "text-blue-400",
  "text-indigo-600",
  "text-fuchsia-500",
  "text-rose-500",
  "text-cyan-400",
  "text-yellow-200"
  ];

  return (
    <div>
      <h2 className="text-center tracking-wide font-mono text-3xl lg:text-3xl font-black">Opposites</h2>
      <div
        style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', margin: '10px' }}
        className="text-center tracking-wide font-mono text-2xl lg:text-2xl font-black"
      >
      </div>
      <br></br>
      <div
          style={{
            display: 'flex', 
            justifyContent: 'space-around', 
            alignItems: 'center',
            margin: '50px 50px'
          }}
          className="text-center tracking-wide font-mono text-3xl md:text-4xl lg:text-5xl font-black"
        >
          <p className={currentClasses[0]} onClick={generateNewPair} style={{ padding: '50px' }}>{currentPair[0]}</p>
          <p className={currentClasses[1]} onClick={generateNewPair} style={{ padding: '50px' }}>{currentPair[1]}</p>
        </div>
    </div>
  );
}