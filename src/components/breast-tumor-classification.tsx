"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { InfoIcon, Download, FileText, Calendar } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { ClassificationPieChart } from "@/components/classification-pie-chart"
import { RiskLevelBar } from "@/components/risk-level-bar"
import { ClinicalRecommendations } from "@/components/clinical-recommendations"

// Mock prediction results for breast tumor classification (removed 'normal' classification)
const mockPredictions = [
  {
    id: "1",
    date: "14 de abril, 2025",
    model: "BreastNet v3.2",
    imageId: "1",
    results: {
      classification: {
        benign: 0.3,
        malignant: 0.7,
      },
      primaryClass: "malignant" as const,
      confidence: 0.92,
      riskScore: 75,
      findings: ["Masa irregular con márgenes espiculados", "Sombra acústica posterior"],
      additionalDetails:
        "Masa hipoecoica que mide 2.1 x 1.8 cm con márgenes irregulares y ecos internos heterogéneos. Los hallazgos son altamente sospechosos de malignidad.",
    },
  },
  {
    id: "2",
    date: "10 de abril, 2025",
    model: "BreastNet v3.1",
    imageId: "3",
    results: {
      classification: {
        benign: 0.75,
        malignant: 0.25,
      },
      primaryClass: "benign" as const,
      confidence: 0.87,
      riskScore: 40,
      findings: ["Masa bien circunscrita", "Sin características acústicas posteriores"],
      additionalDetails:
        "Masa hipoecoica bien definida que mide 1.5 x 1.3 cm con márgenes lisos. Las características son consistentes con una lesión benigna, probablemente un fibroadenoma.",
    },
  },
  {
    id: "3",
    date: "28 de marzo, 2025",
    model: "BreastNet v3.0",
    imageId: "2",
    results: {
      classification: {
        benign: 0.9,
        malignant: 0.1,
      },
      primaryClass: "benign" as const,
      confidence: 0.95,
      riskScore: 25,
      findings: ["Masa bien definida", "Sin calcificaciones sospechosas"],
      additionalDetails:
        "Masa bien definida con ecos internos homogéneos. Sin calcificaciones sospechosas ni distorsión arquitectónica. Las características son consistentes con una lesión benigna.",
    },
  },
]

