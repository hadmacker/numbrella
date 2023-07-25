import React from "react";

class PrettyNumber {
  id?: number;
  prettyStyle?: string;

  constructor(id: number, prettyStyle: string) {
    this.id = id;
    this.prettyStyle = prettyStyle;
  }
}

let numbers: Array<PrettyNumber> = [];
numbers.push(new PrettyNumber(0,"text-gray-500"));
numbers.push(new PrettyNumber(1,"text-pink-500"));
numbers.push(new PrettyNumber(2,"text-amber-500"));
numbers.push(new PrettyNumber(3,"text-lime-500"));
numbers.push(new PrettyNumber(4,"text-emerald-500"));
numbers.push(new PrettyNumber(5,"text-blue-400"));
numbers.push(new PrettyNumber(6,"text-indigo-600"));
numbers.push(new PrettyNumber(7,"text-fuchsia-500"));
numbers.push(new PrettyNumber(8,"text-rose-500"));
numbers.push(new PrettyNumber(9,"text-cyan-400"));

export default function Page() {
  let a = 0;
  let b = 1;
  let n = 50;
  const divElements: React.ReactElement[] = [];
  const piValue = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";
  console.log(piValue);

  const digitsArray = piValue.split("");
  const commonClasses = "m-3";

  digitsArray.forEach((digit, index) => {
    if (digit === ".") {
      const combinedClasses = `${commonClasses} decimal`;
      divElements.push(<span key={index} className={combinedClasses}>.</span>);
    } else {
      const prettyStyle = numbers.filter(n=> n.id?.toString() == digit)[0].prettyStyle;
      const combinedClasses = `${commonClasses} ${prettyStyle}`;
      divElements.push(<span key={index} className={combinedClasses}>{digit}</span>);
    }
  });

  return (
  <>
    <h1 className="text-4xl font-black tracking-wide font-mono">First 100 digits of Pi</h1>
    <div className="text-left m-8 tracking-wide font-mono text-5xl font-black columns-1 text-left break-all">
      {divElements}
    </div>
    <h3 className="text-l tracking-wide font-mono">
      While an unrelated bit of trivia, "<a href="https://en.wikipedia.org/wiki/Pi_Day" target="_blank">Pi Day</a>" is celebrated on March 14 (3.14) annually.
      <br></br>
      Notably, <a href="https://en.wikipedia.org/wiki/Albert_Einstein" target="_blank">Albert Einstein</a> was born March 14, 1879.
    </h3>
  </>
  )
}
