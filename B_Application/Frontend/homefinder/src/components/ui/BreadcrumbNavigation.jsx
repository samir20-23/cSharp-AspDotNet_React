import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbNavigation = () => {
  const location = useLocation();
  
  const getBreadcrumbs = () => {
    const path = location.pathname;
    const searchParams = new URLSearchParams(location.search);
    
    const breadcrumbs = [
      { label: 'Home', path: '/property-listings-browse', icon: 'Home' }
    ];

    if (path === '/property-listings-browse') {
      breadcrumbs.push({ label: 'Browse Properties', path: '/property-listings-browse' });
    } else if (path === '/property-detail-view') {
      breadcrumbs.push(
        { label: 'Browse Properties', path: '/property-listings-browse' },
        { label: 'Property Details', path: '/property-detail-view' }
      );
    } else if (path === '/host-dashboard') {
      breadcrumbs.push({ label: 'Host Dashboard', path: '/host-dashboard' });
    } else if (path === '/favorites') {
      breadcrumbs.push({ label: 'My Favorites', path: '/favorites' });
    } else if (path === '/profile') {
      breadcrumbs.push({ label: 'My Profile', path: '/profile' });
    } else if (path === '/settings') {
      breadcrumbs.push({ label: 'Settings', path: '/settings' });
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();
 
  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6" aria-label="Breadcrumb">
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.path} className="flex items-center">
          {index === 0 && (
            <Icon 
              name={crumb.icon || 'Home'} 
              size={16} 
              className="text-text-secondary mr-2"
            />
          )}
          
          {index < breadcrumbs.length - 1 ? (
            <Link
              to={crumb.path}
              className="text-text-secondary hover:text-primary transition-colors duration-200 font-medium"
            >
              {crumb.label}
            </Link>
          ) : (
            <span className="text-text-primary font-medium" aria-current="page">
              {crumb.label}
            </span>
          )}
          
          {index < breadcrumbs.length - 1 && (
            <Icon 
              name="ChevronRight" 
              size={16} 
              className="text-text-secondary mx-2"
            />
          )}
        </div>
      ))}
    </nav>
  );
};

export default BreadcrumbNavigation;