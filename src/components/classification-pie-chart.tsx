"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card" // Asumiendo que usas Card

interface ClassificationData {
  benign: number;
  malignant: number;
}

interface ClassificationPieChartProps {
  data: ClassificationData | null | undefined; // Permitir que data sea null o undefined
  title?: string; // Añadido: prop opcional para el título
  description?: string; // Añadido: prop opcional para la descripción
}

const colors = {
  benign: "#4CAF50", // Verde
  malignant: "#F44336", // Rojo
}

export function ClassificationPieChart({
  data,
  title = "Distribución de Probabilidad", // Añadido: valor por defecto para el título
  description = "Probabilidades de clasificación benigna vs. maligna", // Añadido: valor por defecto para la descripción
}: ClassificationPieChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Validar datos y calcular porcentajes y fracciones
  const numBenign = (data && typeof data.benign === 'number' && !isNaN(data.benign)) ? data.benign : 0;
  const numMalignant = (data && typeof data.malignant === 'number' && !isNaN(data.malignant)) ? data.malignant : 0;

  let benignFraction = 0;
  let malignantFraction = 0;
  let benignPercent = 0;
  let malignantPercent = 0;

  const totalProb = numBenign + numMalignant;

  if (totalProb > 0) {
    benignFraction = numBenign / totalProb;
    malignantFraction = numMalignant / totalProb;
    benignPercent = Math.round(benignFraction * 100);
    malignantPercent = Math.round(malignantFraction * 100);

    // Ajuste para que la suma de porcentajes sea 100% debido a redonde
  }
  // Si total es 0 porque numBenign y numMalignant son 0 (porque data.benign/malignant eran undefined/NaN),
  // benignPercent y malignantPercent permanecerán en 0, lo cual es mejor que NaN.

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Hacer el canvas responsivo
    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (!parent) return

      const size = Math.min(parent.clientWidth, 250)
      canvas.width = size
      canvas.height = size

      drawChart()
    }

    const drawChart = () => {
      // Limpiar canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Configurar gráfico circular
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = Math.min(centerX, centerY) - 10

      // Definir colores
      const colors = {
        benign: "#f59e0b", // Ámbar
        malignant: "#ef4444", // Rojo
      }

      // Dibujar gráfico circular
      let startAngle = 0
      const drawSegment = (value: number, color: string, label: string) => {
        // Ensure total is not zero before drawing to avoid division by zero
        if (totalProb <= 0 || value <= 0) return; // Corregido: total -> totalProb

        const segmentAngle = (value / totalProb) * 2 * Math.PI // Corregido: total -> totalProb

        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.arc(centerX, centerY, radius, startAngle, startAngle + segmentAngle)
        ctx.closePath()

        ctx.fillStyle = color
        ctx.fill()

        // Añadir etiqueta
        const midAngle = startAngle + segmentAngle / 2
        const labelRadius = radius * 0.7
        const labelX = centerX + labelRadius * Math.cos(midAngle)
        const labelY = centerY + labelRadius * Math.sin(midAngle)

        ctx.fillStyle = "#ffffff"
        ctx.font = `bold ${Math.max(12, Math.floor(canvas.width / 20))}px Arial`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(`${label}`, labelX, labelY)

        startAngle += segmentAngle
      }

      // Dibujar segmentos
      if (totalProb > 0) { // Corregido: total -> totalProb
        if (data && data.benign > 0) { // Only draw if there's a value // Asegúrate que data no sea null aquí
            drawSegment(data.benign, colors.benign, `${benignPercent}%`)
        }
        if (data && data.malignant > 0) { // Only draw if there's a value // Asegúrate que data no sea null aquí
            drawSegment(data.malignant, colors.malignant, `${malignantPercent}%`)
        }
      } else {
        // Optional: Draw a message or an empty state if total is 0
        ctx.fillStyle = "#6b7280"; // Gray text
        ctx.font = `normal ${Math.max(12, Math.floor(canvas.width / 18))}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        if (numBenign === 0 && numMalignant === 0 && (data.benign === undefined || data.malignant === undefined)) {
            ctx.fillText("No data available", centerX, centerY);
        } else {
            // This case means both are 0, or data was invalid
            ctx.fillText("0% Benign, 0% Malignant", centerX, centerY);
        }
      }
    }

    // Dibujo inicial
    resizeCanvas()

    // Redibujar al cambiar el tamaño de la ventana
    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [data, totalProb, benignPercent, malignantPercent]) // Corregido: total -> totalProb

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base sm:text-lg">{title}</CardTitle>
        <CardDescription className="text-xs sm:text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="relative w-full max-w-[250px] aspect-square">
            <canvas ref={canvasRef} className="w-full h-full" />
          </div>
          <div className="flex justify-center gap-4 mt-4 flex-wrap">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-amber-500 rounded-full mr-2"></div>
              <span className="text-sm">Benigno ({benignPercent}%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
              <span className="text-sm">Maligno ({malignantPercent}%)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
