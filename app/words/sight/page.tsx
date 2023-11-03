'use client'

import React, { useEffect, useState } from "react";
import { PrettyChar } from '../../prettyChar'

const dolchSightWords = {
  "pre-k": ["a", "and", "away", "big", "blue", "can", "come", "down", "find", "for", "funny", "go", "help", "here", "I", "in", "is", "it", "jump", "little", "look", "make", "me", "my", "not", "one", "play", "red", "run", "said", "see", "the", "three", "to", "two", "up", "we", "where", "yellow", "you"],
  "kindergarten": ["all", "am", "are", "at", "ate", "be", "black", "brown", "but", "came", "did", "do", "eat", "four", "get", "good", "have", "he", "into", "like", "must", "new", "no", "now", "on", "our", "out", "please", "pretty", "ran", "ride", "saw", "say", "she", "so", "soon", "that", "there", "they", "this", "too", "under", "want", "was", "well", "went", "what", "white", "who", "will", "with", "yes"],
  "first-grade": ["after", "again", "an", "any", "as", "ask", "by", "could", "every", "fly", "from", "give", "going", "had", "has", "her", "him", "his", "how", "just", "know", "let", "live", "may", "of", "old", "once", "open", "over", "put", "round", "some", "stop", "take", "thank", "them", "then", "think", "walk", "were", "when"],
  "second-grade": ["always", "around", "because", "been", "before", "best", "both", "buy", "call", "cold", "does", "don’t", "fast", "first", "five", "found", "gave", "goes", "green", "its", "made", "many", "off", "or", "pull", "read", "right", "sing", "sit", "sleep", "tell", "their", "these", "those", "upon", "us", "use", "very", "wash", "which", "why", "wish", "work", "would", "write", "your"],
  "third-grade": ["about", "better", "bring", "carry", "clean", "cut", "done", "draw", "drink", "eight", "fall", "far", "full", "got", "grow", "hold", "hot", "hurt", "if", "keep", "kind", "laugh", "light", "long", "much", "myself", "never", "only", "own", "pick", "seven", "shall", "show", "six", "small", "start", "ten", "today", "together", "try", "warm"],
  "nouns": ["apple", "baby", "back", "ball", "bear", "bed", "bell", "bird", "birthday", "boat", "box", "boy", "bread", "brother", "cake", "car", "cat", "chair", "chicken", "children", "Christmas", "coat", "corn", "cow", "day", "dog", "doll", "door", "duck", "egg", "eye", "farm", "farmer", "father", "feet", "fire", "fish", "floor", "flower", "game", "garden", "girl", "goodbye", "grass", "ground", "hand", "head", "hill", "home", "horse", "house", "kitty", "leg", "letter", "man", "men", "milk", "money", "morning", "mother", "name", "nest", "night", "paper", "party", "picture", "pig", "rabbit", "rain", "ring", "robin", "Santa Claus", "school", "seed", "sheep", "shoe", "sister", "snow", "song", "squirrel", "stick", "street", "sun", "table", "thing", "time", "top", "toy", "tree", "watch", "water", "way", "wind", "window", "wood"]
};

export default function Page() {
  const [grade, setGrade] = useState("pre-k");

  const words = dolchSightWords[grade as keyof typeof dolchSightWords] || [];

  const handleGradeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGrade(event.target.value);
  };

  const classes = ["text-gray-300 m-0",  "text-gray-400",  "text-pink-500",  "text-amber-500",  "text-lime-500",  "text-emerald-500",  "text-blue-400",  "text-indigo-600",  "text-fuchsia-500",  "text-rose-500",  "text-cyan-400"];

  return (
    <div>
      <div style={{ border: '1px solid black', backgroundColor: '#222222', padding: '10px', margin: '10px' }}>
        <h2 className="text-center tracking-wide font-mono text-3xl lg:text-3xl font-black">Dolch Sight Words</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <button style={{ padding: '10px', backgroundColor: grade === "pre-k" ? '#555' : '#333', border: '1px solid #ccc', borderRadius: '5px' }} onClick={() => setGrade("pre-k")}>Pre-K</button>
          <button style={{ padding: '10px', backgroundColor: grade === "kindergarten" ? '#555' : '#333', border: '1px solid #ccc', borderRadius: '5px' }} onClick={() => setGrade("kindergarten")}>Kindergarten</button>
          <button style={{ padding: '10px', backgroundColor: grade === "first-grade" ? '#555' : '#333', border: '1px solid #ccc', borderRadius: '5px' }} onClick={() => setGrade("first-grade")}>First Grade</button>
          <button style={{ padding: '10px', backgroundColor: grade === "second-grade" ? '#555' : '#333', border: '1px solid #ccc', borderRadius: '5px' }} onClick={() => setGrade("second-grade")}>Second Grade</button>
          <button style={{ padding: '10px', backgroundColor: grade === "third-grade" ? '#555' : '#333', border: '1px solid #ccc', borderRadius: '5px' }} onClick={() => setGrade("third-grade")}>Third Grade</button>
          <button style={{ padding: '10px', backgroundColor: grade === "nouns" ? '#555' : '#333', border: '1px solid #ccc', borderRadius: '5px' }} onClick={() => setGrade("nouns")}>Nouns</button>
        </div>
      </div>
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', margin: '10px' }}
          className="text-center tracking-wide font-mono text-2xl lg:text-2xl font-black"
        >
        {words.map((word, index) => (
          <p key={index} className={classes[index % classes.length]}>{word}</p>
        ))}
      </div>
    </div>
  );
}