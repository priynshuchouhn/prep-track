'use client'
import { useRef, useState } from "react"
import { Button } from "./button"

export const SpotlightButton = ({ children, ...props }: {children: React.ReactNode} & React.ComponentProps<typeof Button>) => {
    const buttonRef = useRef(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [opacity, setOpacity] = useState(0)
  
    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
      if (!buttonRef.current) return
      const rect = (buttonRef.current as HTMLElement).getBoundingClientRect()
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
      setOpacity(1)
    }
  
    const handleMouseLeave = () => {
      setOpacity(0)
    }
  
    return (
      <Button
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden"
        {...props}
      >
        <div
          className="pointer-events-none absolute -inset-px transition duration-300"
          style={{
            opacity,
            background: `radial-gradient(circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.15) 0%, transparent 60%)`,
          }}
        />
        {children}
      </Button>
    )
  }