"use client"

import type React from "react"

import { useState } from "react"
import { useTransitionRouter } from 'next-view-transitions'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ImageValidator } from "@/components/image-validator"

export function NewPatientForm() {
  const router = useTransitionRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [validatedImage, setValidatedImage] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/patients/1") // Redirect to the newly created patient
    }, 1500)
  }

  const handleValidImage = (file: File) => {
    setValidatedImage(file)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
            <CardDescription>Enter the basic information about the patient</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" type="date" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="gender">Gender</Label>
                <RadioGroup id="gender" defaultValue="female" className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="patient-id">Patient ID</Label>
                <Input id="patient-id" placeholder="Optional" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="department">Department</Label>
              <Select defaultValue="breast-imaging">
                <SelectTrigger id="department">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="breast-imaging">Breast Imaging</SelectItem>
                  <SelectItem value="oncology">Oncology</SelectItem>
                  <SelectItem value="radiology">Radiology</SelectItem>
                  <SelectItem value="surgery">Surgery</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Medical Information</CardTitle>
            <CardDescription>Enter relevant medical details for this case</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="chief-complaint">Chief Complaint</Label>
              <Input id="chief-complaint" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="breast-history">Breast Health History</Label>
              <Textarea
                id="breast-history"
                rows={4}
                placeholder="Previous breast conditions, family history of breast cancer, etc."
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="previous-mammogram">Previous Mammogram</Label>
                <RadioGroup id="previous-mammogram" defaultValue="no" className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="previous-yes" />
                    <Label htmlFor="previous-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="previous-no" />
                    <Label htmlFor="previous-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="previous-biopsies">Previous Breast Biopsies</Label>
                <RadioGroup id="previous-biopsies" defaultValue="no" className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="biopsies-yes" />
                    <Label htmlFor="biopsies-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="biopsies-no" />
                    <Label htmlFor="biopsies-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="current-medications">Current Medications</Label>
              <Textarea id="current-medications" rows={3} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Breast Ultrasound/Mammogram Image</CardTitle>
            <CardDescription>Upload and validate breast imaging for analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ImageValidator onValidImage={handleValidImage} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Notes</CardTitle>
            <CardDescription>Any other relevant information for this case</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea rows={4} placeholder="Enter any additional notes or observations..." />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.push("/patients")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || !validatedImage}>
              {isSubmitting ? "Creating..." : "Create Patient Case"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  )
}
