"use client"
import { Inter } from 'next/font/google'
import "./globals.css";
import NavBar from "@/app/components/NavBar.tsx";
import { useState } from "react";
import { createContext } from 'react'


const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const ThemeContext = createContext({})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
    const [isAuthenticated, setAuthenticated] = useState(false)
    return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <NavBar isAuthenticated={isAuthenticated}/>
        <ThemeContext.Provider value={setAuthenticated}>
            {children}
        </ThemeContext.Provider>
      </body>
    </html>
  )
}
