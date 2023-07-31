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
  const [iteration, setIteration] = useState<number>(0);
  const maxIteration = 55;

  return (
    <>
      <h1 className="text-center tracking-wide font-mono text-4xl lg:text-7xl font-black">
        <button className=""
            onClick={() => {
              const newPower = power + 1;
              const newValue = Math.pow(2, newPower);
              const newIteration = iteration + 1;

              if(newIteration > maxIteration) {
                setIteration(0);
                setPower(0);
                setValue(1);
              } else {
                setIteration(newIteration);
                setValue(newValue);
                setPower(newPower)
              }
          }}>{Formula(value, power, bw)}</button>
      </h1>
      <div>
        <button
          className="py-4"
          onClick={() => {
            setIteration(0);
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
      <div className="text-center m-1">
        <span className="normal-nums ">{formatted(2, bw)}</span>
        <span className="ordinal text-xl align-top">{formatted(power, bw)}</span>
      </div>
      <div className="text-center m-1">
        <span className=" text-black-600/100">=</span>
      </div>
      <div className="text-center m-1 break-all">
        <span className="">{expansion(2, power, bw)}</span>
      </div>
      <div className="text-center m-1">
        <span className=" text-black-600/100">=</span>
      </div>
      <div className="text-center m-1">
        <span className="">
          {formatted(value1, bw)}
        </span>
      </div>
    </>
    )
}