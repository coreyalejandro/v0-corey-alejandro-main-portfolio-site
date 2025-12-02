export interface AudioPosition {
  x: number
  y: number
  z: number
}

export interface OscillatorConfig {
  frequency: number
  type: OscillatorType
  duration?: number
  volume?: number
}

export interface NarrationOptions {
  rate?: number
  pitch?: number
  volume?: number
  voice?: SpeechSynthesisVoice
}

export interface AudioContextState {
  initialized: boolean
  context: AudioContext | null
  isPlaying: boolean
}
