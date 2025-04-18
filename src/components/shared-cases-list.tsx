"use client"

import Link from "next/link"
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
    dateCreated: "April 15, 2025",
    department: "Cardiology",
    status: "Active",
    imageCount: 4,
    sharedBy: ["2", "3"], // Doctor IDs who shared this case
    notes: "Shared for second opinion on cardiac ultrasound findings",
  },
  {
    id: "6",
    name: "Jennifer Adams",
    age: 34,
    gender: "Female",
    dateCreated: "April 14, 2025",
    department: "Obstetrics",
    status: "Pending",
    imageCount: 3,
    sharedBy: ["3"], // Doctor IDs who shared this case
    notes: "Unusual findings in 20-week ultrasound, requesting consultation",
  },
  {
    id: "7",
    name: "Thomas Garcia",
    age: 55,
    gender: "Male",
    dateCreated: "April 12, 2025",
    department: "Neurology",
    status: "Active",
    imageCount: 2,
    sharedBy: ["2"], // Doctor IDs who shared this case
    notes: "Follow-up on carotid ultrasound, previous stenosis noted",
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
                      {patient.age} years, {patient.gender}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm w-full sm:w-auto">
                  <div>
                    <div className="font-medium">Department</div>
                    <div className="text-muted-foreground">{patient.department}</div>
                  </div>
                  <div>
                    <div className="font-medium">Shared</div>
                    <div className="text-muted-foreground">{patient.dateCreated}</div>
                  </div>
                  <div>
                    <div className="font-medium">Status</div>
                    <div
                      className={`rounded-full px-2 py-0.5 text-xs font-medium inline-block
                      ${
                        patient.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : patient.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {patient.status}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Images</div>
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
                  <span className="text-xs font-medium">Shared by:</span>
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
