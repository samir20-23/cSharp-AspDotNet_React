"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface Property {
  id: string
  title: string
  type: "rent" | "sale"
  price: number
  currency: string
  description: string
  location: {
    city: string
    neighborhood: string
    address: string
    coordinates: { lat: number; lng: number }
  }
  tags: string[]
  media: Array<{
    type: "photo" | "icon" | "video"
    url?: string
    name?: string
  }>
  stages: Array<{
    name: string
    rooms: string[]
  }>
  contacts: Array<{
    name: string
    phone: string
    email: string
  }>
  amenities: string[]
  bedrooms: number
  bathrooms: number
  area: number
  available: boolean
}

export interface Filters {
  type: "all" | "rent" | "sale"
  city: string
  tags: string[]
  priceRange: [number, number]
  searchQuery: string
}

interface PropertiesContextType {
  properties: Property[]
  filteredProperties: Property[]
  filters: Filters
  loading: boolean
  error: string | null
  setFilters: (filters: Partial<Filters>) => void
  addProperty: (property: Omit<Property, "id">) => void
  updateProperty: (id: string, property: Partial<Property>) => void
  deleteProperty: (id: string) => void
  getPropertyById: (id: string) => Property | undefined
}

const PropertiesContext = createContext<PropertiesContextType | undefined>(undefined)

export const useProperties = () => {
  const context = useContext(PropertiesContext)
  if (!context) {
    throw new Error("useProperties must be used within a PropertiesProvider")
  }
  return context
}

export const PropertiesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFiltersState] = useState<Filters>({
    type: "all",
    city: "",
    tags: [],
    priceRange: [0, 5000000],
    searchQuery: "",
  })

  // Load properties from JSON file
  useEffect(() => {
    const loadProperties = async () => {
      try {
        setLoading(true)
        // In a real app, this would be an API call
        const response = await fetch("/data/properties.json")
        if (!response.ok) {
          throw new Error("Failed to load properties")
        }
        const data = await response.json()
        setProperties(data)

        // Also load from localStorage for user-added properties
        const savedProperties = localStorage.getItem("homefinder-properties")
        if (savedProperties) {
          const parsed = JSON.parse(savedProperties)
          setProperties((prev) => [...prev, ...parsed])
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load properties")
      } finally {
        setLoading(false)
      }
    }

    loadProperties()
  }, [])

  // Filter properties based on current filters
  const filteredProperties = properties.filter((property) => {
    if (filters.type !== "all" && property.type !== filters.type) return false
    if (filters.city && property.location.city.toLowerCase() !== filters.city.toLowerCase()) return false
    if (filters.tags.length > 0 && !filters.tags.some((tag) => property.tags.includes(tag))) return false
    if (property.price < filters.priceRange[0] || property.price > filters.priceRange[1]) return false
    if (filters.searchQuery && !property.title.toLowerCase().includes(filters.searchQuery.toLowerCase())) return false
    return true
  })

  const setFilters = (newFilters: Partial<Filters>) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters }))
  }

  const addProperty = (property: Omit<Property, "id">) => {
    const newProperty: Property = {
      ...property,
      id: Date.now().toString(),
    }
    setProperties((prev) => [...prev, newProperty])

    // Save to localStorage
    const userProperties = properties.filter((p) => !["1", "2", "3"].includes(p.id))
    localStorage.setItem("homefinder-properties", JSON.stringify([...userProperties, newProperty]))
  }

  const updateProperty = (id: string, updates: Partial<Property>) => {
    setProperties((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)))

    // Update localStorage
    const userProperties = properties.filter((p) => !["1", "2", "3"].includes(p.id))
    localStorage.setItem("homefinder-properties", JSON.stringify(userProperties))
  }

  const deleteProperty = (id: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== id))

    // Update localStorage
    const userProperties = properties.filter((p) => !["1", "2", "3"].includes(p.id) && p.id !== id)
    localStorage.setItem("homefinder-properties", JSON.stringify(userProperties))
  }

  const getPropertyById = (id: string) => {
    return properties.find((p) => p.id === id)
  }

  return (
    <PropertiesContext.Provider
      value={{
        properties,
        filteredProperties,
        filters,
        loading,
        error,
        setFilters,
        addProperty,
        updateProperty,
        deleteProperty,
        getPropertyById,
      }}
    >
      {children}
    </PropertiesContext.Provider>
  )
}
