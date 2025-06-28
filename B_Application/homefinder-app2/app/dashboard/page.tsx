"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useProperties } from "@/contexts/PropertiesContext"
import Navbar from "@/components/Navbar"
import { Plus, Edit, Trash2, Home } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { user, isHost } = useAuth()
  const { properties, addProperty, deleteProperty } = useProperties()
  const [showAddForm, setShowAddForm] = useState(false)

  // Mock form state for adding properties
  const [formData, setFormData] = useState({
    title: "",
    type: "rent" as "rent" | "sale",
    price: "",
    city: "",
    neighborhood: "",
    description: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    tags: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newProperty = {
      title: formData.title,
      type: formData.type,
      price: Number.parseInt(formData.price),
      currency: "MAD",
      description: formData.description,
      location: {
        city: formData.city,
        neighborhood: formData.neighborhood,
        address: `${formData.neighborhood}, ${formData.city}`,
        coordinates: { lat: 31.6295, lng: -8.0076 },
      },
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      media: [{ type: "photo" as const, url: "/placeholder.svg?height=400&width=600&text=New+Property" }],
      stages: [{ name: "Main Floor", rooms: ["Living Room", "Kitchen"] }],
      contacts: [{ name: user?.name || "Host", phone: "+212600000000", email: user?.email || "" }],
      amenities: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      bedrooms: Number.parseInt(formData.bedrooms) || 1,
      bathrooms: Number.parseInt(formData.bathrooms) || 1,
      area: Number.parseInt(formData.area) || 50,
      available: true,
    }

    addProperty(newProperty)
    setShowAddForm(false)
    setFormData({
      title: "",
      type: "rent",
      price: "",
      city: "",
      neighborhood: "",
      description: "",
      bedrooms: "",
      bathrooms: "",
      area: "",
      tags: "",
    })
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <Home className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign in to access dashboard</h1>
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

  if (!isHost) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <Home className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Host Access Required</h1>
            <p className="text-gray-600 mb-6">You need a host account to access the dashboard</p>
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Browse Properties
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const userProperties = properties.filter((p) => !["1", "2", "3"].includes(p.id))

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Host Dashboard</h1>
            <p className="text-gray-600">Manage your property listings</p>
          </div>

          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            <span>Add Property</span>
          </button>
        </div>

        {/* Add Property Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Add New Property</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as "rent" | "sale" })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="rent">For Rent</option>
                  <option value="sale">For Sale</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (MAD)</label>
                <input
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Neighborhood</label>
                <input
                  type="text"
                  required
                  value={formData.neighborhood}
                  onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                <input
                  type="number"
                  min="1"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                <input
                  type="number"
                  min="1"
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Area (m²)</label>
                <input
                  type="number"
                  min="1"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  placeholder="wifi, pool, garden, etc."
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2 flex space-x-4">
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Add Property
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Properties List */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Your Properties ({userProperties.length})</h2>
          </div>

          {userProperties.length === 0 ? (
            <div className="p-6 text-center">
              <Home className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No properties yet</h3>
              <p className="text-gray-600">Add your first property to get started</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {userProperties.map((property) => (
                <div key={property.id} className="p-6 flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{property.title}</h3>
                    <p className="text-gray-600">
                      {property.location.neighborhood}, {property.location.city}
                    </p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          property.type === "rent" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        For {property.type === "rent" ? "Rent" : "Sale"}
                      </span>
                      <span className="text-sm text-gray-500">
                        {property.price.toLocaleString()} MAD
                        {property.type === "rent" && "/month"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Link href={`/properties/${property.id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-md">
                      <Edit className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => deleteProperty(property.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
