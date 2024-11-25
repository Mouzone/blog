import { Inter } from 'next/font/google'
import "./globals.css";
import NavBar from "@/app/(pages)/components/NavBar.tsx";
import React from "react";
import {LoginContextProvider} from "@/app/(pages)/components/LoginContextProvider.tsx";

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
          <LoginContextProvider>
            <NavBar/>
            {children}
          </LoginContextProvider>
        </body>
      </html>
    )
}
