"use client"

import { Link } from 'next-view-transitions'
import { useTransitionRouter } from 'next-view-transitions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircle } from "lucide-react"
import { PatientList } from "@/components/patient-list"
import { SonaidLogo } from "@/components/sonaid-logo"
import { UserProfileDropdown } from "@/components/user-profile-dropdown"
import { useUser } from "@/context/user-context"
import { useEffect } from "react"

export default function PatientsPage() {
  const { currentUser, isLoading } = useUser()
  const router = useTransitionRouter()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !currentUser) {
      router.push("/login")
    }
  }, [currentUser, isLoading, router])

  if (isLoading || !currentUser) {
    return <div className="flex min-h-screen items-center justify-center">Cargando...</div>
  }

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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Todos los Casos de Pacientes</h1>
            <p className="text-muted-foreground">Gestionar y ver todos los casos de pacientes</p>
          </div>
          <div className="flex items-center gap-2">
            <Input placeholder="Buscar pacientes..." className="w-full sm:w-[250px]" />
            <Link href="/patients/new">
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-4 w-4" />
                <span>Nuevo Caso</span>
              </Button>
            </Link>
          </div>
        </div>
        <PatientList />
      </main>
    </div>
  )
}
