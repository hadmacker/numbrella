'use client'

import React, { useEffect, useState } from "react";
import { PrettyChar } from '../../prettyChar'
import { NumberFormatter } from '../../numberFormatter'
import './roman.css'

const numbers = PrettyChar.allCharacters();

function formattedRoman(roman: string, bw: boolean): React.ReactElement[] {
  if (!roman) {
    return [<span key={0}></span>];
  }

  // Create an array of <span> elements to hold each digit
  const spanElements = Array.from(roman).map((character, index) => {
    const defaultStyle = "";
    let prettyStyle = "";

    if (character === ".") {
      prettyStyle = defaultStyle; // replace with your default style for "."
    } else {
      const numberStyle = numbers.find(n => n.id === character);
      prettyStyle = numberStyle ? numberStyle.prettyStyle ?? defaultStyle : defaultStyle; // replace with your default style
    }

    return (
      <span className={prettyStyle} key={index}>
        {character}
      </span>
    );
  });

  return spanElements;
}

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

function integerToRoman(num: number) {
  const romanNumerals: { [key: string]: number } = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
  let roman = '';

  for (let key in romanNumerals) {
    while (num >= romanNumerals[key]) {
      roman += key;
      num -= romanNumerals[key];
    }
  }

  return roman;
}

export default function Page() {
    const romanNumeralsList = [];
    const [count, setCount] = useState(1000);
  
    for (let i = 1; i <= count; i++) {
      romanNumeralsList.push(
        <div key={i} className="text-center tracking-wide font-mono text-2xl lg:text-3xl font-black" style={{ margin: "0 20px", display: 'flex', justifyContent: 'space-between' }}>
          <span className="integerColumn" style={{ textAlign: 'right', flex: 1 }}>{formatted(i, false)}</span>
          <span className="romanColumn" style={{ textAlign: 'left', flex: 1 }}>{formattedRoman(integerToRoman(i), false)}</span>
        </div>
      );
    }

    useEffect(() => {
      function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 800) return;
        setCount(count => count + 1000);
      }
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
    return (
      <>
        <div style={{ border: '1px solid black', backgroundColor: '#222222', padding: '10px', margin: '10px' }}>
          <h2 className="text-center tracking-wide font-mono text-1xl lg:text-3xl font-black">Roman Numerals</h2>
          <div className="text-center tracking-wide font-mono text-l lg:text-1xl">
            <p>Imagine you have a box of blocks.</p>
            <p>Some blocks have the letter "{formattedRoman("I", false)}" on them, some have "{formattedRoman("V", false)}", some have "{formattedRoman("X", false)}", some have "{formattedRoman("L", false)}", some have "{formattedRoman("C", false)}", some have "{formattedRoman("D", false)}", and some have "{formattedRoman("M", false)}".</p>
            <p>Each letter is a special code that stands for a number.</p>
            <p>"{formattedRoman("I", false)}" is {formatted(1, false)}, "{formattedRoman("V", false)}" is {formatted(5, false)}, "{formattedRoman("X", false)}" is {formatted(10, false)}, "{formattedRoman("L", false)}" is {formatted(50, false)}, "{formattedRoman("C", false)}" is {formatted(100, false)}, "{formattedRoman("D", false)}" is {formatted(500, false)}, and "{formattedRoman("M", false)}" is {formatted(1000, false)}.</p>
            <p>Now, if you want to show the number {formatted(2, false)}, you just need to put two "{formattedRoman("I", false)}" blocks together like "{formattedRoman("II", false)}".</p>
            <p>If you want to show {formatted(6, false)}, you can put a "{formattedRoman("V", false)}" block and an "{formattedRoman("I", false)}" block together like "{formattedRoman("VI", false)}".</p>
            <p>But what if you want to show {formatted(4, false)}?</p>
            <p>You could use four "{formattedRoman("I", false)}" blocks like "{formattedRoman("IIII", false)}", but there's a special rule.</p>
            <p>If you put a smaller number in front of a bigger number, it means you subtract the smaller one.</p>
            <p>So, for {formatted(4, false)}, you put an "{formattedRoman("I", false)}" in front of a "{formattedRoman("V", false)}" to make "{formattedRoman("IV", false)}".</p>

            <p>And that's how you can make any number with your blocks!</p>
          </div>
          <br/>
          {romanNumeralsList}
        </div>
      </>
    );
  }