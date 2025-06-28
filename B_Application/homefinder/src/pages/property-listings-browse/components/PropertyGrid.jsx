import React from 'react';
import PropertyCard from './PropertyCard';
import PropertySkeleton from './PropertySkeleton';

const PropertyGrid = ({ 
  properties, 
  loading, 
  favorites, 
  onToggleFavorite,
  hasMore,
  onLoadMore 
}) => {
  if (loading && properties.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <PropertySkeleton key={index} />
        ))}
      </div>
    );
  }

  if (properties.length === 0 && !loading) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-12 h-12 text-text-secondary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
          No Properties Found
        </h3>
        <p className="text-text-secondary max-w-md mx-auto">
          We couldn't find any properties matching your criteria. Try adjusting your filters or search terms.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Properties Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            isFavorite={favorites.includes(property.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>

      {/* Loading More Skeletons */}
      {loading && properties.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <PropertySkeleton key={`loading-${index}`} />
          ))}
        </div>
      )}

      {/* Load More Button */}
      {hasMore && !loading && (
        <div className="text-center pt-8">
          <button
            onClick={onLoadMore}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium"
          >
            Load More Properties
          </button>
        </div>
      )}

      {/* End of Results */}
      {!hasMore && properties.length > 0 && (
        <div className="text-center pt-8 pb-4">
          <p className="text-text-secondary">
            You've seen all {properties.length} properties
          </p>
        </div>
      )}
    </div>
  );
};

export default PropertyGrid;