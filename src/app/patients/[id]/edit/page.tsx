import { Link } from 'next-view-transitions'
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { EditPatientForm } from "@/components/edit-patient-form"
import { SonaidLogo } from "@/components/sonaid-logo"

export default function EditPatientPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <SonaidLogo />
          <span>SONAID</span>
        </Link>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-2">
          <Link href={`/patients/${params.id}`}>
            {/*@ts-ignore*/}
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-semibold">Edit SONAID Case #{params.id}</h1>
        </div>
        <div className="mx-auto w-full max-w-3xl">
          <EditPatientForm patientId={params.id} />
        </div>
      </main>
    </div>
  )
}
