import { Inter } from 'next/font/google'
import "./globals.css";
import NavBar from "@/app/(pages)/components/NavBar.tsx";
import React from "react";

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
        <NavBar/>
        {children}
      </body>
    </html>
  )
}
