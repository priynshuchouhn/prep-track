export const GridPattern = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"></div>
        {children}
      </div>
    )
  }