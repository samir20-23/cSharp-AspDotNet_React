"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface FavoritesContextType {
  favorites: string[]
  addToFavorites: (propertyId: string) => void
  removeFromFavorites: (propertyId: string) => void
  isFavorite: (propertyId: string) => boolean
  clearFavorites: () => void
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([])

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("homefinder-favorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("homefinder-favorites", JSON.stringify(favorites))
  }, [favorites])

  const addToFavorites = (propertyId: string) => {
    setFavorites((prev) => [...prev, propertyId])
  }

  const removeFromFavorites = (propertyId: string) => {
    setFavorites((prev) => prev.filter((id) => id !== propertyId))
  }

  const isFavorite = (propertyId: string) => {
    return favorites.includes(propertyId)
  }

  const clearFavorites = () => {
    setFavorites([])
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}
