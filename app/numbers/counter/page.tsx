'use client'

import React, { useEffect, useState } from "react";
import { PrettyChar } from '../../prettyChar'
import { NumberFormatter } from '../../numberFormatter'
import classes from './page.module.css';
import { set } from "lodash";

const numbers = PrettyChar.allCharacters();

function formatted(number: number): React.ReactElement[] {
  const digitsArray = NumberFormatter.formatNumberWithBreaks(number.toString()).split("");

  // Create an array of <div> elements to hold each digit
  const divElements: React.ReactElement[] = digitsArray.map((digit, index) => {
    const prettyStyle = numbers.filter(n=> n.id == digit)[0].prettyStyle;
    const combinedClasses = `${prettyStyle}`;
    return (
      <span className={combinedClasses} key={index}>
        {digit}
      </span>
    );
  });

  return divElements;
}

export default function Page() {
  const [value, setValue] = React.useState<number>(0);
  const [intervalRate, setIntervalRate] = useState<number>(1000);
  const [incrementValue, setIncrementValue] = useState<number>(1);
  const ceilingValue = 999999999999999;
  const floorValue   = -99999999999999;

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(prevValue => {
        const newValue = prevValue + incrementValue;
        if (newValue > ceilingValue || newValue < floorValue) {
          setIntervalRate(1000);
          setIncrementValue(1);
          return 0;
        }
        return newValue;
      });
    }, intervalRate);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [intervalRate, incrementValue]);

  const handleFaster = () => {
    setIntervalRate(prevRate => Math.max(100, prevRate / 2)); // Double the rate, minimum 100ms
  };

  const handleSlower = () => {
    setIntervalRate(prevRate => prevRate * 2); // Halve the rate
  };

  const handleIncrement = (incrementValue?: number) => {
    setIncrementValue(prevValue => prevValue + (incrementValue ?? 1));
  };

  const handleDecrement = () => {
    setIncrementValue(prevValue => prevValue - 1);
  };

  return (
    <>
      <span className="mx-3 md:mx-2 md:p-1 text-5xl md:text-3xl font-black text-gray-500">Counter</span>
      <div className={`columns-1`}>
        <p className="text-left m-5 tracking-wide font-mono text-9xl font-black">
          {formatted(value)}
        </p>
      </div>
      <div className="flex space-x-4">
      <button
        onClick={handleFaster}
        className="text-center tracking-wide font-mono text-5xl lg:text-5xl font-black"
        style={{
          padding: '10px',
          backgroundColor: intervalRate <= 100 ? '#555' : '#222',
          border: '1px solid #ccc',
          borderRadius: '50px',
          minWidth: '100px',
          margin: '10px',
          textShadow: '2px 2px 4px #000000',
          cursor: intervalRate <= 100 ? 'not-allowed' : 'pointer',
          color: intervalRate <= 100 ? '#888' : '#fff'
        }}
        disabled={intervalRate <= 100}
      >
        Faster
      </button>
      <button
        onClick={handleSlower}
        className="text-center tracking-wide font-mono text-5xl lg:text-5xl font-black"
        style={{
          padding: '10px',
          backgroundColor: intervalRate >= 1000 ? '#555' : '#222',
          border: '1px solid #ccc',
          borderRadius: '50px',
          minWidth: '100px',
          margin: '10px',
          textShadow: '2px 2px 4px #000000',
          cursor: intervalRate >= 1000 ? 'not-allowed' : 'pointer',
          color: intervalRate >= 1000 ? '#888' : '#fff'
        }}
        disabled={intervalRate >= 1000}
      >
        Slower
      </button>
      </div>
      <div className="flex space-x-4">
        {incrementValue !== 1 && <button
          className="text-center tracking-wide font-mono text-5xl lg:text-5xl font-black"
          style={{ 
            padding: '10px', 
            backgroundColor: '#222', 
            border: '1px solid #ccc', 
            borderRadius: '50px', 
            minWidth: '100px', 
            margin: '10px',
            textShadow: '2px 2px 4px #000000'
        }}
          onClick={() => handleIncrement(incrementValue)}
          >
            + {formatted(incrementValue)}
          </button>
}
        <button
        className="text-center tracking-wide font-mono text-5xl lg:text-5xl font-black"
        style={{ 
          padding: '10px', 
          backgroundColor: '#222', 
          border: '1px solid #ccc', 
          borderRadius: '50px', 
          minWidth: '100px', 
          margin: '10px',
          textShadow: '2px 2px 4px #000000'
      }}
        onClick={() => handleIncrement()}
        >
          + 1
        </button>
        <button
        className="text-center tracking-wide font-mono text-5xl lg:text-5xl font-black"
        style={{ 
          padding: '10px', 
          backgroundColor: '#222', 
          border: '1px solid #ccc', 
          borderRadius: '50px', 
          minWidth: '100px', 
          margin: '10px',
          textShadow: '2px 2px 4px #000000'
      }}
        onClick={() => handleDecrement()}
        >
          - 1
        </button>
      </div>
      <div className="flex space-x-4">
        <button
        className="text-center tracking-wide font-mono text-5xl lg:text-5xl font-black"
        style={{ 
          padding: '10px', 
          backgroundColor: '#222', 
          border: '1px solid #ccc', 
          borderRadius: '50px', 
          minWidth: '100px', 
          margin: '10px',
          textShadow: '2px 2px 4px #000000'
      }}
        onClick={() => {
          setValue(0);
          setIncrementValue(1);
          setIntervalRate(1000);
        }}
        >
          Zero
        </button>
      </div>
    </>
  )
}
