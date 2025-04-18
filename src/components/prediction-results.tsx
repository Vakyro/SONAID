"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { InfoIcon } from "lucide-react"

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
    },
  },
]

export function PredictionResults() {
  const [activeTab, setActiveTab] = useState("results")

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
                <Button variant="outline" size="sm" className="ml-auto">
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
                  <Button variant="link" size="sm" className="h-8 px-2 ml-auto">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
