import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExportModal = ({ properties, onClose }) => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [exportFields, setExportFields] = useState({
    basicInfo: true,
    priceDetails: true,
    amenities: true,
    contactInfo: true,
    images: false
  });
  const [isExporting, setIsExporting] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (exportFormat === 'pdf') {
      // Generate PDF content
      const content = generatePdfContent();
      downloadFile(content, 'my-favorites.pdf', 'application/pdf');
    } else if (exportFormat === 'csv') {
      // Generate CSV content
      const content = generateCsvContent();
      downloadFile(content, 'my-favorites.csv', 'text/csv');
    } else if (exportFormat === 'json') {
      // Generate JSON content
      const content = generateJsonContent();
      downloadFile(content, 'my-favorites.json', 'application/json');
    }
    
    setIsExporting(false);
    onClose();
  };

  const generatePdfContent = () => {
    // In a real app, use a PDF library like jsPDF or react-pdf
    let content = `My Favorite Properties - HomeFinder\n\n`;
    content += `Generated on: ${new Date().toLocaleDateString()}\n`;
    content += `Total Properties: ${properties.length}\n\n`;
    
    properties.forEach((property, index) => {
      content += `${index + 1}. ${property?.title}\n`;
      if (exportFields.basicInfo) {
        content += `   Type: ${property?.type}\n`;
        content += `   Location: ${property?.neighborhood}, ${property?.city}\n`;
        content += `   Bedrooms: ${property?.bedrooms || 'N/A'} | Bathrooms: ${property?.bathrooms || 'N/A'} | Area: ${property?.area || 'N/A'}m²\n`;
      }
      if (exportFields.priceDetails) {
        content += `   Price: ${formatPrice(property?.price)} ${property?.status === 'for-rent' ? '(monthly)' : '(total)'}\n`;
        content += `   Status: ${property?.status === 'for-sale' ? 'For Sale' : 'For Rent'}\n`;
      }
      if (exportFields.amenities && property?.amenities) {
        content += `   Amenities: ${property.amenities.join(', ')}\n`;
      }
      if (exportFields.contactInfo) {
        content += `   Host: ${property?.host?.name} (${property?.host?.phone})\n`;
      }
      content += `\n`;
    });
    
    return content;
  };

  const generateCsvContent = () => {
    const headers = ['Title', 'Type', 'City', 'Neighborhood', 'Price', 'Status'];
    if (exportFields.basicInfo) {
      headers.push('Bedrooms', 'Bathrooms', 'Area');
    }
    if (exportFields.amenities) {
      headers.push('Amenities');
    }
    if (exportFields.contactInfo) {
      headers.push('Host Name', 'Host Phone');
    }
    
    let csv = headers.join(',') + '\n';
    
    properties.forEach(property => {
      const row = [
        `"${property?.title}"`,
        property?.type,
        property?.city,
        property?.neighborhood,
        property?.price,
        property?.status
      ];
      
      if (exportFields.basicInfo) {
        row.push(property?.bedrooms || '', property?.bathrooms || '', property?.area || '');
      }
      if (exportFields.amenities) {
        row.push(`"${property?.amenities?.join('; ') || ''}"`);
      }
      if (exportFields.contactInfo) {
        row.push(`"${property?.host?.name}"`, property?.host?.phone);
      }
      
      csv += row.join(',') + '\n';
    });
    
    return csv;
  };

  const generateJsonContent = () => {
    const exportData = properties.map(property => {
      const data = {};
      
      if (exportFields.basicInfo) {
        data.title = property?.title;
        data.type = property?.type;
        data.location = {
          city: property?.city,
          neighborhood: property?.neighborhood
        };
        data.bedrooms = property?.bedrooms;
        data.bathrooms = property?.bathrooms;
        data.area = property?.area;
      }
      
      if (exportFields.priceDetails) {
        data.price = property?.price;
        data.status = property?.status;
      }
      
      if (exportFields.amenities) {
        data.amenities = property?.amenities;
      }
      
      if (exportFields.contactInfo) {
        data.host = property?.host;
      }
      
      if (exportFields.images) {
        data.images = property?.images;
      }
      
      return data;
    });
    
    return JSON.stringify({ properties: exportData, exportedAt: new Date().toISOString() }, null, 2);
  };

  const downloadFile = (content, filename, mimeType) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFieldChange = (field) => {
    setExportFields(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-warm-lg max-w-lg w-full">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-heading font-bold text-text-primary">
                Export Favorites
              </h2>
              <p className="text-text-secondary">
                Export {properties.length} properties to your preferred format
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-surface rounded-full flex items-center justify-center hover:bg-muted transition-colors duration-200"
            >
              <Icon name="X" size={20} className="text-text-secondary" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Export Format */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Export Format
            </label>
            <div className="space-y-2">
              {[
                { value: 'pdf', label: 'PDF Document', icon: 'FileText', description: 'Formatted document for printing' },
                { value: 'csv', label: 'CSV Spreadsheet', icon: 'Table', description: 'For Excel or Google Sheets' },
                { value: 'json', label: 'JSON Data', icon: 'Code', description: 'For developers and data analysis' }
              ].map((format) => (
                <label key={format.value} className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="exportFormat"
                    value={format.value}
                    checked={exportFormat === format.value}
                    onChange={(e) => setExportFormat(e.target.value)}
                    className="mt-1 w-4 h-4 text-primary"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Icon name={format.icon} size={16} className="text-text-secondary" />
                      <span className="font-medium text-text-primary">{format.label}</span>
                    </div>
                    <p className="text-sm text-text-secondary">{format.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Export Fields */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Include in Export
            </label>
            <div className="space-y-2">
              {[
                { key: 'basicInfo', label: 'Basic Information', description: 'Title, type, location, rooms' },
                { key: 'priceDetails', label: 'Price & Status', description: 'Price, sale/rent status' },
                { key: 'amenities', label: 'Amenities', description: 'Property features and amenities' },
                { key: 'contactInfo', label: 'Contact Information', description: 'Host name and phone number' },
                { key: 'images', label: 'Image URLs', description: 'Links to property images' }
              ].map((field) => (
                <label key={field.key} className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={exportFields[field.key]}
                    onChange={() => handleFieldChange(field.key)}
                    className="mt-1 w-4 h-4 text-primary"
                  />
                  <div className="flex-1">
                    <span className="font-medium text-text-primary">{field.label}</span>
                    <p className="text-sm text-text-secondary">{field.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-surface">
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isExporting}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleExport}
              disabled={isExporting}
              iconName={isExporting ? "Loader2" : "Download"}
              iconSize={16}
              className={isExporting ? "animate-spin" : ""}
            >
              {isExporting ? 'Exporting...' : 'Export'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;