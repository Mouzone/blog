"use client"
import { Inter } from 'next/font/google'
import "./globals.css";
import NavBar from "@/app/components/NavBar.tsx";
import React from "react";
import ThemeProvider from "@/app/components/themeProvider.tsx";

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
    return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
            <NavBar/>
            {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
