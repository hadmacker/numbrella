'use client'

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { PrettyChar } from '../../prettyChar';

const MAX_WORD_LENGTH = 30;
const MAX_LISTS = 8;

const pretty = PrettyChar.allCharacters();

const Page = () => {
  const [wordLists, setWordLists] = useState<{ name: string, words: string[] }[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [newListWords, setNewListWords] = useState<string[]>(Array(10).fill(''));
  const [listToDelete, setListToDelete] = useState<string | null>(null);
  const [listToEdit, setListToEdit] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedLists = JSON.parse(localStorage.getItem('wordLists') || '[]');
    const validLists = storedLists.filter((list: { name: string, words: string[] }) => list.name && list.words && list.words.length > 0);
    if (validLists.length === 0) {
      const planetsList = {
        name: "Planets of the Solar System",
        words: ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"]
      };
      validLists.push(planetsList);
      localStorage.setItem('wordLists', JSON.stringify(validLists));
    }
    setWordLists(validLists);
  }, []);

  const handleCreateList = () => {
    setShowModal(true);
    setNewListName(`List${wordLists.length + 1}`);
    setNewListWords(Array(10).fill(''));
    setListToEdit(null);
  };

  const handleEditList = (name: string) => {
    const list = wordLists.find(list => list.name === name);
    if (list) {
      setNewListName(list.name);
      const wordsToAdd = Math.max(10 - list.words.length, 0); // Ensure the length is not negative
      setNewListWords([...list.words, ...Array(wordsToAdd).fill('')]);
      setListToEdit(name);
      setShowModal(true);
    }
  };

  const handleSaveList = () => {
    const filteredWords = newListWords.filter(word => word.trim() !== '' && word.length <= MAX_WORD_LENGTH);
    if (filteredWords.length === 0) {
      alert('Please enter at least one valid word.');
      return;
    }
    if (wordLists.some(list => list.name === newListName && list.name !== listToEdit)) {
      alert('A list with this name already exists. Please choose a different name.');
      return;
    }
    const updatedLists = listToEdit
      ? wordLists.map(list => list.name === listToEdit ? { name: newListName, words: filteredWords } : list)
      : [...wordLists, { name: newListName, words: filteredWords }];
    setWordLists(updatedLists);
    localStorage.setItem('wordLists', JSON.stringify(updatedLists));
    setShowModal(false);
  };

  const handleDeleteList = (name: string) => {
    setListToDelete(name);
  };

  const confirmDeleteList = () => {
    const updatedLists = wordLists.filter(list => list.name !== listToDelete);
    setWordLists(updatedLists);
    localStorage.setItem('wordLists', JSON.stringify(updatedLists));
    setListToDelete(null);
  };

  const closeModal = () => {
    setShowModal(false);
    setListToDelete(null);
    setListToEdit(null);
  };

  const handleNavigate = (name: string) => {
    router.push(`/words/spelling/letsspell?level=${name}`);
  };

  return (
    <>
      <div className="flex flex-col items-center min-h-screen">
        <h1 className="p-5 text-center tracking-wide font-mono text-4xl md:text-5xl font-black text-white">
          Spelling Explorer
        </h1>
        <button
          onClick={handleCreateList}
          className={`mb-4 p-2 rounded shadow text-white ${wordLists.length >= MAX_LISTS ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500'}`}
          disabled={wordLists.length >= MAX_LISTS}
        >
          {wordLists.length >= MAX_LISTS ? 'Max word lists reached' : 'Create word list'}
        </button>
        <div className="w-full max-w-md">
          {wordLists.map((list, index) => (
            <div key={index} className="flex justify-between items-center p-2 border-b border-gray-300 bg-gray-100 rounded mb-2">
              <button
                className="flex-1 text-left p-2 bg-gray-200 rounded text-black"
                onClick={() => handleNavigate(list.name)}
              >
                {list.name}
              </button>
              <button
                onClick={() => handleEditList(list.name)}
                className="p-1 bg-yellow-500 rounded shadow text-white text-sm ml-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteList(list.name)}
                className="p-1 bg-red-500 rounded shadow text-white text-sm ml-2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        {showModal && (
          <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-auto" onClick={closeModal}>
            <div className="bg-white p-6 rounded shadow-lg max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-xl font-bold mb-4 text-black">{listToEdit ? 'Edit Word List' : 'Create Word List'}</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">List Name</label>
                <input
                  type="text"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  placeholder="List Name"
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">List Words</label>
                <div className="max-h-96 overflow-y-auto">
                  {newListWords.map((word, index) => (
                    <input
                      key={index}
                      type="text"
                      value={word}
                      onChange={(e) => {
                        const updatedWords = [...newListWords];
                        updatedWords[index] = e.target.value;
                        setNewListWords(updatedWords);
                      }}
                      className="mt-1 p-2 border border-gray-300 rounded w-full mb-2"
                      maxLength={MAX_WORD_LENGTH}
                    />
                  ))}
                  {newListWords.length < 20 && (
                    <button
                      onClick={() => setNewListWords([...newListWords, ''])}
                      className="mt-2 p-2 bg-blue-500 rounded shadow text-white"
                    >
                      Add Word
                    </button>
                  )}
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={closeModal}
                  className="mr-2 p-2 bg-gray-500 rounded shadow text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveList}
                  className="p-2 bg-blue-500 rounded shadow text-white"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
        {listToDelete && (
          <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-auto" onClick={closeModal}>
            <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-xl font-bold mb-4 text-black">
                Do you want to delete <span className="text-blue-500">{listToDelete}</span>?
              </h3>
              <div className="flex justify-end">
                <button
                  onClick={closeModal}
                  className="mr-2 p-2 bg-gray-500 rounded shadow text-white"
                >
                  No, do not delete
                </button>
                <button
                  onClick={confirmDeleteList}
                  className="p-2 bg-red-500 rounded shadow text-white"
                >
                  Yes, delete this list
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Page;