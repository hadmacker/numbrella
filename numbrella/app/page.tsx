import React from 'react';

export default function Home() {
  return (
      <main className="flex">
        <div className='my-8'>
          <div className='mx 3 my-3'><a href="numbers/fib"><span className="mx-5 p-4 text-3xl font-black">Fibonacci</span></a></div>
          <div className='mx 3 my-3'><a href="numbers/fib-all?first=75"><span className="mx-5 p-4 text-3xl font-black">Fibonacci List</span></a></div>
          <div className='mx 3 my-3'><a href="numbers/pi"><span className="mx-5 p-4 text-3xl font-black">Pi to 100 decimals</span></a></div>
          <div className='mx 3 my-3'><a href="numbers/powersoftwo"><span className="mx-5 p-4 text-3xl font-black">Powers of Two</span></a></div>
          <div className='mx 3 my-3'><a href="numbers/cubes"><span className="mx-5 p-4 text-3xl font-black">Cube numbers</span></a></div>
          <div className='mx 3 my-3'><a href="numbers/googol"><span className="mx-5 p-4 text-3xl font-black">Googol</span></a></div>
        </div>
      </main>
  );
}
