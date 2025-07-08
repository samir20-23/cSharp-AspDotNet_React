import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ selectedProperties, onBulkAction }) => {
  const [showBulkMenu, setShowBulkMenu] = useState(false);

  const quickActionItems = [
    {
      id: 'add-property',
      label: 'Add New Property',
      icon: 'Plus',
      variant: 'primary',
      description: 'Create a new property listing'
    },
    {
      id: 'bulk-edit',
      label: 'Bulk Edit',
      icon: 'Edit',
      variant: 'outline',
      description: 'Edit multiple properties at once',
      disabled: selectedProperties.length === 0
    },
    {
      id: 'export-data',
      label: 'Export Data',
      icon: 'Download',
      variant: 'outline',
      description: 'Download property data as CSV'
    },
    {
      id: 'analytics',
      label: 'View Analytics',
      icon: 'BarChart3',
      variant: 'outline',
      description: 'Detailed performance insights'
    }
  ];

  const bulkActions = [
    {
      id: 'activate',
      label: 'Activate Selected',
      icon: 'Eye',
      action: () => onBulkAction('activate', selectedProperties)
    },
    {
      id: 'deactivate',
      label: 'Deactivate Selected',
      icon: 'EyeOff',
      action: () => onBulkAction('deactivate', selectedProperties)
    },
    {
      id: 'duplicate',
      label: 'Duplicate Selected',
      icon: 'Copy',
      action: () => onBulkAction('duplicate', selectedProperties)
    },
    {
      id: 'delete',
      label: 'Delete Selected',
      icon: 'Trash2',
      action: () => onBulkAction('delete', selectedProperties),
      variant: 'danger'
    }
  ];

  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case 'add-property': console.log('Navigate to add property form');
        break;
      case 'bulk-edit':
        setShowBulkMenu(!showBulkMenu);
        break;
      case 'export-data':
        console.log('Export property data');
        break;
      case 'analytics': console.log('Navigate to analytics page');
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-background border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-heading font-semibold text-text-primary">Quick Actions</h2>
        {selectedProperties.length > 0 && (
          <span className="text-sm text-text-secondary bg-surface px-2 py-1 rounded">
            {selectedProperties.length} selected
          </span>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {quickActionItems.map((item) => (
          <Button
            key={item.id}
            variant={item.variant}
            onClick={() => handleQuickAction(item.id)}
            disabled={item.disabled}
            className="h-auto p-4 flex-col items-start text-left"
            fullWidth
          >
            <div className="flex items-center space-x-2 mb-2">
              <Icon name={item.icon} size={20} />
              <span className="font-medium">{item.label}</span>
            </div>
            <p className="text-xs opacity-80 text-left">{item.description}</p>
          </Button>
        ))}
      </div>
      
      {showBulkMenu && selectedProperties.length > 0 && (
        <div className="border-t border-border pt-4">
          <h3 className="text-lg font-medium text-text-primary mb-3">Bulk Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {bulkActions.map((action) => (
              <Button
                key={action.id}
                variant={action.variant || 'outline'}
                onClick={action.action}
                className="justify-start"
                iconName={action.icon}
                iconSize={16}
              >
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      )}
      
      <div className="border-t border-border pt-4 mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-surface rounded-lg">
            <div className="text-2xl font-bold text-primary mb-1">12</div>
            <div className="text-sm text-text-secondary">Total Properties</div>
          </div>
          <div className="p-3 bg-surface rounded-lg">
            <div className="text-2xl font-bold text-success mb-1">8</div>
            <div className="text-sm text-text-secondary">Active Listings</div>
          </div>
          <div className="p-3 bg-surface rounded-lg">
            <div className="text-2xl font-bold text-warning mb-1">4</div>
            <div className="text-sm text-text-secondary">Pending Review</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;