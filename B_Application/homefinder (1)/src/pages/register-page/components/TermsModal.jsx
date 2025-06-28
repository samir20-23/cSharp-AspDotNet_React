import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TermsModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-lg shadow-warm-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-heading font-bold text-text-primary">
              Terms of Service & Privacy Policy
            </h2>
            <button
              onClick={onClose}
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              <Icon name="X" size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-6 text-sm text-text-secondary">
            {/* Terms of Service */}
            <div className="space-y-4">
              <h3 className="text-lg font-heading font-semibold text-text-primary">
                Terms of Service
              </h3>
              
              <div className="space-y-3">
                <p>
                  Welcome to HomeFinder, a platform dedicated to connecting property owners and buyers 
                  in Morocco. By using our service, you agree to the following terms:
                </p>

                <div className="space-y-2">
                  <h4 className="font-medium text-text-primary">1. Platform Usage</h4>
                  <p>
                    HomeFinder is designed for legitimate real estate transactions in Morocco. 
                    Users must provide accurate information about properties and maintain 
                    professional conduct in all interactions.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-text-primary">2. Property Listings</h4>
                  <p>
                    Property owners are responsible for the accuracy of their listings, 
                    including property details, pricing, and availability. Misleading 
                    information may result in account suspension.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-text-primary">3. User Conduct</h4>
                  <p>
                    Users must respect Moroccan laws and cultural values. Harassment, 
                    discrimination, or fraudulent activity is strictly prohibited.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-text-primary">4. Fees and Payments</h4>
                  <p>
                    HomeFinder may charge fees for premium features. All transactions 
                    between buyers and sellers are conducted independently of our platform.
                  </p>
                </div>
              </div>
            </div>

            {/* Privacy Policy */}
            <div className="space-y-4 border-t border-border pt-6">
              <h3 className="text-lg font-heading font-semibold text-text-primary">
                Privacy Policy
              </h3>
              
              <div className="space-y-3">
                <p>
                  Your privacy is important to us. This policy explains how we collect, 
                  use, and protect your personal information.
                </p>

                <div className="space-y-2">
                  <h4 className="font-medium text-text-primary">Information We Collect</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Account information (name, email, phone number)</li>
                    <li>Property details and photos for listings</li>
                    <li>Usage data and platform interactions</li>
                    <li>Communication records for support purposes</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-text-primary">How We Use Your Information</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Facilitate property listings and searches</li>
                    <li>Enable communication between users</li>
                    <li>Improve our platform and services</li>
                    <li>Send important updates and notifications</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-text-primary">Data Protection</h4>
                  <p>
                    We implement industry-standard security measures to protect your data. 
                    Your information is never sold to third parties, and we comply with 
                    applicable data protection regulations.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-text-primary">Your Rights</h4>
                  <p>
                    You have the right to access, update, or delete your personal information. 
                    Contact our support team for any privacy-related requests.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-3 border-t border-border pt-6">
              <h4 className="font-medium text-text-primary">Contact Us</h4>
              <p>
                For questions about these terms or our privacy practices, please contact us at:
              </p>
              <div className="bg-surface rounded-lg p-4">
                <div className="space-y-2 text-xs">
                  <p><strong>Email:</strong> legal@homefinder.ma</p>
                  <p><strong>Phone:</strong> +212 5XX-XXXXXX</p>
                  <p><strong>Address:</strong> Casablanca, Morocco</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end pt-6 border-t border-border">
            <Button
              variant="primary"
              onClick={onClose}
            >
              I Understand
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;