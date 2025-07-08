import React from 'react';
import Icon from '../../../components/AppIcon';


const ViewToggle = ({ viewMode, onViewModeChange }) => {
  const viewOptions = [
    { value: 'grid', icon: 'Grid3X3', label: 'Grid View' },
    { value: 'map', icon: 'Map', label: 'Map View' }
  ];

  return (
    <div className="flex items-center bg-surface rounded-lg p-1">
      {viewOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => onViewModeChange(option.value)}
          className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            viewMode === option.value
              ? 'bg-background text-primary shadow-warm-sm'
              : 'text-text-secondary hover:text-text-primary hover:bg-background/50'
          }`}
          title={option.label}
        >
          <Icon 
            name={option.icon} 
            size={16} 
            className={viewMode === option.value ? 'text-primary' : 'text-text-secondary'}
          />
          <span className="hidden sm:inline">{option.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ViewToggle;