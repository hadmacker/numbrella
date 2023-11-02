import React from 'react';

export default function Home() {
  return (
      <main className="md:flex">
        <div key="n1">
          <span className="mx-3 md:mx-2 md:p-1 text-2xl md:text-3xl font-black text-gray-500">Numbers</span>
          <ul key="n1.1" className='block'>
            <li key="n1.1.2.1" className='mx-3 my-3 md:mx-:3 md:my-6'><a href="numbers/fib"><span className="mx-2 p-4 text-2xl md:text-3xl font-black">Fibonacci</span></a></li>
            <li key="n1.1.2.2" className='mx-3 my-3 md:mx-:3 md:my-6'><a href="numbers/fib-all?first=75"><span className="mx-2 p-4 text-2xl md:text-3xl font-black">Fibonacci List</span></a></li>
            <li key="n1.1.2.3" className='mx-3 my-3 md:mx-:3 md:my-6'><a href="numbers/pi"><span className="mx-2 p-4 text-2xl md:text-3xl font-black">Pi to 100 decimals</span></a></li>
            <li key="n1.1.2.4" className='mx-3 my-3 md:mx-:3 md:my-6'><a href="numbers/powersoftwo"><span className="mx-2 p-4 text-2xl md:text-3xl font-black">Powers of Two</span></a></li>
            <li key="n1.1.2.5" className='mx-3 my-3 md:mx-:3 md:my-6'><a href="numbers/cubes"><span className="mx-2 p-4 text-2xl md:text-3xl font-black">Cube numbers</span></a></li>
            <li key="n1.1.2.6" className='mx-3 my-3 md:mx-:3 md:my-6'><a href="numbers/googol"><span className="mx-2 p-4 text-2xl md:text-3xl font-black">Googol</span></a></li>
            <li key="n1.1.2.7" className='mx-3 my-3 md:mx-:3 md:my-6'><a href="numbers/shortscale"><span className="mx-2 p-4 text-2xl md:text-3xl font-black">Names of Large Numbers</span></a></li>
            <li key="n1.1.2.8" className='mx-3 my-3 md:mx-:3 md:my-6'><a href="numbers/even-odd"><span className="mx-2 p-4 text-2xl md:text-3xl font-black">Evens and Odds</span></a></li>
            <li key="n1.1.2.9" className='mx-3 my-3 md:mx-:3 md:my-6'><a href="numbers/count-by"><span className="mx-2 p-4 text-2xl md:text-3xl font-black">Count By</span></a></li>
            <li key="n1.1.2.9" className='mx-3 my-3 md:mx-:3 md:my-6'><a href="numbers/slider"><span className="mx-2 p-4 text-2xl md:text-3xl font-black">Number Sliders</span></a></li>
          </ul>
        </div>
        <div key="w1">
          <span className="mx-3 md:mx-2 md:p-1 text-2xl md:text-3xl font-black text-gray-500">Words</span>
          <ul key="w1.1" className='block'>
            <li key="w1.1.2.1" className='mx-3 my-3 md:mx-:3 md:my-6'><a href="words/months"><span className="mx-2 p-4 text-2xl md:text-3xl font-black">Months of the Year</span></a></li>
            <li key="w1.1.2.2" className='mx-3 my-3 md:mx-:3 md:my-6'><a href="words/days"><span className="mx-2 p-4 text-2xl md:text-3xl font-black">Days of the Week</span></a></li>
          </ul>
        </div>
      </main>
  );
}
