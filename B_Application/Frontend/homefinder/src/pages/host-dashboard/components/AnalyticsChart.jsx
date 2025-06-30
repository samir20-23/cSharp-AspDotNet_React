import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnalyticsChart = () => {
  const [activeChart, setActiveChart] = useState('views');

  const viewsData = [
    { month: 'Jan', views: 1200, inquiries: 45, bookings: 12 },
    { month: 'Feb', views: 1800, inquiries: 67, bookings: 18 },
    { month: 'Mar', views: 2200, inquiries: 89, bookings: 24 },
    { month: 'Apr', views: 1900, inquiries: 72, bookings: 20 },
    { month: 'May', views: 2600, inquiries: 98, bookings: 28 },
    { month: 'Jun', views: 3100, inquiries: 124, bookings: 35 }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 28500 },
    { month: 'Feb', revenue: 35200 },
    { month: 'Mar', revenue: 42800 },
    { month: 'Apr', revenue: 38900 },
    { month: 'May', revenue: 51200 },
    { month: 'Jun', revenue: 45600 }
  ];

  const propertyTypeData = [
    { name: 'Riad', value: 35, color: '#C4704F' },
    { name: 'Villa', value: 28, color: '#8B5A3C' },
    { name: 'Apartment', value: 22, color: '#D4A574' },
    { name: 'Traditional House', value: 15, color: '#7A9B76' }
  ];

  const chartConfigs = {
    views: {
      title: 'Property Views & Engagement',
      icon: 'Eye',
      component: (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={viewsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="month" 
              stroke="var(--color-text-secondary)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-text-secondary)"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--color-background)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px var(--color-shadow)'
              }}
            />
            <Bar dataKey="views" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="inquiries" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="bookings" fill="var(--color-success)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )
    },
    revenue: {
      title: 'Monthly Revenue (MAD)',
      icon: 'TrendingUp',
      component: (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="month" 
              stroke="var(--color-text-secondary)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-text-secondary)"
              fontSize={12}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--color-background)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px var(--color-shadow)'
              }}
              formatter={(value) => [`${value.toLocaleString()} MAD`, 'Revenue']}
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="var(--color-primary)" 
              strokeWidth={3}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, fill: 'var(--color-primary)' }}
            />
          </LineChart>
        </ResponsiveContainer>
      )
    },
    properties: {
      title: 'Property Types Distribution',
      icon: 'PieChart',
      component: (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={propertyTypeData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {propertyTypeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--color-background)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px var(--color-shadow)'
              }}
              formatter={(value) => [`${value}%`, 'Share']}
            />
          </PieChart>
        </ResponsiveContainer>
      )
    }
  };

  const chartTabs = [
    { key: 'views', label: 'Views & Engagement', icon: 'Eye' },
    { key: 'revenue', label: 'Revenue', icon: 'TrendingUp' },
    { key: 'properties', label: 'Property Types', icon: 'PieChart' }
  ];

  return (
    <div className="bg-background border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-heading font-semibold text-text-primary">Analytics Overview</h2>
          <Button variant="outline" iconName="Download" iconSize={16}>
            Export
          </Button>
        </div>
        
        <div className="flex space-x-1 bg-surface rounded-lg p-1">
          {chartTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveChart(tab.key)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeChart === tab.key
                  ? 'bg-background text-primary shadow-warm-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name={chartConfigs[activeChart].icon} size={20} className="text-primary" />
          <h3 className="text-lg font-medium text-text-primary">
            {chartConfigs[activeChart].title}
          </h3>
        </div>
        
        {chartConfigs[activeChart].component}
        
        {activeChart === 'properties' && (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {propertyTypeData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-text-secondary">{item.name}</span>
                <span className="text-sm font-medium text-text-primary">{item.value}%</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsChart;