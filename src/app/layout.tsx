import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { UserProvider } from "@/context/user-context"
import { ViewTransitions } from 'next-view-transitions'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SONAID - Ultrasound Patient Case Management",
  description: "Hospital ultrasound patient case management system",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <head>
          <link rel="manifest" href="/manifest.json" />
        </head>
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <UserProvider>
              {children}
              <Toaster />
            </UserProvider>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  )
}