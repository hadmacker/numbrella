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
  const [multiplier, setMultiplier] = useState<number>(0);
  const [value, setValue] = useState<number>(0);

  return (
    <>
      <h1 className="p-5 text-center tracking-wide font-mono font-black">
        <button className="p-5 tracking-wide font-mono md:font-black"
            onClick={() => {
              const newMultiplier = multiplier + 1;
              const newValue = Math.pow(multiplier, 3);
              setMultiplier(newMultiplier);
              setValue(newValue)
          }}>{Formula(Math.pow(multiplier, 3), multiplier, bw)}</button>
      </h1>
      <div>
        <button
          className="py-4"
          onClick={() => {
            setMultiplier(0);
            setValue(0);
          }}
          >Reset</button>
      </div>
    </>
    );
}

function Formula(value1: number, base: number, bw: boolean) {
  return (
    <>
      <div className="text-center m-5 tracking-wide font-mono font-black">
        <span className="normal-nums text-5xl">{formatted(base, bw)}</span>
        <span className="ordinal text-xl align-top">{formatted(3, bw)}</span>
      </div>
      <div className="text-center m-5 tracking-wide font-mono font-black">
        <span className="text-5xl text-black-600/100 mx-8">=</span>
      </div>
      <div className="text-center m-5 tracking-wide font-mono font-black break-all">
        <span className="text-5xl normal-nums">{formatted(base, bw)}</span>
        <span className="text-5xl text-black-600/100 mx-2">x</span>
        <span className="text-5xl normal-nums">{formatted(base, bw)}</span>
        <span className="text-5xl text-black-600/100 mx-2">x</span>
        <span className="text-5xl normal-nums">{formatted(base, bw)}</span>
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