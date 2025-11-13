import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Volume2, Code, Sparkles, Heart } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AudioExperiencePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <Volume2 className="w-16 h-16 text-orange-600 mx-auto mb-4" />
          <h1 className="text-6xl font-black text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text mb-4">
            Audio Experience
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            A revolutionary audio system that creates unique, visceral experiences for blind and visually impaired users
          </p>
        </div>

        <div className="space-y-8">
          <Card className="border-orange-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Heart className="w-6 h-6 text-orange-600" />
                Why This Matters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                The internet has been unfair to blind users. We've been forcing them into a sighted framework instead of
                creating something uniquely powerful for them.
              </p>
              <p>
                This audio system provides a parallel universe where blind users experience the web through 3D spatial
                audio, sonic component signatures, and rich audio storytelling—creating the same emotional impact that
                visual users get from our breathing backgrounds and floating animations.
              </p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Sparkles className="w-6 h-6 text-orange-600" />
                Key Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-orange-600 font-bold">•</span>
                  <div>
                    <strong className="text-foreground">3D Spatial Audio:</strong> Each section has its own position in
                    audio space using binaural positioning
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-600 font-bold">•</span>
                  <div>
                    <strong className="text-foreground">Sonic Component Signatures:</strong> Every component type has a
                    unique sound profile
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-600 font-bold">•</span>
                  <div>
                    <strong className="text-foreground">Audio Storytelling:</strong> Voice narration with ambient
                    soundscapes during navigation
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-600 font-bold">•</span>
                  <div>
                    <strong className="text-foreground">Interactive Feedback:</strong> Real-time audio responses to user
                    interactions
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-orange-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Code className="w-6 h-6 text-orange-600" />
                How to Use
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-2">For Users</h3>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Click the "Audio Mode" button in the top-right corner</li>
                  <li>Wear headphones for the best 3D audio experience</li>
                  <li>Navigate naturally - each section narrates itself as you reach it</li>
                  <li>Use keyboard navigation for directional audio cues</li>
                </ol>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">For Developers</h3>
                <p className="text-muted-foreground mb-4">
                  The complete implementation code is available in the component files. Here's the basic setup:
                </p>

                <div className="bg-gray-900 rounded-lg p-6 text-gray-100 overflow-x-auto">
                  <pre className="text-sm">
                    {`// Wrap your app with AudioEngineProvider
import { AudioEngineProvider, AudioToggle } from '@/components/audio-experience'

<AudioEngineProvider>
  <AudioToggle />
  {children}
</AudioEngineProvider>

// Wrap sections with AudioSection
import { AudioSection } from '@/components/audio-experience/audio-section'

<AudioSection
  id="hero"
  title="Hero Section"
  description="Welcome message"
  position={{ x: 0, y: 0, z: -5 }}
>
  {/* Your content */}
</AudioSection>`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center pt-8">
            <Link href="/components">
              <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold px-8 py-4 rounded-full">
                View Full Component Code
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
