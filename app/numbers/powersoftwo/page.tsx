'use client'

import React, { useState } from "react";
import { PrettyChar } from '../../prettyChar'
import { NumberFormatter } from '../../numberFormatter'

const numbers = PrettyChar.allCharacters();

function formatted(number: number, bw: boolean): React.ReactElement[] {
  const digitsArray = NumberFormatter.formatNumberWithBreaks(number.toString()).split("");

  // Create an array of <div> elements to hold each digit
  const divElements: React.ReactElement[] = digitsArray.map((digit, index) => {
    const prettyStyle = ((bw.toString() == "true")
      ? numbers.find(n=> n.id == "0")?.prettyStyle
      : numbers.find(n=> n.id == digit)?.prettyStyle) 
      ?? "text-gray-400";
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
  const [power, setPower] = useState<number>(0);
  const [value, setValue] = useState<number>(1);
  

  return (
    <>
      <h1 className="p-5 text-center tracking-wide font-mono text-5xl md:text-8xl font-black">
        <button className="p-5 tracking-wide font-mono text-4xl md:text-5xl font-black"
            onClick={() => {
              const newPower = power + 1;
              const newValue = Math.pow(2, newPower);
              setValue(newValue);
              setPower(newPower)
          }}>{Formula(value, power, bw)}</button>
      </h1>
      <div>
        <button
          className="py-4"
          onClick={() => {
            setPower(0);
            setValue(1);
          }}
          >Reset</button>
      </div>
    </>
    );
}

function expansion(value1: number, power: number, bw: boolean) {
  const divElements: React.ReactElement[] = [];
    divElements.push(<span>{formatted(1, bw)}</span>);
    
    for(var i = 0; i < power; i++) {
      divElements.push(<span>x{formatted(value1, bw)}</span>);
    }

    return (
    <>
      <div>
        {divElements}
      </div>
    </>
    )
}

function Formula(value1: number, power: number, bw: boolean) {
  return (
    <>
      <div className="text-center m-5 tracking-wide font-mono font-black">
        <span className="normal-nums text-5xl">{formatted(2, bw)}</span>
        <span className="ordinal text-xl align-top">{formatted(power, bw)}</span>
      </div>
      <div className="text-center m-5 tracking-wide font-mono font-black">
        <span className="text-5xl text-black-600/100 mx-8">=</span>
      </div>
      <div className="text-center m-5 tracking-wide font-mono font-black break-all">
        <span className="text-5xl">{expansion(2, power, bw)}</span>
      </div>
      <div className="text-center m-5 tracking-wide font-mono font-black">
        <span className="text-5xl text-black-600/100 mx-8">=</span>
      </div>
      <div className="text-center m-5 tracking-wide font-mono font-black">
        <span className="text-5xl">
          {formatted(value1, bw)}
        </span>
      </div>
    </>
    )
}