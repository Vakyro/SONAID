"use client"

import { Link } from 'next-view-transitions'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, ImageIcon } from "lucide-react"
import { useUser } from "@/context/user-context"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock data for shared patient cases
const sharedCases = [
  {
    id: "5",
    name: "Robert Williams",
    age: 62,
    gender: "Male",
    dateCreated: "15 de abril, 2025",
    department: "Cardiología",
    status: "Activo",
    imageCount: 4,
    sharedBy: ["2", "3"], // Doctor IDs who shared this case
    notes: "Compartido para segunda opinión sobre hallazgos de ultrasonido cardíaco",
  },
  {
    id: "6",
    name: "Jennifer Adams",
    age: 34,
    gender: "Female",
    dateCreated: "14 de abril, 2025",
    department: "Obstetricia",
    status: "Pendiente",
    imageCount: 3,
    sharedBy: ["3"], // Doctor IDs who shared this case
    notes: "Hallazgos inusuales en ultrasonido de 20 semanas, solicitando consulta",
  },
  {
    id: "7",
    name: "Thomas Garcia",
    age: 55,
    gender: "Male",
    dateCreated: "12 de abril, 2025",
    department: "Neurología",
    status: "Activo",
    imageCount: 2,
    sharedBy: ["2"], // Doctor IDs who shared this case
    notes: "Seguimiento de ultrasonido carotídeo, estenosis previa observada",
  },
]

export function SharedCasesList() {
  const { allDoctors } = useUser()

  const getDoctorById = (id: string) => {
    return allDoctors.find((doctor) => doctor.id === id)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
  }

  // Función para traducir el género
  const translateGender = (gender: string) => {
    return gender === "Male" ? "Masculino" : gender === "Female" ? "Femenino" : gender
  }

  return (
    <div className="grid gap-4">
      {sharedCases.map((patient) => (
        <Card key={patient.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col gap-4 p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10 border">
                    <AvatarFallback>
                      {patient.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{patient.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {patient.age} años, {translateGender(patient.gender)}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm w-full sm:w-auto">
                  <div>
                    <div className="font-medium">Departamento</div>
                    <div className="text-muted-foreground">{patient.department}</div>
                  </div>
                  <div>
                    <div className="font-medium">Compartido</div>
                    <div className="text-muted-foreground">{patient.dateCreated}</div>
                  </div>
                  <div>
                    <div className="font-medium">Estado</div>
                    <div
                      className={`rounded-full px-2 py-0.5 text-xs font-medium inline-block
                      ${
                        patient.status === "Activo"
                          ? "bg-green-100 text-green-700"
                          : patient.status === "Pendiente"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {patient.status}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Imágenes</div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <ImageIcon className="h-3 w-3" />
                      {patient.imageCount}
                    </div>
                  </div>
                </div>
                <Link href={`/patients/${patient.id}`}>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="border-t pt-3">
                <div className="text-sm text-muted-foreground mb-2">{patient.notes}</div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium">Compartido por:</span>
                  <div className="flex -space-x-2">
                    <TooltipProvider>
                      {patient.sharedBy.map((doctorId) => {
                        const doctor = getDoctorById(doctorId)
                        if (!doctor) return null

                        return (
                          <Tooltip key={doctorId}>
                            <TooltipTrigger>
                              <Avatar className="h-6 w-6 border-2 border-background">
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
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
