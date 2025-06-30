"use client"
import { useFavorites } from "@/contexts/FavoritesContext"
import { useProperties } from "@/contexts/PropertiesContext"
import { useAuth } from "@/contexts/AuthContext"
import Navbar from "@/components/Navbar"
import ListingCard from "@/components/ListingCard"
import { Heart, Trash2 } from "lucide-react"
import Link from "next/link"

export default function FavoritesPage() {
  const { favorites, clearFavorites } = useFavorites()
  const { properties } = useProperties()
  const { isAuthenticated } = useAuth()

  const favoriteProperties = properties.filter((property) => favorites.includes(property.id))

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <Heart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign in to view your favorites</h1>
            <p className="text-gray-600 mb-6">Create an account or sign in to save your favorite properties</p>
            <Link
              href="/login"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Favorite Properties</h1>
            <p className="text-gray-600">
              {favoriteProperties.length} {favoriteProperties.length === 1 ? "property" : "properties"} saved
            </p>
          </div>

          {favorites.length > 0 && (
            <button
              onClick={clearFavorites}
              className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              <span>Clear All</span>
            </button>
          )}
        </div>

        {favoriteProperties.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No favorites yet</h3>
            <p className="text-gray-600 mb-6">Start browsing properties and save your favorites to see them here</p>
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Browse Properties
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteProperties.map((property) => (
              <ListingCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
