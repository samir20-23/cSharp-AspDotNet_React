import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PropertyDetails = ({ property }) => {
  const [expandedSection, setExpandedSection] = useState('description');

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatPhoneNumber = (phone) => {
    // Format Moroccan phone number
    if (phone.startsWith('+212')) {
      const number = phone.slice(4);
      return `+212 ${number.slice(0, 1)} ${number.slice(1, 3)} ${number.slice(3, 5)} ${number.slice(5, 7)} ${number.slice(7)}`;
    }
    return phone;
  };

  const AccordionSection = ({ title, icon, isExpanded, onToggle, children }) => (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-surface hover:bg-muted transition-colors duration-200"
      >
        <div className="flex items-center space-x-3">
          <Icon name={icon} size={20} className="text-primary" />
          <span className="font-medium text-text-primary">{title}</span>
        </div>
        <Icon 
          name="ChevronDown" 
          size={20} 
          className={`text-text-secondary transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isExpanded && (
        <div className="p-4 border-t border-border bg-background">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Key Details Card */}
      <div className="bg-surface rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <Icon name="Home" size={24} className="text-primary mx-auto mb-2" />
            <div className="text-sm text-text-secondary">Property Type</div>
            <div className="font-semibold text-text-primary">{property?.propertyType}</div>
          </div>
          
          <div className="text-center">
            <Icon name="Bed" size={24} className="text-primary mx-auto mb-2" />
            <div className="text-sm text-text-secondary">Bedrooms</div>
            <div className="font-semibold text-text-primary">{property?.bedrooms}</div>
          </div>
          
          <div className="text-center">
            <Icon name="Bath" size={24} className="text-primary mx-auto mb-2" />
            <div className="text-sm text-text-secondary">Bathrooms</div>
            <div className="font-semibold text-text-primary">{property?.bathrooms}</div>
          </div>
          
          <div className="text-center">
            <Icon name="Square" size={24} className="text-primary mx-auto mb-2" />
            <div className="text-sm text-text-secondary">Area</div>
            <div className="font-semibold text-text-primary">{property?.area} m²</div>
          </div>
        </div>
      </div>

      {/* Accordion Sections */}
      <div className="space-y-4">
        {/* Description */}
        <AccordionSection
          title="Property Description"
          icon="FileText"
          isExpanded={expandedSection === 'description'}
          onToggle={() => toggleSection('description')}
        >
          <div className="prose prose-sm max-w-none">
            <p className="text-text-primary leading-relaxed whitespace-pre-line">
              {property?.description}
            </p>
            
            {property?.arabicName && (
              <div className="mt-4 p-3 bg-muted rounded-lg">
                <div className="text-sm text-text-secondary mb-1">Arabic Name:</div>
                <div className="text-lg font-medium text-text-primary" dir="rtl">
                  {property.arabicName}
                </div>
              </div>
            )}
          </div>
        </AccordionSection>

        {/* Amenities */}
        <AccordionSection
          title="Amenities & Features"
          icon="Star"
          isExpanded={expandedSection === 'amenities'}
          onToggle={() => toggleSection('amenities')}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {property?.amenities?.map((amenity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <Icon name={amenity.icon} size={18} className="text-primary" />
                <span className="text-text-primary">{amenity.name}</span>
              </div>
            ))}
          </div>
        </AccordionSection>

        {/* Location & Neighborhood */}
        <AccordionSection
          title="Location & Neighborhood"
          icon="MapPin"
          isExpanded={expandedSection === 'location'}
          onToggle={() => toggleSection('location')}
        >
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-text-primary mb-2">Address</h4>
              <p className="text-text-secondary">
                {property?.location?.address}<br />
                {property?.location?.neighborhood}, {property?.location?.city}<br />
                Morocco
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-text-primary mb-2">Neighborhood Highlights</h4>
              <p className="text-text-secondary">
                {property?.location?.description}
              </p>
            </div>

            {/* Map Preview */}
            <div className="h-64 bg-muted rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title={property?.title}
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${property?.location?.coordinates?.lat},${property?.location?.coordinates?.lng}&z=14&output=embed`}
              />
            </div>
          </div>
        </AccordionSection>

        {/* Property Stages (for complex properties like riads) */}
        {property?.stages && property.stages.length > 0 && (
          <AccordionSection
            title="Property Layout & Stages"
            icon="Layers"
            isExpanded={expandedSection === 'stages'}
            onToggle={() => toggleSection('stages')}
          >
            <div className="space-y-4">
              {property.stages.map((stage, index) => (
                <div key={index} className="border border-border rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">{index + 1}</span>
                    </div>
                    <h4 className="font-medium text-text-primary">{stage.name}</h4>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {stage.description}
                  </p>
                  
                  {stage.features && stage.features.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {stage.features.map((feature, featureIndex) => (
                        <span
                          key={featureIndex}
                          className="inline-flex items-center px-2 py-1 bg-accent/20 text-accent-foreground rounded-md text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </AccordionSection>
        )}
      </div>

      {/* Contact Information */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Contact Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <Icon name="User" size={20} className="text-primary" />
              <div>
                <div className="font-medium text-text-primary">{property?.host?.name}</div>
                <div className="text-sm text-text-secondary">Property Host</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 mb-3">
              <Icon name="Phone" size={20} className="text-primary" />
              <div>
                <div className="font-medium text-text-primary">
                  {formatPhoneNumber(property?.host?.phone)}
                </div>
                <div className="text-sm text-text-secondary">Phone Number</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Icon name="Mail" size={20} className="text-primary" />
              <div>
                <div className="font-medium text-text-primary">{property?.host?.email}</div>
                <div className="text-sm text-text-secondary">Email Address</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <Button variant="primary" fullWidth iconName="MessageCircle">
              Contact Host
            </Button>
            <Button variant="outline" fullWidth iconName="Calendar">
              Schedule Viewing
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;