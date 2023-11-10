'use client'

import React, { useEffect, useState } from "react";
import { PrettyChar } from '../../prettyChar'
import { NumberFormatter } from '../../numberFormatter'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const numbers = PrettyChar.allCharacters();

// Math facts roughly based on outcomes from: https://www.edu.gov.mb.ca/k12/cur/math/framework_k-8/index.html
const gradeMathFacts = {
  "pre-k": [{operation: "add", maxNumber: 5}],
  "kindergarten": [{operation: "add", maxNumber: 5}, {operation: "subtract", maxNumber: 5}],
  "first-grade": [{operation: "add", maxNumber: 50}, {operation: "subtract", maxNumber: 50}],
  "second-grade": [{operation: "add", maxNumber: 50}, {operation: "subtract", maxNumber: 50, allowNegative: true}],
  "third-grade": [{operation: "add", maxNumber: 500}, {operation: "subtract", maxNumber: 500, allowNegative: true}, {operation: "multiply", maxNumber: 5}],
  "advanced": [{operation: "add", maxNumber: 1000}, {operation: "subtract", maxNumber: 500}, {operation: "multiply", maxNumber: 10}]
};

function formatted(number: number, bw: boolean): React.ReactElement[] {
  const digitsArray = NumberFormatter.formatNumberWithBreaks(number.toString()).split("");
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
    const [grade, setGrade] = useState("pre-k");
    const facts = gradeMathFacts[grade as keyof typeof gradeMathFacts] || [];

    const [value1, setValue1] = useState(0);
    const [value2, setValue2] = useState(0);
    const [correctAnswer, setAnswer] = useState(value1 + value2);
    const [options, setOptions] = useState<number[]>([]);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [displayNextFactButton, setDisplayNextFactButton] = useState(false);
    const [symbol, setSymbol] = useState("+");

    useEffect(() => {
      nextFact();
    }, []);

    const nextFact = () => {
      const operations = gradeMathFacts[grade as keyof typeof gradeMathFacts];
      const operation = operations[Math.floor(Math.random() * operations.length)];
      let innerValue1 = Math.floor(Math.random() * (operation.maxNumber));
      let innerValue2 = Math.floor(Math.random() * (operation.maxNumber));

      let innerAnswer = 0;
      switch(operation.operation) {
        case "add":
          setSymbol("+");
          innerAnswer = innerValue1 + innerValue2;
          break;
        case "subtract":
          setSymbol("-");
          if(innerValue1 < innerValue2 && !('allowNegative' in operation && operation.allowNegative)) {
            const innerValue1Snapshot = innerValue1;
            innerValue1 = innerValue2;
            innerValue2 = innerValue1Snapshot;
          }
          innerAnswer = innerValue1 - innerValue2;
          break;
        case "multiply":
          setSymbol("x");
          if(innerValue1 < innerValue2) {
            const innerValue1Snapshot = innerValue1;
            innerValue1 = innerValue2;
            innerValue2 = innerValue1Snapshot;
          }
          innerAnswer = innerValue1 * innerValue2;
          break;
        case "divide": 
          setSymbol("÷");
          // TODO: Divide needs a better understanding of desired math outcomes. I don't want to do decimals or remainders until this is better understood.
          break;
      }

      setValue1(innerValue1);
      setValue2(innerValue2);
      setAnswer(innerAnswer);
      setDisplayNextFactButton(false);
      setSelectedOption(null);
      
      let incorrectAnswers = new Set<number>();
      while (incorrectAnswers.size < 3) {
        const newNumber = Math.floor(Math.random() * (operation.maxNumber));
        if(incorrectAnswers.has(newNumber) || newNumber === innerAnswer) {
          continue; // don't add current answer or duplicates
        }
        incorrectAnswers.add(newNumber);
      }
      const newOptions = Array.from(incorrectAnswers);
      newOptions.splice(Math.floor(Math.random() * 4), 0, innerAnswer);
      setOptions(newOptions);
    };

    const activateGrade = (newGrade:string) => {
      setGrade(newGrade);
      nextFact();
    };

    const checkAnswer = (selectedAnswer: number) => {
      setSelectedOption(selectedAnswer);
      if (selectedAnswer === correctAnswer) {
        // Correct answer
        toast.success('Correct!');
        setDisplayNextFactButton(true);
        setOptions(options.filter(option => option === selectedAnswer));
      } else {
        // Incorrect answer
        toast.info('Oops, try again!');
        let newOptions = options.filter(option => option !== selectedAnswer);
        setOptions(newOptions);
        if (newOptions.length === 1) {
          setSelectedOption(newOptions[0]);
          if (newOptions[0] === correctAnswer) {
            toast.success('Correct!');
            setDisplayNextFactButton(true);
          }
        }
      }
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
      </div>
      <div className="m-5">
        <div className="text-center tracking-wide font-mono text-5xl lg:text-5xl font-black">{formatted(value1, false)}</div>
        <div className="text-center tracking-wide font-mono text-5xl lg:text-5xl font-black text-black-600/100">{symbol}</div>
        <div className="text-center tracking-wide font-mono text-5xl lg:text-5xl font-black">{formatted(value2, false)}</div>
        <div className="text-center tracking-wide font-mono text-5xl lg:text-5xl font-black text-black-600/100">=</div>
        <div className="text-center tracking-wide font-mono text-5xl lg:text-5xl font-black">?</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px'}} className="m-8">
        {options.map((option, index) => (
          <button 
            key={index}
            onClick={() => checkAnswer(option)} 
            className="text-center tracking-wide font-mono text-5xl lg:text-5xl font-black"
            style={{ 
              padding: '10px', 
              backgroundColor: selectedOption === option ? (option === correctAnswer ? '#373' : '#733') : '#222', 
              border: '1px solid #ccc', 
              borderRadius: '50px', 
              minWidth: '100px', 
              margin: '10px',
              textShadow: '2px 2px 4px #000000'
          }}
          >
            {formatted(option, false)}
          </button>
        ))}
      </div>
      <div style={{ display: displayNextFactButton ? 'flex' : 'none', justifyContent: 'center', gap: '20px'}} className="m-8">
          <button 
            style={{ 
              padding: '10px', 
              backgroundColor: '#225', 
              border: '1px solid #ccc', 
              borderRadius: '50px', 
              paddingInline: '40px',
              margin: '10px' 
          }}
            className="text-center tracking-wide font-mono text-5xl lg:text-5xl font-black"
            onClick={() => nextFact()}>
            Next Fact</button>
        </div>
      <ToastContainer hideProgressBar={true} />
    </>
    );
}