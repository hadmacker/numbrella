'use client'

import React from "react";
import { PrettyChar } from '../../prettyChar'
import { NumberFormatter } from '../../numberFormatter'

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
  const divElements: React.ReactElement[] = [];

  return (
    <>
      <span className="mx-3 md:mx-2 md:p-1 text-2xl md:text-3xl font-black text-gray-500">Counter</span>
      <div className="columns-1 text-left">
        <p className="text-left m-5 tracking-wide font-mono text-5xl font-black">
          {formatted(value)}
        </p>
      </div>
    </>
  )
}
