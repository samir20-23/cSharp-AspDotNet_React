"use client"

import type React from "react"
import { useProperties } from "@/contexts/PropertiesContext"
import ListingCard from "./ListingCard"
import { Loader2 } from "lucide-react"

const ListingGrid: React.FC = () => {
  const { filteredProperties, loading, error } = useProperties()

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading properties...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-2">Error loading properties</div>
        <div className="text-gray-600">{error}</div>
      </div>
    )
  }

  if (filteredProperties.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-600 mb-2">No properties found</div>
        <div className="text-sm text-gray-500">Try adjusting your filters</div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProperties.map((property) => (
        <ListingCard key={property.id} property={property} />
      ))}
    </div>
  )
}

export default ListingGrid
