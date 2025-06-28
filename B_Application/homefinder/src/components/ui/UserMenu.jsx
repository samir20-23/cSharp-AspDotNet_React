import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const UserMenu = ({ isMobile = false, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('guest'); // 'guest', 'visitor', 'host'
  const dropdownRef = useRef(null);

  const userMenuItems = {
    guest: [
      { label: 'Sign In', path: '/signin', icon: 'LogIn' },
      { label: 'Sign Up', path: '/signup', icon: 'UserPlus' },
    ],
    visitor: [
      { label: 'My Profile', path: '/profile', icon: 'User' },
      { label: 'My Favorites', path: '/favorites', icon: 'Heart' },
      { label: 'Booking History', path: '/bookings', icon: 'Calendar' },
      { label: 'Settings', path: '/settings', icon: 'Settings' },
      { label: 'Help & Support', path: '/support', icon: 'HelpCircle' },
    ],
    host: [
      { label: 'My Profile', path: '/profile', icon: 'User' },
      { label: 'Host Dashboard', path: '/host-dashboard', icon: 'LayoutGrid' },
      { label: 'My Properties', path: '/my-properties', icon: 'Building' },
      { label: 'Bookings', path: '/host-bookings', icon: 'Calendar' },
      { label: 'Analytics', path: '/analytics', icon: 'BarChart3' },
      { label: 'Settings', path: '/settings', icon: 'Settings' },
      { label: 'Help & Support', path: '/support', icon: 'HelpCircle' },
    ]
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen && !isMobile) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, isMobile]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = () => {
    setIsOpen(false);
    if (isMobile && onClose) {
      onClose();
    }
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setUserRole('guest');
    setIsOpen(false);
    if (isMobile && onClose) {
      onClose();
    }
  };

  const handleRoleSwitch = () => {
    // Demo function to switch between visitor and host roles
    setUserRole(userRole === 'visitor' ? 'host' : 'visitor');
    setIsOpen(false);
  };

  const getUserDisplayName = () => {
    if (!isAuthenticated) return 'Guest';
    return userRole === 'host' ? 'Host Account' : 'User Account';
  };

  const getUserAvatar = () => {
    if (!isAuthenticated) {
      return (
        <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
          <Icon name="User" size={16} className="text-text-secondary" />
        </div>
      );
    }
    
    return (
      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
        <Icon name={userRole === 'host' ? 'Building' : 'User'} size={16} color="white" />
      </div>
    );
  };

  if (isMobile) {
    return (
      <div className="space-y-2">
        <div className="flex items-center space-x-3 px-4 py-2 bg-surface rounded-lg">
          {getUserAvatar()}
          <div>
            <div className="font-medium text-text-primary">{getUserDisplayName()}</div>
            <div className="text-sm text-text-secondary">
              {isAuthenticated ? (userRole === 'host' ? 'Property Host' : 'Property Seeker') : 'Not signed in'}
            </div>
          </div>
        </div>

        {!isAuthenticated && (
          <div className="space-y-2">
            <Button variant="primary" fullWidth onClick={handleMenuItemClick}>
              <Icon name="LogIn" size={16} className="mr-2" />
              Sign In
            </Button>
            <Button variant="outline" fullWidth onClick={handleMenuItemClick}>
              <Icon name="UserPlus" size={16} className="mr-2" />
              Sign Up
            </Button>
          </div>
        )}

        {isAuthenticated && (
          <div className="space-y-1">
            {userMenuItems[userRole].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleMenuItemClick}
                className="flex items-center space-x-3 px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-surface rounded-lg transition-colors duration-200"
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
              </Link>
            ))}
            
            <div className="border-t border-border pt-2 mt-2">
              <button
                onClick={handleRoleSwitch}
                className="flex items-center space-x-3 px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-surface rounded-lg transition-colors duration-200 w-full text-left"
              >
                <Icon name="RefreshCw" size={18} />
                <span>Switch to {userRole === 'host' ? 'Visitor' : 'Host'}</span>
              </button>
              
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-3 px-4 py-2 text-error hover:bg-error/10 rounded-lg transition-colors duration-200 w-full text-left"
              >
                <Icon name="LogOut" size={18} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-surface transition-colors duration-200 group"
      >
        {getUserAvatar()}
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`text-text-secondary group-hover:text-text-primary transition-all duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-background border border-border rounded-lg shadow-warm-lg animate-slide-down z-60">
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              {getUserAvatar()}
              <div>
                <div className="font-medium text-text-primary">{getUserDisplayName()}</div>
                <div className="text-sm text-text-secondary">
                  {isAuthenticated ? (userRole === 'host' ? 'Property Host' : 'Property Seeker') : 'Not signed in'}
                </div>
              </div>
            </div>
          </div>

          <div className="py-2">
            {userMenuItems[isAuthenticated ? userRole : 'guest'].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleMenuItemClick}
                className="flex items-center space-x-3 px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-200"
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
              </Link>
            ))}

            {isAuthenticated && (
              <div className="border-t border-border mt-2 pt-2">
                <button
                  onClick={handleRoleSwitch}
                  className="flex items-center space-x-3 px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-200 w-full text-left"
                >
                  <Icon name="RefreshCw" size={18} />
                  <span>Switch to {userRole === 'host' ? 'Visitor' : 'Host'}</span>
                </button>
                
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-3 px-4 py-2 text-error hover:bg-error/10 transition-colors duration-200 w-full text-left"
                >
                  <Icon name="LogOut" size={18} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;