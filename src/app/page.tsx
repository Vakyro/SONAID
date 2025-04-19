"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle } from "lucide-react"
import dynamic from "next/dynamic"
import { SonaidLogo } from "@/components/sonaid-logo"
import { UserProfileDropdown } from "@/components/user-profile-dropdown"
import { useUser } from "../context/user-context"
import { useEffect } from "react"

// Dynamically import PatientList with loading fallback
const PatientList = dynamic(() => import("@/components/patient-list").then(mod => ({ default: mod.PatientList })), {
  loading: () => <div className="animate-pulse h-64 bg-muted rounded-md"></div>,
  ssr: false
})

export default function Dashboard() {
  const { currentUser, isLoading } = useUser()
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
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">SONAID Patient Cases</h1>
          <Link href="/patients/new">
            {/* @ts-ignore*/}
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-4 w-4" />
              <span>New Case</span>
            </Button>
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Total SONAID Cases</CardTitle>
              <CardDescription>Overview of all patient cases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+2 from last week</p>
            </CardContent>
            <CardFooter>
              <Link href="/patients" className="text-sm text-primary">
                View all cases
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Pending Review</CardTitle>
              <CardDescription>Cases awaiting doctor review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">-1 from last week</p>
            </CardContent>
            <CardFooter>
              <Link href="/patients?status=pending" className="text-sm text-primary">
                View pending cases
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Recent Ultrasounds</CardTitle>
              <CardDescription>New ultrasound images</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+5 from last week</p>
            </CardContent>
            <CardFooter>
              <Link href="/patients?filter=recent-uploads" className="text-sm text-primary">
                View recent uploads
              </Link>
            </CardFooter>
          </Card>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent SONAID Cases</h2>
          <PatientList />
        </div>
      </main>
    </div>
  )
}