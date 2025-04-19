"use client"

import { Link } from 'next-view-transitions'
import Image from "next/image"
import { useTransitionRouter } from 'next-view-transitions'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar, FileText, Mail, MapPin, Phone, User } from "lucide-react"
import { SonaidLogo } from "@/components/sonaid-logo"
import { UserProfileDropdown } from "@/components/user-profile-dropdown"
import { useUser } from "@/context/user-context"
import { useEffect } from "react"

export default function ProfilePage() {
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
        <div className="flex items-center gap-2">
          <Link href="/">
            {/*@ts-ignore*/}
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-semibold">My Profile</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center gap-4">
                <div className="relative h-32 w-32 overflow-hidden rounded-full">
                  <Image
                    src={currentUser.profileImage || "/placeholder.svg"}
                    alt={currentUser.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-bold">{currentUser.name}</h2>
                  <p className="text-sm text-muted-foreground">{currentUser.specialty}</p>
                </div>
                <div className="grid w-full gap-2">
                  {/*@ts-ignore*/}
                  <Button variant="outline" className="w-full">
                    <User className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                  {/*@ts-ignore*/}
                  <Button variant="outline" className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    View Activity
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Professional Information</CardTitle>
                <CardDescription>Your professional details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Hospital</p>
                      <p className="text-sm text-muted-foreground">{currentUser.hospital}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Department</p>
                      <p className="text-sm text-muted-foreground">{currentUser.department}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{currentUser.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">(555) 123-4567</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Experience</p>
                    <p className="text-sm text-muted-foreground">{currentUser.yearsOfExperience} years</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
                <CardDescription>Professional biography and expertise</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{currentUser.bio}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
                <CardDescription>Your activity on SONAID</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="flex flex-col items-center justify-center rounded-lg border p-4">
                    <span className="text-2xl font-bold">24</span>
                    <span className="text-xs text-muted-foreground">Total Cases</span>
                  </div>
                  <div className="flex flex-col items-center justify-center rounded-lg border p-4">
                    <span className="text-2xl font-bold">12</span>
                    <span className="text-xs text-muted-foreground">Shared Cases</span>
                  </div>
                  <div className="flex flex-col items-center justify-center rounded-lg border p-4">
                    <span className="text-2xl font-bold">8</span>
                    <span className="text-xs text-muted-foreground">This Week</span>
                  </div>
                  <div className="flex flex-col items-center justify-center rounded-lg border p-4">
                    <span className="text-2xl font-bold">156</span>
                    <span className="text-xs text-muted-foreground">Ultrasounds</span>
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
