"use client"

import { Link } from 'next-view-transitions'
import { useTransitionRouter } from 'next-view-transitions'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Activity } from "lucide-react"
import { SonaidLogo } from "@/components/sonaid-logo"
import { UserProfileDropdown } from "@/components/user-profile-dropdown"
import { useUser } from "@/context/user-context"
import { useEffect } from "react"

export default function ActivityPage() {
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

  // Mock activity data
  const activityData = [
    { id: 1, action: "Created new patient case", patient: "John Smith", date: "April 15, 2025", time: "10:23 AM" },
    { id: 2, action: "Uploaded ultrasound image", patient: "Emily Johnson", date: "April 14, 2025", time: "2:45 PM" },
    { id: 3, action: "Updated patient information", patient: "Michael Brown", date: "April 12, 2025", time: "9:30 AM" },
    { id: 4, action: "Shared case with Dr. Chen", patient: "Sarah Davis", date: "April 10, 2025", time: "11:15 AM" },
    {
      id: 5,
      action: "Viewed ML prediction results",
      patient: "Robert Williams",
      date: "April 8, 2025",
      time: "3:20 PM",
    },
  ]

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
        <div className="flex items-center gap-2">
          <Link href="/profile">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-semibold">Activity History</h1>
        </div>

        <Card className="max-w-4xl mx-auto w-full">
          <CardHeader>
            <CardTitle>Activity History</CardTitle>
            <CardDescription>Your recent actions in the SONAID system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {activityData.map((activity) => (
                <div key={activity.id} className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Activity className="h-5 w-5 text-primary" />
                    </div>
                    <div className="h-full w-px bg-border" />
                  </div>
                  <div className="space-y-1 pt-1">
                    <div className="flex items-center gap-x-2">
                      <p className="text-sm font-medium leading-none">{activity.action}</p>
                      <p className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">{activity.patient}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {activity.date} at {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
