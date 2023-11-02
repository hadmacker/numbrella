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
    const [value3, setValue3] = useState(0);

    const handleSliderChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(event.target.value, 10);
        setValue1(newValue);
    };
    const handleSliderChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(event.target.value, 10);
        setValue2(newValue);
    };
    const handleSliderChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(event.target.value, 10);
        setValue3(newValue);
    };
    const [operation, setOperation] = useState('multiply');

    const handleOperationChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
        setOperation(event.target.value);
    };
  
    return (
        <>
      <div style={{ border: '1px solid black', backgroundColor: '#222222', padding: '10px', margin: '10px' }}>
    <h2 className="text-center tracking-wide font-mono text-3xl lg:text-3xl font-black">Number Sliders</h2>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <input 
        style={{ margin: '0 50px', width: '300px', height: '70px' }}
        type="range" 
        min="0" 
        max="1000" 
        value={value1} 
        onChange={handleSliderChange1} 
      />
      <input 
        style={{ margin: '0 50px', width: '300px', height: '70px' }}
        type="range" 
        min="0" 
        max="1000" 
        value={value2} 
        onChange={handleSliderChange2} 
      />
      <input 
        style={{ margin: '0 50px', width: '300px', height: '70px' }}
        type="range" 
        min="0" 
        max="1000" 
        value={value3} 
        onChange={handleSliderChange3} 
      />
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span style={{ margin: '0 50px' }} className=" normal-nums">{formatted(value1, false)}</span>
      <span style={{ margin: '0 50px' }} className=" normal-nums">{formatted(value2, false)}</span>
      <span style={{ margin: '0 50px' }} className=" normal-nums">{formatted(value3, false)}</span>
    </div>
    <h2 className="text-center tracking-wide font-mono text-3xl lg:text-3xl font-black">Operation:</h2>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
  <div>
    <input 
      type="radio" 
      id="multiply" 
      name="operation" 
      value="multiply" 
      checked={operation === 'multiply'} 
      onChange={handleOperationChange} 
    />
    <label className="text-center tracking-wide font-mono text-1xl lg:text-1xl font-black" htmlFor="multiply">x (Multiply)</label>
  </div>
  <div>
    <input 
      type="radio" 
      id="add" 
      name="operation" 
      value="add" 
      checked={operation === 'add'} 
      onChange={handleOperationChange} 
    />
    <label className="text-center tracking-wide font-mono text-1xl lg:text-1xl font-black" htmlFor="add">+ (Add)</label>
  </div>
</div>
  </div>
      <h1 className="text-center tracking-wide font-mono text-4xl lg:text-7xl font-black">
        {Formula(value1, value2, value3, false, operation)}
    </h1>
    </>
    );
}

function Formula(value1: number, value2: number, value3: number, bw: boolean, operation: string) {
    var computedValue = 0;
    var symbol = "x";
    if (operation == "add") {
        symbol = "+"
        computedValue = value1 + value2 + value3;
    } else {
        symbol = "x"
        computedValue = value1 * value2 * value3;
    }
    return (
      <>
        <div className="m-1 lg:m-5 break-all">
          <span className=" normal-nums text-black-600">{formatted(value1, bw)}</span>
          <span className=" text-black-600/100 mx-4">{symbol}</span>
          <span className=" normal-nums text-black-600">{formatted(value2, bw)}</span>
          <span className=" text-black-600/100 mx-4">{symbol}</span>
          <span className=" normal-nums text-black-600">{formatted(value3, bw)}</span>
        </div>
        <div className="m-1 lg:m-5">
          <span className=" text-black-600/100 mx-8">=</span>
        </div>
        <div className="m-1 lg:m-5">
          <span className="">
            {formatted(computedValue, bw)}
          </span>
        </div>
      </>
      )
  }