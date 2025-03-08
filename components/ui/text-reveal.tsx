'use client'
import { useEffect, useState } from "react"

export const TextReveal = ({ children }: {children: React.ReactNode}) => {
    const [isRevealed, setIsRevealed] = useState(false)
  
    useEffect(() => {
      setIsRevealed(true)
    }, [])
  
    return (
      <div className="overflow-hidden">
        <div
          className={`transform transition-transform duration-1000 ${isRevealed ? "translate-y-0" : "translate-y-full"}`}
        >
          {children}
        </div>
      </div>
    )
  }