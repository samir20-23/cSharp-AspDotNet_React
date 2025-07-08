import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InquiryPanel = () => {
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const inquiries = [
    {
      id: 1,
      senderName: "Ahmed Benali",
      senderEmail: "ahmed.benali@email.com",
      propertyTitle: "Riad Saʿāda - Traditional Marrakech",
      message: `Bonjour, je suis très intéressé par votre riad à Marrakech. Pourriez-vous me donner plus d'informations sur les disponibilités pour le mois de juin?\n\nJe recherche un hébergement pour une famille de 4 personnes pour 2 semaines.`,
      timestamp: "2024-01-15T10:30:00Z",
      status: "unread",
      urgency: "high",
      inquiryType: "rental"
    },
    {
      id: 2,
      senderName: "Sarah Johnson",
      senderEmail: "sarah.j@email.com",
      propertyTitle: "Villa Atlas View - Casablanca",
      message: `Hello, I'm interested in purchasing this beautiful villa. Could we schedule a viewing next week? I'm available Tuesday through Thursday.\n\nAlso, is the price negotiable?`,
      timestamp: "2024-01-15T09:15:00Z",
      status: "replied",
      urgency: "medium",
      inquiryType: "sale"
    },
    {
      id: 3,
      senderName: "Mohammed Alami",
      senderEmail: "m.alami@email.com",
      propertyTitle: "Apartment Anfa - Modern Living",
      message: `السلام عليكم، أريد معرفة المزيد عن هذه الشقة في الأنفا. هل يمكن ترتيب زيارة هذا الأسبوع؟`,
      timestamp: "2024-01-14T16:45:00Z",
      status: "unread",
      urgency: "medium",
      inquiryType: "rental"
    },
    {
      id: 4,
      senderName: "Elena Rodriguez",
      senderEmail: "elena.r@email.com",
      propertyTitle: "Riad Saʿāda - Traditional Marrakech",
      message: `Hola, estoy interesada en alquilar este riad para mi luna de miel en marzo. ¿Está disponible del 15 al 22 de marzo?`,
      timestamp: "2024-01-14T14:20:00Z",
      status: "replied",
      urgency: "low",
      inquiryType: "rental"
    }
  ];

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high':
        return 'bg-error text-error-foreground';
      case 'medium':
        return 'bg-warning text-warning-foreground';
      case 'low':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'unread':
        return 'Mail';
      case 'replied':
        return 'MailCheck';
      default:
        return 'Mail';
    }
  };

  const getInquiryTypeIcon = (type) => {
    return type === 'sale' ? 'ShoppingCart' : 'Calendar';
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const handleReply = (inquiryId) => {
    console.log('Reply to inquiry:', inquiryId);
    // Mock reply functionality
  };

  const handleMarkAsRead = (inquiryId) => {
    console.log('Mark as read:', inquiryId);
    // Mock mark as read functionality
  };

  return (
    <div className="bg-background border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-heading font-semibold text-text-primary">Recent Inquiries</h2>
          <Button variant="outline" iconName="Filter" iconSize={16}>
            Filter
          </Button>
        </div>
      </div>
      
      <div className="divide-y divide-border max-h-96 overflow-y-auto">
        {inquiries.map((inquiry) => (
          <div
            key={inquiry.id}
            className={`p-4 hover:bg-surface transition-colors duration-200 cursor-pointer ${
              inquiry.status === 'unread' ? 'bg-surface/50' : ''
            }`}
            onClick={() => setSelectedInquiry(selectedInquiry === inquiry.id ? null : inquiry.id)}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {inquiry.senderName.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-text-primary">{inquiry.senderName}</h3>
                  <p className="text-sm text-text-secondary">{inquiry.senderEmail}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(inquiry.urgency)}`}>
                  {inquiry.urgency}
                </span>
                <Icon 
                  name={getStatusIcon(inquiry.status)} 
                  size={16} 
                  className={inquiry.status === 'unread' ? 'text-primary' : 'text-text-secondary'}
                />
              </div>
            </div>
            
            <div className="mb-2">
              <div className="flex items-center space-x-2 text-sm text-text-secondary mb-1">
                <Icon name={getInquiryTypeIcon(inquiry.inquiryType)} size={14} />
                <span className="capitalize">{inquiry.inquiryType}</span>
                <span>•</span>
                <span>{inquiry.propertyTitle}</span>
              </div>
              <p className="text-sm text-text-primary line-clamp-2">
                {inquiry.message}
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-secondary">
                {formatTimestamp(inquiry.timestamp)}
              </span>
              
              {selectedInquiry === inquiry.id && (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReply(inquiry.id);
                    }}
                    iconName="Reply"
                    iconSize={14}
                  >
                    Reply
                  </Button>
                  {inquiry.status === 'unread' && (
                    <Button
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarkAsRead(inquiry.id);
                      }}
                      iconName="MailCheck"
                      iconSize={14}
                    >
                      Mark Read
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-border">
        <Button variant="outline" fullWidth iconName="Mail">
          View All Inquiries
        </Button>
      </div>
    </div>
  );
};

export default InquiryPanel;