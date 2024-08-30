'use client'

import React from "react";
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
  const n = 1000;
  const divElements: React.ReactElement[] = [];

  for (let i = 1; i <= n; i++) {
    const c = i * i * i;
    divElements.push(
      <div key={i}>
        {Formula(i, c, false)}
      </div>
    );
  }

  return (
    <>
      <span className="mx-3 md:mx-2 md:p-1 text-2xl md:text-3xl font-black text-gray-500">List of Cube Numbers</span>
      <div className="columns-1 text-left">
        {divElements}
      </div>
    </>
  )
}

function Formula(value1: number, value3: number, bw: boolean) {
  return (
    <>
      <p className="text-left m-5 tracking-wide font-mono text-5xl font-black">
        {formatted(value1, bw)}
        <sup>{formatted(3, bw)}</sup>
        <span className="px-4">=</span>
        {formatted(value3, bw)}
      </p>
    </>
    )
}