"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ClassificationData {
  benign: number
  malignant: number
}

interface ClassificationPieChartProps {
  data: ClassificationData
  title?: string
  description?: string
}

export function ClassificationPieChart({
  data,
  title = "Classification Results",
  description = "Probability distribution of breast tumor classification",
}: ClassificationPieChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Calculate total to get percentages
  const total = data.benign + data.malignant
  const benignPercent = Math.round((data.benign / total) * 100)
  const malignantPercent = Math.round((data.malignant / total) * 100)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Make canvas responsive
    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (!parent) return

      const size = Math.min(parent.clientWidth, 250)
      canvas.width = size
      canvas.height = size

      drawChart()
    }

    const drawChart = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Set up pie chart
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = Math.min(centerX, centerY) - 10

      // Define colors
      const colors = {
        benign: "#f59e0b", // Amber
        malignant: "#ef4444", // Red
      }

      // Draw pie chart
      let startAngle = 0
      const drawSegment = (value: number, color: string, label: string) => {
        const segmentAngle = (value / total) * 2 * Math.PI

        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.arc(centerX, centerY, radius, startAngle, startAngle + segmentAngle)
        ctx.closePath()

        ctx.fillStyle = color
        ctx.fill()

        // Add label
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

      // Draw segments
      drawSegment(data.benign, colors.benign, `${benignPercent}%`)
      drawSegment(data.malignant, colors.malignant, `${malignantPercent}%`)
    }

    // Initial draw
    resizeCanvas()

    // Redraw on window resize
    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [data, total, benignPercent, malignantPercent])

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
              <span className="text-sm">Benign ({benignPercent}%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
              <span className="text-sm">Malignant ({malignantPercent}%)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
