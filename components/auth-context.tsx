"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  email: string
  name: string
  role: "admin" | "staff"
}

interface AuthContextType {
  user: User | null 
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("crm-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    if (email === "admin@webacademy.com" && password === "admin123") {
      const adminUser = {
        id: "1",
        email: "admin@webacademy.com",
        name: "Admin User",
        role: "admin" as const,
      }
      setUser(adminUser)
      localStorage.setItem("crm-user", JSON.stringify(adminUser))
      return true
    } else if (email === "staff@webacademy.com" && password === "staff123") {
      const staffUser = {
        id: "2",
        email: "staff@webacademy.com",
        name: "Staff User",
        role: "staff" as const,
      }
      setUser(staffUser)
      localStorage.setItem("crm-user", JSON.stringify(staffUser))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("crm-user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
