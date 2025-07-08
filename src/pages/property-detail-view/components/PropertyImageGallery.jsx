import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PropertyImageGallery = ({ images = [], virtualTours = [], featureIcons = [] }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState('photos');

  const allMedia = {
    photos: images,
    tours: virtualTours,
    features: featureIcons
  };

  const currentMedia = allMedia[activeTab];

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === currentMedia.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? currentMedia.length - 1 : prev - 1
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentImageIndex(0);
  };

  if (!currentMedia || currentMedia.length === 0) {
    return (
      <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">
        <div className="text-center">
          <Icon name="ImageOff" size={48} className="text-text-secondary mx-auto mb-4" />
          <p className="text-text-secondary">No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Media Type Tabs */}
      <div className="flex space-x-1 mb-4 bg-surface rounded-lg p-1">
        <button
          onClick={() => handleTabChange('photos')}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === 'photos' ?'bg-background text-primary shadow-warm-sm' :'text-text-secondary hover:text-text-primary'
          }`}
        >
          <Icon name="Camera" size={16} />
          <span>Photos ({images.length})</span>
        </button>
        <button
          onClick={() => handleTabChange('tours')}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === 'tours' ?'bg-background text-primary shadow-warm-sm' :'text-text-secondary hover:text-text-primary'
          }`}
        >
          <Icon name="Video" size={16} />
          <span>Tours ({virtualTours.length})</span>
        </button>
        <button
          onClick={() => handleTabChange('features')}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === 'features' ?'bg-background text-primary shadow-warm-sm' :'text-text-secondary hover:text-text-primary'
          }`}
        >
          <Icon name="Star" size={16} />
          <span>Features ({featureIcons.length})</span>
        </button>
      </div>

      {/* Main Gallery */}
      <div className="relative">
        {/* Main Image Display */}
        <div className="relative w-full h-96 lg:h-[500px] bg-muted rounded-lg overflow-hidden group">
          {activeTab === 'photos' && (
            <Image
              src={currentMedia[currentImageIndex]?.url}
              alt={currentMedia[currentImageIndex]?.alt || `Property image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
          )}
          
          {activeTab === 'tours' && (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <div className="text-center">
                <Icon name="Play" size={64} className="text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {currentMedia[currentImageIndex]?.title}
                </h3>
                <p className="text-text-secondary">
                  {currentMedia[currentImageIndex]?.duration}
                </p>
              </div>
            </div>
          )}
          
          {activeTab === 'features' && (
            <div className="w-full h-full bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center">
              <div className="text-center">
                <Icon 
                  name={currentMedia[currentImageIndex]?.icon} 
                  size={64} 
                  className="text-primary mx-auto mb-4" 
                />
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {currentMedia[currentImageIndex]?.name}
                </h3>
                <p className="text-text-secondary">
                  {currentMedia[currentImageIndex]?.description}
                </p>
              </div>
            </div>
          )}

          {/* Navigation Arrows */}
          {currentMedia.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-background"
              >
                <Icon name="ChevronLeft" size={20} className="text-text-primary" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-background"
              >
                <Icon name="ChevronRight" size={20} className="text-text-primary" />
              </button>
            </>
          )}

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-background"
          >
            <Icon name="Maximize2" size={18} className="text-text-primary" />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-4 px-3 py-1 bg-background/80 backdrop-blur-sm rounded-full text-sm font-medium text-text-primary">
            {currentImageIndex + 1} / {currentMedia.length}
          </div>
        </div>

        {/* Thumbnail Navigation */}
        {currentMedia.length > 1 && (
          <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
            {currentMedia.map((item, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  index === currentImageIndex
                    ? 'border-primary shadow-warm'
                    : 'border-transparent hover:border-border'
                }`}
              >
                {activeTab === 'photos' && (
                  <Image
                    src={item.url}
                    alt={item.alt || `Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                )}
                {activeTab === 'tours' && (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Icon name="Play" size={16} className="text-primary" />
                  </div>
                )}
                {activeTab === 'features' && (
                  <div className="w-full h-full bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center">
                    <Icon name={item.icon} size={16} className="text-primary" />
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
          <button
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 w-12 h-12 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors duration-200"
          >
            <Icon name="X" size={24} className="text-text-primary" />
          </button>
          
          <div className="w-full h-full flex items-center justify-center p-4">
            {activeTab === 'photos' && (
              <Image
                src={currentMedia[currentImageIndex]?.url}
                alt={currentMedia[currentImageIndex]?.alt || `Property image ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            )}
          </div>
          
          {currentMedia.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors duration-200"
              >
                <Icon name="ChevronLeft" size={24} className="text-text-primary" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors duration-200"
              >
                <Icon name="ChevronRight" size={24} className="text-text-primary" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PropertyImageGallery;