import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapView = ({ properties, onPropertySelect, selectedProperty }) => {
  const [mapLoaded, setMapLoaded] = useState(false);

  // Mock coordinates for Moroccan cities
  const cityCoordinates = {
    'Marrakech': { lat: 31.6295, lng: -7.9811 },
    'Casablanca': { lat: 33.5731, lng: -7.5898 },
    'Rabat': { lat: 34.0209, lng: -6.8416 },
    'Fez': { lat: 34.0181, lng: -5.0078 },
    'Tangier': { lat: 35.7595, lng: -5.8340 },
    'Essaouira': { lat: 31.5085, lng: -9.7595 }
  };

  const getPropertyCoordinates = (property) => {
    const cityCoords = cityCoordinates[property.city] || cityCoordinates['Marrakech'];
    // Add small random offset for properties in same city
    return {
      lat: cityCoords.lat + (Math.random() - 0.5) * 0.02,
      lng: cityCoords.lng + (Math.random() - 0.5) * 0.02
    };
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      notation: 'compact'
    }).format(price);
  };

  // Center map on Morocco
  const mapCenter = { lat: 31.7917, lng: -7.0926 };
  const mapSrc = `https://www.google.com/maps?q=${mapCenter.lat},${mapCenter.lng}&z=6&output=embed`;

  return (
    <div className="relative h-96 lg:h-[600px] bg-muted rounded-lg overflow-hidden">
      {/* Map Container */}
      <div className="absolute inset-0">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Properties Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={mapSrc}
          onLoad={() => setMapLoaded(true)}
          className="border-0"
        />
        
        {!mapLoaded && (
          <div className="absolute inset-0 bg-muted flex items-center justify-center">
            <div className="text-center">
              <Icon name="Map" size={48} className="text-text-secondary mx-auto mb-2" />
              <p className="text-text-secondary">Loading map...</p>
            </div>
          </div>
        )}
      </div>

      {/* Property Markers Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {properties.slice(0, 20).map((property, index) => {
          const coords = getPropertyCoordinates(property);
          // Convert coordinates to approximate pixel positions (simplified)
          const x = ((coords.lng + 12) / 12) * 100; // Rough conversion for Morocco bounds
          const y = ((35 - coords.lat) / 8) * 100;
          
          return (
            <div
              key={property.id}
              className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2"
              style={{ 
                left: `${Math.max(5, Math.min(95, x))}%`, 
                top: `${Math.max(5, Math.min(95, y))}%` 
              }}
            >
              <button
                onClick={() => onPropertySelect(property)}
                className={`relative bg-primary text-primary-foreground px-2 py-1 rounded-lg text-xs font-medium shadow-warm hover:shadow-warm-md transition-all duration-200 hover:scale-110 ${
                  selectedProperty?.id === property.id ? 'ring-2 ring-accent scale-110' : ''
                }`}
              >
                {formatPrice(property.price)}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-primary"></div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <Button
          variant="secondary"
          onClick={() => window.open(`https://www.google.com/maps?q=${mapCenter.lat},${mapCenter.lng}&z=6`, '_blank')}
          iconName="ExternalLink"
          iconSize={16}
          className="shadow-warm"
        />
      </div>

      {/* Property Info Card */}
      {selectedProperty && (
        <div className="absolute bottom-4 left-4 right-4 bg-background border border-border rounded-lg shadow-warm-lg p-4 max-w-sm">
          <div className="flex items-start space-x-3">
            <img
              src={selectedProperty.images[0]}
              alt={selectedProperty.title}
              className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
              onError={(e) => {
                e.target.src = '/assets/images/no_image.png';
              }}
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-heading font-semibold text-text-primary text-sm line-clamp-1">
                {selectedProperty.title}
              </h3>
              <p className="text-text-secondary text-xs mb-1">
                {selectedProperty.neighborhood}, {selectedProperty.city}
              </p>
              <p className="text-primary font-semibold text-sm">
                {formatPrice(selectedProperty.price)}
                {selectedProperty.status === 'for-rent' && (
                  <span className="text-xs font-normal text-text-secondary">/month</span>
                )}
              </p>
            </div>
            <button
              onClick={() => onPropertySelect(null)}
              className="flex-shrink-0 p-1 hover:bg-surface rounded-md transition-colors duration-200"
            >
              <Icon name="X" size={16} className="text-text-secondary" />
            </button>
          </div>
        </div>
      )}

      {/* Properties Count */}
      <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm border border-border rounded-lg px-3 py-2">
        <span className="text-sm font-medium text-text-primary">
          {properties.length} {properties.length === 1 ? 'Property' : 'Properties'}
        </span>
      </div>
    </div>
  );
};

export default MapView;