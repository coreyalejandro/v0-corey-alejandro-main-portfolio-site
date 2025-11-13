"use client"

import type React from "react"
import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react"

interface AudioEngineContextType {
  isActive: boolean
  toggleAudio: () => void
  playComponentSound: (componentType: string) => void
  playNavigationSound: (direction: "up" | "down" | "left" | "right") => void
  narrateSection: (sectionId: string, text: string) => void
  setSpatialPosition: (x: number, y: number, z: number) => void
  volume: number
  setVolume: (volume: number) => void
  error: string | null
}

const AudioEngineContext = createContext<AudioEngineContextType | null>(null)

export function useAudioEngine() {
  const context = useContext(AudioEngineContext)
  if (!context) throw new Error("useAudioEngine must be used within AudioEngineProvider")
  return context
}

export function AudioEngineProvider({ children }: { children: React.ReactNode }) {
  const [isActive, setIsActive] = useState(false)
  const [volume, setVolume] = useState(0.7)
  const [error, setError] = useState<string | null>(null)

  const audioContextRef = useRef<AudioContext | null>(null)
  const listenerRef = useRef<AudioListener | null>(null)
  const activeNodesRef = useRef<Set<AudioNode>>(new Set())
  const narrationQueueRef = useRef<string[]>([])
  const isNarratingRef = useRef(false)
  const lastNarrationTimeRef = useRef(0)

  const initializeAudioContext = useCallback(() => {
    if (audioContextRef.current) return true

    try {
      // Check for Web Audio API support
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
      if (!AudioContextClass) {
        setError("Web Audio API not supported in this browser")
        return false
      }

      audioContextRef.current = new AudioContextClass()
      listenerRef.current = audioContextRef.current.listener

      // Set listener position safely
      if (listenerRef.current) {
        try {
          listenerRef.current.positionX.value = 0
          listenerRef.current.positionY.value = 0
          listenerRef.current.positionZ.value = 0
          listenerRef.current.forwardX.value = 0
          listenerRef.current.forwardY.value = 0
          listenerRef.current.forwardZ.value = -1
          listenerRef.current.upX.value = 0
          listenerRef.current.upY.value = 1
          listenerRef.current.upZ.value = 0
        } catch (e) {
          console.warn("[v0] Failed to set spatial audio properties:", e)
        }
      }

      // Resume context if suspended (mobile browsers)
      if (audioContextRef.current.state === "suspended") {
        audioContextRef.current.resume()
      }

      console.log("[v0] Audio context initialized successfully")
      return true
    } catch (e) {
      console.error("[v0] Failed to initialize audio context:", e)
      setError("Failed to initialize audio system")
      return false
    }
  }, [])

  const cleanupAudioNodes = useCallback(() => {
    console.log("[v0] Cleaning up audio nodes:", activeNodesRef.current.size)

    activeNodesRef.current.forEach((node) => {
      try {
        if ("stop" in node && typeof node.stop === "function") {
          node.stop()
        }
        if ("disconnect" in node && typeof node.disconnect === "function") {
          node.disconnect()
        }
      } catch (e) {
        // Node may already be stopped/disconnected
      }
    })
    activeNodesRef.current.clear()
  }, [])

  useEffect(() => {
    if (isActive) {
      const initialized = initializeAudioContext()
      if (initialized) {
        playWelcomeSequence()
      }
    } else {
      // Cancel speech and cleanup when deactivated
      window.speechSynthesis?.cancel()
      cleanupAudioNodes()
    }

    return () => {
      cleanupAudioNodes()
      if (audioContextRef.current?.state !== "closed") {
        audioContextRef.current?.close()
      }
    }
  }, [isActive, initializeAudioContext, cleanupAudioNodes])

  const createSafeOscillator = useCallback(
    (
      freq: number,
      type: OscillatorType,
      gainValue: number,
      duration: number,
      panner?: { x: number; y: number; z: number },
    ) => {
      if (!audioContextRef.current) return

      try {
        const ctx = audioContextRef.current
        const now = ctx.currentTime

        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = type
        osc.frequency.value = freq
        gain.gain.value = 0

        // Apply spatial positioning if provided
        if (panner && listenerRef.current) {
          try {
            const pannerNode = ctx.createPanner()
            pannerNode.panningModel = "HRTF"
            pannerNode.distanceModel = "inverse"
            pannerNode.refDistance = 1
            pannerNode.maxDistance = 10000
            pannerNode.rolloffFactor = 1
            pannerNode.positionX.value = panner.x
            pannerNode.positionY.value = panner.y
            pannerNode.positionZ.value = panner.z

            osc.connect(gain)
            gain.connect(pannerNode)
            pannerNode.connect(ctx.destination)

            activeNodesRef.current.add(pannerNode)
          } catch (e) {
            // Fallback to non-spatial if HRTF fails
            osc.connect(gain)
            gain.connect(ctx.destination)
          }
        } else {
          osc.connect(gain)
          gain.connect(ctx.destination)
        }

        // Envelope with volume adjustment
        const adjustedGain = gainValue * volume
        gain.gain.linearRampToValueAtTime(adjustedGain, now + 0.05)
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration)

        activeNodesRef.current.add(osc)
        activeNodesRef.current.add(gain)

        osc.start(now)
        osc.stop(now + duration)

        // Auto-cleanup after sound finishes
        setTimeout(
          () => {
            activeNodesRef.current.delete(osc)
            activeNodesRef.current.delete(gain)
          },
          duration * 1000 + 100,
        )
      } catch (e) {
        console.error("[v0] Error creating oscillator:", e)
      }
    },
    [volume],
  )

  const playWelcomeSequence = useCallback(() => {
    if (!audioContextRef.current) return

    const notes = [
      { freq: 261.63, x: -2, y: 1, z: -3, delay: 0 },
      { freq: 329.63, x: 0, y: 1, z: -3, delay: 200 },
      { freq: 392.0, x: 2, y: 1, z: -3, delay: 400 },
      { freq: 523.25, x: 0, y: 2, z: -2, delay: 600 },
    ]

    notes.forEach(({ freq, x, y, z, delay }) => {
      setTimeout(() => {
        createSafeOscillator(freq, "sine", 0.15, 1.5, { x, y, z })
      }, delay)
    })

    setTimeout(() => {
      narrateSection("welcome", "Welcome to Creative Chaos. An immersive audio journey through design and innovation.")
    }, 1200)
  }, [createSafeOscillator])

  const playComponentSound = useCallback(
    (componentType: string) => {
      if (!isActive || !audioContextRef.current) return

      const soundProfiles: Record<string, { freq: number[]; duration: number; type: OscillatorType }> = {
        card: { freq: [440, 554.37], duration: 0.3, type: "sine" },
        button: { freq: [587.33], duration: 0.15, type: "square" },
        modal: { freq: [329.63, 392, 493.88], duration: 0.6, type: "triangle" },
        laydownCard: { freq: [220, 277.18, 329.63], duration: 0.8, type: "sine" },
        floatingCard: { freq: [392, 440, 493.88], duration: 0.6, type: "sine" },
        breathingBackground: { freq: [110, 146.83], duration: 1.5, type: "sine" },
      }

      const profile = soundProfiles[componentType] || soundProfiles.button

      profile.freq.forEach((freq, index) => {
        const x = (index - profile.freq.length / 2) * 1.5
        setTimeout(() => {
          createSafeOscillator(freq, profile.type, 0.12, profile.duration, { x, y: 0, z: -2 })
        }, index * 80)
      })
    },
    [isActive, createSafeOscillator],
  )

  const playNavigationSound = useCallback(
    (direction: "up" | "down" | "left" | "right") => {
      if (!isActive || !audioContextRef.current) return

      const directionMap = {
        up: { x: 0, y: 2, z: -1, freq: 880 },
        down: { x: 0, y: -2, z: -1, freq: 440 },
        left: { x: -2, y: 0, z: -1, freq: 587.33 },
        right: { x: 2, y: 0, z: -1, freq: 659.25 },
      }

      const { x, y, z, freq } = directionMap[direction]
      createSafeOscillator(freq, "sine", 0.2, 0.3, { x, y, z })
    },
    [isActive, createSafeOscillator],
  )

  const narrateSection = useCallback(
    (sectionId: string, text: string) => {
      if (!isActive) return

      const now = Date.now()
      const minInterval = 3000 // Minimum 3 seconds between narrations

      // Throttle narrations
      if (now - lastNarrationTimeRef.current < minInterval) {
        console.log("[v0] Narration throttled for:", sectionId)
        return
      }

      lastNarrationTimeRef.current = now

      try {
        // Check for speech synthesis support
        if (!window.speechSynthesis) {
          console.warn("[v0] Speech synthesis not supported")
          return
        }

        // Cancel any ongoing speech
        window.speechSynthesis.cancel()

        const utterance = new SpeechSynthesisUtterance(text)
        utterance.rate = 1.1
        utterance.pitch = 1.0
        utterance.volume = volume

        // Wait for voices to load (important for some browsers)
        const setVoice = () => {
          const voices = window.speechSynthesis.getVoices()
          if (voices.length > 0) {
            const preferredVoice = voices.find(
              (v) => v.name.includes("Natural") || v.name.includes("Enhanced") || v.lang.startsWith("en"),
            )
            if (preferredVoice) utterance.voice = preferredVoice
          }
        }

        if (window.speechSynthesis.getVoices().length === 0) {
          window.speechSynthesis.addEventListener("voiceschanged", setVoice, { once: true })
        } else {
          setVoice()
        }

        utterance.onerror = (event) => {
          console.error("[v0] Speech synthesis error:", event.error)
        }

        window.speechSynthesis.speak(utterance)

        console.log("[v0] Narrating:", sectionId)
      } catch (e) {
        console.error("[v0] Narration failed:", e)
      }
    },
    [isActive, volume],
  )

  const setSpatialPosition = useCallback(
    (x: number, y: number, z: number) => {
      if (!isActive || !listenerRef.current) return

      try {
        listenerRef.current.positionX.value = x
        listenerRef.current.positionY.value = y
        listenerRef.current.positionZ.value = z
      } catch (e) {
        console.warn("[v0] Could not set spatial position:", e)
      }
    },
    [isActive],
  )

  const toggleAudio = useCallback(() => {
    const newState = !isActive
    setIsActive(newState)

    if (newState) {
      // Initialize on first activation
      const initialized = initializeAudioContext()
      if (initialized) {
        setTimeout(() => {
          try {
            const utterance = new SpeechSynthesisUtterance(
              "Audio experience activated. You are now in the Creative Chaos sound universe.",
            )
            utterance.rate = 1.1
            utterance.volume = volume
            window.speechSynthesis?.speak(utterance)
          } catch (e) {
            console.error("[v0] Activation announcement failed:", e)
          }
        }, 300)
      }
    } else {
      window.speechSynthesis?.cancel()
      cleanupAudioNodes()
    }
  }, [isActive, volume, initializeAudioContext, cleanupAudioNodes])

  return (
    <AudioEngineContext.Provider
      value={{
        isActive,
        toggleAudio,
        playComponentSound,
        playNavigationSound,
        narrateSection,
        setSpatialPosition,
        volume,
        setVolume,
        error,
      }}
    >
      {children}
    </AudioEngineContext.Provider>
  )
}
