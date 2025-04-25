"use client"

import { Link } from 'next-view-transitions'
import { useTransitionRouter } from 'next-view-transitions'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Moon, Sun, BellRing, Lock, Eye } from "lucide-react"
import { SonaidLogo } from "@/components/sonaid-logo"
import { UserProfileDropdown } from "@/components/user-profile-dropdown"
import { useUser } from "@/context/user-context"
import { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  const { currentUser, isLoading } = useUser()
  const router = useTransitionRouter()
  const [theme, setTheme] = useState("light")
  const [language, setLanguage] = useState("es")
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
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-semibold">Configuración</h1>
        </div>

        <Tabs defaultValue="general" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
            <TabsTrigger value="security">Seguridad</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Apariencia</CardTitle>
                <CardDescription>Personalice cómo se ve SONAID en su dispositivo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Tema</Label>
                  <RadioGroup defaultValue={theme} onValueChange={setTheme} className="flex flex-col sm:flex-row gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="light" />
                      <Label htmlFor="light" className="flex items-center gap-2">
                        <Sun className="h-4 w-4" />
                        Claro
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dark" id="dark" />
                      <Label htmlFor="dark" className="flex items-center gap-2">
                        <Moon className="h-4 w-4" />
                        Oscuro
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="system" id="system" />
                      <Label htmlFor="system">Sistema</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <Select defaultValue={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language" className="w-full sm:w-[240px]">
                      <SelectValue placeholder="Seleccionar idioma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">English</SelectItem>
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
                <CardTitle>Configuración de Visualización</CardTitle>
                <CardDescription>Configure cómo se muestran los datos de los pacientes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="compact-view" className="flex flex-col gap-1">
                    <span>Vista Compacta</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Mostrar más pacientes por página con menos detalles
                    </span>
                  </Label>
                  <Switch id="compact-view" />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="show-thumbnails" className="flex flex-col gap-1">
                    <span>Mostrar Miniaturas de Imágenes</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Mostrar vistas previas en miniatura en las listas de pacientes
                    </span>
                  </Label>
                  <Switch id="show-thumbnails" defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="default-sort">Orden de Clasificación Predeterminado</Label>
                  <Select defaultValue="date-desc">
                    <SelectTrigger id="default-sort" className="w-full sm:w-[240px]">
                      <SelectValue placeholder="Seleccionar orden" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date-desc">Más Recientes Primero</SelectItem>
                      <SelectItem value="date-asc">Más Antiguos Primero</SelectItem>
                      <SelectItem value="name-asc">Nombre (A-Z)</SelectItem>
                      <SelectItem value="name-desc">Nombre (Z-A)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferencias de Notificación</CardTitle>
                <CardDescription>Controle cómo recibe las notificaciones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="app-notifications" className="flex flex-col gap-1">
                    <span>Notificaciones en la Aplicación</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Recibir notificaciones dentro de SONAID
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
                    <span>Notificaciones por Correo Electrónico</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Recibir notificaciones por correo electrónico
                    </span>
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
                <CardTitle>Tipos de Notificación</CardTitle>
                <CardDescription>Seleccione qué eventos activan notificaciones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="new-cases" className="flex items-center gap-2">
                    <BellRing className="h-4 w-4" />
                    Nuevos casos compartidos
                  </Label>
                  <Switch id="new-cases" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="case-updates" className="flex items-center gap-2">
                    <BellRing className="h-4 w-4" />
                    Actualizaciones a casos existentes
                  </Label>
                  <Switch id="case-updates" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="new-images" className="flex items-center gap-2">
                    <BellRing className="h-4 w-4" />
                    Nuevas imágenes de ultrasonido
                  </Label>
                  <Switch id="new-images" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="ml-predictions" className="flex items-center gap-2">
                    <BellRing className="h-4 w-4" />
                    Resultados de predicción ML
                  </Label>
                  <Switch id="ml-predictions" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Seguridad</CardTitle>
                <CardDescription>Administre sus preferencias de seguridad de cuenta</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="two-factor" className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Autenticación de dos factores
                  </Label>
                  <Switch id="two-factor" />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-logout" className="flex flex-col gap-1">
                    <span className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Cierre de sesión automático por inactividad
                    </span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Cerrar sesión automáticamente después de 30 minutos de inactividad
                    </span>
                  </Label>
                  <Switch id="auto-logout" checked={autoLogout} onCheckedChange={setAutoLogout} defaultChecked />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-2">
                <Button variant="outline">Cambiar Contraseña</Button>
                <p className="text-xs text-muted-foreground">Último cambio de contraseña: hace 45 días</p>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gestión de Sesiones</CardTitle>
                <CardDescription>Administre sus sesiones activas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Sesión Actual</p>
                      <p className="text-sm text-muted-foreground">Chrome en Windows • IP: 192.168.1.1</p>
                    </div>
                    <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Activo Ahora</div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Aplicación Móvil</p>
                      <p className="text-sm text-muted-foreground">iPhone 13 • Última actividad: hace 2 días</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Revocar
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="destructive">Cerrar Sesión en Todos los Dispositivos</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
