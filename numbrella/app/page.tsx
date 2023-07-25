import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <a
            className="font-mono text-2xl font-bold"
            href="numbers/fib-all"
          >
            Fibonacci
        </a>
         <span className="m-2">*</span>
        <a
            className="font-mono text-2xl font-bold"
            href="numbers/fib"
          >
            fib seq
        </a>
      </div>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <a
            className="flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0 font-mono text-2xl font-bold"
            href="numbers/pi"
          >
            Pi
        </a>
        </div>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <a
            className="flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0 font-mono text-2xl font-bold"
            href="numbers/2"
          >
            Powers of 2
        </a>
        </div>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <a
            className="flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0 font-mono text-2xl font-bold"
            href="numbers/binary"
          >
            Binary
        </a>
        </div>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <a
            className="flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0 font-mono text-2xl font-bold"
            href="numbers/cube"
          >
            Cube Numbers
        </a>
      </div>
    </main>
  )
}
