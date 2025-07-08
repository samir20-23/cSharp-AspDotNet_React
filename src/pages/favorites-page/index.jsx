import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import MainNavigation from '../../components/ui/MainNavigation';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Button from '../../components/ui/Button';
import SearchBar from './components/SearchBar';
import SortDropdown from './components/SortDropdown';
import FavoritesGrid from './components/FavoritesGrid';
import EmptyState from './components/EmptyState';
import BulkActions from './components/BulkActions';
import CompareModal from './components/CompareModal';
import ExportModal from './components/ExportModal';

const FavoritesPage = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [favoriteProperties, setFavoriteProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date-added');
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // Mock data - same as in property listings browse
  const mockProperties = [
    {
      id: 1,
      title: "Riad Saʿāda - Traditional Moroccan House",
      type: "Riad",
      status: "for-sale",
      price: 2500000,
      city: "Marrakech",
      neighborhood: "Medina",
      bedrooms: 4,
      bathrooms: 3,
      area: 180,
      images: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"
      ],
      amenities: ["WiFi", "Pool", "Garden", "Parking", "Air Conditioning"],
      host: {
        name: "Ahmed Benali",
        phone: "+212 661-234567",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      description: "Beautiful traditional riad in the heart of Marrakech Medina with authentic Moroccan architecture and modern amenities.",
      createdAt: new Date('2024-01-15')
    },
    {
      id: 2,
      title: "Modern Apartment in Anfa",
      type: "Apartment",
      status: "for-rent",
      price: 8500,
      city: "Casablanca",
      neighborhood: "Anfa",
      bedrooms: 2,
      bathrooms: 2,
      area: 95,
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"
      ],
      amenities: ["WiFi", "Elevator", "Security", "Balcony"],
      host: {
        name: "Fatima Alaoui",
        phone: "+212 662-345678",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      description: "Contemporary apartment with sea views in prestigious Anfa district.",
      createdAt: new Date('2024-02-01')
    },
    {
      id: 3,
      title: "Villa with Pool in Palmeraie",
      type: "Villa",
      status: "for-sale",
      price: 4200000,
      city: "Marrakech",
      neighborhood: "Palmeraie",
      bedrooms: 5,
      bathrooms: 4,
      area: 320,
      images: [
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"
      ],
      amenities: ["WiFi", "Pool", "Garden", "Parking", "Air Conditioning", "Terrace"],
      host: {
        name: "Youssef Tazi",
        phone: "+212 663-456789",
        avatar: "https://randomuser.me/api/portraits/men/56.jpg"
      },
      description: "Luxurious villa with private pool surrounded by palm trees.",
      createdAt: new Date('2024-01-20')
    },
    {
      id: 4,
      title: "Mojama3 Complex - Family Residence",
      type: "Complex",
      status: "for-rent",
      price: 12000,
      city: "Rabat",
      neighborhood: "Agdal",
      bedrooms: 3,
      bathrooms: 2,
      area: 140,
      images: [
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800"
      ],
      amenities: ["WiFi", "Security", "Parking", "Garden", "Playground"],
      host: {
        name: "Laila Benjelloun",
        phone: "+212 664-567890",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg"
      },
      description: "Modern family complex with shared amenities in quiet Agdal neighborhood.",
      createdAt: new Date('2024-02-10')
    },
    {
      id: 5,
      title: "Traditional House in Fez Medina",
      type: "Traditional",
      status: "for-sale",
      price: 1800000,
      city: "Fez",
      neighborhood: "Medina",
      bedrooms: 3,
      bathrooms: 2,
      area: 120,
      images: [
        "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800"
      ],
      amenities: ["WiFi", "Fireplace", "Terrace", "Traditional Architecture"],
      host: {
        name: "Hassan Idrissi",
        phone: "+212 665-678901",
        avatar: "https://randomuser.me/api/portraits/men/41.jpg"
      },
      description: "Authentic traditional house with historical charm in UNESCO World Heritage site.",
      createdAt: new Date('2024-01-25')
    },
    {
      id: 6,
      title: "Seaside Apartment in Essaouira",
      type: "Apartment",
      status: "for-rent",
      price: 6500,
      city: "Essaouira",
      neighborhood: "Medina",
      bedrooms: 2,
      bathrooms: 1,
      area: 75,
      images: [
        "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=800",
        "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800"
      ],
      amenities: ["WiFi", "Sea View", "Balcony", "Traditional Decor"],
      host: {
        name: "Aicha Berrada",
        phone: "+212 666-789012",
        avatar: "https://randomuser.me/api/portraits/women/35.jpg"
      },
      description: "Charming apartment with ocean views in the historic port city of Essaouira.",
      createdAt: new Date('2024-02-05')
    },
    {
      id: 7,
      title: "Luxury Riad in Gueliz",
      type: "Riad",
      status: "for-sale",
      price: 3800000,
      city: "Marrakech",
      neighborhood: "Gueliz",
      bedrooms: 6,
      bathrooms: 5,
      area: 250,
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"
      ],
      amenities: ["WiFi", "Pool", "Garden", "Parking", "Air Conditioning", "Spa"],
      host: {
        name: "Omar Fassi",
        phone: "+212 667-890123",
        avatar: "https://randomuser.me/api/portraits/men/29.jpg"
      },
      description: "Exquisite luxury riad combining traditional Moroccan design with modern comfort.",
      createdAt: new Date('2024-01-30')
    },
    {
      id: 8,
      title: "Modern Villa in Hay Riad",
      type: "Villa",
      status: "for-rent",
      price: 15000,
      city: "Rabat",
      neighborhood: "Hay Riad",
      bedrooms: 4,
      bathrooms: 3,
      area: 200,
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800"
      ],
      amenities: ["WiFi", "Pool", "Garden", "Parking", "Security", "Modern Kitchen"],
      host: {
        name: "Nadia Chraibi",
        phone: "+212 668-901234",
        avatar: "https://randomuser.me/api/portraits/women/52.jpg"
      },
      description: "Contemporary villa in upscale Hay Riad with all modern amenities.",
      createdAt: new Date('2024-02-12')
    }
  ];

  // Load favorites from localStorage
  useEffect(() => {
    const loadFavorites = async () => {
      setLoading(true);
      try {
        const savedFavorites = localStorage.getItem('property-favorites');
        const favoriteIds = savedFavorites ? JSON.parse(savedFavorites) : [];
        setFavorites(favoriteIds);

        // Get full property data for favorited properties
        const favoritePropsWithDates = favoriteIds.map(id => {
          const property = mockProperties.find(p => p.id === id);
          if (property) {
            // Add dateAdded from localStorage or default to now
            const favoriteDates = JSON.parse(localStorage.getItem('favorite-dates') || '{}');
            return {
              ...property,
              dateAdded: favoriteDates[id] ? new Date(favoriteDates[id]) : new Date()
            };
          }
          return null;
        }).filter(Boolean);

        setFavoriteProperties(favoritePropsWithDates);
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
      setLoading(false);
    };

    loadFavorites();
  }, []);

  // Filter and sort properties
  const processedProperties = useMemo(() => {
    let filtered = [...favoriteProperties];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(property =>
        property?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property?.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property?.neighborhood?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property?.type?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'date-added-new':
        filtered.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        break;
      case 'date-added-old':
        filtered.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
        break;
      case 'property-type':
        filtered.sort((a, b) => a.type.localeCompare(b.type));
        break;
      case 'location':
        filtered.sort((a, b) => a.city.localeCompare(b.city));
        break;
      default: // date-added (newest first)
        filtered.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        break;
    }

    return filtered;
  }, [favoriteProperties, searchQuery, sortBy]);

  // Update filtered properties
  useEffect(() => {
    setFilteredProperties(processedProperties);
  }, [processedProperties]);

  // Event handlers
  const handleRemoveFromFavorites = (propertyId) => {
    const newFavorites = favorites.filter(id => id !== propertyId);
    setFavorites(newFavorites);
    localStorage.setItem('property-favorites', JSON.stringify(newFavorites));
    
    // Remove from favorite properties
    setFavoriteProperties(prev => prev.filter(p => p.id !== propertyId));
    
    // Remove from selected if it was selected
    setSelectedProperties(prev => prev.filter(id => id !== propertyId));
  };

  const handleBulkRemove = () => {
    const newFavorites = favorites.filter(id => !selectedProperties.includes(id));
    setFavorites(newFavorites);
    localStorage.setItem('property-favorites', JSON.stringify(newFavorites));
    
    // Remove from favorite properties
    setFavoriteProperties(prev => prev.filter(p => !selectedProperties.includes(p.id)));
    setSelectedProperties([]);
  };

  const handlePropertySelect = (propertyId) => {
    setSelectedProperties(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProperties.length === filteredProperties.length) {
      setSelectedProperties([]);
    } else {
      setSelectedProperties(filteredProperties.map(p => p.id));
    }
  };

  const handleCompare = () => {
    if (selectedProperties.length >= 2 && selectedProperties.length <= 3) {
      setShowCompareModal(true);
    }
  };

  const handleExport = () => {
    setShowExportModal(true);
  };

  const handleClearAll = () => {
    setFavorites([]);
    setFavoriteProperties([]);
    setSelectedProperties([]);
    localStorage.removeItem('property-favorites');
    localStorage.removeItem('favorite-dates');
  };

  const getSelectedPropertiesData = () => {
    return favoriteProperties.filter(p => selectedProperties.includes(p.id));
  };

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <BreadcrumbNavigation />
          
          {/* Header */}
          <div className="mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary mb-2">
                  My Favorite Properties
                </h1>
                <p className="text-text-secondary">
                  {favoriteProperties.length} {favoriteProperties.length === 1 ? 'property' : 'properties'} saved
                  {searchQuery && ` • Showing ${filteredProperties.length} results for "${searchQuery}"`}
                </p>
              </div>
              
              {favoriteProperties.length > 0 && (
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => navigate('/property-listings-browse')}
                    iconName="Search"
                    iconSize={16}
                  >
                    Browse More
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleClearAll}
                    iconName="Trash2"
                    iconSize={16}
                    className="text-error hover:text-error-foreground hover:bg-error"
                  >
                    Clear All
                  </Button>
                </div>
              )}
            </div>

            {/* Controls */}
            {favoriteProperties.length > 0 && (
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Search your favorites..."
                  />
                  <SortDropdown
                    value={sortBy}
                    onChange={setSortBy}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Bulk Actions */}
          {selectedProperties.length > 0 && (
            <BulkActions
              selectedCount={selectedProperties.length}
              totalCount={filteredProperties.length}
              onSelectAll={handleSelectAll}
              onRemove={handleBulkRemove}
              onCompare={handleCompare}
              onExport={handleExport}
              canCompare={selectedProperties.length >= 2 && selectedProperties.length <= 3}
            />
          )}

          {/* Main Content */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent"></div>
            </div>
          ) : favoriteProperties.length === 0 ? (
            <EmptyState />
          ) : filteredProperties.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
                No properties found
              </h3>
              <p className="text-text-secondary mb-6">
                Try adjusting your search criteria or clear the search to see all your favorites.
              </p>
              <Button
                variant="outline"
                onClick={() => setSearchQuery('')}
                iconName="RotateCcw"
                iconSize={16}
              >
                Clear Search
              </Button>
            </div>
          ) : (
            <FavoritesGrid
              properties={filteredProperties}
              selectedProperties={selectedProperties}
              onPropertySelect={handlePropertySelect}
              onRemoveFromFavorites={handleRemoveFromFavorites}
            />
          )}
        </div>
      </main>

      {/* Modals */}
      {showCompareModal && (
        <CompareModal
          properties={getSelectedPropertiesData()}
          onClose={() => setShowCompareModal(false)}
        />
      )}

      {showExportModal && (
        <ExportModal
          properties={selectedProperties.length > 0 ? getSelectedPropertiesData() : favoriteProperties}
          onClose={() => setShowExportModal(false)}
        />
      )}
    </div>
  );
};

export default FavoritesPage;