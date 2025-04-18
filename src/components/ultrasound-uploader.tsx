"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, X } from "lucide-react"

interface UltrasoundUploaderProps {
  existingImages?: boolean
}

export function UltrasoundUploader({ existingImages = false }: UltrasoundUploaderProps) {
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])

  // Mock existing images for edit mode
  const mockExistingImages = existingImages
    ? [
        {
          id: "1",
          name: "cardiac-ultrasound-1.jpg",
          preview: "/placeholder.svg?height=200&width=300",
          title: "Cardiac Ultrasound 1",
        },
        {
          id: "2",
          name: "cardiac-ultrasound-2.jpg",
          preview: "/placeholder.svg?height=200&width=300",
          title: "Cardiac Ultrasound 2",
        },
      ]
    : []

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setFiles([...files, ...newFiles])

      // Create preview URLs
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file))
      setPreviews([...previews, ...newPreviews])
    }
  }

  const removeFile = (index: number) => {
    const newFiles = [...files]
    const newPreviews = [...previews]

    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(newPreviews[index])

    newFiles.splice(index, 1)
    newPreviews.splice(index, 1)

    setFiles(newFiles)
    setPreviews(newPreviews)
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="ultrasound-images">Upload Ultrasound Images</Label>
        <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2">
          <Upload className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Drag and drop your ultrasound images here</p>
          <p className="text-xs text-muted-foreground">Supported formats: JPEG, PNG, DICOM</p>
          <Input
            id="ultrasound-images"
            type="file"
            accept="image/jpeg,image/png,application/dicom"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
          <Label htmlFor="ultrasound-images" className="cursor-pointer">
            <Button type="button" variant="outline" size="sm">
              Browse Files
            </Button>
          </Label>
        </div>
      </div>

      {existingImages && mockExistingImages.length > 0 && (
        <div className="grid gap-2">
          <Label>Existing Images</Label>
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
          <Label>Selected Files</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="border rounded-lg p-2 relative">
                <div className="relative aspect-video mb-2">
                  <Image
                    src={preview || "/placeholder.svg"}
                    alt={`Preview ${index + 1}`}
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
            <Label htmlFor="image-title">Image Title</Label>
            <Input id="image-title" placeholder="e.g., Cardiac Four-Chamber View" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image-description">Description</Label>
            <Textarea id="image-description" placeholder="Enter a description of the ultrasound image..." rows={3} />
          </div>
          <Button type="button" className="w-full sm:w-auto">
            Upload {previews.length} {previews.length === 1 ? "Image" : "Images"}
          </Button>
        </div>
      )}
    </div>
  )
}
