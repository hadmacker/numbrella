'use client'

import React, { useEffect, useState } from "react";
import { PrettyChar } from '../../prettyChar'
import { NumberFormatter } from '../../numberFormatter'

const pretty = PrettyChar.allCharacters();

function formatted(value: number, bw: boolean): React.ReactElement[] {
  const digitsArray = NumberFormatter.formatNumberWithBreaks(value.toString()).split("");

  // Create an array of <div> elements to hold each digit
  const elements: React.ReactElement[] = digitsArray.map((digit, index) => {
    const prettyStyle = (bw.toString() == "true")
      ? pretty.find(n=> n.id == "0")?.prettyStyle
      : pretty.find(n=> n.id == digit)?.prettyStyle;
    const combinedClasses = `${prettyStyle}`;
    return (
      <span className={combinedClasses} key={index}>
        {digit}
      </span>
    );
  });

  return elements;
}

export default function Page() {

  const [randomNumbers, setRandomNumbers] = useState<number[]>([]);
  const [generated, setGenerated] = useState(false);
  const [number, setNumber] = useState(0);
  const elements: React.ReactElement[] = [];
  const minRand = 2;
  const maxRand = 98;
  const maxRandNumberSet = 3;

  useEffect( () => {
    if(!generated) {
      const numbersSet = new Set<number>();
      while (numbersSet.size < maxRandNumberSet) {
        const randomNumber = Math.floor(Math.random() * maxRand) + minRand;
        numbersSet.add(randomNumber);
      }
      const sortedNumbers = Array.from(numbersSet).sort((a, b) => a - b);
      setRandomNumbers(sortedNumbers);
      setGenerated(true);
    }
  }, [generated]);

  elements.push(
    <li>
      <button className="p-5 tracking-wide font-mono text-4xl md:text-5xl font-black"
        onClick={() => {
        setNumber(number+1);
      }}>{formatted(1, false)}</button>
    </li>
  );

  for(let i = 0; i < randomNumbers.length; i++) {
    elements.push(
      <li key={i}>
        <button className="p-5 tracking-wide font-mono text-4xl md:text-5xl font-black"
          onClick={() => {
          setNumber(number+randomNumbers[i]);
        }}>{formatted(randomNumbers[i], false)}</button>
      </li>
    );
  }

  elements.push(
    <li>
      <button className="p-5 tracking-wide font-mono text-4xl md:text-5xl font-black"
        onClick={() => {
        setNumber(number+100);
      }}>{formatted(100, false)}</button>
    </li>
  );

  return (
  <>
    <h1 className="p-5 text-center tracking-wide font-mono text-5xl md:text-8xl font-black">{formatted(number, false)}</h1>
    <div className="mt-10 text-center text-2xl" suppressHydrationWarning>
      Add:<br></br>
      <ul>
      {elements}
      <li key="custom">
      <button 
        className="py-4 hidden"
        onClick={() => {
        const val = prompt("Custom Number");
        try {
          let valInt = parseInt(val ?? "1");
          if(isNaN(valInt)) {
            valInt = 1;
          }
          setNumber(number + valInt);
        } catch(e) {
          setNumber(number + 1);
        }
      }}>
        Different Number
      </button>
      </li>
      </ul>
    </div>
    <div className="flex justify-between">
      <div>
        <button className="p-5 tracking-wide font-mono text-3xl md:text-3xl font-black"
          onClick={() => {
            const numbersSet = new Set<number>();
            while (numbersSet.size < maxRandNumberSet) {
              const randomNumber = Math.floor(Math.random() * maxRand) + minRand;
              numbersSet.add(randomNumber);
            }
            const sortedNumbers = Array.from(numbersSet).sort((a, b) => a - b);
            setRandomNumbers(sortedNumbers);
            setGenerated(true);
        }}>New Numbers</button>
      </div>
      <div>
        <button className="p-5 tracking-wide font-mono text-3xl md:text-3xl font-black"
          onClick={() => {
            setNumber(0);
        }}>Clear</button>
      </div>
    </div>
  </>
  )
}
