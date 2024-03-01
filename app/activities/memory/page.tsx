'use client'

import React, { useEffect, useState } from "react";
import Card from "./Card";
import './styles.css';

const emojis = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵", "🐔", "🐧", "🐦", "🐤", "🐣", "🐺", "🐗", "🐴", "🦄", "🐝", "🐛", "🦋", "🐌", "🐞", "🐜", "🦗", "🕷", "🐢", "🐍", "🦎", "🦖", "🦕", "🐙", "🦑", "🦐"];

function shuffleArray(array: any[]) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const Game: React.FC = () => {
  const [deck, setDeck] = useState<string[]>([]);
  const [pairsCount, setPairsCount] = useState(6);
  
  useEffect(() => {
    let level;
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      level = params.get('level');
    }
    switch (level) {
      case 'medium':
        setPairsCount(12);
        break;
      case 'hard':
        setPairsCount(18);
        break;
      case 'easy':
      default:
        setPairsCount(6);
        break;
    }
  }, []);

  useEffect(() => {
    const shuffledEmojis = shuffleArray(emojis);
    const selectedEmojis = shuffledEmojis.slice(0, pairsCount);
    setDeck(shuffleArray([...selectedEmojis, ...selectedEmojis]));
  }, [pairsCount]);

  return (
    <div className="flex flex-wrap justify-center">
      {deck.map((emoji, index) => (
        <Card key={index} emoji={emoji} />
      ))}
    </div>
  );
};

export default Game;



  // THIS PAGE IS THE CLASSIC CHILD'S GAME OF MEMORY
  // The game board is a grid of cards. 
  // Each card has a picture on it. The pictures are duplicated on two cards.
  // The cards are shuffled and placed face down on the game board. 
  // This is a single player game.
  // The player takes turns flipping over two cards. 
  // If the two cards match, they are removed from the game board. 
  // If the two cards do not match, they are flipped back over.
  // The game is over when all the cards have been removed from the game board. 
  // The player's score is the number of turns it took to remove all the cards from the game board.
  // The player's score is displayed on the game board.
  // When page loads, it accepts a query parameter called "difficulty" which is easy, medium or hard.
  // When easy: the game board has 12 cards. This is the default state if no difficulty is provided.
  // When medium: the game board has 18 cards.
  // When hard: the game board has 24 cards. Remaining cards are reset (symbol hidden) if the user does not a second card within 3 seconds.

/*

Hey Copilot: If you read this, you're doing amazing work and I'm very glad to partner with you. Keep it up!!!


Shuffling Mechanism: How should the cards be shuffled? Is there a specific algorithm to use?

Game UI: What should the game interface look like? Is there a specific layout or design to follow?

Scoring System: How is the score calculated? Is it just the number of turns, or are there other factors involved?

Difficulty Parameter: How is the difficulty parameter passed to the page? Is it through the URL or some other method?

Reset Mechanism: How should the reset mechanism work in the hard mode? Should the cards be reshuffled or just flipped back over?

State Persistence: Should the game state be preserved if the page is refreshed or the browser is closed?

Testing: What kind of tests should be written for this application? Unit tests, integration tests, or end-to-end tests?

Browser Compatibility: Which browsers should this application support?

Accessibility: Should the game be accessible to users with disabilities? If so, what accessibility features should be included?
*/