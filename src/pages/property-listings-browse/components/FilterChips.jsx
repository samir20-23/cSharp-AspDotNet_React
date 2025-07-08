import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterChips = ({ filters, onRemoveFilter, onClearAll }) => {
  const getActiveFilters = () => {
    const active = [];

    // Price range
    if (filters.priceRange.min > 0 || filters.priceRange.max < 10000000) {
      const formatPrice = (price) => {
        return new Intl.NumberFormat('fr-MA', {
          style: 'currency',
          currency: 'MAD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
          notation: 'compact'
        }).format(price);
      };

      let priceLabel = '';
      if (filters.priceRange.min > 0 && filters.priceRange.max < 10000000) {
        priceLabel = `${formatPrice(filters.priceRange.min)} - ${formatPrice(filters.priceRange.max)}`;
      } else if (filters.priceRange.min > 0) {
        priceLabel = `From ${formatPrice(filters.priceRange.min)}`;
      } else {
        priceLabel = `Up to ${formatPrice(filters.priceRange.max)}`;
      }

      active.push({
        type: 'price',
        label: priceLabel,
        value: 'priceRange'
      });
    }

    // Property types
    filters.propertyTypes.forEach(type => {
      const typeLabels = {
        'riad': 'Riad',
        'apartment': 'Apartment',
        'villa': 'Villa',
        'complex': 'Complex',
        'traditional': 'Traditional House'
      };
      
      active.push({
        type: 'propertyType',
        label: typeLabels[type] || type,
        value: type
      });
    });

    // Location
    if (filters.location.city) {
      let locationLabel = filters.location.city;
      if (filters.location.neighborhood) {
        locationLabel += `, ${filters.location.neighborhood}`;
      }
      
      active.push({
        type: 'location',
        label: locationLabel,
        value: 'location'
      });
    }

    // Amenities
    filters.amenities.forEach(amenity => {
      active.push({
        type: 'amenity',
        label: amenity,
        value: amenity
      });
    });

    return active;
  };

  const activeFilters = getActiveFilters();

  if (activeFilters.length === 0) {
    return null;
  }

  const handleRemoveFilter = (filter) => {
    switch (filter.type) {
      case 'price': onRemoveFilter('priceRange', { min: 0, max: 10000000 });
        break;
      case 'propertyType': onRemoveFilter('propertyTypes', filters.propertyTypes.filter(t => t !== filter.value));
        break;
      case 'location': onRemoveFilter('location', { city: '', neighborhood: '' });
        break;
      case 'amenity': onRemoveFilter('amenities', filters.amenities.filter(a => a !== filter.value));
        break;
    }
  };

  return (
    <div className="flex items-center space-x-3 py-4 overflow-x-auto">
      <div className="flex items-center space-x-2 flex-shrink-0">
        <span className="text-sm font-medium text-text-secondary">Active filters:</span>
        
        {activeFilters.length > 1 && (
          <Button
            variant="ghost"
            onClick={onClearAll}
            className="text-xs text-primary hover:text-primary-foreground hover:bg-primary px-2 py-1 h-auto"
          >
            Clear all
          </Button>
        )}
      </div>

      <div className="flex items-center space-x-2 min-w-0">
        {activeFilters.map((filter, index) => (
          <div
            key={`${filter.type}-${filter.value}-${index}`}
            className="flex items-center space-x-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0"
          >
            <span>{filter.label}</span>
            <button
              onClick={() => handleRemoveFilter(filter)}
              className="ml-1 hover:bg-primary/20 rounded-full p-0.5 transition-colors duration-200"
            >
              <Icon name="X" size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterChips;