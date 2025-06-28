import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PropertyHeader = ({ property, isBookmarked, onBookmarkToggle }) => {
  const navigate = useNavigate();
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleBack = () => {
    navigate('/property-listings-browse');
  };

  const handleShare = () => {
    setShowShareMenu(!showShareMenu);
  };

  const shareOptions = [
    { name: 'Copy Link', icon: 'Link', action: () => navigator.clipboard.writeText(window.location.href) },
    { name: 'WhatsApp', icon: 'MessageCircle', action: () => window.open(`https://wa.me/?text=${encodeURIComponent(window.location.href)}`) },
    { name: 'Facebook', icon: 'Facebook', action: () => window.open(`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`) },
    { name: 'Twitter', icon: 'Twitter', action: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`) }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section - Back Button and Title */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={handleBack}
              iconName="ArrowLeft"
              iconSize={20}
              className="p-2"
            />
            
            <div className="hidden sm:block">
              <h1 className="text-lg font-heading font-semibold text-text-primary line-clamp-1">
                {property?.title}
              </h1>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="MapPin" size={14} />
                <span>{property?.location?.neighborhood}, {property?.location?.city}</span>
              </div>
            </div>
          </div>

          {/* Center Section - Price (Mobile) */}
          <div className="sm:hidden">
            <div className="text-center">
              <div className="text-lg font-bold text-primary">
                {formatPrice(property?.price)}
              </div>
              <div className="text-xs text-text-secondary">
                {property?.type === 'rent' ? 'per month' : 'total price'}
              </div>
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center space-x-2">
            {/* Price (Desktop) */}
            <div className="hidden sm:block text-right mr-4">
              <div className="text-xl font-bold text-primary">
                {formatPrice(property?.price)}
              </div>
              <div className="text-sm text-text-secondary">
                {property?.type === 'rent' ? 'per month' : 'total price'}
              </div>
            </div>

            {/* Bookmark Button */}
            <Button
              variant={isBookmarked ? "primary" : "outline"}
              onClick={onBookmarkToggle}
              iconName={isBookmarked ? "Heart" : "Heart"}
              iconSize={18}
              className="p-2"
            />

            {/* Share Button */}
            <div className="relative">
              <Button
                variant="outline"
                onClick={handleShare}
                iconName="Share"
                iconSize={18}
                className="p-2"
              />

              {/* Share Menu */}
              {showShareMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-background border border-border rounded-lg shadow-warm-lg z-50 animate-slide-down">
                  <div className="py-2">
                    {shareOptions.map((option) => (
                      <button
                        key={option.name}
                        onClick={() => {
                          option.action();
                          setShowShareMenu(false);
                        }}
                        className="flex items-center space-x-3 w-full px-4 py-2 text-left text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-200"
                      >
                        <Icon name={option.icon} size={16} />
                        <span className="text-sm">{option.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Title (Below actions) */}
        <div className="sm:hidden mt-3">
          <h1 className="text-lg font-heading font-semibold text-text-primary">
            {property?.title}
          </h1>
          <div className="flex items-center space-x-2 text-sm text-text-secondary mt-1">
            <Icon name="MapPin" size={14} />
            <span>{property?.location?.neighborhood}, {property?.location?.city}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyHeader;