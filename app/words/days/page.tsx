'use client'

import React, { useEffect, useState } from "react";
import { PrettyChar } from '../../prettyChar'

const pretty = PrettyChar.allCharacters();

const words: string[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Page = () => {
  const [nextWord, setNextWord] = useState("");
  const [excludedIndex, setExcludedIndex] = useState(-1);
  const [prettyClass, setPrettyClass] = useState("");
  const [mode, setMode] = useState("random");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const newIndex = Math.floor(Math.random() * words.length);
    setNextWord(words[newIndex]);
    setCurrentIndex(newIndex);
    setPrettyClass(pretty.filter(f => f.id === words[newIndex])[0].prettyStyle!);
  }, []);

  const handleButtonClick = () => {
    if (mode === "random") {
      let randomIndex = -1;
      do {
        randomIndex = Math.floor(Math.random() * words.length);
      } while (randomIndex === excludedIndex);
      setNextWord(words[randomIndex]);
      setExcludedIndex(randomIndex);
      setPrettyClass(pretty.filter(f => f.id === words[randomIndex])[0].prettyStyle!);
    } 
    if (mode === "sequential") {
      const newIndex = (currentIndex + 1) % words.length;
      setNextWord(words[newIndex]);
      setCurrentIndex(newIndex);
      setPrettyClass(pretty.filter(f => f.id === words[newIndex])[0].prettyStyle!);
    }
  };

  const toggleMode = (mode: string) => {
    setMode(mode);
    if (mode === "random") {
      const newIndex = Math.floor(Math.random() * words.length);
      setNextWord(words[newIndex]);
      setCurrentIndex(newIndex);
      setPrettyClass(pretty.filter(f => f.id === words[newIndex])[0].prettyStyle!);
    }
    if (mode === "sequential") {
      setExcludedIndex(-1);
      const newIndex = 0;
      setNextWord(words[newIndex]);
      setCurrentIndex(newIndex);
      setPrettyClass(pretty.filter(f => f.id === words[newIndex])[0].prettyStyle!);
    }
  };

  return (
    <>
      <div className="toggle-buttons" style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <button style={{ padding: '10px', backgroundColor: mode === "random" ? '#555' : '#333', border: '1px solid #ccc', borderRadius: '5px' }} onClick={() => toggleMode('random')}>Shuffle</button>
        <button style={{ padding: '10px', backgroundColor: mode === "sequential" ? '#555' : '#333', border: '1px solid #ccc', borderRadius: '5px' }} onClick={() => toggleMode('sequential')}>In Order</button>
      </div>
      <h1 className="p-5 text-center tracking-wide font-mono text-5xl md:text-8xl font-black">
        <button 
          className={prettyClass}
          onClick={handleButtonClick}>
            {nextWord}
        </button>
      </h1>
    </>
  );
};

export default Page;