'use client';
import { useEffect, useRef, useState } from "react"

export const AnimatedCounter = ({ value, duration = 2000 }: { value: number; duration?: number }) => {
    const [count, setCount] = useState(0)
    const countRef = useRef(0)
  
    useEffect(() => {
      let startTime: number
      const startValue = 0
      const endValue = value
  
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        const currentCount = Math.floor(progress * (endValue - startValue) + startValue)
  
        setCount(currentCount)
  
        if (progress < 1) {
          window.requestAnimationFrame(step)
        }
      }
  
      window.requestAnimationFrame(step)
  
      return () => {
        countRef.current = count
      }
    }, [value, duration])
  
    return <span>{count}</span>
  }