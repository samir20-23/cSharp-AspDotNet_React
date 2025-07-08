import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const CompareModal = ({ properties, onClose }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-warm-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-heading font-bold text-text-primary">
                Compare Properties
              </h2>
              <p className="text-text-secondary">
                Side-by-side comparison of {properties.length} selected properties
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-surface rounded-full flex items-center justify-center hover:bg-muted transition-colors duration-200"
            >
              <Icon name="X" size={20} className="text-text-secondary" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div key={property.id} className="border border-border rounded-lg overflow-hidden">
                {/* Property Image */}
                <div className="relative h-48">
                  <Image
                    src={property?.images?.[0]}
                    alt={property?.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm text-primary-foreground px-2 py-1 rounded-md text-xs font-medium">
                    {property?.type}
                  </div>
                </div>

                {/* Property Details */}
                <div className="p-4 space-y-4">
                  <div>
                    <h3 className="font-heading font-semibold text-text-primary mb-1 line-clamp-2">
                      {property?.title}
                    </h3>
                    <p className="text-text-secondary text-sm">
                      {property?.neighborhood}, {property?.city}
                    </p>
                  </div>

                  {/* Comparison Table */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-text-secondary text-sm">Price</span>
                      <span className="font-semibold text-text-primary">
                        {formatPrice(property?.price)}
                        {property?.status === 'for-rent' && (
                          <span className="text-xs text-text-secondary">/month</span>
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-text-secondary text-sm">Type</span>
                      <span className="text-text-primary">{property?.type}</span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-text-secondary text-sm">Status</span>
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                        property?.status === 'for-sale' 
                          ? 'bg-success/20 text-success' :'bg-warning/20 text-warning'
                      }`}>
                        {property?.status === 'for-sale' ? 'For Sale' : 'For Rent'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-text-secondary text-sm">Bedrooms</span>
                      <span className="text-text-primary">{property?.bedrooms || 'N/A'}</span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-text-secondary text-sm">Bathrooms</span>
                      <span className="text-text-primary">{property?.bathrooms || 'N/A'}</span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-text-secondary text-sm">Area</span>
                      <span className="text-text-primary">{property?.area ? `${property.area}m²` : 'N/A'}</span>
                    </div>

                    <div className="py-2">
                      <span className="text-text-secondary text-sm block mb-2">Amenities</span>
                      <div className="flex flex-wrap gap-1">
                        {property?.amenities?.slice(0, 4).map((amenity, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-surface text-text-secondary text-xs rounded-md"
                          >
                            {amenity}
                          </span>
                        ))}
                        {property?.amenities?.length > 4 && (
                          <span className="px-2 py-1 bg-surface text-text-secondary text-xs rounded-md">
                            +{property.amenities.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center py-2">
                      <span className="text-text-secondary text-sm">Host</span>
                      <span className="text-text-primary">{property?.host?.name}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    variant="primary"
                    className="w-full"
                    iconName="Eye"
                    iconSize={16}
                    onClick={() => {
                      // Navigate to property detail
                      onClose();
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-surface">
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareModal;