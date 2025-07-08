import React from 'react';
import FavoritePropertyCard from './FavoritePropertyCard';

const FavoritesGrid = ({ 
  properties, 
  selectedProperties, 
  onPropertySelect, 
  onRemoveFromFavorites 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <div key={property.id} className="relative">
          <input
            type="checkbox"
            checked={selectedProperties.includes(property.id)}
            onChange={() => onPropertySelect(property.id)}
            className="absolute top-4 left-4 z-10 w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
          />
          <FavoritePropertyCard
            property={property}
            onRemoveFromFavorites={onRemoveFromFavorites}
          />
        </div>
      ))}
    </div>
  );
};

export default FavoritesGrid;