import React from 'react';

const PropertySkeleton = () => {
  return (
    <div className="bg-background border border-border rounded-lg overflow-hidden shadow-warm animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 sm:h-56 bg-muted"></div>
      
      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="h-6 bg-muted rounded w-24"></div>
          <div className="h-4 bg-muted rounded w-4"></div>
        </div>
        
        {/* Title */}
        <div className="space-y-2">
          <div className="h-5 bg-muted rounded w-3/4"></div>
          <div className="h-5 bg-muted rounded w-1/2"></div>
        </div>
        
        {/* Location */}
        <div className="h-4 bg-muted rounded w-2/3"></div>
        
        {/* Property Details */}
        <div className="flex items-center space-x-4">
          <div className="h-4 bg-muted rounded w-8"></div>
          <div className="h-4 bg-muted rounded w-8"></div>
          <div className="h-4 bg-muted rounded w-12"></div>
        </div>
        
        {/* Amenities */}
        <div className="flex space-x-2">
          <div className="h-6 bg-muted rounded w-16"></div>
          <div className="h-6 bg-muted rounded w-12"></div>
          <div className="h-6 bg-muted rounded w-14"></div>
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-muted rounded-full"></div>
            <div className="h-4 bg-muted rounded w-20"></div>
          </div>
          <div className="h-8 bg-muted rounded w-8"></div>
        </div>
      </div>
    </div>
  );
};

export default PropertySkeleton;