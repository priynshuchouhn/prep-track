export const HoverCard = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="group h-full relative transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">{children}</div>
    )
  }