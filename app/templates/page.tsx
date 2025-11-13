"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-red-700 to-amber-800" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-500/20 to-orange-400/30" />

        <div className="relative container mx-auto px-4 py-24 text-center">
          <div className="space-y-6">
            <h1 className="text-6xl font-bold text-white text-balance drop-shadow-lg">Signature Templates</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto text-pretty leading-relaxed">
              Elaborate hero sections with neural depth motion and next-level parallax effects
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Hero Template */}
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="relative overflow-hidden rounded-t-lg h-48 bg-gradient-to-br from-orange-600 via-red-700 to-amber-800">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-400/20 to-orange-500/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 text-white/80 flex items-center justify-center">✨</div>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-5 h-5 text-orange-600 flex items-center justify-center">⚡</div>
                Hero Template
              </CardTitle>
              <CardDescription>Elaborate hero with layered parallax and neural depth motion</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/templates/hero">
                <Button className="w-full bg-gradient-to-r from-orange-600 to-red-700 hover:from-orange-700 hover:to-red-800">
                  View Template
                  <div className="w-4 h-4 ml-2 flex items-center justify-center">→</div>
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Landing Template */}
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="relative overflow-hidden rounded-t-lg h-48 bg-gradient-to-br from-amber-700 via-orange-800 to-red-900">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-red-400/20 to-amber-500/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 text-white/80 flex items-center justify-center">📚</div>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-5 h-5 text-amber-600 flex items-center justify-center">🎯</div>
                Landing Template
              </CardTitle>
              <CardDescription>Full landing page with advanced parallax sections</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/templates/landing">
                <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800">
                  View Template
                  <div className="w-4 h-4 ml-2 flex items-center justify-center">→</div>
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Portfolio Template */}
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="relative overflow-hidden rounded-t-lg h-48 bg-gradient-to-br from-red-800 via-amber-900 to-orange-900">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-orange-400/20 to-red-500/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 text-white/80 flex items-center justify-center">👁️</div>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-5 h-5 text-red-600 flex items-center justify-center">✨</div>
                Portfolio Template
              </CardTitle>
              <CardDescription>Showcase template with innovative motion effects</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/templates/portfolio">
                <Button className="w-full bg-gradient-to-r from-red-600 to-amber-700 hover:from-red-700 hover:to-amber-800">
                  View Template
                  <div className="w-4 h-4 ml-2 flex items-center justify-center">→</div>
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Resume Template */}
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="relative overflow-hidden rounded-t-lg h-48 bg-gradient-to-br from-orange-500 via-red-600 to-amber-700">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-400/20 to-orange-500/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 text-white/80 flex items-center justify-center">📄</div>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-5 h-5 text-orange-600 flex items-center justify-center">📋</div>
                Resume Template
              </CardTitle>
              <CardDescription>Professional resume with PDF download and breathing backgrounds</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/templates/resume">
                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
                  View Template
                  <div className="w-4 h-4 ml-2 flex items-center justify-center">→</div>
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
