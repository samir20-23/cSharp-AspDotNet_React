import React, { useState } from 'react';
import MainNavigation from '../../components/ui/MainNavigation';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import DashboardStats from './components/DashboardStats';
import PropertyCard from './components/PropertyCard';
import InquiryPanel from './components/InquiryPanel';
import CalendarWidget from './components/CalendarWidget';
import AnalyticsChart from './components/AnalyticsChart';
import QuickActions from './components/QuickActions';
import MobileNavigation from './components/MobileNavigation';
import DesktopSidebar from './components/DesktopSidebar';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';

const HostDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const properties = [
    {
      id: 1,
      title: "Riad Saʿāda - Traditional Marrakech",
      price: "2,500 MAD/night",
      location: "Medina, Marrakech",
      type: "Riad",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
      status: "active",
      views: 1247,
      inquiries: 23,
      bookings: 8,
      lastUpdated: "2 hours ago",
      recentActivity: true
    },
    {
      id: 2,
      title: "Villa Atlas View - Casablanca",
      price: "4,200,000 MAD",
      location: "Anfa, Casablanca",
      type: "Villa",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
      status: "active",
      views: 892,
      inquiries: 15,
      bookings: 0,
      lastUpdated: "1 day ago",
      recentActivity: true
    },
    {
      id: 3,
      title: "Apartment Anfa - Modern Living",
      price: "1,800 MAD/night",
      location: "Anfa, Casablanca",
      type: "Apartment",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
      status: "pending",
      views: 456,
      inquiries: 8,
      bookings: 3,
      lastUpdated: "3 days ago",
      recentActivity: false
    },
    {
      id: 4,
      title: "Traditional House - Essaouira",
      price: "1,200 MAD/night",
      location: "Medina, Essaouira",
      type: "Traditional House",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
      status: "inactive",
      views: 234,
      inquiries: 4,
      bookings: 1,
      lastUpdated: "1 week ago",
      recentActivity: false
    },
    {
      id: 5,
      title: "Riad Palmeraie - Luxury Retreat",
      price: "3,800 MAD/night",
      location: "Palmeraie, Marrakech",
      type: "Riad",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      status: "active",
      views: 1567,
      inquiries: 34,
      bookings: 12,
      lastUpdated: "5 hours ago",
      recentActivity: true
    },
    {
      id: 6,
      title: "Mojama3 Complex - Rabat",
      price: "2,800,000 MAD",
      location: "Agdal, Rabat",
      type: "Complex",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
      status: "active",
      views: 678,
      inquiries: 12,
      bookings: 0,
      lastUpdated: "2 days ago",
      recentActivity: false
    }
  ];

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || property.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handlePropertyEdit = (propertyId) => {
    console.log('Edit property:', propertyId);
  };

  const handlePropertyDuplicate = (propertyId) => {
    console.log('Duplicate property:', propertyId);
  };

  const handlePropertyToggleStatus = (propertyId) => {
    console.log('Toggle status for property:', propertyId);
  };

  const handlePropertyViewAnalytics = (propertyId) => {
    console.log('View analytics for property:', propertyId);
  };

  const handleBulkAction = (action, propertyIds) => {
    console.log('Bulk action:', action, 'for properties:', propertyIds);
    setSelectedProperties([]);
  };

  const handlePropertySelect = (propertyId) => {
    setSelectedProperties(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const renderOverviewTab = () => (
    <div className="space-y-8">
      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <InquiryPanel />
        <CalendarWidget />
      </div>
      
      <AnalyticsChart />
      
      <QuickActions 
        selectedProperties={selectedProperties}
        onBulkAction={handleBulkAction}
      />
    </div>
  );

  const renderPropertiesTab = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading font-bold text-text-primary">My Properties</h2>
          <p className="text-text-secondary">Manage and monitor your property listings</p>
        </div>
        <Button variant="primary" iconName="Plus" iconSize={16}>
          Add New Property
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
            />
          </div>
        </div>
        
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending Review</option>
        </select>
      </div>
      
      {selectedProperties.length > 0 && (
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-text-primary font-medium">
              {selectedProperties.length} properties selected
            </span>
            <div className="flex items-center space-x-2">
              <Button variant="outline" iconName="Edit" iconSize={16}>
                Bulk Edit
              </Button>
              <Button variant="outline" iconName="Copy" iconSize={16}>
                Duplicate
              </Button>
              <Button variant="outline" iconName="Trash2" iconSize={16}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <div key={property.id} className="relative">
            <input
              type="checkbox"
              checked={selectedProperties.includes(property.id)}
              onChange={() => handlePropertySelect(property.id)}
              className="absolute top-4 left-4 z-10 w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
            />
            <PropertyCard
              property={property}
              onEdit={handlePropertyEdit}
              onDuplicate={handlePropertyDuplicate}
              onToggleStatus={handlePropertyToggleStatus}
              onViewAnalytics={handlePropertyViewAnalytics}
            />
          </div>
        ))}
      </div>
      
      {filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Building" size={48} className="text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No properties found</h3>
          <p className="text-text-secondary mb-4">
            {searchQuery || filterStatus !== 'all' ?'Try adjusting your search or filter criteria' :'Start by adding your first property listing'
            }
          </p>
          <Button variant="primary" iconName="Plus" iconSize={16}>
            Add New Property
          </Button>
        </div>
      )}
    </div>
  );

  const renderInquiriesTab = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-bold text-text-primary">Inquiries Management</h2>
        <p className="text-text-secondary">View and respond to property inquiries</p>
      </div>
      <InquiryPanel />
    </div>
  );

  const renderCalendarTab = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-bold text-text-primary">Calendar & Bookings</h2>
        <p className="text-text-secondary">Manage viewings and property availability</p>
      </div>
      <CalendarWidget />
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-bold text-text-primary">Analytics & Reports</h2>
        <p className="text-text-secondary">Track performance and insights</p>
      </div>
      <AnalyticsChart />
      <DashboardStats />
    </div>
  );

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverviewTab();
      case 'properties':
        return renderPropertiesTab();
      case 'inquiries':
        return renderInquiriesTab();
      case 'calendar':
        return renderCalendarTab();
      case 'analytics':
        return renderAnalyticsTab();
      default:
        return renderOverviewTab();
    }
  };

  return (
    <div className="min-h-screen bg-surface">
      <MainNavigation />
      
      <div className="flex pt-16">
        <DesktopSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
        
        <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6">
          <div className="max-w-7xl mx-auto">
            <BreadcrumbNavigation />
            {renderActiveTabContent()}
          </div>
        </main>
      </div>
      
      <MobileNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
};

export default HostDashboard;