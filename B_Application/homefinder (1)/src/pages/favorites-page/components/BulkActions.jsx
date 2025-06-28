import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const BulkActions = ({ 
  selectedCount, 
  totalCount, 
  onSelectAll, 
  onRemove, 
  onCompare, 
  onExport,
  canCompare 
}) => {
  const isAllSelected = selectedCount === totalCount;

  return (
    <div className="bg-surface border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onSelectAll}
            className="flex items-center space-x-2 text-sm font-medium text-text-primary hover:text-primary transition-colors duration-200"
          >
            <div className={`w-4 h-4 border-2 border-border rounded flex items-center justify-center ${
              isAllSelected ? 'bg-primary border-primary' : 'bg-background'
            }`}>
              {isAllSelected && <Icon name="Check" size={12} color="white" />}
            </div>
            <span>
              {isAllSelected ? 'Deselect All' : 'Select All'} ({totalCount})
            </span>
          </button>
          
          <span className="text-text-secondary text-sm">
            {selectedCount} of {totalCount} selected
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={onCompare}
            disabled={!canCompare}
            iconName="GitCompare"
            iconSize={16}
            className={!canCompare ? 'opacity-50 cursor-not-allowed' : ''}
            title={!canCompare ? 'Select 2-3 properties to compare' : 'Compare selected properties'}
          >
            Compare
          </Button>
          
          <Button
            variant="outline"
            onClick={onExport}
            iconName="Download"
            iconSize={16}
          >
            Export
          </Button>
          
          <Button
            variant="outline"
            onClick={onRemove}
            iconName="Trash2"
            iconSize={16}
            className="text-error hover:text-error-foreground hover:bg-error"
          >
            Remove Selected
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActions;