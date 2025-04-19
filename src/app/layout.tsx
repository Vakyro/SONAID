import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// Corrige la ruta de importación CSS
import "./globals.css"; // Cambia a la ubicación correcta de tu archivo CSS
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "../context/user-context";
import { measurePageLoad } from "@/lib/performance";
// Elimina la importación de ViewTransitions
import { ViewTransitions } from 'next-view-transitions'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SONAID - Ultrasound Patient Case Management",
  description: "Hospital ultrasound patient case management system",
};

measurePageLoad();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" className="light">
        <head>
          {/* Prefetch script for all internal links */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                document.addEventListener('DOMContentLoaded', function () {
                  const prefetch = (href) => {
                    if (window.next && window.next.router && typeof window.next.router.prefetch === 'function') {
                      window.next.router.prefetch(href);
                    }
                  };
                  const isInternal = (href) => href && href.startsWith('/') && !href.startsWith('//');
                  const links = document.querySelectorAll('a[href]');
                  links.forEach(link => {
                    const href = link.getAttribute('href');
                    if (isInternal(href)) {
                      link.addEventListener('mouseenter', () => prefetch(href));
                      // Optionally, prefetch when link is visible:
                      if ('IntersectionObserver' in window) {
                        const observer = new IntersectionObserver((entries) => {
                          entries.forEach(entry => {
                            if (entry.isIntersecting) {
                              prefetch(href);
                              observer.disconnect();
                            }
                          });
                        });
                        observer.observe(link);
                      }
                    }
                  });
                });
              `,
            }}
          />
        </head>
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
    </ViewTransitions>
  );
}