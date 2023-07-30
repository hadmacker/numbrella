'use client'

import React from "react";
import {useSearchParams, useRouter} from 'next/navigation'
import { PrettyChar } from '../../prettyChar'
import { NumberFormatter } from '../../numberFormatter'

const pretty = PrettyChar.allCharacters();

function formatted(value: number, bw: boolean): React.ReactElement[] {
  const digitsArray = NumberFormatter.formatNumberWithBreaks(value.toString()).split("");

  // Create an array of <div> elements to hold each digit
  const elements: React.ReactElement[] = digitsArray.map((digit, index) => {
    const prettyStyle = (bw.toString() == "true")
      ? pretty.filter(n=> n.id == "0")[0].prettyStyle
      : pretty.filter(n=> n.id == digit)[0].prettyStyle;
    const combinedClasses = `${prettyStyle}`;
    return (
      <span className={combinedClasses} key={index}>
        {digit}
      </span>
    );
  });

  return elements;
}

export default function Page() {
  const elements: React.ReactElement[] = [];

  for(let i = 0; i <= 1000; i += 2)
  {
    elements.push(
      <tr className="m-5 p-5">
        {Formula(i, false)}
      </tr>
    );
  };

  return (
  <>
    <table className="table-auto">
      <thead>
        <tr>
          <th className="text-left mx-5"></th>
          <th className="text-left mx-5">Even</th>
          <th className="text-left mx-5"></th>
          <th className="text-left mx-5">Odd</th>
        </tr>
      </thead>
      <tbody>
        {elements}
      </tbody>
    </table>
  </>
  )
}

function Formula(value: number, bw: boolean) {
  return (
      <>
        <td className="pl-1 md:pl-5 lg:pl-20 text-right m-5 tracking-wide font-mono text-3xl font-black">{formatted(value, bw)}</td>
        <td className="pl-3 md:pl-5 text-left m-5 tracking-wide font-mono md:text-3xl text-2xl text-gray-500">is even</td>
        <td className="pl:5 md:pl-20 text-right m-5 tracking-wide font-mono text-3xl font-black">{formatted(value + 1, bw)}</td>
        <td className="pl-3 md:pl-5 text-left m-5 tracking-wide font-mono md:text-3xl text-2xl text-gray-500">is odd</td>
      </>
    )
}