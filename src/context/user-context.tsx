"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define the doctor type
export type Doctor = {
  id: string
  name: string
  email: string
  specialty: string
  hospital: string
  department: string
  profileImage: string
  yearsOfExperience: number
  bio: string
}

// Mock doctor data
const mockDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    email: "doctor@hospital.com",
    specialty: "Cardiology",
    hospital: "Memorial Hospital",
    department: "Cardiology",
    profileImage: "/placeholder.svg?height=200&width=200",
    yearsOfExperience: 12,
    bio: "Dr. Johnson is a board-certified cardiologist specializing in echocardiography and cardiac imaging. She has published numerous papers on ultrasound techniques for cardiac diagnosis.",
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    email: "mchen@hospital.com",
    specialty: "Radiology",
    hospital: "Memorial Hospital",
    department: "Radiology",
    profileImage: "/placeholder.svg?height=200&width=200",
    yearsOfExperience: 8,
    bio: "Dr. Chen specializes in diagnostic imaging with a focus on ultrasound technology. He has pioneered several techniques for improving image clarity in difficult cases.",
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    email: "erodriguez@hospital.com",
    specialty: "Obstetrics",
    hospital: "Women's Health Center",
    department: "Obstetrics & Gynecology",
    profileImage: "/placeholder.svg?height=200&width=200",
    yearsOfExperience: 15,
    bio: "Dr. Rodriguez is an expert in maternal-fetal medicine with extensive experience in prenatal ultrasound diagnostics.",
  },
]

type UserContextType = {
  currentUser: Doctor | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  allDoctors: Doctor[]
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<Doctor | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = () => {
      const hasSession = document.cookie.includes("auth_session=")
      if (hasSession) {
        // In a real app, you would fetch the user data from an API
        // For this demo, we'll use the first mock doctor
        setCurrentUser(mockDoctors[0])
      }
      setIsLoading(false)
    }

    checkSession()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Find doctor by email (in a real app, this would be a server-side check)
        const doctor = mockDoctors.find((d) => d.email.toLowerCase() === email.toLowerCase())

        if (doctor && password.length >= 6) {
          // Set cookie and user
          document.cookie = "auth_session=authenticated; path=/; max-age=86400"
          setCurrentUser(doctor)
          setIsLoading(false)
          resolve(true)
        } else {
          setIsLoading(false)
          resolve(false)
        }
      }, 1000)
    })
  }

  const logout = () => {
    // Clear cookie and user state
    document.cookie = "auth_session=; path=/; max-age=0"
    setCurrentUser(null)
  }

  return (
    <UserContext.Provider value={{ currentUser, isLoading, login, logout, allDoctors: mockDoctors }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
