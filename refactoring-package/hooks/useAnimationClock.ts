import { useState, useEffect } from 'react'

export function useAnimationClock(speed = 0.1, interval = 100): number {
  const [time, setTime] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => prev + speed)
    }, interval)
    return () => clearInterval(timer)
  }, [speed, interval])
  return time
}
