import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import UserMenu from './UserMenu';
import SearchBar from './SearchBar';

const MainNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Browse Properties',
      path: '/property-listings-browse',
      icon: 'Search',
      description: 'Discover your perfect property'
    },
    {
      label: 'Host Dashboard',
      path: '/host-dashboard',
      icon: 'LayoutGrid',
      description: 'Manage your listings'
    },
    {
      label: 'Favorites',
      path: '/favorites',
      icon: 'Heart',
      description: 'Your saved properties'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    if (path === '/property-listings-browse') {
      return location.pathname === path || location.pathname === '/property-detail-view';
    }
    return location.pathname === path;
  };

  const Logo = () => (
    <Link to="/property-listings-browse" className="flex items-center space-x-2 group">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
        <Icon name="Home" size={20} color="white" strokeWidth={2.5} />
      </div>
      <span className="text-xl font-heading font-semibold text-text-primary group-hover:text-primary transition-colors duration-200">
        HomeFinder
      </span>
    </Link>
  );

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/95 backdrop-blur-md shadow-warm' : 'bg-background'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-surface group ${
                  isActivePath(item.path)
                    ? 'text-primary bg-surface' :'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon 
                  name={item.icon} 
                  size={18} 
                  className={`transition-colors duration-200 ${
                    isActivePath(item.path) ? 'text-primary' : 'text-text-secondary group-hover:text-text-primary'
                  }`}
                />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Desktop Search and User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <SearchBar />
            <UserMenu />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <SearchBar isMobile />
            <Button
              variant="ghost"
              onClick={toggleMobileMenu}
              className="p-2"
              iconName={isMobileMenuOpen ? "X" : "Menu"}
              iconSize={20}
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background border-t border-border shadow-warm-lg animate-slide-down">
            <div className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                    isActivePath(item.path)
                      ? 'text-primary bg-surface' :'text-text-secondary hover:text-text-primary hover:bg-surface'
                  }`}
                >
                  <Icon 
                    name={item.icon} 
                    size={20} 
                    className={isActivePath(item.path) ? 'text-primary' : 'text-text-secondary'}
                  />
                  <div>
                    <div>{item.label}</div>
                    <div className="text-xs text-text-secondary">{item.description}</div>
                  </div>
                </Link>
              ))}
              
              <div className="border-t border-border pt-4 mt-4">
                <UserMenu isMobile onClose={closeMobileMenu} />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default MainNavigation;