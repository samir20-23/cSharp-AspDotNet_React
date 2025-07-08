import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HostProfile = ({ host, otherListings = [] }) => {
  const formatJoinDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long'
    }).format(new Date(date));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-surface rounded-lg p-6">
      <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">
        About the Host
      </h3>

      {/* Host Information */}
      <div className="flex items-start space-x-4 mb-6">
        <div className="relative">
          <Image
            src={host?.avatar}
            alt={host?.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          {host?.isVerified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
              <Icon name="Check" size={14} color="white" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className="font-semibold text-text-primary">{host?.name}</h4>
            {host?.isVerified && (
              <span className="inline-flex items-center px-2 py-1 bg-success/20 text-success rounded-md text-xs font-medium">
                <Icon name="Shield" size={12} className="mr-1" />
                Verified
              </span>
            )}
          </div>
          
          <div className="text-sm text-text-secondary space-y-1">
            <div>Host since {formatJoinDate(host?.joinDate)}</div>
            <div>{host?.totalProperties} properties listed</div>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} className="text-warning fill-current" />
              <span>{host?.rating} ({host?.reviewCount} reviews)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Host Description */}
      {host?.description && (
        <div className="mb-6">
          <p className="text-text-secondary text-sm leading-relaxed">
            {host.description}
          </p>
        </div>
      )}

      {/* Host Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-lg font-bold text-primary">{host?.responseRate}%</div>
          <div className="text-xs text-text-secondary">Response Rate</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-primary">{host?.responseTime}</div>
          <div className="text-xs text-text-secondary">Response Time</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-primary">{host?.languages?.length}</div>
          <div className="text-xs text-text-secondary">Languages</div>
        </div>
      </div>

      {/* Languages */}
      {host?.languages && host.languages.length > 0 && (
        <div className="mb-6">
          <h5 className="font-medium text-text-primary mb-2">Languages</h5>
          <div className="flex flex-wrap gap-2">
            {host.languages.map((language, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 bg-muted text-text-secondary rounded-md text-xs"
              >
                {language}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Contact Button */}
      <Button variant="outline" fullWidth iconName="MessageCircle" className="mb-6">
        Contact {host?.name}
      </Button>

      {/* Other Listings */}
      {otherListings && otherListings.length > 0 && (
        <div>
          <h5 className="font-medium text-text-primary mb-4">
            Other Properties by {host?.name}
          </h5>
          
          <div className="space-y-3">
            {otherListings.slice(0, 3).map((listing) => (
              <Link
                key={listing.id}
                to={`/property-detail-view?id=${listing.id}`}
                className="flex items-center space-x-3 p-3 bg-background rounded-lg hover:bg-muted transition-colors duration-200 group"
              >
                <Image
                  src={listing.images[0]?.url}
                  alt={listing.title}
                  className="w-16 h-12 rounded-md object-cover"
                />
                
                <div className="flex-1 min-w-0">
                  <h6 className="font-medium text-text-primary text-sm line-clamp-1 group-hover:text-primary transition-colors duration-200">
                    {listing.title}
                  </h6>
                  <div className="text-xs text-text-secondary">
                    {listing.location.neighborhood}, {listing.location.city}
                  </div>
                  <div className="text-sm font-semibold text-primary">
                    {formatPrice(listing.price)}
                    {listing.type === 'rent' && <span className="text-xs">/month</span>}
                  </div>
                </div>
                
                <Icon name="ChevronRight" size={16} className="text-text-secondary group-hover:text-primary transition-colors duration-200" />
              </Link>
            ))}
          </div>
          
          {otherListings.length > 3 && (
            <Link
              to={`/property-listings-browse?host=${host?.id}`}
              className="block mt-4 text-center text-primary hover:text-primary/80 text-sm font-medium transition-colors duration-200"
            >
              View all {otherListings.length} properties
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default HostProfile;