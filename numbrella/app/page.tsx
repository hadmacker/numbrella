import React from 'react';

export default function Home() {
  return (
      <main className="flex">
        <div>
          <div className='my-3'><a href="numbers/fib"><span className="mx-5 p-4 text-3xl font-black">Fibonacci</span></a></div>
          <div className='my-3'><a href="numbers/fib-all?first=25"><span className="mx-5 p-4 text-3xl font-black">Fibonacci List</span></a></div>
          <div className='my-3'><a href="numbers/pi"><span className="mx-5 p-4 text-3xl font-black">Pi to 100 decimals</span></a></div>
          <div className='my-3'><a href="numbers/powersoftwo"><span className="mx-5 p-4 text-3xl font-black">Powers of 2</span></a></div>
          <div className='my-3'><a href="numbers/cubes"><span className="mx-5 p-4 text-3xl font-black">Cube numbers</span></a></div>
        </div>
      </main>
  );
}
