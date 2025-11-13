import type React from "react"
import type { Metadata } from "next"
import FloatingNav from "@/components/floating-nav"
import "./globals.css"
import { Suspense } from "react"
import { AudioEngineProvider } from "@/components/audio-experience/audio-engine"
import { AudioToggle } from "@/components/audio-experience/audio-toggle"

export const metadata: Metadata = {
  title: "Creative Chaos - Neural Depth Design System",
  description: "A revolutionary design system with living interfaces and immersive audio experiences for all users",
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
        <AudioEngineProvider>
          <Suspense fallback={null}>
            <FloatingNav />
          </Suspense>
          <AudioToggle />
          {children}
        </AudioEngineProvider>
      </body>
    </html>
  )
}
