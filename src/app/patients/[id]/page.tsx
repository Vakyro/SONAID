"use client"

import React from "react" // <-- Add this line
import { Link } from 'next-view-transitions'
import { useTransitionRouter } from 'next-view-transitions'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Calendar, Edit, FileText, ImageIcon, Trash2 } from "lucide-react"
import { PatientInfo } from "@/components/patient-info"
import { UltrasoundGallery } from "@/components/ultrasound-gallery"
import { BreastTumorClassification } from "@/components/breast-tumor-classification"
import { SonaidLogo } from "@/components/sonaid-logo"
import { UserProfileDropdown } from "@/components/user-profile-dropdown"
import { useUser } from "@/context/user-context"
import { useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { PredictionHistoryQuotes } from "@/components/prediction-history-quotes"

// Mock data for shared doctors
const patientSharing = {
  "1": ["2", "3"], // Patient 1 is shared with doctors 2 and 3
  "2": [], // Patient 2 is not shared
  "3": ["2"], // Patient 3 is shared with doctor 2
  "4": [], // Patient 4 is not shared
  "5": ["2", "3"], // Patient 5 is shared with doctors 2 and 3
  "6": ["3"], // Patient 6 is shared with doctor 3
  "7": ["2"], // Patient 7 is shared with doctor 2
}

// Mock prediction results for breast tumor classification (removed 'normal' classification)
const mockPredictions = [
  {
    id: "1",
    date: "14 de abril, 2025",
    model: "BreastNet v3.2",
    imageId: "1",
    doctor: "Sarah Johnson",
    classification: {
      benign: 0.3,
      malignant: 0.7,
    },
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "2",
    date: "10 de abril, 2025",
    model: "BreastNet v3.1",
    imageId: "3",
    doctor: "Michael Chen",
    classification: {
      benign: 0.75,
      malignant: 0.25,
    },
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "3",
    date: "28 de marzo, 2025",
    model: "BreastNet v3.0",
    imageId: "2",
    doctor: "Sarah Johnson",
    classification: {
      benign: 0.9,
      malignant: 0.1,
    },
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
]

export default function PatientDetailPage({ params }: { params: { id: string } }) {
  const { currentUser, isLoading, allDoctors } = useUser()
  const router = useTransitionRouter()

  // Unwrap params using React.use
  const unwrappedParams = React.use(params)

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !currentUser) {
      router.push("/login")
    }
  }, [currentUser, isLoading, router])

  if (isLoading || !currentUser) {
    return <div className="flex min-h-screen items-center justify-center">Cargando...</div>
  }

  const getDoctorById = (id: string) => {
    return allDoctors.find((doctor) => doctor.id === id)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
  }

  // Get shared doctors for this patient
  const sharedDoctorIds = patientSharing[unwrappedParams.id as keyof typeof patientSharing] || []
  const hasSharedDoctors = sharedDoctorIds.length > 0

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <SonaidLogo />
          <span>SONAID</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <UserProfileDropdown />
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Link href="/patients">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-xl sm:text-2xl font-semibold">Caso SONAID #{unwrappedParams.id}</h1>
          </div>

          {/* Shared doctors display */}
          {hasSharedDoctors && (
            <div className="flex flex-wrap items-center gap-2 ml-0 sm:ml-10">
              <span className="text-sm text-muted-foreground">Compartido con:</span>
              <div className="flex -space-x-2">
                <TooltipProvider>
                  {sharedDoctorIds.map((doctorId) => {
                    const doctor = getDoctorById(doctorId)
                    if (!doctor) return null

                    return (
                      <Tooltip key={doctorId}>
                        <TooltipTrigger>
                          <Avatar className="h-8 w-8 border-2 border-background">
                            <AvatarImage src={doctor.profileImage || "/placeholder.svg"} alt={doctor.name} />
                            <AvatarFallback>{getInitials(doctor.name)}</AvatarFallback>
                          </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{doctor.name}</p>
                          <p className="text-xs text-muted-foreground">{doctor.specialty}</p>
                        </TooltipContent>
                      </Tooltip>
                    )
                  })}
                </TooltipProvider>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:ml-auto">
            <Link href={`/patients/${unwrappedParams.id}/edit`}> {/* Corrected: Use unwrappedParams.id */}
              <Button variant="outline" size="sm" className="h-8 gap-1 w-full sm:w-auto">
                <Edit className="h-4 w-4" />
                <span>Editar</span>
              </Button>
            </Link>
            <Button variant="destructive" size="sm" className="h-8 gap-1 w-full sm:w-auto mt-2 sm:mt-0">
              <Trash2 className="h-4 w-4" />
              <span>Eliminar</span>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-[1fr_300px]">
          <div className="grid gap-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <CardTitle className="text-lg sm:text-xl">Información del Paciente</CardTitle>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Creado: 10 de abril, 2025</span>
                  </div>
                </div>
                <CardDescription className="text-xs sm:text-sm">
                  Detalles básicos del paciente e historial médico
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PatientInfo />
              </CardContent>
            </Card>

            <Tabs defaultValue="ultrasounds">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="ultrasounds" className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  <span className="hidden xs:inline">Imágenes de</span> Ultrasonido
                </TabsTrigger>
                <TabsTrigger value="predictions" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="hidden xs:inline">Resultados de</span> Predicción
                </TabsTrigger>
              </TabsList>
              <TabsContent value="ultrasounds" className="mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg sm:text-xl">Imágenes de Ultrasonido</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Ver y gestionar imágenes de ultrasonido para este paciente
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <UltrasoundGallery />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="predictions" className="mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg sm:text-xl">Clasificación de Tumor Mamario</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Ver resultados de clasificación de aprendizaje automático
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <BreastTumorClassification />
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg sm:text-xl">Clasificaciones Anteriores</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Historial de clasificaciones de tumores mamarios
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PredictionHistoryQuotes predictions={mockPredictions} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="grid gap-4 auto-rows-min">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base sm:text-lg">Resumen del Caso</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div>
                  <div className="text-sm font-medium">Estado</div>
                  <div className="rounded-full bg-green-100 text-green-700 px-2 py-1 text-xs font-medium inline-block mt-1">
                    Activo
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium">Médico Tratante</div>
                  <div className="text-sm">Dra. Sarah Johnson</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Departamento</div>
                  <div className="text-sm">Radiología</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Última Actualización</div>
                  <div className="text-sm">14 de abril, 2025</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base sm:text-lg">Actividad Reciente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-1">
                    <div className="text-sm">Imagen de ultrasonido subida</div>
                    <div className="text-xs text-muted-foreground">14 de abril, 2025 - 10:23 AM</div>
                  </div>
                  <div className="grid gap-1">
                    <div className="text-sm">Información del paciente actualizada</div>
                    <div className="text-xs text-muted-foreground">12 de abril, 2025 - 2:45 PM</div>
                  </div>
                  <div className="grid gap-1">
                    <div className="text-sm">Caso creado</div>
                    <div className="text-xs text-muted-foreground">10 de abril, 2025 - 9:30 AM</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
