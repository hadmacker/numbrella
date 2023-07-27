import React from 'react';

export default function Home() {
  return (
      <main className="flex">
        <div key="n1"><span className="mx-5 p-1 text-3xl font-black text-gray-500">Numbers</span></div>
        <div key="n1.1" className='px-1'>
          <div key="n1.1.2" className='my-8'>
            <div key="n1.1.2.1" className='mx 3 my-3'><a href="numbers/fib"><span className="mx-5 p-4 text-3xl font-black">Fibonacci</span></a></div>
            <div key="n1.1.2.2" className='mx 3 my-3'><a href="numbers/fib-all?first=75"><span className="mx-5 p-4 text-3xl font-black">Fibonacci List</span></a></div>
            <div key="n1.1.2.3" className='mx 3 my-3'><a href="numbers/pi"><span className="mx-5 p-4 text-3xl font-black">Pi to 100 decimals</span></a></div>
            <div key="n1.1.2.4" className='mx 3 my-3'><a href="numbers/powersoftwo"><span className="mx-5 p-4 text-3xl font-black">Powers of Two</span></a></div>
            <div key="n1.1.2.5" className='mx 3 my-3'><a href="numbers/cubes"><span className="mx-5 p-4 text-3xl font-black">Cube numbers</span></a></div>
            <div key="n1.1.2.6" className='mx 3 my-3'><a href="numbers/googol"><span className="mx-5 p-4 text-3xl font-black">Googol</span></a></div>
            <div key="n1.1.2.7" className='mx 3 my-3'><a href="numbers/shortscale"><span className="mx-5 p-4 text-3xl font-black">Names of Large Numbers</span></a></div>
          </div>
        </div>
        <div key="w1"><span className="mx-5 p-1 text-3xl font-black text-gray-500">Words</span></div>
        <div key="w1.1" className='px-1'>
          <div key="w1.1.2" className='my-8'>
            <div key="w1.1.2.1" className='mx 3 my-3'><a href="words/months"><span className="mx-5 p-4 text-3xl font-black">Months of the Year</span></a></div>
            <div key="w1.1.2.2" className='mx 3 my-3'><a href="words/days"><span className="mx-5 p-4 text-3xl font-black">Days of the Week</span></a></div>
          </div>
        </div>
      </main>
  );
}
