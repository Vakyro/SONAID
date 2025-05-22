"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Upload, X } from "lucide-react"
import Image from "next/image"

interface ImageValidatorProps {
  onValidImage: (file: File) => void
  onAnalyze?: (file: File) => void  // Modified: onAnalyze will now receive the file
}

export function ImageValidator({ onValidImage, onAnalyze }: ImageValidatorProps) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isValidating, setIsValidating] = useState(false)
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean
    message: string
  } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
      validateImage(selectedFile)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const selectedFile = e.dataTransfer.files[0]
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
      validateImage(selectedFile)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const resetFile = () => {
    if (preview) {
      URL.revokeObjectURL(preview)
    }
    setFile(null)
    setPreview(null)
    setValidationResult(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const validateImage = (imageFile: File) => {
    setIsValidating(true); // Puedes mantener esto brevemente para la UI si quieres, o quitarlo.
    // Para una validación "falsa" instantánea, podrías incluso quitar setIsValidating(true)
    // y el estado de carga en la UI para la validación.

    // 1. Verificar tipo de archivo (esto es una validación básica que podemos mantener)
    const validTypes = ["image/jpeg", "image/png", "image/dicom", "application/dicom"];
    if (!validTypes.includes(imageFile.type)) {
      setIsValidating(false);
      setValidationResult({
        isValid: false,
        message: "Tipo de archivo inválido. Por favor, suba una imagen JPEG, PNG o DICOM.",
      });
      return;
    }

    // 2. Simular validación exitosa inmediatamente (sin setTimeout ni mockValidation)
    setIsValidating(false); // Indicar que la "validación" terminó
    setValidationResult({
      isValid: true,
      message: "Imagen 'validada' con éxito (simulado). Lista para análisis.",
    });

    // 3. Llamar a onValidImage para pasar el archivo al componente padre
    onValidImage(imageFile);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Validación de Imagen</CardTitle>
        <CardDescription>
          Suba una imagen de ultrasonido o mamografía de mama para validación antes del análisis
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!file ? (
          <div
            className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 transition-colors hover:bg-muted/50 cursor-pointer"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={handleBrowseClick}
          >
            <Upload className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Arrastre y suelte su imagen de ultrasonido o mamografía de mama aquí
            </p>
            <p className="text-xs text-muted-foreground">Formatos soportados: JPEG, PNG, DICOM</p>
            <input
              type="file"
              accept="image/jpeg,image/png,application/dicom"
              className="hidden"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                handleBrowseClick()
              }}
            >
              Explorar Archivos
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative aspect-video w-full max-h-[300px] overflow-hidden rounded-lg border">
              {preview && (
                <Image
                  src={preview || "/placeholder.svg"}
                  alt="Vista previa de imagen"
                  fill
                  className="object-contain"
                />
              )}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/30 hover:bg-black/50 text-white"
                onClick={resetFile}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {isValidating ? (
              <div className="flex items-center justify-center p-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                <span className="ml-2">Validando imagen...</span>
              </div>
            ) : validationResult ? (
              <Alert variant={validationResult.isValid ? "default" : "destructive"}>
                {validationResult.isValid ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                <AlertTitle>{validationResult.isValid ? "Validación Exitosa" : "Validación Fallida"}</AlertTitle>
                <AlertDescription>{validationResult.message}</AlertDescription>
              </Alert>
            ) : null}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {file && (
          <Button variant="outline" onClick={resetFile}>
            Reiniciar
          </Button>
        )}
        {file && validationResult?.isValid && onAnalyze && ( // Ensure onAnalyze and file exist
          <Button onClick={() => file && onAnalyze(file)}> 
            {/* Modified: Pass the 'file' state to onAnalyze */}
            Proceder al Análisis
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
