import { Link } from 'next-view-transitions'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SonaidLogo } from "@/components/sonaid-logo"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="flex items-center justify-center space-x-2">
            <SonaidLogo size={32} />
            <h1 className="text-3xl font-bold tracking-tighter">SONAID</h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400">Ultrasound-based patient case management system</p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
            <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-gray-500">
              Don&apos;t have an account? Contact your administrator
            </div>
            <div className="text-xs text-center text-gray-500">
              By signing in, you agree to our{" "}
              <Link href="#" className="underline hover:text-gray-900">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="underline hover:text-gray-900">
                Privacy Policy
              </Link>
            </div>
          </CardFooter>
        </Card>

        <div className="text-center text-sm text-gray-500">
          &copy; 2025 SONAID Medical Systems. All rights reserved.
        </div>
      </div>
    </div>
  )
}
