"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  role: "host" | "visitor"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string, role: "host" | "visitor") => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  isHost: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("homefinder-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in real app, this would call an API
    if (email && password) {
      const mockUser: User = {
        id: "1",
        name: email.split("@")[0],
        email,
        role: email.includes("host") ? "host" : "visitor",
      }
      setUser(mockUser)
      localStorage.setItem("homefinder-user", JSON.stringify(mockUser))
      return true
    }
    return false
  }

  const register = async (
    name: string,
    email: string,
    password: string,
    role: "host" | "visitor",
  ): Promise<boolean> => {
    // Mock registration - in real app, this would call an API
    if (name && email && password) {
      const mockUser: User = {
        id: Date.now().toString(),
        name,
        email,
        role,
      }
      setUser(mockUser)
      localStorage.setItem("homefinder-user", JSON.stringify(mockUser))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("homefinder-user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isHost: user?.role === "host",
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
