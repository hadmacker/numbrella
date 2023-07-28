'use client'

import React from "react";
import {useSearchParams, useRouter, ReadonlyURLSearchParams} from 'next/navigation'
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

function useQueryString(searchParams: ReadonlyURLSearchParams, key: string, defaultValue: string) {
  const value = searchParams.get(key);

  if (value === undefined || value === null) {
    return defaultValue;
  }

  return Array.isArray(value) ? value[0] : value;
}

export default function Page() {
  const searchParams = useSearchParams();
  const bw = useQueryString(searchParams, "bw", "unset");
  const aqs = useQueryString(searchParams, "a", "0");
  const bqs = useQueryString(searchParams, "b", "1");
  const router = useRouter();

  try {
    let n = 50;
    const divElements: React.ReactElement[] = [];
  
    let nextHrefClassNames = "";
    let nextHrefNcClassNames = "hidden";
    // if(bw == "false") {
    //   nextHrefNcClassNames = "hidden";
    // }
    // if(bw == "true") {
    //   nextHrefClassNames = "hidden";
    // }
    let a = parseInt(aqs, 10);
    if(a < 0) {
      a = 0;
    }
    let b = parseInt(bqs, 10);
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
          <div key="1">
            {Formula(a, b, c, bw)}
          </div>
        );
    
    const nextHref = `?a=${b}&b=${c}&bw=false`;
    const nextHrefNc = `?a=${b}&b=${c}&bw=true`;
  
    return (
    <>
      <div className="columns-1 text-left">
        <a href={nextHref} className={nextHrefClassNames}>
          {divElements}
        </a>
      </div>
      <div className="m-8"></div>
      <div>
        <div><a href={resetHref}><span className="mx-5 p-4 text-3xl font-black">Reset</span></a></div>
      </div>
    </>
    )
  }
  catch(e) {
    router.push("/numbers/fib")
  }
}

function Formula(value1: number, value2: number, value3: number, bw: boolean) {
  return (
    <>
      <p className="text-center m-5 tracking-wide font-mono text-5xl font-black">
        <span className="">
          {formatted(value1, bw)}
        </span>
        <span className="text-black-600/100 mx-8">+</span>
        <span className="">
          {formatted(value2, bw)}
        </span>
        <span className="text-black-600/100 mx-8">=</span>
        <span className="">
          {formatted(value3, bw)}
        </span>
      </p>
    </>
    )
}