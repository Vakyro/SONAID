import { Link } from 'next-view-transitions'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SonaidLogo } from "@/components/sonaid-logo"
import { ForgotPasswordForm } from "@/components/forgot-password-form"

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="flex items-center justify-center space-x-2">
            <SonaidLogo size={32} />
            <h1 className="text-3xl font-bold tracking-tighter">SONAID</h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400">Sistema de gestión de casos de pacientes con ultrasonido</p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Restablecer Contraseña</CardTitle>
            <CardDescription className="text-center">
              Ingrese su correo electrónico y le enviaremos un enlace para restablecer su contraseña
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ForgotPasswordForm />
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/login" className="text-sm text-primary hover:underline">
              Volver al inicio de sesión
            </Link>
          </CardFooter>
        </Card>

        <div className="text-center text-sm text-gray-500">
          &copy; 2025 SONAID Medical Systems. Todos los derechos reservados.
        </div>
      </div>
    </div>
  )
}
