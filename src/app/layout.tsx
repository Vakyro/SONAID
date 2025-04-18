import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { UserProvider } from "../context/user-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SONAID - Ultrasound Patient Case Management",
  description: "Hospital ultrasound patient case management system",
}

// Add near the top of the file
import { measurePageLoad } from "@/lib/performance"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="light">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          forcedTheme="light"
        >
          <UserProvider>
            {children}
            <Toaster />
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

// Call it before the return statement
measurePageLoad()
