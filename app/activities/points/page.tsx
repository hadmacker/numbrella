'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Point {
  value: number;
  message?: string;
}

interface DayData {
  date: string;
  points: Point[];
}

const getCurrentDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0]; // yyyy-MM-dd
};

const loadPointsData = (): DayData[] => {
  const data = localStorage.getItem('pointsData');
  return data ? JSON.parse(data) : [];
};

const savePointsData = (data: DayData[]) => {
  localStorage.setItem('pointsData', JSON.stringify(data));
};

export default function Points() {
  const [pointMessage, setPointMessage] = useState('');
  const [pointsData, setPointsData] = useState<DayData[]>([]);
  const [currentDayData, setCurrentDayData] = useState<DayData>({
    date: getCurrentDate(),
    points: [],
  });
  
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const data = loadPointsData();
    setPointsData(data);
    const todayData = data.find((day) => day.date === getCurrentDate());
    if (todayData) {
      setCurrentDayData(todayData);
    }
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const sanitizeInput = (input: string): string => {
    const element = document.createElement('div');
    element.innerText = input;
    return element.innerHTML;
  };

  const addPoint = (value: number) => {
    const sanitizedMessage = sanitizeInput(pointMessage);
    const newPoint: Point = { value, message: sanitizedMessage };
    const updatedDayData = {
      ...currentDayData,
      points: [newPoint, ...currentDayData.points],
    };
    const updatedPointsData = pointsData.map((day) =>
      day.date === currentDayData.date ? updatedDayData : day
    );
    if (!pointsData.some((day) => day.date === currentDayData.date)) {
      updatedPointsData.push(updatedDayData);
    }
    setCurrentDayData(updatedDayData);
    setPointsData(updatedPointsData);
    savePointsData(updatedPointsData);
    setPointMessage('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all data?')) {
      localStorage.removeItem('pointsData');
      setPointsData([]);
      setCurrentDayData({ date: getCurrentDate(), points: [] });
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen tracking-wide font-mono text-2xl lg:text-3xl font-black">
      <h1 className="text-4xl mb-4">My Points Tracker</h1>
      <input
        type="text"
        value={pointMessage}
        onChange={(e) => setPointMessage(e.target.value)}
        maxLength={30}
        placeholder="Point Message"
        className="mb-4 p-2 border rounded"
        ref={inputRef}
      />
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => addPoint(1)}
          className="w-24 p-2 bg-green-500 text-white rounded m-2"
        >
          +1
        </button>
        <button
          onClick={() => addPoint(-1)}
          className="w-24 p-2 bg-red-500 text-white rounded m-2"
        >
          -1
        </button>
      </div>
      <button
        onClick={clearAllData}
        className="p-2 bg-gray-500 text-white rounded mb-4 m-2"
      >
        Clear All Data
      </button>
      <div className="w-full max-w-2xl">
      {pointsData.map((day) => {
          const total = day.points.reduce((sum, point) => sum + point.value, 0);
          return (
            <div key={day.date} className="mb-4 p-4 border rounded">
              <h2 className="text-3xl mb-2">{day.date}</h2>
              <p className="text-2xl mb-2">Total: {total}</p>
              <ul>
                {day.points.map((point, index) => (
                  <li
                    key={index}
                    className={`mb-1 ${point.value > 0 ? 'text-green-500' : 'text-red-500'}`}
                  >
                    {point.value > 0 ? '+' : ''}
                    {point.value} {point.message && `: ${point.message}`}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <p>All data is stored on your computer.</p>
    </div>
  );
}