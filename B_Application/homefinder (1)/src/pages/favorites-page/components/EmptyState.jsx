import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const EmptyState = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-20">
      <div className="max-w-md mx-auto">
        {/* Heart Icon */}
        <div className="w-24 h-24 mx-auto mb-6 bg-surface rounded-full flex items-center justify-center">
          <Icon name="Heart" size={48} className="text-text-secondary" />
        </div>
        
        {/* Title */}
        <h3 className="text-2xl font-heading font-semibold text-text-primary mb-3">
          No Favorites Yet
        </h3>
        
        {/* Description */}
        <p className="text-text-secondary mb-8 leading-relaxed">
          Start building your collection of dream properties! Browse our listings and click the heart icon on any property you'd like to save for later.
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="primary"
            onClick={() => navigate('/property-listings-browse')}
            iconName="Search"
            iconSize={16}
            className="px-6 py-3"
          >
            Browse Properties
          </Button>
          
          <Button
            variant="outline"
            onClick={() => navigate('/property-listings-browse?type=riad')}
            iconName="Building2"
            iconSize={16}
            className="px-6 py-3"
          >
            Explore Riads
          </Button>
        </div>
        
        {/* Features List */}
        <div className="mt-12 text-left">
          <h4 className="text-lg font-heading font-medium text-text-primary mb-4 text-center">
            Why Save Favorites?
          </h4>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="Check" size={12} className="text-primary" />
              </div>
              <div>
                <p className="text-text-primary font-medium">Quick Access</p>
                <p className="text-sm text-text-secondary">Easily return to properties that caught your eye</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="Check" size={12} className="text-primary" />
              </div>
              <div>
                <p className="text-text-primary font-medium">Compare Options</p>
                <p className="text-sm text-text-secondary">Side-by-side comparison of your top choices</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="Check" size={12} className="text-primary" />
              </div>
              <div>
                <p className="text-text-primary font-medium">Share & Export</p>
                <p className="text-sm text-text-secondary">Share your favorites or export for offline review</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;