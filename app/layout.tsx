"use client";

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
          .then(registration => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
          }, err => {
            console.log('ServiceWorker registration failed: ', err);
          });
      });
    }
  }, []);

  return (
    <html lang="en" className="dark">
      <head>
        <title>Numbrillig</title>
        <meta name="description" content="Finding an escape in numbers and words." />
        <link rel="manifest" href="/manifest.json"></link>
      </head>
      <body className={inter.className}>
        <div className='mx-5 my-5' key="layout_nav_hdiv">
          <a key="layout_nav_homelink" 
          className="flex place-items-center gap-1 pl-2 lg:pointer-events-auto lg:p-0 font-mono text-3xl font-bold"
          href="/">Home</a>
        </div>
        <div key="layout_children_container">
          {children}
        </div>
      </body>
    </html>
  )
}
