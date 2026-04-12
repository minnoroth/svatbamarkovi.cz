import { useEffect, useState } from 'react'

export interface CountdownValues {
  days: number
  hours: number
  minutes: number
  seconds: number
  isOver: boolean
}

function getTimeLeft(target: Date): CountdownValues {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true }
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    isOver: false,
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
