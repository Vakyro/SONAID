import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface RiskLevelBarProps {
  riskScore: number // 0-100
  title?: string
  description?: string
}

export function RiskLevelBar({
  riskScore,
  title = "Nivel de Riesgo",
  description = "Evaluación de riesgo basada en resultados de clasificación",
}: RiskLevelBarProps) {
  // Asegurar que la puntuación de riesgo esté dentro de los límites
  const normalizedScore = Math.max(0, Math.min(100, riskScore))

  // Determinar categoría de riesgo - ahora solo Bajo o Alto (sin Medio)
  let riskCategory = "Riesgo Bajo"
  let textColor = "text-amber-600"

  if (normalizedScore >= 50) {
    riskCategory = "Riesgo Alto"
    textColor = "text-red-600"
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base sm:text-lg">{title}</CardTitle>
        <CardDescription className="text-xs sm:text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs sm:text-sm font-medium">Bajo</span>
            <span className={`text-base sm:text-lg font-bold ${textColor}`}>{riskCategory}</span>
            <span className="text-xs sm:text-sm font-medium">Alto</span>
          </div>

          <div className="h-3 sm:h-4 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-in-out"
              style={{
                width: `${normalizedScore}%`,
                background: `linear-gradient(90deg, 
                  rgb(245, 158, 11) 0%, 
                  rgb(239, 68, 68) 100%)`,
              }}
            ></div>
          </div>

          <div className="flex justify-between text-xs text-gray-500">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
