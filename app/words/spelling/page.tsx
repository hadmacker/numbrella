'use client'

import React, { useEffect, useState } from "react";
import { PrettyChar } from '../../prettyChar'
import { useRouter } from "next/router";

const pretty = PrettyChar.allCharacters();


const Page = () => {
  return (
    <>
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="p-5 text-center tracking-wide font-mono text-4xl md:text-5xl font-black text-white">
        Spelling Explorer
      </h1>
      <h2 className="p-5 text-center tracking-wide font-mono text-3xl md:text-4xl font-black text-white">
        Select Spelling Words
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <a href="/words/spelling/letsspell?level=Level 1" className="flex items-center justify-center p-4 bg-gray-200 rounded shadow text-black">Level 1</a>
        <a href="/words/spelling/letsspell?level=Level 2" className="flex items-center justify-center p-4 bg-gray-200 rounded shadow text-black">Level 2</a>
        <a href="/words/spelling/letsspell?level=Level 3" className="flex items-center justify-center p-4 bg-gray-200 rounded shadow text-black">Level 3</a>
        <a href="/words/spelling/letsspell?level=Level 4" className="flex items-center justify-center p-4 bg-gray-200 rounded shadow text-black">Level 4</a>
        <a href="/words/spelling/letsspell?level=Level 5" className="flex items-center justify-center p-4 bg-gray-200 rounded shadow text-black">Level 5</a>
        <a href="/words/spelling/letsspell?level=Level 6" className="flex items-center justify-center p-4 bg-gray-200 rounded shadow text-black">Level 6</a>
        <a href="/words/spelling/letsspell?level=Your Words 1" className="flex items-center justify-center p-4 bg-gray-200 rounded shadow text-black">Your Words 1</a>
        <a href="/words/spelling/letsspell?level=Your Words 2" className="flex items-center justify-center p-4 bg-gray-200 rounded shadow text-black">Your Words 2</a>
      </div>
    </div>
    </>
  );
};

export default Page;