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
  let a = 0;
  let b = 1;
  let n = 75;
  const divElements: React.ReactElement[] = [];

  for (let i = 0; i < n; i++) {
    const c = a + b;
    divElements.push(
      <div key={i}>
        {Formula(a, b, c, false)}
      </div>
    );
    a = b;
    b = c;
  }

  return (
    <>
      <div className="columns-1 text-left">
        {divElements}
      </div>
    </>
  )
}

function Formula(value1: number, value2: number, value3: number, bw: boolean) {
  return (
    <>
      <p className="text-left m-5 tracking-wide font-mono text-5xl font-black">
        {formatted(value1, bw)}
          <span className="text-black-600/100 mx-8">+</span>
          {formatted(value2, bw)}
          <span className="text-black-600/100 mx-8">=</span>
          {formatted(value3, bw)}
        </p>
    </>
    )
}