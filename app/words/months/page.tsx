'use client'

import React, { useEffect, useState } from "react";
import { PrettyChar } from '../../prettyChar'

const pretty = PrettyChar.allCharacters();

const words: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Page() {
  const [excludedIndex, setExcludedIndex] = useState<number>(-1);
  const [generated, setGenerated] = useState(false);
  const [nextWord, setNextWord] = useState<string>("");
  const [prettyClass, setPrettyClass] = useState<string>("hidden");

  useEffect( () => {
    if(!generated) {
      let randomIndex = -1;
      do {
        randomIndex = Math.floor(Math.random() * words.length);
      } while(randomIndex == excludedIndex)
      setNextWord(words[randomIndex]);
      setExcludedIndex(randomIndex);
      setPrettyClass(pretty.filter(f=> f.id == words[randomIndex])[0].prettyStyle!);
      setGenerated(true);
    }
  }, [nextWord, excludedIndex, generated]);

  const bw = false;

  return (
    <>
     <h1 className="p-5 text-center tracking-wide font-mono text-5xl md:text-8xl font-black">
        <button 
          className={prettyClass}
          onClick={() => {
            let randomIndex = -1;
            do {
              randomIndex = Math.floor(Math.random() * words.length);
            } while(randomIndex == excludedIndex)
            setNextWord(words[randomIndex]);
            setExcludedIndex(randomIndex);
            setPrettyClass(pretty.filter(f=> f.id == words[randomIndex])[0].prettyStyle!);
          }}>
            {nextWord}
        </button>
      </h1>
    </>
    )
}