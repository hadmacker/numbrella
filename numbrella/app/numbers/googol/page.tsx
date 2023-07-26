'use client'

import React from "react";
import {useRouter, useSearchParams} from 'next/navigation'
import { PrettyChar } from '../../prettyChar'
import { NumberFormatter } from '../../numberFormatter'

const numbers = PrettyChar.allCharacters();
const googol = "10,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000";

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
  const divElements: React.ReactElement[] = [];
  console.log(googol);

  const digitsArray = googol.split("");
  const commonClasses = "m-1";

  digitsArray.forEach((digit, index) => {
    const prettyStyle = numbers.filter(n=> n.id?.toString() == digit)[0].prettyStyle;
    const combinedClasses = `${commonClasses} ${prettyStyle}`;
    divElements.push(<span key={index} className={combinedClasses}>{digit}</span>);
    if(digit == ",") {
      divElements.push(<wbr></wbr>);
    }
  });
  
  return (
  <>
    <div className="text-4xl font-black tracking-wide font-mono text-center">
      <a href="https://en.wikipedia.org/wiki/Googol">Googol</a>
    </div>
    <div className="text-center text-5xl text-black-600/100 m-5">
      <span className="normal-nums text-5xl">{formatted(10, false)}</span>
      <span className="ordinal text-xl align-top">{formatted(100, false)}</span>
    </div>
    <div className="text-center text-2xl text-black-600/100 mx-8">
      Ten Duotrigintillion
    </div>
    <div className="text-left m-8 font-mono text-5xl font-black columns-1 break-words">
      {divElements}
    </div>
  </>
  )
}
