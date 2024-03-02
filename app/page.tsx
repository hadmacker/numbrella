import React from 'react';

export default function Home() {
  return (
      <main>
        <div  className="md:flex">
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
            <li key="n1.1.2.10" className='mx-3 my-3 md:mx-:3 md:my-6'><a href="numbers/slider"><span className="mx-2 p-4 text-2xl md:text-3xl font-black">Number Sliders</span></a></li>
            <li key="n1.1.2.11" className='mx-3 my-3 md:mx-:3 md:my-6'><a href="numbers/facts"><span className="mx-2 p-4 text-2xl md:text-3xl font-black">Math Facts</span></a></li>
            <li key="n1.1.2.12" className='mx-3 my-3 md:mx-:3 md:my-6'><a href="numbers/primes"><span className="mx-2 p-4 text-2xl md:text-3xl font-black">Prime or Composite</span></a></li>
            <li key="n1.1.2.13" className='mx-3 my-3 md:mx-:3 md:my-6'><a href="numbers/roman"><span className="mx-2 p-4 text-2xl md:text-3xl font-black">Roman Numerals</span></a></li>
            <li key="n1.1.2.14" className='mx-3 my-3 md:mx-:3 md:my-6'><a href="numbers/bin2dec"><span className="mx-2 p-4 text-2xl md:text-3xl font-black">Binary Numbers</span></a></li>
          </ul>
        </div>
        <div key="w1">
          <span className="mx-3 md:mx-2 md:p-1 text-2xl md:text-3xl font-black text-gray-500">Words</span>
          <ul key="w1.1" className='block'>
            <li key="w1.1.2.1" className='mx-3 my-3 md:mx-:3 md:my-6'><a href="words/months"><span className="mx-2 p-4 text-2xl md:text-3xl font-black">Months of the Year</span></a></li>
            <li key="w1.1.2.2" className='mx-3 my-3 md:mx-:3 md:my-6'><a href="words/days"><span className="mx-2 p-4 text-2xl md:text-3xl font-black">Days of the Week</span></a></li>
            <li key="w1.1.2.3" className='mx-3 my-3 md:mx-:3 md:my-6'><a href="words/sight"><span className="mx-2 p-4 text-2xl md:text-3xl font-black">Sight Words</span></a></li>
            <li key="w1.1.2.4" className='mx-3 my-3 md:mx-:3 md:my-6'><a href="words/opposites"><span className="mx-2 p-4 text-2xl md:text-3xl font-black">Opposites</span></a></li>
          </ul>
        </div>
        <div key="a1">
          <span className="mx-3 md:mx-2 md:p-1 text-2xl md:text-3xl font-black text-gray-500">Activities</span>
          <ul key="a1.1" className='block'>
            <li key="a1.1.2.1" className='mx-3 my-3 md:mx-:3 md:my-6'><a href="activities/shapes"><span className="mx-2 p-4 text-2xl md:text-3xl font-black">Polygons</span></a></li>
            <li key="a1.1.2.2" className='mx-3 my-3 md:mx-:3 md:my-6'><a href="activities/maze"><span className="mx-2 p-4 text-2xl md:text-3xl font-black">Maze Maker</span></a></li>
            <li key="a1.1.2.3" className='mx-3 my-3 md:mx-:3 md:my-6'><a href="activities/draw"><span className="mx-2 p-4 text-2xl md:text-3xl font-black">Draw</span></a></li>
            <li key="a1.1.2.4" className='mx-3 my-3 md:mx-:3 md:my-6'><span className="mx-2 p-4 text-2xl md:text-3xl font-black">Number Rain</span>
              <ul>
                <li key="a1.1.2.4.1" className='mx-6 my-2 md:mx-:6 md:my-2 text-1xl md:text-2xl font-black text-gray-400'><a href="activities/runner"><span className="mx-2 p-4 text-2xl md:text-3xl font-black">Game</span></a></li>
                <li key="a1.1.2.4.2" className='mx-6 my-2 md:mx-:6 md:my-2 text-1xl md:text-2xl font-black text-gray-400'><a href="activities/runner?calm=1"><span className="mx-2 p-4 text-2xl md:text-3xl font-black">Relaxed</span></a></li>
              </ul>
            </li>
            <li key="a1.1.2.5" className='mx-3 my-3 md:mx-:3 md:my-6'><a href="activities/tictactoe"><span className="mx-2 p-4 text-2xl md:text-3xl font-black">Tic Tac Toe</span></a></li>
            <li key="a1.1.2.6" className='mx-3 my-3 md:mx-:3 md:my-6'><a href="activities/reversi"><span className="mx-2 p-4 text-2xl md:text-3xl font-black">Reversi</span></a></li>
            <li key="a1.1.2.7" className='mx-3 my-3 md:mx-:3 md:my-6'><span className="mx-2 p-4 text-2xl md:text-3xl font-black">Memory</span>
              <ul>
                <li key="a1.1.2.7.1" className='mx-6 my-2 md:mx-:6 md:my-2 text-1xl md:text-2xl font-black text-gray-400'><a href="activities/memory"><span className="mx-2 p-4 text-2xl md:text-3xl font-black">Easy</span></a></li>
                <li key="a1.1.2.7.2" className='mx-6 my-2 md:mx-:6 md:my-2 text-1xl md:text-2xl font-black text-gray-400'><a href="activities/memory?level=medium"><span className="mx-2 p-4 text-2xl md:text-3xl font-black">Medium</span></a></li>
                <li key="a1.1.2.7.3" className='mx-6 my-2 md:mx-:6 md:my-2 text-1xl md:text-2xl font-black text-gray-400'><a href="activities/memory?level=hard"><span className="mx-2 p-4 text-2xl md:text-3xl font-black">Hard</span></a></li>
              </ul>
            </li>
            <li key="a1.1.2.8" className='mx-3 my-3 md:mx-:3 md:my-6'><a href="activities/blocksnake"><span className="mx-2 p-4 text-2xl md:text-3xl font-black">Falling Blocks</span></a></li>
          </ul>
        </div>
        </div>
        <div style={{marginLeft: '50px'}}
        className="place-items-center gap-1 pl-2 lg:pointer-events-auto font-mono text-xs font-bold text-gray-500"
        >
          <p>&copy; numbrillig.ca</p>
          <p>Site is provided without warranty, supervision, or support. Use of this site constitutes acceptance of this disclaimer. Speak to a parent before going online.</p>
          <p>Name inspired by Lewis Padgett&apos;s 1943 sci-fi short story, &quot;Mimsy Were The Borogroves&quot;.</p>
        </div>
      </main>
  );
}
