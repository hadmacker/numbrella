'use client'

import React, { useState } from "react";
import { PrettyChar } from '../../prettyChar'
import { NumberFormatter } from '../../numberFormatter'

const numbers = PrettyChar.allCharacters();

let bitFormats: Array<PrettyChar> = [];
bitFormats.push(new PrettyChar("0","text-gray-500"));
bitFormats.push(new PrettyChar("1","text-white-800"));

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
      prettyStyle = defaultStyle;
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

    const [number, setNumber] = useState(0);

  // Function to convert number to binary
  const toBinary = (num: number) => num.toString(2).padStart(8, '0');

  // Function to handle toggling of bits
  const handleToggle = (bitIndex: number) => {
    setNumber(prevNumber => prevNumber ^ (1 << bitIndex));
  };

  function formattedBinary(binaryString: string): React.ReactNode[] {
    return binaryString.split('').map((bit, index) => (
      <span key={index} className={bit === '1' ? bitFormats["1"].prettyStyle : bitFormats["0"].prettyStyle}>
        {bit}
      </span>
    ));
  }

  return (
    <>
    <style jsx>{`
      input[type="checkbox"]:checked {
        background-color: green;
      }
    `}</style>

    <div style={{ border: '1px solid black', backgroundColor: '#222222', padding: '10px', margin: '10px' }}>
      <h2 className="text-center tracking-wide font-mono text-2xl lg:text-3xl font-black">Binary and Decimal Numbers</h2>
      <br/>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ul>
          <li>Computers use binary numbers, which are made up of {formatted(0,false)}s and {formatted(1,false)}s.</li>
          <li>Each {formatted(0,false)} or {formatted(1,false)} is called a bit.</li>
          <li>Each bit represents a power of {formatted(2,false)} from {formatted(2,false)}^{formatted(0,false)} to {formatted(2,false)}^{formatted(7,false)}.</li>
          <li>In the activity that follows, {formatted(2,false)}^{formatted(0,false)} is on the right.</li>
          <li>A group of {formatted(8,false)} bits is called a byte.</li>
          <li>A byte can represent a number from {formatted(0,false)} to {formatted(255,false)}.</li>
          <li>The number {formatted(255,false)} is the largest number that can be represented by a byte.</li>
          <li>The number {formatted(0,false)} is the smallest number that can be represented by a byte.</li>
        </ul>  
      </div>
    </div>
    <div  className="text-center tracking-wide font-mono text-5xl lg:text-5xl font-black">
      <p>Decimal: {formatted(number, false)}</p>
    </div>
    <div className="text-center tracking-wide font-mono text-5xl lg:text-5xl font-black">
      <p>Binary: {formattedBinary(toBinary(number))}</p>
    </div>
    <div>
    <div className="flex justify-center text-center tracking-wide font-mono text-2xl lg:text-2xl font-black">
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className="flex flex-col items-center m-2">
          <label htmlFor={`bit-${i}`}>{formatted((2 ** (7-i)), false)}</label>
          <input
            type="checkbox"
            className="w-8 h-8 text-green-600 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            checked={!!(number & (1 << (7-i)))}
            onChange={() => handleToggle(7-i)}
            id={`bit-${i}`}
          />
        </div>
      ))}
    </div>
      <div className="text-center tracking-wide font-mono text-3xl lg:text-3xl font-black">
        <button 
        style={{ padding: '10px', backgroundColor: '#555', border: '1px solid #ccc', borderRadius: '5px' }} 
        onClick={() => setNumber((prevNumber) => (prevNumber + 1) % 256)}>
          Add 1
        </button>
      </div>
    </div>
    </>
  );
}

