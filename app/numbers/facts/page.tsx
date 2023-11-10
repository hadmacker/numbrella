'use client'

import React, { useState } from "react";
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
    const [value1, setValue1] = useState(0);
    const [value2, setValue2] = useState(0);
  
    return (
        <>
      <div style={{ border: '1px solid black', backgroundColor: '#222222', padding: '10px', margin: '10px' }}>
      <h2 className="text-center tracking-wide font-mono text-3xl lg:text-3xl font-black">Number Sliders</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <input 
          style={{ margin: '0 50px', width: '300px', height: '70px' }}
          className="text-4xl"
          type="number" 
          pattern="[0-9]*"
          value={value1} 
          onChange={(e) => setValue1(Number(e.target.value))}
        />
        <input 
          style={{ margin: '0 50px', width: '300px', height: '70px' }}
          className="text-4xl"
          type="number" 
          pattern="[0-9]*"
          value={value2} 
          onChange={(e) => setValue2(Number(e.target.value))}
        />
      </div>
      </div>
      <div className="m-5">
        <div className="text-center tracking-wide font-mono text-5xl lg:text-5xl font-black">{formatted(value1, false)}</div>
        <div className="text-center tracking-wide font-mono text-5xl lg:text-5xl font-black text-black-600/100">+</div>
        <div className="text-center tracking-wide font-mono text-5xl lg:text-5xl font-black">{formatted(value2, false)}</div>
        <div className="text-center tracking-wide font-mono text-5xl lg:text-5xl font-black text-black-600/100">=</div>
        <div className="text-center tracking-wide font-mono text-5xl lg:text-5xl font-black">{formatted(value1+value2, false)}</div>
      </div>
    </>
    );
}