// components/hero/ScrollIndicator.tsx
export default function ScrollIndicator() {
  return (
    <div 
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      aria-hidden="true"
    >
      <div className="flex flex-col items-center space-y-2">
        <span className="text-sm text-muted-foreground">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground/50 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </div>
  )
}