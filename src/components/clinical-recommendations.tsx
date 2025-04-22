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
  title = "Clinical Recommendations",
  description = "Suggested next steps based on classification results",
}: ClinicalRecommendationsProps) {
  // Define recommendations based on classification
  const getRecommendations = () => {
    switch (classification) {
      case "benign":
        return {
          icon: <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-amber-500" />,
          title: "Short-term Follow-up",
          recommendations: [
            "Follow-up imaging in 6 months to monitor stability",
            "Consider additional diagnostic imaging (e.g., MRI) if clinically indicated",
            "Maintain breast self-awareness and report any changes",
            "Clinical breast examination in 3 months",
          ],
        }
      case "malignant":
        return {
          icon: <AlertCircle className="h-6 w-6 sm:h-8 sm:w-8 text-red-500" />,
          title: "Recommended Biopsy",
          recommendations: [
            "Immediate referral to breast surgeon or oncologist",
            "Core needle biopsy or fine needle aspiration recommended",
            "Additional imaging studies (MRI, CT) to assess extent of disease",
            "Genetic counseling and testing if appropriate",
            "Multidisciplinary tumor board review recommended",
          ],
        }
      default:
        return {
          icon: <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-gray-500" />,
          title: "Indeterminate",
          recommendations: [
            "Additional imaging recommended",
            "Clinical correlation advised",
            "Consider second opinion review",
          ],
        }
    }
  }

  const { icon, title: recommendationTitle, recommendations } = getRecommendations()

  // Add confidence-based qualifier
  let confidenceNote = ""
  if (confidence < 0.7) {
    confidenceNote = "Note: Classification confidence is low. Clinical correlation is strongly advised."
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
