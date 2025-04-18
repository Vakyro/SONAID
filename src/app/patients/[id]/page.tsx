"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Calendar, Edit, FileText, ImageIcon, Trash2 } from "lucide-react"
import { PatientInfo } from "@/components/patient-info"
import { UltrasoundGallery } from "@/components/ultrasound-gallery"
import { PredictionResults } from "@/components/prediction-results"
import { SonaidLogo } from "@/components/sonaid-logo"
import { UserProfileDropdown } from "@/components/user-profile-dropdown"
import { useUser } from "../../../context/user-context"
import { useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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

export default function PatientDetailPage({ params }: { params: { id: string } }) {
  const { currentUser, isLoading, allDoctors } = useUser()
  const router = useRouter()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !currentUser) {
      router.push("/login")
    }
  }, [currentUser, isLoading, router])

  if (isLoading || !currentUser) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>
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
  const sharedDoctorIds = patientSharing[params.id as keyof typeof patientSharing] || []
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
              {/*@ts-ignore*/}
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-semibold">SONAID Case #{params.id}</h1>
          </div>

          {/* Shared doctors display */}
          {hasSharedDoctors && (
            <div className="flex items-center gap-2 ml-10">
              <span className="text-sm text-muted-foreground">Shared with:</span>
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

          <div className="flex items-center gap-2 ml-auto">
            <Link href={`/patients/${params.id}/edit`}>
              {/*@ts-ignore*/}
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </Button>
            </Link>
            {/*@ts-ignore*/}
            <Button variant="destructive" size="sm" className="h-8 gap-1">
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_250px]">
          <div className="grid gap-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Patient Information</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Created: April 10, 2025</span>
                  </div>
                </div>
                <CardDescription>Basic patient details and medical history</CardDescription>
              </CardHeader>
              <CardContent>
                <PatientInfo />
              </CardContent>
            </Card>

            <Tabs defaultValue="ultrasounds">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="ultrasounds" className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Ultrasound Images
                </TabsTrigger>
                <TabsTrigger value="predictions" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Prediction Results
                </TabsTrigger>
              </TabsList>
              <TabsContent value="ultrasounds" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Ultrasound Images</CardTitle>
                    <CardDescription>View and manage ultrasound images for this patient</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <UltrasoundGallery />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="predictions" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>ML Prediction Results</CardTitle>
                    <CardDescription>View machine learning prediction results</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PredictionResults />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Case Summary</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div>
                  <div className="text-sm font-medium">Status</div>
                  <div className="rounded-full bg-green-100 text-green-700 px-2 py-1 text-xs font-medium inline-block mt-1">
                    Active
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium">Attending Physician</div>
                  <div className="text-sm">Dr. Sarah Johnson</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Department</div>
                  <div className="text-sm">Cardiology</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Last Updated</div>
                  <div className="text-sm">April 14, 2025</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-1">
                    <div className="text-sm">Ultrasound image uploaded</div>
                    <div className="text-xs text-muted-foreground">April 14, 2025 - 10:23 AM</div>
                  </div>
                  <div className="grid gap-1">
                    <div className="text-sm">Patient information updated</div>
                    <div className="text-xs text-muted-foreground">April 12, 2025 - 2:45 PM</div>
                  </div>
                  <div className="grid gap-1">
                    <div className="text-sm">Case created</div>
                    <div className="text-xs text-muted-foreground">April 10, 2025 - 9:30 AM</div>
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
