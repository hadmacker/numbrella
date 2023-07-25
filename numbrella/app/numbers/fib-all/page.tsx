'use client'

import React from "react";
import {useSearchParams} from 'next/navigation'

class PrettyChar {
  id?: string;
  prettyStyle?: string;

  constructor(id: string, prettyStyle: string) {
    this.id = id;
    this.prettyStyle = prettyStyle;
  }
}

let numbers: Array<PrettyChar> = [];
numbers.push(new PrettyChar(",","text-gray-400 m-0"));
numbers.push(new PrettyChar("0","text-gray-500"));
numbers.push(new PrettyChar("1","text-pink-500"));
numbers.push(new PrettyChar("2","text-amber-500"));
numbers.push(new PrettyChar("3","text-lime-500"));
numbers.push(new PrettyChar("4","text-emerald-500"));
numbers.push(new PrettyChar("5","text-blue-400"));
numbers.push(new PrettyChar("6","text-indigo-600"));
numbers.push(new PrettyChar("7","text-fuchsia-500"));
numbers.push(new PrettyChar("8","text-rose-500"));
numbers.push(new PrettyChar("9","text-cyan-400"));

function formatNumberWithBreaks(input: string): string {
  const cleanedInput = input.replace(/,/g, ''); // Remove any existing commas
  const numberLength = cleanedInput.length;
  const breakEvery = 3; // Insert a break every 'breakEvery' digits

  let formattedNumber = '';

  for (let i = 0; i < numberLength; i += breakEvery) {
    const startIndex = Math.max(numberLength - i - breakEvery, 0);
    const chunk = cleanedInput.slice(startIndex, numberLength - i);
    formattedNumber = chunk + (formattedNumber ? ',' + formattedNumber : '');
  }

  return formattedNumber;
}

function formatted(number: number, bw: boolean): React.ReactElement[] {
  const digitsArray = formatNumberWithBreaks(number.toString()).split("");

  // Create an array of <div> elements to hold each digit
  const divElements: React.ReactElement[] = digitsArray.map((digit, index) => {
    const prettyStyle = (bw.toString() == "true")
      ? numbers.filter(n=> n.id == "0")[0].prettyStyle
      : numbers.filter(n=> n.id == digit)[0].prettyStyle;
    const combinedClasses = `${prettyStyle}`;
    return (
      <span className={combinedClasses}>
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
  let n = parseInt(useQueryString("first", "100"), 10);
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