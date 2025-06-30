"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import type { Property } from "@/contexts/PropertiesContext"
import {
  ChevronLeft,
  ChevronRight,
  X,
  Play,
  Wifi,
  Car,
  Waves,
  Heart,
  Mountain,
  Leaf,
  Trees,
  Dumbbell,
} from "lucide-react"

interface MediaGalleryProps {
  property: Property
}

const iconMap = {
  wifi: Wifi,
  car: Car,
  waves: Waves,
  heart: Heart,
  mountain: Mountain,
  leaf: Leaf,
  trees: Trees,
  dumbbell: Dumbbell,
}

const MediaGallery: React.FC<MediaGalleryProps> = ({ property }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showLightbox, setShowLightbox] = useState(false)

  const photos = property.media.filter((m) => m.type === "photo")
  const icons = property.media.filter((m) => m.type === "icon")
  const videos = property.media.filter((m) => m.type === "video")

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % photos.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  return (
    <div className="space-y-6">
      {/* Main Photo Gallery */}
      <div className="relative">
        <div className="relative h-96 rounded-lg overflow-hidden">
          {photos.length > 0 && (
            <Image
              src={photos[currentImageIndex]?.url || "/placeholder.svg?height=400&width=600"}
              alt={`${property.title} - Image ${currentImageIndex + 1}`}
              fill
              className="object-cover cursor-pointer"
              onClick={() => setShowLightbox(true)}
            />
          )}

          {photos.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail Strip */}
        {photos.length > 1 && (
          <div className="flex space-x-2 mt-4 overflow-x-auto">
            {photos.map((photo, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  index === currentImageIndex ? "border-blue-500" : "border-gray-200"
                }`}
              >
                <Image
                  src={photo.url || "/placeholder.svg?height=80&width=80"}
                  alt={`Thumbnail ${index + 1}`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Feature Icons */}
      {icons.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-3">Features & Amenities</h4>
          <div className="flex flex-wrap gap-4">
            {icons.map((icon, index) => {
              const IconComponent = iconMap[icon.name as keyof typeof iconMap]
              return IconComponent ? (
                <div key={index} className="flex items-center space-x-2 bg-white px-3 py-2 rounded-full">
                  <IconComponent className="h-5 w-5 text-blue-600" />
                  <span className="text-sm capitalize">{icon.name}</span>
                </div>
              ) : null
            })}
          </div>
        </div>
      )}

      {/* Video Tours */}
      {videos.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-3">Video Tours</h4>
          <div className="space-y-3">
            {videos.map((video, index) => (
              <a
                key={index}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 bg-white p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="bg-red-100 p-2 rounded-full">
                  <Play className="h-5 w-5 text-red-600" />
                </div>
                <span className="text-sm font-medium">Virtual Tour {index + 1}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox */}
      {showLightbox && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <button
            onClick={() => setShowLightbox(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <X className="h-8 w-8" />
          </button>

          <div className="relative max-w-4xl max-h-full">
            <Image
              src={photos[currentImageIndex]?.url || "/placeholder.svg?height=600&width=800"}
              alt={`${property.title} - Full size`}
              width={800}
              height={600}
              className="max-w-full max-h-full object-contain"
            />

            {photos.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
                >
                  <ChevronRight className="h-8 w-8" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default MediaGallery
