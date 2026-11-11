import { useEffect, useState } from 'react'

function diff(target) {
  const ms = new Date(target).getTime() - Date.now()
  if (ms <= 0) return null
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms % 86400000) / 3600000),
    minutes: Math.floor((ms % 3600000) / 60000),
    seconds: Math.floor((ms % 60000) / 1000),
  }
}

export function useCountdown(target) {
  const [left, setLeft] = useState(() => diff(target))
  useEffect(() => {
    const t = setInterval(() => setLeft(diff(target)), 1000)
    return () => clearInterval(t)
  }, [target])
  return left // null once the date has passed
}
