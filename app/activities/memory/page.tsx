'use client'

import React, { useEffect, useState } from "react";
import Card from "./Card";
import './styles.css';
import Modal from "react-modal";

const emojis = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵", "🐔", "🐧", "🐦", "🐤", "🐣", "🐺", "🐗", "🐴", "🦄", "🐝", "🐛", "🦋", "🐌", "🐞", "🐜", "🦗", "🕷", "🐢", "🐍", "🦎", "🦖", "🦕", "🐙", "🦑", "🦐"];

function shuffleArray(array: any[]) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const Game: React.FC = () => {
  const [deck, setDeck] = useState<string[]>([]);
  const [pairsCount, setPairsCount] = useState(6);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [winCondition, setWinCondition] = useState<number>(12);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [moves, setMoves] = useState(0);
  
  useEffect(() => {
    Modal.setAppElement('#game-page');
  }, []);

  useEffect(() => {
    let level;
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      level = params.get('level');
    }
    switch (level) {
      case 'medium':
        setPairsCount(12);
        setWinCondition(24);
        break;
      case 'hard':
        setPairsCount(18);
        setWinCondition(36);
        break;
      case 'easy':
      default:
        setPairsCount(6);
        setWinCondition(12);
        break;
    }
  }, []);

  function resetGame() {
    setFlippedCards([]);
    setMatchedCards([]);
    const shuffledEmojis = shuffleArray(emojis);
    const selectedEmojis = shuffledEmojis.slice(0, pairsCount);
    setDeck(shuffleArray([...selectedEmojis, ...selectedEmojis]));
  }

  useEffect(() => {
    resetGame();
  }, [pairsCount]);

  const handleCardClick = (index: number) => {
    setFlippedCards((prev) => {
      if (flippedCards.length === 2) {
        const [firstCardIndex, secondCardIndex] = flippedCards;
        if(firstCardIndex == secondCardIndex) {
          return [firstCardIndex];
        }
        setMoves((prevMoves) => prevMoves + 1);
        if (deck[firstCardIndex] === deck[secondCardIndex]) {
          setMatchedCards((prev) => {
            const newMatchedCards = Array.from(new Set([...prev, firstCardIndex, secondCardIndex]));
            if (newMatchedCards.length === winCondition) {
              setIsModalOpen(true);
            }
            return newMatchedCards;
          });
        }
        return [];
      }
      return [...prev, index];
    });
  };

  return (
    <div className="flex flex-wrap justify-center mx-auto" style={{ maxWidth: '90vw' }} id="game-page">
      {deck.map((emoji, index) => (
        <Card key={index} emoji={emoji} isFlipped={flippedCards.includes(index)} isMatched={matchedCards.includes(index)} onFlip={() => handleCardClick(index)} />
      ))}
      <Modal 
          isOpen={isModalOpen} 
          onRequestClose={() => setIsModalOpen(false)}
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
            },
            content: {
              backgroundColor: 'white',
              border: '4px solid gray',
              borderRadius: '10px',
              width: '500px',
              height: '400px',
              margin: 'auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px',
            },
          }}
        >
          <h2 className="text-center font-mono text-4xl lg:text-5xl font-black mb-2" style={{ color: 'black' }}>
            You win after {moves} moves!
          </h2>
          <button 
          className="font-mono text-2xl lg:text-3xl font-black"
          style={{ backgroundColor: 'green', color: 'white', padding: '10px', borderRadius: '5px' }} onClick={() => {
            setIsModalOpen(false);
            resetGame();
          }}>New Game</button>
        </Modal>
    </div>
  );
};

export default Game;
