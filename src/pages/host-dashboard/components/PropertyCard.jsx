import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PropertyCard = ({ property, onEdit, onDuplicate, onToggleStatus, onViewAnalytics }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success text-success-foreground';
      case 'inactive':
        return 'bg-muted text-muted-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'inactive':
        return 'Inactive';
      case 'pending':
        return 'Pending Review';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-warm transition-shadow duration-200">
      <div className="relative">
        <div className="h-48 overflow-hidden">
          <Image
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
            {getStatusText(property.status)}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <div className="relative">
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-8 h-8 p-0 bg-background/80 backdrop-blur-sm hover:bg-background"
              iconName="MoreVertical"
              iconSize={16}
            />
            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-background border border-border rounded-lg shadow-warm-lg z-10">
                <div className="py-1">
                  <button
                    onClick={() => {
                      onEdit(property.id);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-left text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-200"
                  >
                    <Icon name="Edit" size={16} />
                    <span>Edit Property</span>
                  </button>
                  <button
                    onClick={() => {
                      onDuplicate(property.id);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-left text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-200"
                  >
                    <Icon name="Copy" size={16} />
                    <span>Duplicate</span>
                  </button>
                  <button
                    onClick={() => {
                      onToggleStatus(property.id);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-left text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-200"
                  >
                    <Icon name={property.status === 'active' ? 'EyeOff' : 'Eye'} size={16} />
                    <span>{property.status === 'active' ? 'Deactivate' : 'Activate'}</span>
                  </button>
                  <button
                    onClick={() => {
                      onViewAnalytics(property.id);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-left text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-200"
                  >
                    <Icon name="BarChart3" size={16} />
                    <span>View Analytics</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-heading font-semibold text-text-primary text-lg line-clamp-1">
            {property.title}
          </h3>
          <span className="text-primary font-bold text-lg ml-2">
            {property.price}
          </span>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-text-secondary mb-3">
          <div className="flex items-center space-x-1">
            <Icon name="MapPin" size={14} />
            <span>{property.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Home" size={14} />
            <span>{property.type}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
          <div className="text-center">
            <div className="font-semibold text-text-primary">{property.views}</div>
            <div className="text-text-secondary">Views</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-text-primary">{property.inquiries}</div>
            <div className="text-text-secondary">Inquiries</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-text-primary">{property.bookings}</div>
            <div className="text-text-secondary">Bookings</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span>Last updated: {property.lastUpdated}</span>
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${
              property.recentActivity ? 'bg-success' : 'bg-muted'
            }`}></div>
            <span>{property.recentActivity ? 'Recent activity' : 'No recent activity'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;