"use client"

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Expand, Trash2 } from "lucide-react"
import { UltrasoundUploader } from "@/components/ultrasound-uploader"
import { ImageValidator } from "@/components/image-validator"

// Imágenes simuladas de ultrasonido/mamografía mamaria
const breastImages = [
  {
    id: "1",
    title: "Ultrasonido de Mama Derecha",
    date: "14 de abril, 2025",
    description: "Vista transversal de masa en mama derecha",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "2",
    title: "Ultrasonido de Mama Izquierda",
    date: "14 de abril, 2025",
    description: "Vista longitudinal de mama izquierda",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "3",
    title: "Mamografía - Vista CC Derecha",
    date: "10 de abril, 2025",
    description: "Vista craneocaudal de mama derecha",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
]

export function UltrasoundGallery() {
  const [selectedImage, setSelectedImage] = useState<any>(null)
  const [validatedImage, setValidatedImage] = useState<File | null>(null)

  const handleValidImage = (file: File) => {
    setValidatedImage(file)
  }

  return (
    <div className="grid gap-4">
      <Tabs defaultValue="gallery">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="gallery">Vista de Galería</TabsTrigger>
          <TabsTrigger value="upload">Subir Nueva</TabsTrigger>
        </TabsList>
        <TabsContent value="gallery" className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {breastImages.map((image) => (
              <Card key={image.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-video">
                    <Image src={image.imageUrl || "/placeholder.svg"} alt={image.title} fill className="object-cover" />
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 bg-black/30 hover:bg-black/50 text-white rounded-full"
                          onClick={() => setSelectedImage(image)}
                        >
                          <Expand className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>{image.title}</DialogTitle>
                          <DialogDescription>
                            {image.description} - {image.date}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="relative aspect-video w-full">
                          <Image
                            src={image.imageUrl || "/placeholder.svg"}
                            alt={image.title}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="flex flex-col sm:flex-row justify-end gap-2">
                          <Button variant="outline" size="sm" className="w-full sm:w-auto">
                            <Download className="h-4 w-4 mr-2" />
                            Descargar
                          </Button>
                          <Button variant="destructive" size="sm" className="w-full sm:w-auto mt-2 sm:mt-0">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Eliminar
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm">{image.title}</h3>
                    <p className="text-xs text-muted-foreground">{image.date}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="upload" className="mt-4">
          <ImageValidator onValidImage={handleValidImage} />
          {validatedImage && (
            <div className="mt-4">
              <UltrasoundUploader />
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
