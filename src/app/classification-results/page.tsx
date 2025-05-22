"use client";

import { BreastTumorClassification } from "@/components/breast-tumor-classification";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // Importar Button
import { ArrowLeft } from "lucide-react"; // Importar el ícono de flecha
import Link from "next/link"; // Importar Link para el logo
import { SonaidLogo } from "@/components/sonaid-logo"; // Importar el logo
import { UserProfileDropdown } from "@/components/user-profile-dropdown"; // Importar el dropdown del perfil

export default function ClassificationResultsPage() {
  const router = useRouter();

  useEffect(() => {
    // Optional: Check if a prediction exists. If not, maybe redirect or show a message.
    const storedPrediction = localStorage.getItem('latestPrediction');
    if (!storedPrediction) {
      // console.warn("No prediction data found in localStorage. Redirecting to home or previous page.");
      // router.push('/'); // Example: redirect to home if no data
    }
  }, [router]);

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
          <Button onClick={() => router.back()} variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Volver</span>
          </Button>
          <h1 className="text-xl sm:text-2xl font-semibold">Resultados de Clasificación</h1>
        </div>
        <div className="container mx-auto py-8 px-4">
          <BreastTumorClassification />
        </div>
      </main>
    </div>
  );
}