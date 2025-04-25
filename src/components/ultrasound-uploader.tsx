"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, X, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface UltrasoundUploaderProps {
  existingImages?: boolean
}

export function UltrasoundUploader({ existingImages = false }: UltrasoundUploaderProps) {
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [validationError, setValidationError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Imágenes existentes simuladas para modo de edición
  const mockExistingImages = existingImages
    ? [
        {
          id: "1",
          name: "ultrasonido-mama-1.jpg",
          preview: "/placeholder.svg?height=200&width=300",
          title: "Ultrasonido de Mama Izquierda",
        },
        {
          id: "2",
          name: "mamografia-mama-1.jpg",
          preview: "/placeholder.svg?height=200&width=300",
          title: "Mamografía de Mama Derecha",
        },
      ]
    : []

  // Función para validar si la imagen es un ultrasonido o mamografía de mama
  const validateBreastImage = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      // En una aplicación real, usarías aprendizaje automático o análisis de imágenes
      // para determinar si la imagen es un ultrasonido o mamografía de mama
      // Para esta demostración, simularemos la validación con un timeout
      setTimeout(() => {
        // Para fines de demostración, aceptaremos la mayoría de las imágenes pero rechazaremos algunas basadas en tamaño
        // En una aplicación real, usarías análisis de imagen real
        const isValid = file.size < 5000000 // Menos de 5MB para fines de demostración
        resolve(isValid)
      }, 500)
    })
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setValidationError(null)
      const newFiles = Array.from(e.target.files)

      // Validar cada archivo
      for (const file of newFiles) {
        const isValid = await validateBreastImage(file)
        if (!isValid) {
          setValidationError(
            "Una o más imágenes no parecen ser imágenes de ultrasonido o mamografía de mama. Por favor, suba imágenes válidas de mama.",
          )
          return
        }
      }

      setFiles([...files, ...newFiles])

      // Crear URLs de vista previa
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file))
      setPreviews([...previews, ...newPreviews])
    }
  }

  const removeFile = (index: number) => {
    const newFiles = [...files]
    const newPreviews = [...previews]

    // Revocar la URL del objeto para evitar fugas de memoria
    URL.revokeObjectURL(newPreviews[index])

    newFiles.splice(index, 1)
    newPreviews.splice(index, 1)

    setFiles(newFiles)
    setPreviews(newPreviews)
  }

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setValidationError(null)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files)

      // Validar cada archivo
      for (const file of newFiles) {
        const isValid = await validateBreastImage(file)
        if (!isValid) {
          setValidationError(
            "Una o más imágenes no parecen ser imágenes de ultrasonido o mamografía de mama. Por favor, suba imágenes válidas de mama.",
          )
          return
        }
      }

      setFiles([...files, ...newFiles])

      // Crear URLs de vista previa
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file))
      setPreviews([...previews, ...newPreviews])
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="ultrasound-images">Subir Imágenes de Ultrasonido/Mamografía de Mama</Label>
        <div
          className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 transition-colors hover:bg-muted/50 cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={handleBrowseClick}
        >
          <Upload className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Arrastre y suelte sus imágenes de ultrasonido o mamografía de mama aquí
          </p>
          <p className="text-xs text-muted-foreground">Formatos soportados: JPEG, PNG, DICOM</p>
          <Input
            id="ultrasound-images"
            type="file"
            accept="image/jpeg,image/png,application/dicom"
            multiple
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
      </div>

      {validationError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error de Validación</AlertTitle>
          <AlertDescription>{validationError}</AlertDescription>
        </Alert>
      )}

      {existingImages && mockExistingImages.length > 0 && (
        <div className="grid gap-2">
          <Label>Imágenes Existentes</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {mockExistingImages.map((image) => (
              <div key={image.id} className="border rounded-lg p-2 relative">
                <div className="relative aspect-video mb-2">
                  <Image
                    src={image.preview || "/placeholder.svg"}
                    alt={image.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <p className="text-sm font-medium truncate">{image.title}</p>
                <p className="text-xs text-muted-foreground truncate">{image.name}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1 right-1 h-6 w-6 rounded-full bg-black/30 hover:bg-black/50 text-white"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {previews.length > 0 && (
        <div className="grid gap-2">
          <Label>Archivos Seleccionados</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="border rounded-lg p-2 relative">
                <div className="relative aspect-video mb-2">
                  <Image
                    src={preview || "/placeholder.svg"}
                    alt={`Vista previa ${index + 1}`}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <p className="text-sm font-medium truncate">{files[index].name}</p>
                <p className="text-xs text-muted-foreground truncate">{Math.round(files[index].size / 1024)} KB</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1 right-1 h-6 w-6 rounded-full bg-black/30 hover:bg-black/50 text-white"
                  onClick={() => removeFile(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {previews.length > 0 && (
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="image-title">Título de la Imagen</Label>
            <Input id="image-title" placeholder="p. ej., Ultrasonido de Mama Izquierda" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image-description">Descripción</Label>
            <Textarea id="image-description" placeholder="Ingrese una descripción de la imagen mamaria..." rows={3} />
          </div>
          <Button type="button" className="w-full sm:w-auto">
            Subir {previews.length} {previews.length === 1 ? "Imagen" : "Imágenes"}
          </Button>
        </div>
      )}
    </div>
  )
}
