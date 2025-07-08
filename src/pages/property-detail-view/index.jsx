import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MainNavigation from '../../components/ui/MainNavigation';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import PropertyImageGallery from './components/PropertyImageGallery';
import PropertyHeader from './components/PropertyHeader';
import PropertyDetails from './components/PropertyDetails';
import HostProfile from './components/HostProfile';
import ContactModal from './components/ContactModal';
import Icon from '../../components/AppIcon';

const PropertyDetailView = () => {
  const [searchParams] = useSearchParams();
  const propertyId = searchParams.get('id') || '1';
  
  const [property, setProperty] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);

  // Mock property data
  const mockProperties = [
    {
      id: '1',
      title: 'Luxury Riad in Historic Medina',
      arabicName: 'رياض الصفاء',
      description: `Experience the authentic charm of Morocco in this beautifully restored traditional riad located in the heart of Marrakech's historic Medina. This stunning property combines traditional Moroccan architecture with modern luxury amenities.\n\nThe riad features intricate zellige tilework, carved cedar wood details, and a peaceful central courtyard with a traditional fountain. Each room is uniquely decorated with handcrafted furniture and authentic Moroccan textiles.\n\nPerfect for those seeking an immersive cultural experience while enjoying contemporary comfort and convenience.`,
      price: 2500000,
      type: 'sale',propertyType: 'Riad',
      bedrooms: 6,
      bathrooms: 4,
      area: 350,
      location: {
        address: '15 Derb Sidi Ahmed Soussi',neighborhood: 'Medina',city: 'Marrakech',
        coordinates: {
          lat: 31.6295,
          lng: -7.9811
        },
        description: `Located in the prestigious Medina quarter, this property offers easy access to the famous Jemaa el-Fnaa square, traditional souks, and historic monuments. The neighborhood is known for its authentic atmosphere and rich cultural heritage.`
      },
      images: [
        {
          url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop',alt: 'Riad exterior courtyard view'
        },
        {
          url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',alt: 'Traditional Moroccan living room'
        },
        {
          url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',alt: 'Master bedroom with traditional decor'
        },
        {
          url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',alt: 'Rooftop terrace with city views'
        },
        {
          url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop',alt: 'Traditional Moroccan kitchen'
        }
      ],
      virtualTours: [
        {
          title: '360° Virtual Tour',duration: '5 min',url: 'virtual-tour-1'
        },
        {
          title: 'Rooftop Experience',duration: '2 min',url: 'virtual-tour-2'
        }
      ],
      featureIcons: [
        {
          name: 'Traditional Architecture',icon: 'Building',description: 'Authentic Moroccan design elements'
        },
        {
          name: 'Central Courtyard',icon: 'TreePine',description: 'Peaceful garden with fountain'
        },
        {
          name: 'Rooftop Terrace',icon: 'Mountain',description: 'Panoramic city and Atlas views'
        },
        {
          name: 'Modern Amenities',icon: 'Wifi',description: 'Contemporary comfort features'
        }
      ],
      amenities: [
        { name: 'Air Conditioning', icon: 'Wind' },
        { name: 'WiFi Internet', icon: 'Wifi' },
        { name: 'Traditional Hammam', icon: 'Droplets' },
        { name: 'Rooftop Terrace', icon: 'Mountain' },
        { name: 'Central Courtyard', icon: 'TreePine' },
        { name: 'Parking Available', icon: 'Car' },
        { name: 'Security System', icon: 'Shield' },
        { name: 'Traditional Kitchen', icon: 'ChefHat' },
        { name: 'Fireplace', icon: 'Flame' },
        { name: 'Garden', icon: 'Flower' },
        { name: 'Fountain', icon: 'Droplets' },
        { name: 'Zellige Tilework', icon: 'Palette' }
      ],
      stages: [
        {
          name: 'Ground Floor - Reception Areas',description: 'Traditional entrance hall (derb) leading to the central courtyard with fountain. Includes formal sitting areas with authentic Moroccan furnishings and a traditional kitchen.',
          features: ['Central Courtyard', 'Traditional Kitchen', 'Guest Reception', 'Storage Areas']
        },
        {
          name: 'First Floor - Private Quarters',description: 'Four spacious bedrooms each with en-suite bathrooms, featuring traditional Moroccan design elements and modern amenities. Master suite includes private balcony.',
          features: ['4 Bedrooms', '4 En-suite Bathrooms', 'Master Balcony', 'Traditional Decor']
        },
        {
          name: 'Second Floor - Entertainment & Relaxation',description: 'Two additional bedrooms, family living area, and access to the rooftop terrace. Traditional hammam and relaxation areas.',
          features: ['2 Bedrooms', 'Family Living Area', 'Traditional Hammam', 'Terrace Access']
        },
        {
          name: 'Rooftop - Panoramic Views',description: 'Expansive rooftop terrace with panoramic views of the Medina and Atlas Mountains. Perfect for entertaining and relaxation.',
          features: ['360° Views', 'Entertainment Area', 'Mountain Views', 'Sunset Terrace']
        }
      ],
      host: {
        id: 'host-1',name: 'Ahmed Benali',avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',email: 'ahmed.benali@email.com',phone: '+212612345678',
        isVerified: true,
        joinDate: '2020-03-15',totalProperties: 8,rating: 4.8,reviewCount: 127,responseRate: 98,responseTime: '< 1 hour',
        languages: ['Arabic', 'French', 'English', 'Berber'],
        description: `Passionate about Moroccan heritage and hospitality. I specialize in traditional riads and authentic Moroccan properties. With over 10 years of experience in real estate, I help clients find their perfect Moroccan home.`
      },
      tags: ['luxury', 'traditional', 'medina', 'riad', 'historic'],
      createdAt: '2024-01-15',updatedAt: '2024-01-20'
    },
    {
      id: '2',title: 'Modern Villa in Palmeraie',arabicName: 'فيلا النخيل',description: `Contemporary luxury villa situated in the prestigious Palmeraie district of Marrakech. This modern property offers stunning views of the Atlas Mountains and features a private pool, landscaped gardens, and state-of-the-art amenities.`,price: 15000,type: 'rent',propertyType: 'Villa',
      bedrooms: 4,
      bathrooms: 3,
      area: 280,
      location: {
        address: 'Route de Fes, Palmeraie',neighborhood: 'Palmeraie',city: 'Marrakech',
        coordinates: {
          lat: 31.6769,
          lng: -8.0112
        },
        description: `The Palmeraie is an exclusive residential area known for its luxury properties, golf courses, and palm groves. Perfect for those seeking modern comfort in a prestigious location.`
      },
      images: [
        {
          url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',alt: 'Modern villa exterior'
        },
        {
          url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',alt: 'Swimming pool area'
        },
        {
          url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',alt: 'Modern living room'
        }
      ],
      virtualTours: [
        {
          title: 'Full Property Tour',duration: '8 min',url: 'virtual-tour-villa-1'
        }
      ],
      featureIcons: [
        {
          name: 'Private Pool',icon: 'Waves',description: 'Heated swimming pool with mountain views'
        },
        {
          name: 'Modern Design',icon: 'Home',description: 'Contemporary architecture and interiors'
        }
      ],
      amenities: [
        { name: 'Private Pool', icon: 'Waves' },
        { name: 'Garden', icon: 'TreePine' },
        { name: 'Garage', icon: 'Car' },
        { name: 'Modern Kitchen', icon: 'ChefHat' },
        { name: 'Air Conditioning', icon: 'Wind' },
        { name: 'WiFi', icon: 'Wifi' }
      ],
      host: {
        id: 'host-2',name: 'Fatima Alaoui',avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',email: 'fatima.alaoui@email.com',phone: '+212687654321',
        isVerified: true,
        joinDate: '2019-08-20',totalProperties: 12,rating: 4.9,reviewCount: 89,responseRate: 95,responseTime: '< 2 hours',
        languages: ['Arabic', 'French', 'English'],
        description: `Luxury property specialist in Marrakech. I focus on high-end villas and modern properties in prestigious neighborhoods.`
      },
      tags: ['modern', 'villa', 'palmeraie', 'pool', 'luxury'],
      createdAt: '2024-01-10',updatedAt: '2024-01-18'
    }
  ];

  // Mock other listings by the same host
  const mockOtherListings = [
    {
      id: '3',
      title: 'Charming Riad in Medina',
      location: { neighborhood: 'Medina', city: 'Marrakech' },
      price: 1800000,
      type: 'sale',
      images: [{ url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop' }]
    },
    {
      id: '4',
      title: 'Traditional House in Gueliz',
      location: { neighborhood: 'Gueliz', city: 'Marrakech' },
      price: 12000,
      type: 'rent',
      images: [{ url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop' }]
    },
    {
      id: '5',
      title: 'Luxury Apartment in Hivernage',
      location: { neighborhood: 'Hivernage', city: 'Marrakech' },
      price: 2200000,
      type: 'sale',
      images: [{ url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop' }]
    }
  ];

  useEffect(() => {
    const fetchProperty = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const foundProperty = mockProperties.find(p => p.id === propertyId);
        
        if (!foundProperty) {
          throw new Error('Property not found');
        }
        
        setProperty(foundProperty);
        
        // Check if property is bookmarked (from localStorage)
        const bookmarks = JSON.parse(localStorage.getItem('propertyBookmarks') || '[]');
        setIsBookmarked(bookmarks.includes(propertyId));
        
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId]);

  const handleBookmarkToggle = () => {
    const bookmarks = JSON.parse(localStorage.getItem('propertyBookmarks') || '[]');
    
    if (isBookmarked) {
      const updatedBookmarks = bookmarks.filter(id => id !== propertyId);
      localStorage.setItem('propertyBookmarks', JSON.stringify(updatedBookmarks));
      setIsBookmarked(false);
    } else {
      const updatedBookmarks = [...bookmarks, propertyId];
      localStorage.setItem('propertyBookmarks', JSON.stringify(updatedBookmarks));
      setIsBookmarked(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <MainNavigation />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse">
              {/* Header Skeleton */}
              <div className="h-16 bg-muted rounded-lg mb-6"></div>
              
              {/* Gallery Skeleton */}
              <div className="h-96 bg-muted rounded-lg mb-8"></div>
              
              {/* Content Skeleton */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="h-32 bg-muted rounded-lg"></div>
                  <div className="h-48 bg-muted rounded-lg"></div>
                  <div className="h-64 bg-muted rounded-lg"></div>
                </div>
                <div className="h-96 bg-muted rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <MainNavigation />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <Icon name="AlertCircle" size={64} className="text-error mx-auto mb-4" />
              <h1 className="text-2xl font-heading font-bold text-text-primary mb-2">
                Property Not Found
              </h1>
              <p className="text-text-secondary mb-6">
                {error === 'Property not found' ?'The property you are looking for does not exist or has been removed.' :'There was an error loading the property details. Please try again later.'
                }
              </p>
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200"
              >
                <Icon name="ArrowLeft" size={18} />
                <span>Go Back</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />
      
      {/* Property Header */}
      <PropertyHeader 
        property={property}
        isBookmarked={isBookmarked}
        onBookmarkToggle={handleBookmarkToggle}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <BreadcrumbNavigation />

        {/* Property Image Gallery */}
        <div className="mb-8">
          <PropertyImageGallery 
            images={property.images}
            virtualTours={property.virtualTours}
            featureIcons={property.featureIcons}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-2">
            <PropertyDetails property={property} />
          </div>

          {/* Right Column - Host Profile */}
          <div className="lg:col-span-1">
            <HostProfile 
              host={property.host}
              otherListings={mockOtherListings}
            />
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        property={property}
        host={property?.host}
      />
    </div>
  );
};

export default PropertyDetailView;