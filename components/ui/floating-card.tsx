

  export const FloatingCard = ({ children, delay = 0 }: {children:React.ReactNode, delay: number}) => {
    return (
      <div
        className="animate-float"
        style={{
          animationDelay: `${delay}ms`,
          animation: `float 6s ease-in-out infinite ${delay}ms`,
        }}
      >
        {children}
      </div>
    )
  }