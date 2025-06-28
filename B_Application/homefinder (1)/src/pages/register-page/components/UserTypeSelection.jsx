import React from 'react';

import Icon from '../../../components/AppIcon';

const UserTypeSelection = ({ onSelect }) => {
  const userTypes = [
    {
      id: 'owner',
      title: 'Property Owner',
      description: 'List and manage your Moroccan properties for sale or rent',
      icon: 'Building2',
      features: ['List properties', 'Manage inquiries', 'Analytics dashboard', 'Photo gallery'],
      badge: 'Host'
    },
    {
      id: 'buyer',
      title: 'Property Buyer',
      description: 'Browse and discover amazing properties across Morocco',
      icon: 'Search',
      features: ['Browse properties', 'Save favorites', 'Contact owners', 'Property alerts'],
      badge: 'Buyer'
    }
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm text-text-secondary text-center mb-6">
        Select the option that best describes how you plan to use HomeFinder
      </p>
      
      {userTypes.map((type) => (
        <button
          key={type.id}
          onClick={() => onSelect(type.id)}
          className="w-full p-5 border border-border rounded-lg hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 text-left group"
        >
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
              <Icon name={type.icon} size={24} className="text-primary" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-heading font-semibold text-text-primary group-hover:text-primary transition-colors">
                  {type.title}
                </h3>
                <span className="px-2 py-0.5 bg-accent/20 text-accent-foreground text-xs rounded-full font-medium">
                  {type.badge}
                </span>
              </div>
              
              <p className="text-sm text-text-secondary mb-3">
                {type.description}
              </p>
              
              <div className="grid grid-cols-2 gap-2">
                {type.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-1 text-xs text-text-secondary">
                    <Icon name="Check" size={12} className="text-success flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <Icon name="ChevronRight" size={20} className="text-text-secondary group-hover:text-primary transition-colors flex-shrink-0" />
          </div>
        </button>
      ))}
    </div>
  );
};

export default UserTypeSelection;