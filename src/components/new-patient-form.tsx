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
            <CardTitle>Información del Paciente</CardTitle>
            <CardDescription>Ingrese la información básica sobre el paciente</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">Nombre</Label>
                <Input id="first-name" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Apellido</Label>
                <Input id="last-name" required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="dob">Fecha de Nacimiento</Label>
                <Input id="dob" type="date" required />
              </div>
              <div className="grid gap-2 col-span-1 md:col-span-1">
                <Label htmlFor="gender">Género</Label>
                <RadioGroup
                  id="gender"
                  defaultValue="female"
                  className="flex flex-wrap gap-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Femenino</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Masculino</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Otro</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="patient-id">ID de Paciente</Label>
                <Input id="patient-id" placeholder="Opcional" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="department">Departamento</Label>
              <Select defaultValue="breast-imaging">
                <SelectTrigger id="department">
                  <SelectValue placeholder="Seleccionar departamento" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="breast-imaging">Imagen Mamaria</SelectItem>
                  <SelectItem value="oncology">Oncología</SelectItem>
                  <SelectItem value="radiology">Radiología</SelectItem>
                  <SelectItem value="surgery">Cirugía</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Información Médica</CardTitle>
            <CardDescription>Ingrese detalles médicos relevantes para este caso</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="chief-complaint">Motivo de Consulta</Label>
              <Input id="chief-complaint" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="breast-history">Historial de Salud Mamaria</Label>
              <Textarea
                id="breast-history"
                rows={4}
                placeholder="Condiciones mamarias previas, antecedentes familiares de cáncer de mama, etc."
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="previous-mammogram">Mamografía Previa</Label>
                <RadioGroup id="previous-mammogram" defaultValue="no" className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="previous-yes" />
                    <Label htmlFor="previous-yes">Sí</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="previous-no" />
                    <Label htmlFor="previous-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="previous-biopsies">Biopsias Mamarias Previas</Label>
                <RadioGroup id="previous-biopsies" defaultValue="no" className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="biopsies-yes" />
                    <Label htmlFor="biopsies-yes">Sí</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="biopsies-no" />
                    <Label htmlFor="biopsies-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="current-medications">Medicamentos Actuales</Label>
              <Textarea id="current-medications" rows={3} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Imagen de Ultrasonido/Mamografía de Mama</CardTitle>
            <CardDescription>Suba y valide imágenes mamarias para análisis</CardDescription>
          </CardHeader>
          <CardContent>
            <ImageValidator onValidImage={handleValidImage} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notas Adicionales</CardTitle>
            <CardDescription>Cualquier otra información relevante para este caso</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea rows={4} placeholder="Ingrese cualquier nota adicional u observaciones..." />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.push("/patients")}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting || !validatedImage}>
              {isSubmitting ? "Creando..." : "Crear Caso de Paciente"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  )
}
