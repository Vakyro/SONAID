import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, AlertTriangle } from "lucide-react"

type ClassificationType = "benign" | "malignant"

interface ClinicalRecommendationsProps {
  classification: ClassificationType
  confidence: number
  title?: string
  description?: string
}

export function ClinicalRecommendations({
  classification,
  confidence,
  title = "Recomendaciones Clínicas",
  description = "Pasos siguientes sugeridos basados en resultados de clasificación",
}: ClinicalRecommendationsProps) {
  // Definir recomendaciones basadas en la clasificación
  const getRecommendations = () => {
    switch (classification) {
      case "benign":
        return {
          icon: <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-amber-500" />,
          title: "Seguimiento a Corto Plazo",
          recommendations: [
            "Imágenes de seguimiento en 6 meses para monitorear estabilidad",
            "Considerar imágenes diagnósticas adicionales (p. ej., RM) si está clínicamente indicado",
            "Mantener autoconciencia mamaria e informar cualquier cambio",
            "Examen clínico de mama en 3 meses",
          ],
        }
      case "malignant":
        return {
          icon: <AlertCircle className="h-6 w-6 sm:h-8 sm:w-8 text-red-500" />,
          title: "Biopsia Recomendada",
          recommendations: [
            "Derivación inmediata a cirujano de mama u oncólogo",
            "Se recomienda biopsia con aguja gruesa o aspiración con aguja fina",
            "Estudios de imagen adicionales (RM, TC) para evaluar extensión de la enfermedad",
            "Asesoramiento genético y pruebas si es apropiado",
            "Se recomienda revisión por junta multidisciplinaria de tumores",
          ],
        }
      default:
        return {
          icon: <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-gray-500" />,
          title: "Indeterminado",
          recommendations: [
            "Se recomienda imágenes adicionales",
            "Se aconseja correlación clínica",
            "Considerar segunda opinión",
          ],
        }
    }
  }

  const { icon, title: recommendationTitle, recommendations } = getRecommendations()

  // Añadir nota basada en la confianza
  let confidenceNote = ""
  if (confidence < 0.7) {
    confidenceNote = "Nota: La confianza de clasificación es baja. Se recomienda encarecidamente correlación clínica."
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base sm:text-lg">{title}</CardTitle>
        <CardDescription className="text-xs sm:text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            {icon}
            <h3 className="text-lg sm:text-xl font-semibold">{recommendationTitle}</h3>
          </div>

          <ul className="space-y-2 pl-6 list-disc">
            {recommendations.map((rec, index) => (
              <li key={index} className="text-xs sm:text-sm">
                {rec}
              </li>
            ))}
          </ul>

          {confidenceNote && <div className="mt-2 text-xs sm:text-sm text-amber-600 font-medium">{confidenceNote}</div>}
        </div>
      </CardContent>
    </Card>
  )
}
