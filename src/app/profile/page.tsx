"use client"

import type React from "react"

import { Link } from 'next-view-transitions'
import Image from "next/image"
import { useTransitionRouter } from 'next-view-transitions'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar, Mail, MapPin, Phone, User, Edit, Save, X, FileText } from "lucide-react"
import { SonaidLogo } from "@/components/sonaid-logo"
import { UserProfileDropdown } from "@/components/user-profile-dropdown"
import { useUser } from "@/context/user-context"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function ProfilePage() {
  const { currentUser, isLoading } = useUser()
  const router = useTransitionRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "",
    specialty: "",
    hospital: "",
    department: "",
    email: "",
    phone: "(555) 123-4567",
    yearsOfExperience: 0,
    bio: "",
  })

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !currentUser) {
      router.push("/login")
    }

    if (currentUser) {
      setProfileData({
        name: currentUser.name,
        specialty: currentUser.specialty,
        hospital: currentUser.hospital,
        department: currentUser.department,
        email: currentUser.email,
        phone: "(555) 123-4567",
        yearsOfExperience: currentUser.yearsOfExperience,
        bio: currentUser.bio,
      })
    }
  }, [currentUser, isLoading, router])

  if (isLoading || !currentUser) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = () => {
    // In a real app, you would save the data to the server
    setIsEditing(false)
  }

  const handleCancel = () => {
    // Reset form data to original values
    setProfileData({
      name: currentUser.name,
      specialty: currentUser.specialty,
      hospital: currentUser.hospital,
      department: currentUser.department,
      email: currentUser.email,
      phone: "(555) 123-4567",
      yearsOfExperience: currentUser.yearsOfExperience,
      bio: currentUser.bio,
    })
    setIsEditing(false)
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
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-semibold">My Profile</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_2fr] max-w-6xl mx-auto w-full">
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
                  {isEditing && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Button variant="ghost" size="sm" className="text-white">
                        Change
                      </Button>
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-bold">{profileData.name}</h2>
                  <p className="text-sm text-muted-foreground">{profileData.specialty}</p>
                </div>
                <div className="grid w-full gap-2">
                  {!isEditing ? (
                    <>
                      <Button variant="outline" className="w-full" onClick={() => setIsEditing(true)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                      <Button variant="outline" className="w-full" onClick={() => router.push("/activity")}>
                        <FileText className="mr-2 h-4 w-4" />
                        View Activity
                      </Button>
                    </>
                  ) : (
                    <div className="flex gap-2">
                      <Button variant="outline" className="w-full" onClick={handleCancel}>
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                      </Button>
                      <Button className="w-full" onClick={handleSave}>
                        <Save className="mr-2 h-4 w-4" />
                        Save
                      </Button>
                    </div>
                  )}
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
                {isEditing ? (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" name="name" value={profileData.name} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialty">Specialty</Label>
                      <Input
                        id="specialty"
                        name="specialty"
                        value={profileData.specialty}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hospital">Hospital</Label>
                      <Input id="hospital" name="hospital" value={profileData.hospital} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        name="department"
                        value={profileData.department}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" value={profileData.email} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" name="phone" value={profileData.phone} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                      <Input
                        id="yearsOfExperience"
                        name="yearsOfExperience"
                        type="number"
                        value={profileData.yearsOfExperience}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Hospital</p>
                        <p className="text-sm text-muted-foreground">{profileData.hospital}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Department</p>
                        <p className="text-sm text-muted-foreground">{profileData.department}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">{profileData.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Phone</p>
                        <p className="text-sm text-muted-foreground">{profileData.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Experience</p>
                        <p className="text-sm text-muted-foreground">{profileData.yearsOfExperience} years</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
                <CardDescription>Professional biography and expertise</CardDescription>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="space-y-2">
                    <Label htmlFor="bio">Professional Biography</Label>
                    <Textarea id="bio" name="bio" rows={4} value={profileData.bio} onChange={handleInputChange} />
                  </div>
                ) : (
                  <p className="text-sm">{profileData.bio}</p>
                )}
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
