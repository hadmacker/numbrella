'use client'

import React, { useState } from "react";
import { PrettyChar } from '../../prettyChar'
import { NumberFormatter } from '../../numberFormatter'

const numbers = PrettyChar.allCharacters();

function formatted(number: number, bw: boolean): React.ReactElement[] {
  if (number === null || number === undefined) {
    return [<span key={0}></span>];
  }
  const digitsArray = NumberFormatter.formatNumberWithBreaks(number.toString()).split("");

  // Create an array of <div> elements to hold each digit
  const divElements: React.ReactElement[] = digitsArray.map((digit, index) => {
    const defaultStyle = "";
    let prettyStyle = "";
    if (digit === ".") {
      prettyStyle = defaultStyle; // replace with your default style for "."
    } else {
      const numberStyle = numbers.filter(n => n.id === digit);
      prettyStyle = numberStyle.length > 0 ? numberStyle[0].prettyStyle ?? defaultStyle : defaultStyle; // replace with your default style
    }
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
    const primeDefinition = "A prime number is positive and has no factors other than 1 and itself.";
    const compositeDefinition = "A composite number has more than two factors. A composite number can be factored into smaller integers."; 
    const oneDefinition = "1 is not prime or composite. 1 is a unit. 1 is a factor every prime and composite number.";
    const [value1, setValue1] = useState(2);
    const [compositeness, setCompositeness] = useState("Prime");
    const [definition, setDefinition] = useState(primeDefinition);
    const [factors, setFactors] = useState<number[]>([]);
    const [elapsed, setElapsed] = useState<number>(0);
    const primeStyle = "text-rose-500 mx-5";
    const compositeStyle = "text-cyan-400 mx-5";
    const maxValue = 1000000000000;

    const isPrime = (num: number) => {
      for(let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++)
        if(num % i === 0) return false; 
      return num > 1;
    }

    const getFactors = (num: number) => {
      let factors = [];
      for(let i = 2; i <= Math.sqrt(num); i++) {
        if(num % i === 0) {
          factors.push(i);
          if (num / i !== i) {
            factors.push(num / i);
          }
        }
      }
      return factors.length > 0 ? factors : null;
    }

    const compute = (input: number) => {
      const start = performance.now();
      let num = input;
      if(num > maxValue) {
        num = maxValue;
      }
      setValue1(num);
      let factors = getFactors(num);

      if(num === 1) {
        setCompositeness("not Prime or Composite");
        setDefinition(oneDefinition);
        setFactors([1]);
        const end = performance.now();
        setElapsed(end - start);
        console.log(`${num} factored in: ${elapsed.toFixed(2)} ms`);
        return;
      }

      if (factors) {
        factors = [1, ...factors, num].sort((a, b) => a - b);
        setCompositeness("Composite");
        setDefinition(compositeDefinition);
        setFactors(factors);
      } else {
        factors = [1, num].sort((a, b) => a - b);
        setCompositeness("Prime");
        setDefinition(primeDefinition);
        setFactors(factors);
      }
      const end = performance.now();
      setElapsed(end - start);
      console.log(`${num} factored in: ${elapsed.toFixed(2)} ms`);
    }

    return (
        <>
      <div style={{ border: '1px solid black', backgroundColor: '#222222', padding: '10px', margin: '10px' }}>
    <h2 className="text-center tracking-wide font-mono text-3xl lg:text-3xl font-black">Prime or Composite</h2>
    <br/>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
    <button
       style={{ padding: '10px', backgroundColor: '#333', border: '1px solid #ccc', borderRadius: '5px' }}
        onClick={() => {
          compute(value1 - 1);
        }}
      >
        Back
      </button>
      <input 
        style={{ margin: '0 50px', width: '180px', height: '70px' }}
        type="number" 
        min="1" 
        max={maxValue}
        value={value1}
        onChange={(e) => {
          if (!e.target.value) {
            setValue1(0);
            setCompositeness("");
            setDefinition("");
            setFactors([]);
            return;
          }
          compute(e.target.valueAsNumber);
        }}
      />
      <button
       style={{ padding: '10px', backgroundColor: '#333', border: '1px solid #ccc', borderRadius: '5px' }}
        onClick={() => {
          compute(value1 + 1);
        }}
      >
        Next
      </button>
      <button
       style={{ padding: '10px', backgroundColor: '#333', border: '1px solid #ccc', borderRadius: '5px', marginLeft: '50px' }}
        onClick={() => {
          let nextPrime = value1 + 1;
          while (!isPrime(nextPrime)) {
            nextPrime++;
          }
          compute(nextPrime);
        }}
      >
        Next Prime
      </button>
    </div>
    {compositeness && (
    <h2 className="text-center tracking-wide font-mono text-3xl lg:text-3xl font-black">
      <br/>
      <span className="mx-5">
      {formatted(value1, false)}
      </span>
      is
      <span 
        className={compositeness === 'Prime' ? primeStyle : compositeStyle}
      >
        {compositeness}
      </span>
    </h2>
    )}
    </div>
    <div className="text-center tracking-wide font-mono text-xl lg:text-2xl font-black">
    <h2>{definition}</h2><br/>
    {factors.length > 0 && (
      <div>
        <h2>
          {formatted(factors.length, false)}
          <span className="mx-5">
          Factors:
          </span>
        </h2>
        {factors.map((factor, index) => (
          <h2 key={index}>
            <p>{formatted(factor, false)} x {formatted(value1 / factor, false)} = {formatted(value1, false)}</p>
          </h2>
        ))}
      </div>
    )}
    </div>
    </>
    );
}
