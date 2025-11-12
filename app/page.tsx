import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-red-700 to-amber-800" />

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-balance">Creative Chaos</h1>
          <p className="text-2xl md:text-3xl mb-4 text-orange-100 text-balance">
            A joyful rebellion against boring design
          </p>
          <p className="text-lg md:text-xl mb-12 text-orange-200/90 max-w-3xl mx-auto text-pretty">
            An anti-SaaS design philosophy that breaks every convention and creates organic, living interfaces that feel
            like art installations
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/design-system">
              <Button size="lg" className="bg-white text-orange-700 hover:bg-orange-50 text-lg px-8 py-6">
                Explore Design System
              </Button>
            </Link>
            <Link href="/components">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6 bg-transparent"
              >
                View Components
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">What Makes It Different</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 mb-4" />
                <CardTitle className="text-2xl">Deep, Saturated Colors</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Rich, vibrant gradients that command attention. No pale, washed-out corporate aesthetics here.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-amber-600 mb-4" />
                <CardTitle className="text-2xl">Organic Positioning</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Elements float, scatter, and position themselves like a magazine collage. Asymmetry is beauty.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-600 to-orange-600 mb-4" />
                <CardTitle className="text-2xl">Living Interfaces</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Everything breathes, pulses, and moves with organic motion. The interface feels alive and responsive.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-orange-600 via-red-700 to-amber-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">Explore the System</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/design-system" className="group">
              <Card className="border-none shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 bg-white/95 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-orange-600 transition-colors">Design System</CardTitle>
                  <CardDescription>Color palettes, typography, spacing, and core principles</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/components" className="group">
              <Card className="border-none shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 bg-white/95 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-orange-600 transition-colors">Components</CardTitle>
                  <CardDescription>Reusable UI components with live previews and code</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/templates" className="group">
              <Card className="border-none shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 bg-white/95 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-orange-600 transition-colors">Templates</CardTitle>
                  <CardDescription>Hero sections, landing pages, and portfolio layouts</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/documentation" className="group">
              <Card className="border-none shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 bg-white/95 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-orange-600 transition-colors">Documentation</CardTitle>
                  <CardDescription>Implementation guides and usage examples</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Ready to Break Conventions?</h2>
          <p className="text-xl text-gray-600 mb-12 text-pretty">
            Start building joyful, organic interfaces that stand out from the cookie-cutter SaaS crowd
          </p>
          <Link href="/design-system">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white text-lg px-12 py-6"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
