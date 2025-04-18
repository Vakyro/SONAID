import { Cross } from "lucide-react"

interface SonaidLogoProps {
  className?: string
  size?: number
}

export function SonaidLogo({ className, size = 24 }: SonaidLogoProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="bg-red-600 rounded-md p-1 flex items-center justify-center">
        <Cross className="text-white" size={size} />
      </div>
    </div>
  )
}
