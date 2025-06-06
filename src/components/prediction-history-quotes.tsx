"use client"

import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, Clock } from "lucide-react"

interface PredictionResult {
  id: string
  date: string
  classification: {
    benign: number
    malignant: number
  }
  imageUrl: string
  doctor: string
}

interface PredictionHistoryQuotesProps {
  predictions: PredictionResult[]
}

export function PredictionHistoryQuotes({ predictions }: PredictionHistoryQuotesProps) {
  if (!predictions.length) {
    return <div className="text-center text-muted-foreground py-8">No hay predicciones previas disponibles</div>
  }

  // Ordenar predicciones por fecha (más reciente primero)
  const sortedPredictions = [...predictions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="space-y-4">
      {sortedPredictions.map((prediction) => {
        const { benign, malignant } = prediction.classification
        const total = benign + malignant

        const benignPercentage = (benign / total) * 100
        const malignantPercentage = (malignant / total) * 100

        let dominantClass: "benign" | "malignant"
        let icon
        let borderColor: string

        if (malignantPercentage >= 50) {
          dominantClass = "malignant"
          icon = <AlertCircle className="h-5 w-5 text-red-500" />
          borderColor = "border-red-200"
        } else {
          dominantClass = "benign"
          icon = <Clock className="h-5 w-5 text-amber-500" />
          borderColor = "border-amber-200"
        }

        // Traducir la clase dominante
        const translatedClass = dominantClass === "benign" ? "benigno" : "maligno"

        return (
          <Card key={prediction.id} className={`border-l-4 ${borderColor}`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-2">
                <div className="mt-1">{icon}</div>
                <div className="flex-1">
                  <blockquote className="text-xs sm:text-sm italic">
                    "El análisis de ultrasonido mamario indica un hallazgo {translatedClass} con
                    {dominantClass === "benign"
                      ? ` ${benignPercentage.toFixed(1)}%`
                      : ` ${malignantPercentage.toFixed(1)}%`}{" "}
                    de confianza."
                  </blockquote>
                  <div className="mt-2 flex flex-col sm:flex-row sm:justify-between text-xs text-muted-foreground">
                    <span>Dr. {prediction.doctor}</span>
                    <span className="mt-1 sm:mt-0">{prediction.date}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
