"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Moon, Sun, BellRing, Lock, Eye } from "lucide-react"
import { SonaidLogo } from "@/components/sonaid-logo"
import { UserProfileDropdown } from "@/components/user-profile-dropdown"
import { useUser } from "../../context/user-context"
import { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  const { currentUser, isLoading } = useUser()
  const router = useRouter()
  const [theme, setTheme] = useState("light")
  const [language, setLanguage] = useState("en")
  const [notifications, setNotifications] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [autoLogout, setAutoLogout] = useState(true)

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
          <h1 className="text-2xl font-semibold">Settings</h1>
        </div>

        <Tabs defaultValue="general" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize how SONAID looks on your device</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <RadioGroup defaultValue={theme} onValueChange={setTheme} className="flex flex-col sm:flex-row gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="light" />
                      <Label htmlFor="light" className="flex items-center gap-2">
                        <Sun className="h-4 w-4" />
                        Light
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dark" id="dark" />
                      <Label htmlFor="dark" className="flex items-center gap-2">
                        <Moon className="h-4 w-4" />
                        Dark
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="system" id="system" />
                      <Label htmlFor="system">System</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language" className="w-full sm:w-[240px]">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="zh">中文</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Display Settings</CardTitle>
                <CardDescription>Configure how patient data is displayed</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="compact-view" className="flex flex-col gap-1">
                    <span>Compact View</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Display more patients per page with less details
                    </span>
                  </Label>
                  <Switch id="compact-view" />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="show-thumbnails" className="flex flex-col gap-1">
                    <span>Show Image Thumbnails</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Display thumbnail previews in patient lists
                    </span>
                  </Label>
                  <Switch id="show-thumbnails" defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="default-sort">Default Sort Order</Label>
                  <Select defaultValue="date-desc">
                    <SelectTrigger id="default-sort" className="w-full sm:w-[240px]">
                      <SelectValue placeholder="Select sort order" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="date-desc">Newest First</SelectItem>
                      <SelectItem value="date-asc">Oldest First</SelectItem>
                      <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                      <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Control how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="app-notifications" className="flex flex-col gap-1">
                    <span>In-App Notifications</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Receive notifications within SONAID
                    </span>
                  </Label>
                  <Switch
                    id="app-notifications"
                    checked={notifications}
                    onCheckedChange={setNotifications}
                    defaultChecked
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications" className="flex flex-col gap-1">
                    <span>Email Notifications</span>
                    <span className="font-normal text-xs text-muted-foreground">Receive notifications via email</span>
                  </Label>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                    defaultChecked
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Types</CardTitle>
                <CardDescription>Select which events trigger notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="new-cases" className="flex items-center gap-2">
                    <BellRing className="h-4 w-4" />
                    New shared cases
                  </Label>
                  <Switch id="new-cases" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="case-updates" className="flex items-center gap-2">
                    <BellRing className="h-4 w-4" />
                    Updates to existing cases
                  </Label>
                  <Switch id="case-updates" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="new-images" className="flex items-center gap-2">
                    <BellRing className="h-4 w-4" />
                    New ultrasound images
                  </Label>
                  <Switch id="new-images" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="ml-predictions" className="flex items-center gap-2">
                    <BellRing className="h-4 w-4" />
                    ML prediction results
                  </Label>
                  <Switch id="ml-predictions" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="two-factor" className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Two-factor authentication
                  </Label>
                  <Switch id="two-factor" />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-logout" className="flex flex-col gap-1">
                    <span className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Auto-logout after inactivity
                    </span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Automatically log out after 30 minutes of inactivity
                    </span>
                  </Label>
                  <Switch id="auto-logout" checked={autoLogout} onCheckedChange={setAutoLogout} defaultChecked />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-2">
                {/*@ts-ignore*/}
                <Button variant="outline">Change Password</Button>
                <p className="text-xs text-muted-foreground">Last password change: 45 days ago</p>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Session Management</CardTitle>
                <CardDescription>Manage your active sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Current Session</p>
                      <p className="text-sm text-muted-foreground">Chrome on Windows • IP: 192.168.1.1</p>
                    </div>
                    <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Active Now</div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Mobile App</p>
                      <p className="text-sm text-muted-foreground">iPhone 13 • Last active: 2 days ago</p>
                    </div>
                    {/*@ts-ignore*/}
                    <Button variant="outline" size="sm">
                      Revoke
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                {/*@ts-ignore*/}
                <Button variant="destructive">Log Out All Devices</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
