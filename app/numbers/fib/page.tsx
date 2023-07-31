'use client'

import React, { useState } from "react";
import { PrettyChar } from '../../prettyChar'
import { NumberFormatter } from '../../numberFormatter'

const numbers = PrettyChar.allCharacters();

function formatted(number: number, bw: boolean): React.ReactElement[] {
  const digitsArray = NumberFormatter.formatNumberWithBreaks(number.toString()).split("");

  // Create an array of <div> elements to hold each digit
  const divElements: React.ReactElement[] = digitsArray.map((digit, index) => {
    const prettyStyle = (bw.toString() == "true")
      ? numbers.filter(n=> n.id == "0")[0].prettyStyle
      : numbers.filter(n=> n.id == digit)[0].prettyStyle;
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
  const bw = false;
  const [a, setA] = useState<number>(0);
  const [b, setB] = useState<number>(1);
  const [number, setNumber] = useState<number>(1);
  const [iteration, setIteration] = useState<number>(1);
  const maxIteration = 75;

  return (
  <>
    <h1 className="text-center tracking-wide font-mono text-4xl lg:text-7xl font-black">
      <button className=""
          onClick={() => {
            const newA = b;
            const newB = number;
            const newNumber = number + b;
            const newIteration = iteration + 1;

            if(newIteration > maxIteration) {
              setIteration(0);
              setA(0);
              setB(1);
              setNumber(1);    
            } else {
              setIteration(newIteration);
              setNumber(newNumber);
              setA(newA)
              setB(newB);
            }
        }}>{Formula(a, b, number, bw)}</button>
    </h1>
    <div>
      <button
        className="py-4"
        onClick={() => {
          setIteration(0);
          setA(0);
          setB(1);
          setNumber(1);
        }}
        >Reset</button>
    </div>
  </>
  );
}

function Formula(value1: number, value2: number, value3: number, bw: boolean) {
  return (
    <>
      <div className="text-center m-3 lg:m-5">
        <span className="">{formatted(value1, bw)}</span>
      </div>
      <div className="text-center">
        <span className="text-black-600/100">+</span>
      </div>
      <div className="text-center m-3 lg:m-5">
        <span className="">{formatted(value2, bw)}</span>
      </div>
      <div className="text-center">
        <span className="text-black-600/100">=</span>
      </div>
      <div className="text-center m-3 lg:m-5">
        <span className="">
          {formatted(value3, bw)}
        </span>
      </div>
    </>
    )
}