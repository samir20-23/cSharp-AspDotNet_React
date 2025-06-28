"use client"
import Navbar from "@/components/Navbar"
import Filters from "@/components/Filters"
import ListingGrid from "@/components/ListingGrid"
import { PropertiesProvider } from "@/contexts/PropertiesContext"
import { FavoritesProvider } from "@/contexts/FavoritesContext"
import { AuthProvider } from "@/contexts/AuthContext"
import Navbar from "@/components/Navbar"
import Filters from "@/components/Filters"
// …etc.

export default function HomePage() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <PropertiesProvider>
          <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Perfect Home in Morocco</h1>
                <p className="text-gray-600">
                  Discover beautiful properties for rent and sale across Morocco's most desirable locations
                </p>
              </div>

              <Filters />
              <ListingGrid />
            </main>
          </div>
        </PropertiesProvider>
      </FavoritesProvider>
    </AuthProvider>
  )
}
