"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, CheckCircle2 } from "lucide-react"

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setError("El correo electrónico es obligatorio")
      return
    }

    if (!validateEmail(email)) {
      setError("Por favor, ingrese un correo electrónico válido")
      return
    }

    setError("")
    setIsLoading(true)

    // Simulate API request
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1500)
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-4">
        <div className="rounded-full bg-green-100 p-3">
          <CheckCircle2 className="h-6 w-6 text-green-600" />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-medium">Revise su correo electrónico</h3>
          <p className="text-sm text-gray-500 mt-1">
            Hemos enviado un enlace para restablecer la contraseña a <span className="font-medium">{email}</span>
          </p>
        </div>
        <p className="text-xs text-gray-500 text-center mt-4">
          ¿No recibió el correo? Revise su carpeta de spam o{" "}
          <button className="text-primary hover:underline" onClick={() => setIsSubmitted(false)}>
            intente de nuevo
          </button>
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Correo Electrónico</Label>
        <Input
          id="email"
          type="email"
          placeholder="doctor@hospital.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (error) setError("")
          }}
          disabled={isLoading}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enviando...
          </>
        ) : (
          "Enviar enlace de restablecimiento"
        )}
      </Button>
    </form>
  )
}
