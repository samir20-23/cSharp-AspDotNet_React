import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import Button from '../../components/ui/Button';
import MainNavigation from '../../components/ui/MainNavigation';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import PropertyGrid from './components/PropertyGrid';
import FilterPanel from './components/FilterPanel';
import FilterChips from './components/FilterChips';
import SortDropdown from './components/SortDropdown';
import ViewToggle from './components/ViewToggle';
import MapView from './components/MapView';

const PropertyListingsBrowse = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialSearch = searchParams.get('search') || '';

  // State management
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMapProperty, setSelectedMapProperty] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 10000000 },
    propertyTypes: [],
    location: { city: '', neighborhood: '' },
    amenities: [],
    status: 'all'
  });

  // Mock data
  const mockProperties = [
    {
      id: 1,
      title: "Riad Saʿāda - Traditional Moroccan House",
      type: "Riad",
      status: "for-sale",
      price: 2500000,
      city: "Tangier",
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
      description: "Beautiful traditional riad in the heart of Tangier Medina with authentic Moroccan architecture and modern amenities.",
      createdAt: new Date('2024-01-15')
    },
    {
      id: 2,
      title: "Modern Apartment in Anfa",
      type: "Apartment",
      status: "for-rent",
      price: 850000,
      city: "Casablanca",
      neighborhood: "Anfa",
      bedrooms: 2,
      bathrooms: 2,
      area: 95,
      images: [
        "https://d2hhh2ewuz3i8z.cloudfront.net/crop/480x320/https://production-kyero-property-images.s3.amazonaws.com/19129/19129584/370154845_original.jpg",
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
        "https://photos.zillowstatic.com/fp/eaf8e4bb22f65012ca7902be5e141797-cc_ft_1152.webp",
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
    } ,
  {
    id: 9,
    title: "Charming Home in Oujda",
    type: "Traditional House",
    status: "for-sale",
    price: 950000,
    city: "Oujda",
    neighborhood: "Sidi Yahya",
    bedrooms: 3,
    bathrooms: 2,
    area: 130,
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800",
      "https://photos.zillowstatic.com/fp/eaf8e4bb22f65012ca7902be5e141797-cc_ft_1152.webp"
    ],
    amenities: ["WiFi", "Parking", "Garden"],
    host: {
      name: "Leila Amrani",
      phone: "+212 661-112233",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    description: "Cozy traditional home in the heart of Oujda’s Sidi Yahya district.",
    createdAt: new Date('2024-02-15')
  },
  {
    id: 10,
    title: "Modern Apartment in Kenitra",
    type: "Apartment",
    status: "for-rent",
    price: 7200,
    city: "Kenitra",
    neighborhood: "Ain Sbit",
    bedrooms: 2,
    bathrooms: 1,
    area: 80,
    images: [
      "https://d2hhh2ewuz3i8z.cloudfront.net/crop/720x500/https://production-kyero-property-images.s3.amazonaws.com/19425/19425092/04d3eh90wqit_DSC_7034-HDR.jpg",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"
    ],
    amenities: ["WiFi", "Elevator", "Security"],
    host: {
      name: "Youssef El Idrissi",
      phone: "+212 662-223344",
      avatar: "https://randomuser.me/api/portraits/men/72.jpg"
    },
    description: "Bright, modern apartment overlooking Kenitra’s Ain Sbit neighborhood.",
    createdAt: new Date('2024-02-18')
  },
  {
    id: 11,
    title: "Coastal Retreat in Tetouan",
    type: "Villa",
    status: "for-sale",
    price: 2150000,
    city: "Tetouan",
    neighborhood: "Martil",
    bedrooms: 4,
    bathrooms: 3,
    area: 210,
    images: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800"
    ],
    amenities: ["WiFi", "Pool", "Terrace"],
    host: {
      name: "Fatima Zahra",
      phone: "+212 663-334455",
      avatar: "https://randomuser.me/api/portraits/women/63.jpg"
    },
    description: "Luxurious seaside villa in Tetouan’s popular Martil district.",
    createdAt: new Date('2024-02-20')
  },
  {
    id: 12,
    title: "Historic Riad in Safi",
    type: "Riad",
    status: "for-sale",
    price: 1320000,
    city: "Safi",
    neighborhood: "Hamria",
    bedrooms: 3,
    bathrooms: 2,
    area: 160,
    images: [
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"
    ],
    amenities: ["WiFi", "Fireplace", "Garden"],
    host: {
      name: "Karim Bennis",
      phone: "+212 664-445566",
      avatar: "https://randomuser.me/api/portraits/men/68.jpg"
    },
    description: "Authentic riad with ocean breezes in Safi’s historic Hamria quarter.",
    createdAt: new Date('2024-02-22')
  },
  {
    id: 13,
    title: "Beachside Flat in El Jadida",
    type: "Apartment",
    status: "for-rent",
    price: 6800,
    city: "El Jadida",
    neighborhood: "Cap",
    bedrooms: 1,
    bathrooms: 1,
    area: 55,
    images: [
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"
    ],
    amenities: ["WiFi", "Balcony", "Sea View"],
    host: {
      name: "Salma El Ouarz",
      phone: "+212 665-556677",
      avatar: "https://randomuser.me/api/portraits/women/70.jpg"
    },
    description: "Compact beachfront flat in El Jadida’s scenic Cap district.",
    createdAt: new Date('2024-02-25')
  },
  {
    id: 14,
    title: "Desert Villa in Ouarzazate",
    type: "Villa",
    status: "for-sale",
    price: 2870000,
    city: "Ouarzazate",
    neighborhood: "Skoura",
    bedrooms: 5,
    bathrooms: 4,
    area: 300,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800"
    ],
    amenities: ["WiFi", "Pool", "Garden", "Parking"],
    host: {
      name: "Youssef Khalil",
      phone: "+212 666-667788",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg"
    },
    description: "Sprawling desert villa near Ouarzazate’s Skoura palm groves.",
    createdAt: new Date('2024-02-27')
  },
  {
    id: 15,
    title: "Mountain Retreat in Chefchaouen",
    type: "Traditional House",
    status: "for-sale",
    price: 1950000,
    city: "Chefchaouen",
    neighborhood: "Medina",
    bedrooms: 3,
    bathrooms: 2,
    area: 145,
    images: [
      "https://d2hhh2ewuz3i8z.cloudfront.net/crop/720x500/https://production-kyero-property-images.s3.amazonaws.com/15584/15584457/283123368_original.jpg",
      "https://images.unsplash.com/photo-1501769214405-4f9babf1c2b0?w=800"
    ],
    amenities: ["WiFi", "Terrace", "Traditional Decor"],
    host: {
      name: "Amina Chraibi",
      phone: "+212 667-778899",
      avatar: "https://randomuser.me/api/portraits/women/77.jpg"
    },
    description: "Charming blue-house retreat in Chefchaouen’s old Medina.",
    createdAt: new Date('2024-03-01')
  },
  {
    id: 16,
    title: "Seaside Home in Nador",
    type: "Apartment",
    status: "for-rent",
    price: 5400,
    city: "Nador",
    neighborhood: "Beni Ensar", 
    bedrooms: 2,
    bathrooms: 1,
    area: 70,
    images: [
      "https://images.squarespace-cdn.com/content/v1/62f30bc78e05805ce6a351a6/212b45ac-3f03-4422-b484-4a5322c1b3ce/BonarSt_PSD_5.jpg?format=500w",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"
    ],
    amenities: ["WiFi", "Sea View", "Balcony"],
    host: {
      name: "Mohamed Ouhaddou",
      phone: "+212 668-889900",
      avatar: "https://randomuser.me/api/portraits/men/80.jpg"
    },
    description: "Cozy seaside apartment in Nador’s Beni Ensar neighborhood.",
    createdAt: new Date('2024-03-03')
  },
  {
    id: 17,
    title: "Lagoon Villa in Dakhla",
    type: "Villa",
    status: "for-sale",
    price: 3250000,
    city: "Dakhla",
    neighborhood: "La Source",
    bedrooms: 4,
    bathrooms: 3,
    area: 280,
    images: [
      "https://photos.zillowstatic.com/fp/eaf8e4bb22f65012ca7902be5e141797-cc_ft_1152.webp",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800"
    ],
    amenities: ["WiFi", "Pool", "Garden"],
    host: {
      name: "Imane Berrada",
      phone: "+212 669-990011",
      avatar: "https://randomuser.me/api/portraits/women/82.jpg"
    },
    description: "Stunning lagoon-front villa in Dakhla’s La Source area.",
    createdAt: new Date('2024-03-05')
  },
  {
    id: 18,
    title: "Desert View in Laayoune",
    type: "Apartment",
    status: "for-sale",
    price: 1100000,
    city: "Laayoune",
    neighborhood: "Hay Adil",
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    images: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"
    ],
    amenities: ["WiFi", "Parking", "Terrace"],
    host: {
      name: "Youssef El Hachim",
      phone: "+212 670-001122",
      avatar: "https://randomuser.me/api/portraits/men/85.jpg"
    },
    description: "Modern apartment with desert vistas in Laayoune’s Hay Adil district.",
    createdAt: new Date('2024-03-07')
  },
  {
    id: 19,
    title: "Family Home in Settat",
    type: "Traditional House",
    status: "for-rent",
    price: 8200,
    city: "Settat",
    neighborhood: "Espace Vert",
    bedrooms: 3,
    bathrooms: 2,
    area: 140,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800"
    ],
    amenities: ["WiFi", "Garden", "Parking"],
    host: {
      name: "Nadia Touzani",
      phone: "+212 671-112233",
      avatar: "https://randomuser.me/api/portraits/women/88.jpg"
    },
    description: "Spacious family house near Settat’s green parks.",
    createdAt: new Date('2024-03-09')
  },
  {
    id: 20,
    title: "Countryside Retreat in Beni Mellal",
    type: "Villa",
    status: "for-sale",
    price: 1750000,
    city: "Beni Mellal",
    neighborhood: "Aguelmous",
    bedrooms: 4,
    bathrooms: 3,
    area: 240,
    images: [ 
      "https://images.squarespace-cdn.com/content/v1/62f30bc78e05805ce6a351a6/5b659183-a339-4624-a4cb-afdb6f8b34c3/Screen+Shot+2022-09-22+at+9.47.55+AM.png?format=500w",
      "https://photos.zillowstatic.com/fp/eaf8e4bb22f65012ca7902be5e141797-cc_ft_1152.webp"
    ],
    amenities: ["WiFi", "Pool", "Garden", "Parking"],
    host: {
      name: "Amina Saadi",
      phone: "+212 672-223344",
      avatar: "https://randomuser.me/api/portraits/women/90.jpg"
    },
    description: "Peaceful countryside villa in Beni Mellal’s Aguelmous area.",
    createdAt: new Date('2024-03-11')
  },
  {
    id: 21,
    title: "Industrial Loft in Khouribga",
    type: "Apartment",
    status: "for-rent",
    price: 9000,
    city: "Khouribga",
    neighborhood: "Cité OCP",
    bedrooms: 2,
    bathrooms: 1,
    area: 100,
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"
    ],
    amenities: ["WiFi", "Security", "Parking"],
    host: {
      name: "Youssef Lahlou",
      phone: "+212 673-334455",
      avatar: "https://randomuser.me/api/portraits/men/92.jpg"
    },
    description: "Stylish industrial loft in Khouribga’s Cité OCP neighborhood.",
    createdAt: new Date('2024-03-13')
  }
  ];

  // Load initial data
  useEffect(() => {
    const loadProperties = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProperties(mockProperties);
      setLoading(false);
    };

    loadProperties();
  }, []);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('property-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Filter and sort properties
  const processedProperties = useMemo(() => {
    let filtered = [...properties];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply price filter
    if (filters.priceRange.min > 0 || filters.priceRange.max < 10000000) {
      filtered = filtered.filter(property =>
        property.price >= filters.priceRange.min && property.price <= filters.priceRange.max
      );
    }

    // Apply property type filter
    if (filters.propertyTypes.length > 0) {
      filtered = filtered.filter(property =>
        filters.propertyTypes.some(type => 
          property.type.toLowerCase().includes(type.toLowerCase())
        )
      );
    }

    // Apply location filter
    if (filters.location.city) {
      filtered = filtered.filter(property => property.city === filters.location.city);
    }
    if (filters.location.neighborhood) {
      filtered = filtered.filter(property => property.neighborhood === filters.location.neighborhood);
    }

    // Apply amenities filter
    if (filters.amenities.length > 0) {
      filtered = filtered.filter(property =>
        filters.amenities.every(amenity => property.amenities.includes(amenity))
      );
    }

    // Apply status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(property => property.status === filters.status);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'area-large':
        filtered.sort((a, b) => b.area - a.area);
        break;
      case 'area-small':
        filtered.sort((a, b) => a.area - b.area);
        break;
      default: // relevance
        // Keep original order or implement relevance scoring
        break;
    }

    return filtered;
  }, [properties, searchQuery, filters, sortBy]);

  // Pagination
  const itemsPerPage = 12;
  const paginatedProperties = useMemo(() => {
    const endIndex = currentPage * itemsPerPage;
    const paginated = processedProperties.slice(0, endIndex);
    setHasMore(endIndex < processedProperties.length);
    return paginated;
  }, [processedProperties, currentPage]);

  // Update filtered properties
  useEffect(() => {
    setFilteredProperties(paginatedProperties);
  }, [paginatedProperties]);

  // Handle search from URL params
  useEffect(() => {
    if (initialSearch) {
      setSearchQuery(initialSearch);
    }
  }, [initialSearch]);

  // Event handlers
  const handleToggleFavorite = (propertyId) => {
    const newFavorites = favorites.includes(propertyId)
      ? favorites.filter(id => id !== propertyId)
      : [...favorites, propertyId];
    
    setFavorites(newFavorites);
    localStorage.setItem('property-favorites', JSON.stringify(newFavorites));
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleRemoveFilter = (filterType, newValue) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: newValue
    }));
    setCurrentPage(1);
  };

  const handleClearAllFilters = () => {
    setFilters({
      priceRange: { min: 0, max: 10000000 },
      propertyTypes: [],
      location: { city: '', neighborhood: '' },
      amenities: [],
      status: 'all'
    });
    setCurrentPage(1);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    setCurrentPage(1);
  };

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    if (mode === 'map') {
      setSelectedMapProperty(null);
    }
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
                  Discover Moroccan Properties
                </h1>
                <p className="text-text-secondary">
                  {processedProperties.length} {processedProperties.length === 1 ? 'property' : 'properties'} available
                  {searchQuery && ` for "${searchQuery}"`}
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <ViewToggle viewMode={viewMode} onViewModeChange={handleViewModeChange} />
                
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(true)}
                  iconName="Filter"
                  iconSize={16}
                  className="lg:hidden"
                >
                  Filters
                </Button>
              </div>
            </div>

            {/* Desktop Controls */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <FilterChips
                filters={filters}
                onRemoveFilter={handleRemoveFilter}
                onClearAll={handleClearAllFilters}
              />
              
              <SortDropdown sortBy={sortBy} onSortChange={handleSortChange} />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex gap-6">
            {/* Desktop Filter Sidebar */}
            <div className="hidden lg:block flex-shrink-0">
              <FilterPanel
                filters={filters}
                onFiltersChange={handleFiltersChange}
                isOpen={true}
                isMobile={false}
              />
            </div>

            {/* Content Area */}
            <div className="flex-1 min-w-0">
              {viewMode === 'grid' ? (
                <PropertyGrid
                  properties={filteredProperties}
                  loading={loading}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                  hasMore={hasMore}
                  onLoadMore={handleLoadMore}
                />
              ) : (
                <MapView
                  properties={processedProperties}
                  onPropertySelect={setSelectedMapProperty}
                  selectedProperty={selectedMapProperty}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Filter Panel */}
      <FilterPanel
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClose={() => setShowFilters(false)}
        isOpen={showFilters}
        isMobile={true}
      />
    </div>
  );
};

export default PropertyListingsBrowse;