"use client"
import { useParams } from "next/navigation"
import { useProperties } from "@/contexts/PropertiesContext"
import { useFavorites } from "@/contexts/FavoritesContext"
import Navbar from "@/components/Navbar"
import MediaGallery from "@/components/MediaGallery"
import StageList from "@/components/StageList"
import MapEmbed from "@/components/MapEmbed"
import { Heart, MapPin, Bed, Bath, Square, Phone, Mail, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PropertyDetailPage() {
  const params = useParams()
  const { getPropertyById } = useProperties()
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites()

  const property = getPropertyById(params.id as string)

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Property not found</h1>
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Properties
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const isPropertyFavorite = isFavorite(property.id)

  const handleFavoriteClick = () => {
    if (isPropertyFavorite) {
      removeFromFavorites(property.id)
    } else {
      addToFavorites(property.id)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Properties
        </Link>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>

              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{property.location.address}</span>
              </div>

              <div className="flex items-center space-x-6 mb-4">
                <div className="flex items-center">
                  <Bed className="h-5 w-5 mr-2 text-gray-500" />
                  <span>{property.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center">
                  <Bath className="h-5 w-5 mr-2 text-gray-500" />
                  <span>{property.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center">
                  <Square className="h-5 w-5 mr-2 text-gray-500" />
                  <span>{property.area}m²</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    property.type === "rent" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                  }`}
                >
                  For {property.type === "rent" ? "Rent" : "Sale"}
                </span>

                <div className="text-2xl font-bold text-blue-600">
                  {property.price.toLocaleString()} {property.currency}
                  {property.type === "rent" && <span className="text-lg text-gray-500">/month</span>}
                </div>
              </div>
            </div>

            <button
              onClick={handleFavoriteClick}
              className={`p-3 rounded-full transition-colors ${
                isPropertyFavorite ? "bg-red-500 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
            >
              <Heart className={`h-6 w-6 ${isPropertyFavorite ? "fill-current" : ""}`} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Media Gallery */}
            <MediaGallery property={property} />

            {/* Description */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Property Layout */}
            <StageList property={property} />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Contact Host</h3>
              {property.contacts.map((contact, index) => (
                <div key={index} className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{contact.name}</h4>
                  </div>

                  <div className="space-y-2">
                    <a
                      href={`tel:${contact.phone}`}
                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                    >
                      <Phone className="h-4 w-4" />
                      <span>{contact.phone}</span>
                    </a>

                    <a
                      href={`mailto:${contact.email}`}
                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                    >
                      <Mail className="h-4 w-4" />
                      <span>{contact.email}</span>
                    </a>
                  </div>

                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                    Send Message
                  </button>
                </div>
              ))}
            </div>

            {/* Map */}
            <MapEmbed property={property} />
          </div>
        </div>
      </div>
    </div>
  )
}
