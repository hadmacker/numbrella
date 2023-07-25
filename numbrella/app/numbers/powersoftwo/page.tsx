'use client'

import React from "react";
import {useRouter, useSearchParams} from 'next/navigation'
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
  const bw = useQueryString("bw", "unset");
  const pqs = useQueryString("i", "0");
  const router = useRouter();

  try {
    const divElements: React.ReactElement[] = [];

    let nextHrefClassNames = "";
    let nextHrefNcClassNames = "hidden";
    // if(bw == "false") {
    //   nextHrefNcClassNames = "hidden";
    // }
    // if(bw == "true") {
    //   nextHrefClassNames = "hidden";
    // }
    let power = parseInt(pqs, 10);
    if(power < 0) {
      power = 0;
    }
    const a = Math.pow(2, power);
    let product = a;
    
    let allowPrior = (power >= 1);
    let priorClassNames = "";
    if(!allowPrior) {
      priorClassNames = "hidden";
    }

    const resetHref = "?";
    const priorHref = `?i=${power-1}&bw=${bw}`;

    divElements.push(
          <div>
            {Formula(a, power, product, bw)}
          </div>
        );
    
    const nextHref = `?i=${power+1}&bw=false`;

    return (
    <>
      <div className="text-center">
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
  } catch(e) {
    router.push("/numbers/fib")
  }
}

function Formula(value1: number, power: number, product: number, bw: boolean) {
  const showLastSpans = power != 0;

  return (
    <>
      <p className="text-center m-5 tracking-wide font-mono text-5xl font-black">
        <span className="normal-nums">{formatted(2, bw)}</span>
        <span className="ordinal text-xl align-top">{formatted(power, bw)}</span>
        <span className="text-black-600/100 mx-8">=</span>
        <span className="">
          {formatted(value1, bw)}
        </span>
      </p>
    </>
    )
}