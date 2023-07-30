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

  return (
  <>
    <h1 className="p-5 text-center tracking-wide font-mono text-5xl md:text-8xl font-black">
      <button className="p-5 tracking-wide font-mono text-4xl md:text-5xl font-black"
          onClick={() => {
            const newA = b;
            const newB = number;
            const newNumber = number + b;
            setNumber(newNumber);
            setA(newA)
            setB(newB);
        }}>{Formula(a, b, number, bw)}</button>
    </h1>
    <div>
      <button
        className="py-4"
        onClick={() => {
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
      <p className="text-center m-5 tracking-wide font-mono text-5xl font-black">
        <span className="">
          {formatted(value1, bw)}
        </span>
        <span className="text-black-600/100 mx-8">+</span>
        <span className="">
          {formatted(value2, bw)}
        </span>
        <span className="text-black-600/100 mx-8">=</span>
        <span className="">
          {formatted(value3, bw)}
        </span>
      </p>
    </>
    )
}