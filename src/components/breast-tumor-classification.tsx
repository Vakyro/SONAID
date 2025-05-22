"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsivePie } from "@nivo/pie"; // Asumo que usas nivo/pie o similar, ajusta si es ClassificationPieChart
import { ClassificationPieChart } from "./classification-pie-chart"; // O tu componente de gráfica
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Thermometer, Activity, FileText, Users, CalendarDays, ShieldAlert, ShieldCheck } from "lucide-react";

interface ClassificationData {
  benign: number;
  malignant: number;
}

interface PredictionResults {
  classification: ClassificationData;
  primaryClass: "benign" | "malignant";
  confidence: number;
  riskScore: number;
  findings: string[];
  // Asegúrate que todos los campos que esperas de localStorage estén aquí
}

interface Prediction {
  id: string;
  date: string;
  model: string;
  imageId: string;
  results: PredictionResults;
}

// ... (código existente como getRiskLevelText, getRiskLevelIcon)

export function BreastTumorClassification() {
  const [displayPrediction, setDisplayPrediction] = useState<Prediction | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("BreastTumorClassification: useEffect para cargar datos de localStorage.");
    setError(null); // Limpiar errores previos
    const storedPredictionData = localStorage.getItem('latestPrediction');
    
    if (!storedPredictionData) {
      console.warn("No se encontraron datos de predicción en localStorage.");
      setError("No hay datos de predicción disponibles para mostrar.");
      setDisplayPrediction(null);
      return;
    }

    try {
      const parsedData = JSON.parse(storedPredictionData);
      console.log("Datos parseados de localStorage:", parsedData);

      // Validación exhaustiva de la estructura y tipos de datos esperados
      if (
        parsedData &&
        parsedData.results &&
        parsedData.results.classification &&
        typeof parsedData.results.classification.benign === 'number' &&
        typeof parsedData.results.classification.malignant === 'number' &&
        (parsedData.results.primaryClass === "benign" || parsedData.results.primaryClass === "malignant") &&
        typeof parsedData.results.confidence === 'number' &&
        typeof parsedData.results.riskScore === 'number' &&
        Array.isArray(parsedData.results.findings)
      ) {
        const newPrediction: Prediction = {
          id: `pred_${Date.now()}`,
          date: new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }),
          model: "Modelo IA (ONNX)", // O tomar de parsedData si está disponible
          imageId: parsedData.imageId || "Imagen Reciente", // O tomar de parsedData
          results: {
            classification: {
              benign: parsedData.results.classification.benign,
              malignant: parsedData.results.classification.malignant,
            },
            primaryClass: parsedData.results.primaryClass,
            confidence: parsedData.results.confidence,
            riskScore: parsedData.results.riskScore,
            findings: parsedData.results.findings,
          },
        };
        console.log("Estableciendo nuevo estado displayPrediction:", newPrediction);
        setDisplayPrediction(newPrediction);
      } else {
        console.error("La estructura de los datos de predicción en localStorage es inválida o incompleta:", parsedData);
        setError("Los datos de predicción recuperados son inválidos.");
        setDisplayPrediction(null);
      }
    } catch (e) {
      console.error("Error al parsear los datos de predicción de localStorage:", e);
      setError("Error al procesar los datos de predicción.");
      setDisplayPrediction(null);
    }
  }, []); // El array vacío asegura que se ejecute al montar el componente.
          // Si navegas a la misma ruta, Next.js debería desmontar y montar la página.

  if (error) {
    return (
      <Alert variant="destructive" className="mt-4">
        <ShieldAlert className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!displayPrediction) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Resultados de Clasificación del Tumor de Mama</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Cargando resultados o no hay predicción disponible...</p>
        </CardContent>
      </Card>
    );
  }

  // El resto de tu JSX para mostrar la información usando displayPrediction
  // ... (ejemplo de cómo podrías estar mostrando los datos)
  const { classification, primaryClass, confidence, riskScore, findings } = displayPrediction.results;
  const riskLevelText = getRiskLevelText(riskScore); // Asumiendo que tienes esta función
  const RiskIcon = getRiskLevelIcon(riskScore); // Asumiendo que tienes esta función

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-6 w-6" />
            Resultados de Clasificación del Tumor de Mama
          </CardTitle>
          <CardDescription>
            Análisis detallado proporcionado por el modelo de IA SONAID. Fecha: {displayPrediction.date}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Resumen de la Predicción</h3>
              <div className="space-y-2 text-sm">
                <p className="flex items-center">
                  <Activity className="h-4 w-4 mr-2 text-primary" />
                  Clasificación Primaria: <span className={`font-semibold ${primaryClass === 'malignant' ? 'text-destructive' : 'text-green-600'}`}>{primaryClass === "malignant" ? "Maligno" : "Benigno"}</span>
                </p>
                <p className="flex items-center">
                  <Thermometer className="h-4 w-4 mr-2 text-primary" />
                  Nivel de Riesgo Estimado: <span className="font-semibold">{riskScore} / 100</span>
                </p>
                <p className="flex items-center">
                  <RiskIcon className={`h-4 w-4 mr-2 ${riskScore >= 50 ? 'text-destructive' : 'text-green-600'}`} />
                  Interpretación del Riesgo: <span className="font-semibold">{riskLevelText}</span>
                </p>
                <p className="flex items-center">
                  <ShieldCheck className="h-4 w-4 mr-2 text-primary" />
                  Confianza del Modelo: <span className="font-semibold">{(confidence * 100).toFixed(1)}%</span>
                </p>
              </div>
              <div className="mt-4">
                <h4 className="font-semibold mb-1">Hallazgos Clave:</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {findings.map((finding, index) => <li key={index}>{finding}</li>)}
                </ul>
              </div>
            </div>
            <div className="min-h-[300px]"> {/* Contenedor para la gráfica */}
              <h3 className="text-lg font-semibold mb-2 text-center">Distribución de Probabilidad</h3>
              {classification && typeof classification.benign === 'number' && typeof classification.malignant === 'number' ? (
                <ClassificationPieChart data={classification} />
              ) : (
                <p className="text-center text-muted-foreground">Datos de clasificación no disponibles para la gráfica.</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      {/* ... más cards o información ... */}
    </div>
  );
}

// Funciones de ayuda (debes tenerlas definidas o adaptarlas)
function getRiskLevelText(riskScore: number): string {
  if (riskScore >= 70) return "Alto";
  if (riskScore >= 30) return "Moderado";
  return "Bajo";
}

function getRiskLevelIcon(riskScore: number) {
  if (riskScore >= 70) return ShieldAlert; // Icono para riesgo alto
  if (riskScore >= 30) return ShieldAlert; // Icono para riesgo moderado (puedes cambiarlo)
  return ShieldCheck; // Icono para riesgo bajo
}