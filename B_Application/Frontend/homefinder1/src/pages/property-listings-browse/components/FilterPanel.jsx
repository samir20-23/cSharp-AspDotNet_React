import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterPanel = ({ 
  filters, 
  onFiltersChange, 
  onClose, 
  isOpen, 
  isMobile = false 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    type: true,
    location: true,
    amenities: false
  });

  const propertyTypes = [
    { id: 'riad', label: 'Riad', icon: 'Building2' },
    { id: 'apartment', label: 'Apartment', icon: 'Building' },
    { id: 'villa', label: 'Villa', icon: 'Home' },
    { id: 'complex', label: 'Complex', icon: 'Buildings' },
    { id: 'traditional', label: 'Traditional House', icon: 'Castle' }
  ];

  const cities = [
    'Marrakech', 'Casablanca', 'Rabat', 'Fez', 'Tangier', 'Essaouira', 'Agadir', 'Meknes'
  ];

  const neighborhoods = {
    'Marrakech': ['Medina', 'Gueliz', 'Palmeraie', 'Hivernage'],
    'Casablanca': ['Anfa', 'Maarif', 'Racine', 'Bourgogne'],
    'Rabat': ['Agdal', 'Hassan', 'Souissi', 'Hay Riad'],
    'Fez': ['Medina', 'Ville Nouvelle', 'Atlas', 'Saiss'],
    'Tangier': ['Medina', 'Malabata', 'Boubana', 'California'],
    'Essaouira': ['Medina', 'Diabat', 'Ghazoua', 'Ounagha']
  };

  const amenities = [
    'WiFi', 'Pool', 'Garden', 'Parking', 'Air Conditioning', 'Heating',
    'Kitchen', 'Terrace', 'Balcony', 'Fireplace', 'Security', 'Elevator'
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handlePriceChange = (field, value) => {
    setLocalFilters(prev => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [field]: parseInt(value) || 0
      }
    }));
  };

  const handleTypeToggle = (type) => {
    setLocalFilters(prev => ({
      ...prev,
      propertyTypes: prev.propertyTypes.includes(type)
        ? prev.propertyTypes.filter(t => t !== type)
        : [...prev.propertyTypes, type]
    }));
  };

  const handleLocationChange = (field, value) => {
    setLocalFilters(prev => {
      const newFilters = {
        ...prev,
        location: {
          ...prev.location,
          [field]: value
        }
      };
      
      // Reset neighborhood if city changes
      if (field === 'city') {
        newFilters.location.neighborhood = '';
      }
      
      return newFilters;
    });
  };

  const handleAmenityToggle = (amenity) => {
    setLocalFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    if (isMobile) {
      onClose();
    }
  };

  const handleResetFilters = () => {
    const resetFilters = {
      priceRange: { min: 0, max: 10000000 },
      propertyTypes: [],
      location: { city: '', neighborhood: '' },
      amenities: [],
      status: 'all'
    };
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const FilterSection = ({ title, isExpanded, onToggle, children }) => (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-surface transition-colors duration-200"
      >
        <span className="font-medium text-text-primary">{title}</span>
        <Icon 
          name="ChevronDown" 
          size={18} 
          className={`text-text-secondary transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isExpanded && (
        <div className="px-4 pb-4">
          {children}
        </div>
      )}
    </div>
  );

  const content = (
    <div className="bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-heading font-semibold text-text-primary">Filters</h2>
        {isMobile && (
          <Button variant="ghost" onClick={onClose} iconName="X" iconSize={20} />
        )}
      </div>

      {/* Filter Sections */}
      <div className="max-h-96 overflow-y-auto">
        {/* Price Range */}
        <FilterSection
          title="Price Range"
          isExpanded={expandedSections.price}
          onToggle={() => toggleSection('price')}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Min Price
                </label>
                <Input
                  type="number"
                  placeholder="0"
                  value={localFilters.priceRange.min || ''}
                  onChange={(e) => handlePriceChange('min', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Max Price
                </label>
                <Input
                  type="number"
                  placeholder="No limit"
                  value={localFilters.priceRange.max === 10000000 ? '' : localFilters.priceRange.max}
                  onChange={(e) => handlePriceChange('max', e.target.value || 10000000)}
                />
              </div>
            </div>
            <div className="text-sm text-text-secondary">
              Range: {formatPrice(localFilters.priceRange.min)} - {
                localFilters.priceRange.max === 10000000 
                  ? 'No limit' 
                  : formatPrice(localFilters.priceRange.max)
              }
            </div>
          </div>
        </FilterSection>

        {/* Property Type */}
        <FilterSection
          title="Property Type"
          isExpanded={expandedSections.type}
          onToggle={() => toggleSection('type')}
        >
          <div className="grid grid-cols-2 gap-2">
            {propertyTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => handleTypeToggle(type.id)}
                className={`flex items-center space-x-2 p-3 rounded-lg border transition-all duration-200 ${
                  localFilters.propertyTypes.includes(type.id)
                    ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon name={type.icon} size={16} />
                <span className="text-sm font-medium">{type.label}</span>
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Location */}
        <FilterSection
          title="Location"
          isExpanded={expandedSections.location}
          onToggle={() => toggleSection('location')}
        >
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                City
              </label>
              <select
                value={localFilters.location.city}
                onChange={(e) => handleLocationChange('city', e.target.value)}
                className="w-full p-2 border border-border rounded-lg bg-background text-text-primary focus:border-primary focus:outline-none"
              >
                <option value="">All Cities</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            
            {localFilters.location.city && neighborhoods[localFilters.location.city] && (
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Neighborhood
                </label>
                <select
                  value={localFilters.location.neighborhood}
                  onChange={(e) => handleLocationChange('neighborhood', e.target.value)}
                  className="w-full p-2 border border-border rounded-lg bg-background text-text-primary focus:border-primary focus:outline-none"
                >
                  <option value="">All Neighborhoods</option>
                  {neighborhoods[localFilters.location.city].map((neighborhood) => (
                    <option key={neighborhood} value={neighborhood}>{neighborhood}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </FilterSection>

        {/* Amenities */}
        <FilterSection
          title="Amenities"
          isExpanded={expandedSections.amenities}
          onToggle={() => toggleSection('amenities')}
        >
          <div className="grid grid-cols-2 gap-2">
            {amenities.map((amenity) => (
              <button
                key={amenity}
                onClick={() => handleAmenityToggle(amenity)}
                className={`flex items-center space-x-2 p-2 rounded-lg text-sm transition-all duration-200 ${
                  localFilters.amenities.includes(amenity)
                    ? 'bg-primary/10 text-primary border border-primary' :'bg-surface text-text-secondary hover:text-text-primary hover:bg-muted border border-transparent'
                }`}
              >
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                  localFilters.amenities.includes(amenity)
                    ? 'border-primary bg-primary' :'border-border'
                }`}>
                  {localFilters.amenities.includes(amenity) && (
                    <Icon name="Check" size={10} color="white" />
                  )}
                </div>
                <span>{amenity}</span>
              </button>
            ))}
          </div>
        </FilterSection>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-border bg-surface">
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={handleResetFilters}
            className="flex-1"
          >
            Reset
          </Button>
          <Button
            variant="primary"
            onClick={handleApplyFilters}
            className="flex-1"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose}>
            <div 
              className="absolute bottom-0 left-0 right-0 bg-background rounded-t-lg max-h-[80vh] overflow-hidden animate-slide-up"
              onClick={(e) => e.stopPropagation()}
            >
              {content}
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="w-80 bg-background border border-border rounded-lg shadow-warm">
      {content}
    </div>
  );
};

export default FilterPanel;