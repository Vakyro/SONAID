"use client"

import { Link } from 'next-view-transitions'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, ImageIcon, Share2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useUser } from "@/context/user-context"

// Mock data for patient list
const patients = [
  {
    id: "1",
    name: "John Smith",
    age: 45,
    gender: "Male",
    dateCreated: "10 de abril, 2025",
    department: "Cardiología",
    status: "Activo",
    imageCount: 3,
    sharedWith: ["2", "3"], // Doctor IDs this case is shared with
  },
  {
    id: "2",
    name: "Emily Johnson",
    age: 32,
    gender: "Female",
    dateCreated: "9 de abril, 2025",
    department: "Obstetricia",
    status: "Pendiente",
    imageCount: 2,
    sharedWith: [], // Not shared
  },
  {
    id: "3",
    name: "Michael Brown",
    age: 58,
    gender: "Male",
    dateCreated: "8 de abril, 2025",
    department: "Neurología",
    status: "Activo",
    imageCount: 5,
    sharedWith: ["2"], // Shared with one doctor
  },
  {
    id: "4",
    name: "Sarah Davis",
    age: 27,
    gender: "Female",
    dateCreated: "7 de abril, 2025",
    department: "Ortopedia",
    status: "Completado",
    imageCount: 1,
    sharedWith: [], // Not shared
  },
]

export function PatientList() {
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

  // Función para traducir el estado
  const translateStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      Active: "Activo",
      Pending: "Pendiente",
      Completed: "Completado",
    }
    return statusMap[status] || status
  }

  // Función para traducir el género
  const translateGender = (gender: string) => {
    return gender === "Male" ? "Masculino" : gender === "Female" ? "Femenino" : gender
  }

  return (
    <div className="grid gap-4">
      {patients.map((patient) => (
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
                    <div className="font-medium">Creado</div>
                    <div className="text-muted-foreground">{patient.dateCreated}</div>
                  </div>
                  <div>
                    <div className="font-medium">Estado</div>
                    <div
                      className={`rounded-full px-2 py-0.5 text-xs font-medium inline-block
                      ${
                        patient.status === "Active" || patient.status === "Activo"
                          ? "bg-green-100 text-green-700"
                          : patient.status === "Pending" || patient.status === "Pendiente"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {translateStatus(patient.status)}
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

              {patient.sharedWith.length > 0 && (
                <div className="border-t pt-3">
                  <div className="flex items-center gap-2">
                    <Share2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs font-medium">Compartido con:</span>
                    <div className="flex -space-x-2">
                      <TooltipProvider>
                        {patient.sharedWith.map((doctorId) => {
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
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
