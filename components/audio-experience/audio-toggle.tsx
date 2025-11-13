"use client"

import { Volume2, VolumeX, AlertCircle } from "lucide-react"
import { useAudioEngine } from "./audio-engine"

export function AudioToggle() {
  const { isActive, toggleAudio, playComponentSound, error } = useAudioEngine()

  const handleToggle = () => {
    playComponentSound("button")
    toggleAudio()
  }

  return (
    <div className="fixed top-6 right-6 z-50">
      <button
        onClick={handleToggle}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label={isActive ? "Disable audio experience" : "Enable audio experience"}
        aria-pressed={isActive}
        title={isActive ? "Disable immersive audio" : "Enable immersive audio experience"}
        disabled={!!error}
      >
        {error ? (
          <AlertCircle className="w-5 h-5" />
        ) : isActive ? (
          <Volume2 className="w-5 h-5" />
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
        <span className="text-sm font-semibold">{error ? "Audio Error" : isActive ? "Audio On" : "Audio Mode"}</span>
      </button>

      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {isActive && "Audio experience activated"}
        {!isActive && !error && "Audio experience deactivated"}
        {error && `Audio system error: ${error}`}
      </div>
    </div>
  )
}
