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
  // let a = 0;
  // let b = 1;
  let n = 50;
  const divElements: React.ReactElement[] = [];

  let nextHrefClassNames = "";
  let nextHrefNcClassNames = "";
  let bw = useQueryString("bw", "unset");
  if(bw == "false") {
    nextHrefNcClassNames = "hidden";
  }
  if(bw == "true") {
    nextHrefClassNames = "hidden";
  }
  let a = parseInt(useQueryString("a", "0"), 10);
  if(a < 0) {
    a = 0;
  }
  let b = parseInt(useQueryString("b", "1"), 10);
  if(b < 1) {
    b = 1;
  }
  let c = a+b;
  let d = b - a; // Going backwards, subtract A from B to get the prior A.

  let allowPrior = (a > 0 && b >= 1);
  let priorClassNames = "";
  if(!allowPrior) {
    priorClassNames = "hidden";
  }

  const resetHref = "?";
  const priorHref = `?a=${d}&b=${a}&bw=${bw}`;

  divElements.push(
        <div>
          {Formula(a, b, c, bw)}
        </div>
      );
  
  const nextHref = `?a=${b}&b=${c}&bw=false`;
  const nextHrefNc = `?a=${b}&b=${c}&bw=true`;

  return (
  <>
    <div className="columns-1 text-left">
      {divElements}
      <br></br>
      <a href={priorHref} className={priorClassNames}>Prior</a><br></br>
      <a href={nextHref} className={nextHrefClassNames}>Next (colour)</a><a href={nextHrefNc} className={nextHrefNcClassNames}>Next (black)</a><br></br>
      <a href={resetHref}>Reset</a><br></br>
      <a href="/numbers/fib-all?first=100">First 100</a>
    </div>
  </>
  )
}

function Formula(value1: number, value2: number, value3: number, bw: boolean) {
  return (
    <>
      <p className="text-left m-5 tracking-wide font-mono text-5xl font-black">
        <span className="ring-offset-2 ring-2 shadow-md">
          {formatted(value1, bw)}
        </span>
        <span className="text-black-600/100 mx-8">+</span>
        <span className="ring-offset-2 ring-2 shadow-md">
          {formatted(value2, bw)}
        </span>
        <span className="text-black-600/100 mx-8">=</span>
        <span className="ring-offset-2 ring-2 shadow-md">
          {formatted(value3, bw)}
        </span>
      </p>
    </>
    )
}