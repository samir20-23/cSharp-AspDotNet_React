import React from 'react';
import Icon from '../../../components/AppIcon';

const SortDropdown = ({ value, onChange }) => {
  const sortOptions = [
    { value: 'date-added', label: 'Date Added (Newest)' },
    { value: 'date-added-old', label: 'Date Added (Oldest)' },
    { value: 'price-low', label: 'Price (Low to High)' },
    { value: 'price-high', label: 'Price (High to Low)' },
    { value: 'property-type', label: 'Property Type' },
    { value: 'location', label: 'Location' }
  ];

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-background border border-border rounded-lg px-4 py-2 pr-10 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-w-[200px]"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Icon 
        name="ChevronDown" 
        size={16} 
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none"
      />
    </div>
  );
};

export default SortDropdown;