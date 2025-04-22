"use client"

import { Link } from 'next-view-transitions'
import { useTransitionRouter } from 'next-view-transitions'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Share2 } from "lucide-react"
import { PatientList } from "@/components/patient-list"
import { SonaidLogo } from "@/components/sonaid-logo"
import { UserProfileDropdown } from "@/components/user-profile-dropdown"
import { useUser } from "@/context/user-context"
import { useEffect } from "react"

export default function Dashboard() {
  const { currentUser, isLoading } = useUser()
  const router = useTransitionRouter()

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
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-4 w-4" />
              <span>New Case</span>
            </Button>
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Shared Cases</CardTitle>
              <CardDescription>Cases shared with you</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <div className="text-3xl font-bold">5</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Share2 className="h-3 w-3" />
                <span>+2 new</span>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/shared-cases" className="text-sm text-primary">
                View shared cases
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
