import { useEffect, useState } from 'react'

const DAY_MS = 24 * 60 * 60 * 1000

export interface CountdownValues {
  days: number
  hours: number
  minutes: number
  seconds: number
  /** True from the target moment on. */
  isOver: boolean
  /** True once more than a day has passed since the target. */
  isPast: boolean
}

function getTimeLeft(target: Date): CountdownValues {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true, isPast: diff < -DAY_MS }
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    isOver: false,
    isPast: false,
  }
}

export function useCountdown(targetDate: Date): CountdownValues {
  const [timeLeft, setTimeLeft] = useState<CountdownValues>(() => getTimeLeft(targetDate))

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate))
    }, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  return timeLeft
}
