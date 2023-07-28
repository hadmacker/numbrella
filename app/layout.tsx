import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Numbrillig',
  description: 'So you like numbers, eh?',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className='my-5' key="layout_nav_hdiv">
          <a key="layout_nav_homelink" 
          className="flex place-items-center gap-1 p-8 lg:pointer-events-auto lg:p-0 font-mono text-3xl font-bold"
          href="/">Home</a>
        </div>
        <div key="layout_children_container">
          {children}
        </div>
      </body>
    </html>
  )
}
