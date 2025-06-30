"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import type { Property } from "@/contexts/PropertiesContext"
import { useFavorites } from "@/contexts/FavoritesContext"
import { Heart, MapPin, Bed, Bath, Square } from "lucide-react"

interface ListingCardProps {
  property: Property
}

const ListingCard: React.FC<ListingCardProps> = ({ property }) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites()
  const isPropertyFavorite = isFavorite(property.id)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isPropertyFavorite) {
      removeFromFavorites(property.id)
    } else {
      addToFavorites(property.id)
    }
  }

  const mainPhoto = property.media.find((m) => m.type === "photo")?.url || "/placeholder.svg?height=300&width=400"

  return (
    <Link href={`/properties/${property.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative">
          <Image
            src={mainPhoto || "/placeholder.svg"}
            alt={property.title}
            width={400}
            height={300}
            className="w-full h-48 object-cover"
          />
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
              isPropertyFavorite ? "bg-red-500 text-white" : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Heart className={`h-4 w-4 ${isPropertyFavorite ? "fill-current" : ""}`} />
          </button>
          <div className="absolute top-3 left-3">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                property.type === "rent" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
              }`}
            >
              For {property.type === "rent" ? "Rent" : "Sale"}
            </span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{property.title}</h3>

          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">
              {property.location.neighborhood}, {property.location.city}
            </span>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Bed className="h-4 w-4 mr-1" />
                <span>{property.bedrooms}</span>
              </div>
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-1" />
                <span>{property.bathrooms}</span>
              </div>
              <div className="flex items-center">
                <Square className="h-4 w-4 mr-1" />
                <span>{property.area}m²</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-blue-600">
              {property.price.toLocaleString()} {property.currency}
              {property.type === "rent" && <span className="text-sm text-gray-500">/month</span>}
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-1">
            {property.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                {tag}
              </span>
            ))}
            {property.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{property.tags.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ListingCard
