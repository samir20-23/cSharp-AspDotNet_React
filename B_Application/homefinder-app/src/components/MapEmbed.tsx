"use client"

import type React from "react"
import type { Property } from "@/contexts/PropertiesContext"
import { MapPin } from "lucide-react"

interface MapEmbedProps {
  property: Property
}

const MapEmbed: React.FC<MapEmbedProps> = ({ property }) => {
  const { coordinates, address } = property.location

  // Google Maps embed URL
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(address)}`

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <MapPin className="h-5 w-5 mr-2 text-blue-600" />
        Location
      </h3>

      <div className="mb-4">
        <p className="text-gray-700 font-medium">{property.location.neighborhood}</p>
        <p className="text-gray-600">{address}</p>
      </div>

      {/* Mock Map - In production, you'd use Google Maps API */}
      <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-2" />
            <p className="text-gray-600 font-medium">{property.location.city}</p>
            <p className="text-sm text-gray-500">{property.location.neighborhood}</p>
            <p className="text-xs text-gray-400 mt-2">
              Coordinates: {coordinates.lat}, {coordinates.lng}
            </p>
          </div>
        </div>

        {/* Overlay to simulate interactive map */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-green-100/30"></div>

        {/* Mock marker */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{ marginTop: "-12px" }}
        >
          <div className="bg-red-500 w-6 h-6 rounded-full border-2 border-white shadow-lg"></div>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>• Walking distance to local amenities</p>
        <p>• Easy access to public transportation</p>
        <p>• Safe and well-connected neighborhood</p>
      </div>
    </div>
  )
}

export default MapEmbed
