"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { UltrasoundUploader } from "@/components/ultrasound-uploader"

// Mock patient data
const mockPatient = {
  firstName: "John",
  lastName: "Smith",
  dob: "1980-05-15",
  gender: "male",
  patientId: "P12345",
  department: "cardiology",
  chiefComplaint: "Chest pain and shortness of breath",
  medicalHistory: "Hypertension, Type 2 Diabetes diagnosed in 2018",
  currentMedications: "Lisinopril 10mg daily, Metformin 500mg twice daily",
  allergies: "Penicillin",
  additionalNotes: "Patient reports symptoms worsen with physical activity",
}

export function EditPatientForm({ patientId }: { patientId: string }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // In a real app, you would fetch the patient data based on the ID
  const patient = mockPatient

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      router.push(`/patients/${patientId}`)
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
            <CardDescription>Update the basic information about the patient</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" defaultValue={patient.firstName} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" defaultValue={patient.lastName} required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" type="date" defaultValue={patient.dob} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="gender">Gender</Label>
                <RadioGroup id="gender" defaultValue={patient.gender} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="patient-id">Patient ID</Label>
                <Input id="patient-id" defaultValue={patient.patientId} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="department">Department</Label>
              <Select defaultValue={patient.department}>
                <SelectTrigger id="department">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="neurology">Neurology</SelectItem>
                  <SelectItem value="orthopedics">Orthopedics</SelectItem>
                  <SelectItem value="obstetrics">Obstetrics</SelectItem>
                  <SelectItem value="pediatrics">Pediatrics</SelectItem>
                  <SelectItem value="oncology">Oncology</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Medical Information</CardTitle>
            <CardDescription>Update relevant medical details for this case</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="chief-complaint">Chief Complaint</Label>
              <Input id="chief-complaint" defaultValue={patient.chiefComplaint} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="medical-history">Medical History</Label>
              <Textarea id="medical-history" rows={4} defaultValue={patient.medicalHistory} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="current-medications">Current Medications</Label>
              <Textarea id="current-medications" rows={3} defaultValue={patient.currentMedications} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="allergies">Allergies</Label>
              <Input id="allergies" defaultValue={patient.allergies} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ultrasound Images</CardTitle>
            <CardDescription>Manage ultrasound images for this patient</CardDescription>
          </CardHeader>
          <CardContent>
            <UltrasoundUploader existingImages={true} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Notes</CardTitle>
            <CardDescription>Any other relevant information for this case</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              rows={4}
              defaultValue={patient.additionalNotes}
              placeholder="Enter any additional notes or observations..."
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.push(`/patients/${patientId}`)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  )
}
