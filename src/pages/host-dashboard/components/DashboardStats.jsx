import React from 'react';
import Icon from '../../../components/AppIcon';

const DashboardStats = () => {
  const stats = [
    {
      id: 1,
      title: "Total Listings",
      value: "12",
      change: "+2",
      changeType: "positive",
      icon: "Building",
      color: "bg-primary"
    },
    {
      id: 2,
      title: "Active Bookings",
      value: "8",
      change: "+3",
      changeType: "positive",
      icon: "Calendar",
      color: "bg-accent"
    },
    {
      id: 3,
      title: "Recent Inquiries",
      value: "24",
      change: "+12",
      changeType: "positive",
      icon: "MessageCircle",
      color: "bg-success"
    },
    {
      id: 4,
      title: "Monthly Revenue",
      value: "45,600 MAD",
      change: "+8.5%",
      changeType: "positive",
      icon: "TrendingUp",
      color: "bg-secondary"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <div key={stat.id} className="bg-background border border-border rounded-lg p-6 hover:shadow-warm transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
              <Icon name={stat.icon} size={24} color="white" />
            </div>
            <div className={`flex items-center space-x-1 text-sm ${
              stat.changeType === 'positive' ? 'text-success' : 'text-error'
            }`}>
              <Icon 
                name={stat.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
              />
              <span>{stat.change}</span>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-text-primary mb-1">{stat.value}</h3>
            <p className="text-text-secondary text-sm">{stat.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;