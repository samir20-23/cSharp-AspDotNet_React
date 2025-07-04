import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PropertyCard = ({ property, onToggleFavorite, isFavorite }) => {
  const navigate = useNavigate();
  const [imageLoading, setImageLoading] = useState(true);

  const handleCardClick = () => {
    navigate('/property-detail-view', { state: { property } });
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(property.id);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const getPropertyTypeIcon = (type) => {
    const typeMap = {
      'riad': 'Building2',
      'apartment': 'Building',
      'villa': 'Home',
      'complex': 'Buildings',
      'traditional': 'Castle'
    };
    return typeMap[type.toLowerCase()] || 'Building';
  };

  return (
    <div 
      className="bg-background border border-border rounded-lg overflow-hidden shadow-warm hover:shadow-warm-md transition-all duration-300 cursor-pointer group"
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <Image
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onLoad={() => setImageLoading(false)}
        />
        
        {imageLoading && (
          <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
            <Icon name="Image" size={32} className="text-text-secondary" />
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors duration-200"
        >
          <Icon 
            name="Heart" 
            size={16} 
            className={`transition-colors duration-200 ${
              isFavorite ? 'text-error fill-current' : 'text-text-secondary hover:text-error'
            }`}
          />
        </button>

        {/* Property Type Badge */}
        <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm text-primary-foreground px-2 py-1 rounded-md text-xs font-medium">
          {property.type}
        </div>

        {/* Status Badge */}
        <div className={`absolute bottom-3 left-3 px-2 py-1 rounded-md text-xs font-medium ${
          property.status === 'for-sale' 
            ? 'bg-success/90 text-success-foreground' :'bg-warning/90 text-warning-foreground'
        }`}>
          {property.status === 'for-sale' ? 'For Sale' : 'For Rent'}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Price */}
        <div className="flex items-center justify-between mb-2">
          <div className="text-lg font-semibold text-text-primary">
            {formatPrice(property.price)}
            {property.status === 'for-rent' && (
              <span className="text-sm font-normal text-text-secondary">/month</span>
            )}
          </div>
          <div className="flex items-center space-x-1 text-text-secondary">
            <Icon name={getPropertyTypeIcon(property.type)} size={16} />
          </div>
        </div>

        {/* Title */}
        <h3 className="font-heading font-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center space-x-1 text-text-secondary mb-3">
          <Icon name="MapPin" size={14} />
          <span className="text-sm">{property.neighborhood}, {property.city}</span>
        </div>

        {/* Property Details */}
        <div className="flex items-center space-x-4 text-sm text-text-secondary mb-3">
          {property.bedrooms && (
            <div className="flex items-center space-x-1">
              <Icon name="Bed" size={14} />
              <span>{property.bedrooms}</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center space-x-1">
              <Icon name="Bath" size={14} />
              <span>{property.bathrooms}</span>
            </div>
          )}
          {property.area && (
            <div className="flex items-center space-x-1">
              <Icon name="Square" size={14} />
              <span>{property.area}m²</span>
            </div>
          )}
        </div>

        {/* Amenities Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {property.amenities.slice(0, 3).map((amenity, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-surface text-text-secondary text-xs rounded-md"
            >
              {amenity}
            </span>
          ))}
          {property.amenities.length > 3 && (
            <span className="px-2 py-1 bg-surface text-text-secondary text-xs rounded-md">
              +{property.amenities.length - 3} more
            </span>
          )}
        </div>

        {/* Contact Info */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <Icon name="User" size={12} color="white" />
            </div>
            <span className="text-sm text-text-secondary">{property.host.name}</span>
          </div>
          
          <Button
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              window.open(`tel:${property.host.phone}`, '_self');
            }}
            iconName="Phone"
            iconSize={14}
            className="text-primary hover:text-primary-foreground hover:bg-primary"
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;