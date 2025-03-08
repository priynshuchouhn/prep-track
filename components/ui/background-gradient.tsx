import React from 'react'

export const BackgroundGradient = ({ children, className = "", ...props }: {children: React.ReactNode, className:string}) => {
    return (
      <div className={`relative group/bg ${className}`} {...props}>
        <div className="absolute -inset-px rounded-xl blur-xl opacity-75 bg-gradient-to-r from-primary to-primary-foreground group-hover/bg:opacity-100 transition duration-500"></div>
        <div className="relative">{children}</div>
      </div>
    )
  }
