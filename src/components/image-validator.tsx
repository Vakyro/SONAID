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
}

export function ImageValidator({ onValidImage }: ImageValidatorProps) {
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
    setIsValidating(true)
    setValidationResult(null)

    // Check file type
    const validTypes = ["image/jpeg", "image/png", "image/dicom", "application/dicom"]
    if (!validTypes.includes(imageFile.type)) {
      setIsValidating(false)
      setValidationResult({
        isValid: false,
        message: "Invalid file type. Please upload a JPEG, PNG, or DICOM image.",
      })
      return
    }

    // Simulate ML-based validation (in a real app, this would call an API)
    setTimeout(() => {
      // Mock validation - in a real app, this would be an actual ML model check
      const mockValidation = Math.random() > 0.2 // 80% chance of success for demo purposes

      setIsValidating(false)
      setValidationResult({
        isValid: mockValidation,
        message: mockValidation
          ? "Image validated successfully. This appears to be a valid breast ultrasound/mammogram image."
          : "This image does not appear to be a breast ultrasound or mammogram. Please upload a valid image.",
      })

      if (mockValidation && file) {
        onValidImage(file)
      }
    }, 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Image Validation</CardTitle>
        <CardDescription>Upload a breast ultrasound or mammogram image for validation before analysis</CardDescription>
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
              Drag and drop your breast ultrasound or mammogram image here
            </p>
            <p className="text-xs text-muted-foreground">Supported formats: JPEG, PNG, DICOM</p>
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
              Browse Files
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative aspect-video w-full max-h-[300px] overflow-hidden rounded-lg border">
              {preview && (
                <Image src={preview || "/placeholder.svg"} alt="Image preview" fill className="object-contain" />
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
                <span className="ml-2">Validating image...</span>
              </div>
            ) : validationResult ? (
              <Alert variant={validationResult.isValid ? "default" : "destructive"}>
                {validationResult.isValid ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                <AlertTitle>{validationResult.isValid ? "Validation Successful" : "Validation Failed"}</AlertTitle>
                <AlertDescription>{validationResult.message}</AlertDescription>
              </Alert>
            ) : null}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {file && (
          <Button variant="outline" onClick={resetFile}>
            Reset
          </Button>
        )}
        {file && validationResult?.isValid && <Button>Proceed to Analysis</Button>}
      </CardFooter>
    </Card>
  )
}
