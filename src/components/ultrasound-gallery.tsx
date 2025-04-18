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

// Mock ultrasound images
const ultrasoundImages = [
  {
    id: "1",
    title: "Cardiac Ultrasound 1",
    date: "April 14, 2025",
    description: "Four-chamber view",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "2",
    title: "Cardiac Ultrasound 2",
    date: "April 14, 2025",
    description: "Parasternal long-axis view",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "3",
    title: "Cardiac Ultrasound 3",
    date: "April 10, 2025",
    description: "Parasternal short-axis view",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
]

export function UltrasoundGallery() {
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <div className="grid gap-4">
      <Tabs defaultValue="gallery">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="gallery">Gallery View</TabsTrigger>
          <TabsTrigger value="upload">Upload New</TabsTrigger>
        </TabsList>
        <TabsContent value="gallery" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ultrasoundImages.map((image) => (
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
                      <DialogContent className="max-w-4xl">
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
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
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
          <UltrasoundUploader />
        </TabsContent>
      </Tabs>
    </div>
  )
}
