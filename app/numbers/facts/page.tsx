'use client'

import React, { useEffect, useState } from "react";
import { PrettyChar } from '../../prettyChar'
import { NumberFormatter } from '../../numberFormatter'

const numbers = PrettyChar.allCharacters();

const gradeMathFacts = {
  "pre-k": [{operation: "add", maxNumber: 5}],
  "kindergarten": [{operation: "add", maxNumber: 10}, {operation: "subtract", maxNumber: 10}],
  "first-grade": [{operation: "add", maxNumber: 30}, {operation: "subtract", maxNumber: 20}],
  "second-grade": [{operation: "add", maxNumber: 50}, {operation: "subtract", maxNumber: 30}],
  "third-grade": [{operation: "add", maxNumber: 100}, {operation: "subtract", maxNumber: 50}],
  "advanced": [{operation: "add", maxNumber: 1000}, {operation: "subtract", maxNumber: 100}]
};

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
    // const [value1, setValue1] = useState(0);
    // const [value2, setValue2] = useState(0);
    const [grade, setGrade] = useState("pre-k");
    const facts = gradeMathFacts[grade as keyof typeof gradeMathFacts] || [];

    const [value1, setValue1] = useState(0);
    const [value2, setValue2] = useState(0);
    const [correctAnswer, setAnswer] = useState(value1 + value2);
    const [options, setOptions] = useState<number[]>([]);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    useEffect(() => {
      nextFact();
    }, []);

    const nextFact = () => {
      const operations = gradeMathFacts[grade as keyof typeof gradeMathFacts];
      const operation = operations[Math.floor(Math.random() * operations.length)];
      const innerValue1 = Math.floor(Math.random() * (operation.maxNumber));
      const innerValue2 = Math.floor(Math.random() * (operation.maxNumber));
      const innerAnswer = innerValue1 + innerValue2;
      setValue1(innerValue1);
      setValue2(innerValue2);
      setAnswer(innerValue1 + innerValue2);
      
      const incorrectAnswers = Array.from({ length: 3 }, () => Math.floor(Math.random() * (operation.maxNumber)));
      const newOptions = [...incorrectAnswers];
      if(newOptions.find((option) => option === innerAnswer)) {
        newOptions.splice(Math.floor(Math.random() * 4), 0, Math.floor(Math.random() * (operation.maxNumber)));
      } else {
        newOptions.splice(Math.floor(Math.random() * 4), 0, innerAnswer);
      }
      setOptions(newOptions);
    };

    const activateGrade = (newGrade:string) => {
      setGrade(newGrade);
      nextFact();
    };

    const checkAnswer = (selectedAnswer: number) => {
      setSelectedOption(selectedAnswer);
    };
  
    return (
        <>
      <div style={{ border: '1px solid black', backgroundColor: '#222222', padding: '10px', margin: '10px' }}>
        <h2 className="text-center tracking-wide font-mono text-3xl lg:text-3xl font-black">Math Facts</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <button style={{ padding: '10px', backgroundColor: grade === "pre-k" ? '#555' : '#333', border: '1px solid #ccc', borderRadius: '5px' }} onClick={() => activateGrade("pre-k")}>Pre-K</button>
          <button style={{ padding: '10px', backgroundColor: grade === "kindergarten" ? '#555' : '#333', border: '1px solid #ccc', borderRadius: '5px' }} onClick={() => activateGrade("kindergarten")}>Kindergarten</button>
          <button style={{ padding: '10px', backgroundColor: grade === "first-grade" ? '#555' : '#333', border: '1px solid #ccc', borderRadius: '5px' }} onClick={() => activateGrade("first-grade")}>First Grade</button>
          <button style={{ padding: '10px', backgroundColor: grade === "second-grade" ? '#555' : '#333', border: '1px solid #ccc', borderRadius: '5px' }} onClick={() => activateGrade("second-grade")}>Second Grade</button>
          <button style={{ padding: '10px', backgroundColor: grade === "third-grade" ? '#555' : '#333', border: '1px solid #ccc', borderRadius: '5px' }} onClick={() => activateGrade("third-grade")}>Third Grade</button>
          <button style={{ padding: '10px', backgroundColor: grade === "nouns" ? '#555' : '#333', border: '1px solid #ccc', borderRadius: '5px' }} onClick={() => activateGrade("advanced")}>Advanced</button>
        </div>
        <div style={{ display: 'none', justifyContent: 'space-between' }}>
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
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px'}} className="m-8">
          <button style={{ padding: '10px', backgroundColor: '#555', border: '1px solid #ccc', borderRadius: '5px' }} onClick={() => nextFact()}>Next Fact</button>
        </div>
      </div>
      <div className="m-5">
        <div className="text-center tracking-wide font-mono text-5xl lg:text-5xl font-black">{formatted(value1, false)}</div>
        <div className="text-center tracking-wide font-mono text-5xl lg:text-5xl font-black text-black-600/100">+</div>
        <div className="text-center tracking-wide font-mono text-5xl lg:text-5xl font-black">{formatted(value2, false)}</div>
        <div className="text-center tracking-wide font-mono text-5xl lg:text-5xl font-black text-black-600/100">=</div>
        <div className="text-center tracking-wide font-mono text-5xl lg:text-5xl font-black">{formatted(correctAnswer, false)}</div>
      </div>
      <div>
        {options.map((option, index) => (
          <button 
            key={index}
            onClick={() => checkAnswer(option)} 
            style={{ 
              padding: '10px', 
              backgroundColor: selectedOption === option ? (option === correctAnswer ? '#373' : '#733') : '#555', 
              border: '1px solid #ccc', 
              borderRadius: '50px', 
              width: '50px', 
              margin: '10px' 
          }}
          >
            {option}
          </button>
        ))}
      </div>
    </>
    );
}