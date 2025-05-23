"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { InfoIcon, Download, FileText } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

// Mock prediction results
const mockPredictions = [
  {
    id: "1",
    date: "April 14, 2025",
    model: "CardioNet v2.1",
    imageId: "1",
    results: {
      ejectionFraction: "55%",
      leftVentricularMass: "Normal",
      wallMotion: "Normal",
      confidence: 0.92,
      abnormalities: ["None detected"],
      additionalDetails:
        "Left ventricular function appears normal. Chamber sizes are within normal limits. No significant valvular abnormalities detected.",
    },
  },
  {
    id: "2",
    date: "April 10, 2025",
    model: "CardioNet v2.0",
    imageId: "3",
    results: {
      ejectionFraction: "52%",
      leftVentricularMass: "Normal",
      wallMotion: "Mild hypokinesis",
      confidence: 0.87,
      abnormalities: ["Mild hypokinesis in inferior wall"],
      additionalDetails:
        "Mild hypokinesis noted in the inferior wall. Left ventricular ejection fraction is at the lower end of normal range. No significant valvular abnormalities.",
    },
  },
]

export function PredictionResults() {
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

  return (
    <div className="grid gap-4">
      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Machine Learning Integration Ready</AlertTitle>
        <AlertDescription>
          This section will display prediction results from the ML model once integrated. Currently showing sample data.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="results" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="results">Prediction Results</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="results" className="mt-4">
          {mockPredictions.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Latest Prediction</span>
                  <Badge variant="outline">{mockPredictions[0].date}</Badge>
                </CardTitle>
                <CardDescription>
                  Model: {mockPredictions[0].model} | Confidence:{" "}
                  {(mockPredictions[0].results.confidence * 100).toFixed(1)}%
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border rounded-lg p-3">
                      <div className="text-sm font-medium text-muted-foreground">Ejection Fraction</div>
                      <div className="text-2xl font-bold">{mockPredictions[0].results.ejectionFraction}</div>
                    </div>
                    <div className="border rounded-lg p-3">
                      <div className="text-sm font-medium text-muted-foreground">Left Ventricular Mass</div>
                      <div className="text-2xl font-bold">{mockPredictions[0].results.leftVentricularMass}</div>
                    </div>
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="text-sm font-medium text-muted-foreground">Wall Motion</div>
                    <div className="text-xl font-bold">{mockPredictions[0].results.wallMotion}</div>
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="text-sm font-medium text-muted-foreground">Detected Abnormalities</div>
                    <ul className="mt-1 space-y-1">
                      {mockPredictions[0].results.abnormalities.map((abnormality, index) => (
                        <li key={index} className="text-base">
                          {abnormality}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-auto"
                  onClick={() => handleViewReport(mockPredictions[0])}
                >
                  View Full Report
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="text-center p-8">
              <p className="text-muted-foreground">No prediction results available yet.</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="history" className="mt-4">
          <div className="space-y-4">
            {mockPredictions.map((prediction) => (
              <Card key={prediction.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center justify-between">
                    <span>Prediction #{prediction.id}</span>
                    <Badge variant="outline">{prediction.date}</Badge>
                  </CardTitle>
                  <CardDescription>
                    Model: {prediction.model} | Image ID: {prediction.imageId}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="font-medium">Ejection Fraction:</span> {prediction.results.ejectionFraction}
                    </div>
                    <div>
                      <span className="font-medium">LV Mass:</span> {prediction.results.leftVentricularMass}
                    </div>
                    <div>
                      <span className="font-medium">Wall Motion:</span> {prediction.results.wallMotion}
                    </div>
                    <div>
                      <span className="font-medium">Confidence:</span>{" "}
                      {(prediction.results.confidence * 100).toFixed(1)}%
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button
                    variant="link"
                    size="sm"
                    className="h-8 px-2 ml-auto"
                    onClick={() => handleViewDetails(prediction)}
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Full Report Modal */}
      <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Full Prediction Report</DialogTitle>
            <DialogDescription>
              {selectedPrediction && (
                <div className="flex items-center gap-2 mt-1">
                  <span>Date: {selectedPrediction.date}</span>
                  <span>•</span>
                  <span>Model: {selectedPrediction.model}</span>
                  <span>•</span>
                  <span>Confidence: {(selectedPrediction.results.confidence * 100).toFixed(1)}%</span>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>

          {selectedPrediction && (
            <div className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Cardiac Function</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Ejection Fraction:</span>
                        <span>{selectedPrediction.results.ejectionFraction}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Left Ventricular Mass:</span>
                        <span>{selectedPrediction.results.leftVentricularMass}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Wall Motion:</span>
                        <span>{selectedPrediction.results.wallMotion}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Abnormalities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedPrediction.results.abnormalities.map((abnormality, index) => (
                        <li key={index}>{abnormality}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Detailed Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{selectedPrediction.results.additionalDetails}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    {selectedPrediction.results.abnormalities[0] === "None detected"
                      ? "No specific recommendations based on this ultrasound. Continue standard care protocol."
                      : "Consider follow-up echocardiogram in 3-6 months to monitor wall motion abnormalities. Evaluate for potential ischemic heart disease."}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReportOpen(false)}>
              Close
            </Button>
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Details Modal */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Prediction Details</DialogTitle>
            <DialogDescription>
              {selectedPrediction && (
                <div className="flex items-center gap-2 mt-1">
                  <span>Date: {selectedPrediction.date}</span>
                  <span>•</span>
                  <span>Model: {selectedPrediction.model}</span>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>

          {selectedPrediction && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="border rounded-md p-3">
                  <div className="text-sm font-medium text-muted-foreground">Ejection Fraction</div>
                  <div className="text-xl font-bold">{selectedPrediction.results.ejectionFraction}</div>
                </div>
                <div className="border rounded-md p-3">
                  <div className="text-sm font-medium text-muted-foreground">LV Mass</div>
                  <div className="text-xl font-bold">{selectedPrediction.results.leftVentricularMass}</div>
                </div>
              </div>

              <div className="border rounded-md p-3">
                <div className="text-sm font-medium text-muted-foreground">Wall Motion</div>
                <div className="text-xl font-bold">{selectedPrediction.results.wallMotion}</div>
              </div>

              <div className="border rounded-md p-3">
                <div className="text-sm font-medium text-muted-foreground">Confidence Score</div>
                <div className="text-xl font-bold">{(selectedPrediction.results.confidence * 100).toFixed(1)}%</div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-primary h-2.5 rounded-full"
                    style={{ width: `${selectedPrediction.results.confidence * 100}%` }}
                  />
                </div>
              </div>

              <div className="border rounded-md p-3">
                <div className="text-sm font-medium text-muted-foreground">Abnormalities</div>
                <ul className="mt-1 space-y-1">
                  {selectedPrediction.results.abnormalities.map((abnormality, index) => (
                    <li key={index} className="text-base">
                      {abnormality}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border rounded-md p-3">
                <div className="text-sm font-medium text-muted-foreground">Additional Details</div>
                <p className="mt-1">{selectedPrediction.results.additionalDetails}</p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
              Close
            </Button>
            <Button
              variant="default"
              className="gap-2"
              onClick={() => {
                setIsDetailsOpen(false)
                handleViewReport(selectedPrediction!)
              }}
            >
              <FileText className="h-4 w-4" />
              View Full Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
