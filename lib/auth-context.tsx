"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import type { User } from "./types"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const MOCK_USER: User = {
  id: "stu-001",
  email: "student@example.com",
  role: "student",
  token: "mock-jwt-token-2025",
}

const VALID_CREDENTIALS = {
  email: "student@example.com",
  password: "password123",
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = typeof window !== "undefined" ? sessionStorage.getItem("erp_user") : null
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {
        sessionStorage.removeItem("erp_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 800))

    if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password) {
      setUser(MOCK_USER)
      sessionStorage.setItem("erp_user", JSON.stringify(MOCK_USER))
      return { success: true }
    }

    return { success: false, error: "Invalid email or password" }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    sessionStorage.removeItem("erp_user")
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
