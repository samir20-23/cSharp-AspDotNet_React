import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DesktopSidebar = ({ activeTab, onTabChange, isCollapsed, onToggleCollapse }) => {
  const sidebarItems = [
    {
      id: 'overview',
      label: 'Dashboard Overview',
      icon: 'LayoutGrid',
      description: 'Main dashboard with key metrics'
    },
    {
      id: 'properties',
      label: 'My Properties',
      icon: 'Building',
      description: 'Manage your property listings'
    },
    {
      id: 'inquiries',
      label: 'Inquiries',
      icon: 'MessageCircle',
      description: 'View and respond to inquiries',
      badge: 3
    },
    {
      id: 'calendar',
      label: 'Calendar',
      icon: 'Calendar',
      description: 'Manage viewings and bookings'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: 'BarChart3',
      description: 'Performance insights and reports'
    }
  ];

  const bottomItems = [
    {
      id: 'settings',
      label: 'Settings',
      icon: 'Settings',
      description: 'Account and preferences'
    },
    {
      id: 'help',
      label: 'Help & Support',
      icon: 'HelpCircle',
      description: 'Get help and support'
    }
  ];

  const SidebarItem = ({ item, isBottom = false }) => (
    <button
      onClick={() => onTabChange(item.id)}
      className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-all duration-200 group ${
        activeTab === item.id
          ? 'bg-primary text-white shadow-warm'
          : 'text-text-secondary hover:text-text-primary hover:bg-surface'
      }`}
    >
      <div className="relative">
        <Icon 
          name={item.icon} 
          size={20} 
          className={activeTab === item.id ? 'text-white' : 'text-text-secondary group-hover:text-text-primary'}
        />
        {item.badge && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-error text-white text-xs rounded-full flex items-center justify-center">
            {item.badge}
          </div>
        )}
      </div>
      
      {!isCollapsed && (
        <div className="flex-1 min-w-0">
          <div className="font-medium">{item.label}</div>
          <div className={`text-xs ${
            activeTab === item.id ? 'text-white/80' : 'text-text-secondary'
          }`}>
            {item.description}
          </div>
        </div>
      )}
    </button>
  );

  return (
    <div className={`hidden md:flex flex-col bg-background border-r border-border transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-heading font-bold text-text-primary">Host Dashboard</h1>
              <p className="text-sm text-text-secondary">Manage your properties</p>
            </div>
          )}
          <Button
            variant="ghost"
            onClick={onToggleCollapse}
            className="w-8 h-8 p-0"
            iconName={isCollapsed ? "ChevronRight" : "ChevronLeft"}
            iconSize={16}
          />
        </div>
      </div>
      
      <div className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => (
          <SidebarItem key={item.id} item={item} />
        ))}
      </div>
      
      <div className="p-4 border-t border-border space-y-2">
        {bottomItems.map((item) => (
          <SidebarItem key={item.id} item={item} isBottom />
        ))}
      </div>
    </div>
  );
};

export default DesktopSidebar;