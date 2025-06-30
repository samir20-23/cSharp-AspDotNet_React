import React from 'react';
import Icon from '../../../components/AppIcon';

const MobileNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: 'LayoutGrid'
    },
    {
      id: 'properties',
      label: 'Properties',
      icon: 'Building'
    },
    {
      id: 'inquiries',
      label: 'Inquiries',
      icon: 'MessageCircle'
    },
    {
      id: 'calendar',
      label: 'Calendar',
      icon: 'Calendar'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: 'BarChart3'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-40 md:hidden">
      <div className="grid grid-cols-5 h-16">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center space-y-1 transition-colors duration-200 ${
              activeTab === tab.id
                ? 'text-primary bg-surface' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon 
              name={tab.icon} 
              size={20} 
              className={activeTab === tab.id ? 'text-primary' : 'text-text-secondary'}
            />
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileNavigation;