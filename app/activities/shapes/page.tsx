'use client'

import React, { useState } from "react";
import { PrettyChar } from "@/app/prettyChar";
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


let pretty: Array<PrettyChar> = [];
pretty.push(new PrettyChar("1", "text-pink-500"));
pretty.push(new PrettyChar("2", "text-amber-500"));
pretty.push(new PrettyChar("3", "text-lime-500"));
pretty.push(new PrettyChar("4", "text-emerald-500"));
pretty.push(new PrettyChar("5", "text-blue-400"));
pretty.push(new PrettyChar("6", "text-indigo-600"));
pretty.push(new PrettyChar("7", "text-fuchsia-500"));
pretty.push(new PrettyChar("8", "text-rose-500"));
pretty.push(new PrettyChar("9", "text-cyan-400"));

export default function Page() {
  const [sides, setSides] = useState(3);
  const [polyClass, setPolyClass] = useState("text-pink-500");
  const [startAngle, setStartAngle] = useState(0);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSides(parseInt(event.target.value, 10));
  };

  const handleAngleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartAngle(parseInt(event.target.value, 10));
  };

  const getPolygonName = (sides: number): string => {
    const polygonNames = [
      'Triangle', 'Square', 'Pentagon', 'Hexagon', 'Heptagon', 'Octagon', 'Nonagon', 'Decagon',
      'Undecagon', 'Dodecagon', 'Tridecagon', 'Tetradecagon', 'Pentadecagon', 'Hexadecagon',
      'Heptadecagon', 'Octadecagon', 'Enneadecagon', 'Icosagon'
    ];
    return polygonNames[sides - 3] || '';
  };

  const calculatePoint = (index: number): [number, number] => {
    const angle = ((2 * Math.PI * index) / sides) + (startAngle * Math.PI / 180);
    const x = 100 + 80 * Math.cos(angle);
    const y = 100 + 80 * Math.sin(angle);
    return [x, y];
  };

  return (
    <div>
      <h2 className="text-center tracking-wide font-mono text-2xl lg:text-3xl font-black">Polygons from {formatted(3, false)} to {formatted(20, false)}</h2>
      <br />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="text-center tracking-wide font-mono text-2xl lg:text-1xl font-black">
          {getPolygonName(sides)}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <svg height="200" width="200">
          {Array.from({ length: sides }).map((_, index) => {
            const [x1, y1] = calculatePoint(index);
            const [x2, y2] = calculatePoint((index + 1) % sides);
            return (
              <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} style={{ stroke: 'lime', strokeWidth: 8 }} />
            );
          })}
        </svg>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="m-2 p-2" style={{ display: 'flex', alignItems: 'center' }}>
        <label 
        style={{width: '300px'}}
        className="text-center tracking-wide font-mono text-2xl lg:text-3xl font-black">
          Sides: {formatted(sides, false)}
        </label>
        <input 
          type="range" min={3} max={20} value={sides} onChange={handleSliderChange} />
      </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="m-2 p-2" style={{ display: 'flex', alignItems: 'center' }}>
          <label 
          style={{width: '300px'}}
          className="text-center tracking-wide font-mono text-2xl lg:text-3xl font-black">
            Start Angle: {formatted(startAngle, false)}&deg;
          </label>
          <input 
            type="range" min={0} max={360} value={startAngle} onChange={handleAngleChange} />
        </div>

      </div>
    </div>
  );
};