export function BreastTumorClassification() {
  const [activeTab, setActiveTab] = useState("results")
  const [selectedPrediction, setSelectedPrediction] = useState<(typeof mockPredictions)[0] | null>(null)
  const [isReportOpen, setIsReportOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const handleViewReport = (prediction: (typeof mockPredictions)[0]) => {
    setSelectedPrediction(prediction)
    setIsReportOpen(true)
  }

  const handleViewDetails = (prediction: (typeof mockPredictions)[0]) => {
    setSelectedPrediction(prediction)
    setIsDetailsOpen(true)
  }

  // Función para traducir la clasificación primaria
  const translatePrimaryClass = (primaryClass: string) => {
    return primaryClass === "benign" ? "Benigno" : "Maligno"
  }

  return (
    <div className="grid gap-4">
      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Integración de Aprendizaje Automático Lista</AlertTitle>
        <AlertDescription>
          Esta sección mostrará los resultados de clasificación de tumores mamarios del modelo de IA una vez integrado.
          Actualmente muestra datos de ejemplo.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="results" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="results">Últimos Resultados</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
        </TabsList>
        <TabsContent value="results" className="mt-4">
          {mockPredictions.length > 0 ? (
            <div className="grid gap-6">
              <Card>
                <CardHeader className="pb-2 flex flex-col sm:flex-row justify-between">
                  <div>
                    <CardTitle className="text-xl md:text-2xl">Última Clasificación</CardTitle>
                    <CardDescription className="text-sm">
                      Modelo: {mockPredictions[0].model} | Confianza:{" "}
                      {(mockPredictions[0].results.confidence * 100).toFixed(1)}%
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="self-start sm:self-center mt-2 sm:mt-0">
                    {mockPredictions[0].date}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="border rounded-lg p-4">
                      <div className="text-sm font-medium text-muted-foreground mb-2">Clasificación Primaria</div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded-full ${
                            mockPredictions[0].results.primaryClass === "benign" ? "bg-amber-500" : "bg-red-500"
                          }`}
                        ></div>
                        <div className="text-xl md:text-2xl font-bold capitalize">
                          {translatePrimaryClass(mockPredictions[0].results.primaryClass)}
                        </div>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="text-sm font-medium text-muted-foreground mb-2">Nivel de Riesgo</div>
                      <div className="text-xl md:text-2xl font-bold">{mockPredictions[0].results.riskScore}/100</div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div
                          className={`h-2.5 rounded-full ${
                            mockPredictions[0].results.riskScore < 50 ? "bg-amber-500" : "bg-red-500"
                          }`}
                          style={{ width: `${mockPredictions[0].results.riskScore}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 mt-4">
                    <div className="text-sm font-medium text-muted-foreground mb-2">Hallazgos Clave</div>
                    <ul className="mt-1 space-y-1 list-disc pl-5">
                      {mockPredictions[0].results.findings.map((finding, index) => (
                        <li key={index} className="text-sm md:text-base">
                          {finding}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto"
                    onClick={() => handleViewReport(mockPredictions[0])}
                  >
                    <span className="hidden sm:inline mr-1">Ver</span> Informe Completo
                  </Button>
                </CardFooter>
              </Card>

              <div className="grid gap-6 md:grid-cols-2">
                <ClassificationPieChart data={mockPredictions[0].results.classification} />
                <RiskLevelBar riskScore={mockPredictions[0].results.riskScore} />
              </div>

              <ClinicalRecommendations
                classification={mockPredictions[0].results.primaryClass}
                confidence={mockPredictions[0].results.confidence}
              />
            </div>
          ) : (
            <div className="text-center p-8">
              <p className="text-muted-foreground">No hay resultados de clasificación disponibles aún.</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="history" className="mt-4">
          <div className="space-y-6">
            {mockPredictions.map((prediction) => (
              <Card key={prediction.id} className="overflow-hidden">
                <CardHeader className="pb-2 flex flex-col sm:flex-row justify-between">
                  <div>
                    <CardTitle className="text-base">Clasificación #{prediction.id}</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Modelo: {prediction.model} | ID de Imagen: {prediction.imageId}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="self-start sm:self-center mt-2 sm:mt-0">
                    {prediction.date}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="relative p-4 my-2 bg-muted rounded-lg border border-border">
                    <div className="absolute top-0 left-4 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 inline mr-1" />
                      {prediction.date}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          prediction.results.primaryClass === "benign" ? "bg-amber-500" : "bg-red-500"
                        }`}
                      ></div>
                      <div className="text-base sm:text-lg font-bold capitalize">
                        {translatePrimaryClass(prediction.results.primaryClass)}
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground ml-auto">
                        Confianza: {(prediction.results.confidence * 100).toFixed(1)}%
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm">{prediction.results.additionalDetails}</p>
                    <div className="flex justify-end mt-2">
                      <Button
                        variant="link"
                        size="sm"
                        className="h-8 px-2"
                        onClick={() => handleViewDetails(prediction)}
                      >
                        Ver Detalles
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal de Informe Completo */}
      <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Informe de Clasificación Completo</DialogTitle>
            <DialogDescription>
              {selectedPrediction && (
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-1">
                  <span>Fecha: {selectedPrediction.date}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>Modelo: {selectedPrediction.model}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>Confianza: {(selectedPrediction.results.confidence * 100).toFixed(1)}%</span>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>

          {selectedPrediction && (
            <div className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Resultados de Clasificación</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                          Benigno:
                        </span>
                        <span>{(selectedPrediction.results.classification.benign * 100).toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          Maligno:
                        </span>
                        <span>{(selectedPrediction.results.classification.malignant * 100).toFixed(1)}%</span>
                      </div>
                      <div className="pt-2 mt-2 border-t">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Clasificación Primaria:</span>
                          <span className="capitalize font-bold">
                            {translatePrimaryClass(selectedPrediction.results.primaryClass)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Hallazgos Clave</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedPrediction.results.findings.map((finding, index) => (
                        <li key={index} className="text-sm">
                          {finding}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Análisis Detallado</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{selectedPrediction.results.additionalDetails}</p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ClassificationPieChart data={selectedPrediction.results.classification} />
                <RiskLevelBar riskScore={selectedPrediction.results.riskScore} />
              </div>

              <ClinicalRecommendations
                classification={selectedPrediction.results.primaryClass}
                confidence={selectedPrediction.results.confidence}
              />
            </div>
          )}

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setIsReportOpen(false)} className="w-full sm:w-auto">
              Cerrar
            </Button>
            <Button className="gap-2 w-full sm:w-auto">
              <Download className="h-4 w-4" />
              Descargar PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Ver Detalles */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalles de Clasificación</DialogTitle>
            <DialogDescription>
              {selectedPrediction && (
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-1">
                  <span>Fecha: {selectedPrediction.date}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>Modelo: {selectedPrediction.model}</span>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>

          {selectedPrediction && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="border rounded-md p-3">
                  <div className="text-sm font-medium text-muted-foreground">Clasificación</div>
                  <div className="text-lg sm:text-xl font-bold capitalize">
                    {translatePrimaryClass(selectedPrediction.results.primaryClass)}
                  </div>
                </div>
                <div className="border rounded-md p-3">
                  <div className="text-sm font-medium text-muted-foreground">Nivel de Riesgo</div>
                  <div className="text-lg sm:text-xl font-bold">{selectedPrediction.results.riskScore}/100</div>
                </div>
              </div>

              <div className="border rounded-md p-3">
                <div className="text-sm font-medium text-muted-foreground">Puntuación de Confianza</div>
                <div className="text-lg sm:text-xl font-bold">
                  {(selectedPrediction.results.confidence * 100).toFixed(1)}%
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-primary h-2.5 rounded-full"
                    style={{ width: `${selectedPrediction.results.confidence * 100}%` }}
                  />
                </div>
              </div>

              <div className="border rounded-md p-3">
                <div className="text-sm font-medium text-muted-foreground">Hallazgos</div>
                <ul className="mt-1 space-y-1 list-disc pl-5">
                  {selectedPrediction.results.findings.map((finding, index) => (
                    <li key={index} className="text-sm">
                      {finding}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border rounded-md p-3">
                <div className="text-sm font-medium text-muted-foreground">Detalles Adicionales</div>
                <p className="mt-1 text-sm">{selectedPrediction.results.additionalDetails}</p>
              </div>
            </div>
          )}

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setIsDetailsOpen(false)} className="w-full sm:w-auto">
              Cerrar
            </Button>
            <Button
              variant="default"
              className="gap-2 w-full sm:w-auto"
              onClick={() => {
                setIsDetailsOpen(false)
                handleViewReport(selectedPrediction!)
              }}
            >
              <FileText className="h-4 w-4" />
              Ver Informe Completo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
