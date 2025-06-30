import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SortDropdown = ({ sortBy, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant', icon: 'Star' },
    { value: 'price-low', label: 'Price: Low to High', icon: 'TrendingUp' },
    { value: 'price-high', label: 'Price: High to Low', icon: 'TrendingDown' },
    { value: 'newest', label: 'Newest First', icon: 'Clock' },
    { value: 'oldest', label: 'Oldest First', icon: 'History' },
    { value: 'area-large', label: 'Largest Area', icon: 'Maximize' },
    { value: 'area-small', label: 'Smallest Area', icon: 'Minimize' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSortSelect = (value) => {
    onSortChange(value);
    setIsOpen(false);
  };

  const currentSort = sortOptions.find(option => option.value === sortBy) || sortOptions[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-background border border-border rounded-lg hover:border-primary transition-colors duration-200 min-w-48"
      >
        <Icon name={currentSort.icon} size={16} className="text-text-secondary" />
        <span className="text-sm font-medium text-text-primary flex-1 text-left">
          {currentSort.label}
        </span>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`text-text-secondary transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-warm-lg z-50 animate-slide-down">
          <div className="py-2">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSortSelect(option.value)}
                className={`flex items-center space-x-3 w-full px-4 py-2 text-left hover:bg-surface transition-colors duration-200 ${
                  sortBy === option.value ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon 
                  name={option.icon} 
                  size={16} 
                  className={sortBy === option.value ? 'text-primary' : 'text-text-secondary'}
                />
                <span className="text-sm font-medium">{option.label}</span>
                {sortBy === option.value && (
                  <Icon name="Check" size={14} className="text-primary ml-auto" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;