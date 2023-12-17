'use client'

import React, { useState } from "react";

export default function Page() {
  
  return (
    <>
      <div>
        <h2 className="text-center tracking-wide font-mono text-2xl lg:text-3xl font-black">
          Template
          </h2>
      </div>
      <div style={{ 
        border: '1px solid black', 
        backgroundColor: '#222222'}}>
      <div style={{ 
        padding: '10px', 
        margin: '10px',
        display: 'flex',
        justifyContent: 'center'
        }}>
        <button 
        style={{ padding: '10px', backgroundColor: '#555', border: '1px solid #ccc', borderRadius: '5px' }} 
        className="m-1"
        >button</button>
      </div>
      <div style={{ 
        display: 'flex',
        justifyContent: 'center'
        }}>
instructions
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      </div>
    </>
  );
}