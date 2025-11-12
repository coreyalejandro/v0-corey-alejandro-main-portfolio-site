import type React from "react"
import type { Metadata } from "next"
import FloatingNav from "@/components/floating-nav"
import "./globals.css"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Suspense fallback={null}>
          <FloatingNav />
        </Suspense>
        {children}
      </body>
    </html>
  )
}
