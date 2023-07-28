'use client'

import React from "react";
import {useSearchParams, useRouter} from 'next/navigation'
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

function useQueryString(key: string, defaultValue: string) {
  const searchParams = useSearchParams()
  const value = searchParams.get(key);

  if (value === undefined || value === null) {
    return defaultValue;
  }

  return Array.isArray(value) ? value[0] : value;
}

export default function Page() {
  let a = 0;
  let b = 1;
  let n = parseInt(useQueryString("first", "75"), 10);
  const divElements: React.ReactElement[] = [];
  let bw = useQueryString("bw", "unset");

  for (let i = 0; i < n; i++) {
    const c = a + b;
    divElements.push(
      <div key={i}>
        {Formula(a, b, c, bw)}
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