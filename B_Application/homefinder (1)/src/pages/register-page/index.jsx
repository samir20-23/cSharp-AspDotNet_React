import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Icon from '../../components/AppIcon';
import UserTypeSelection from './components/UserTypeSelection';
import RegisterForm from './components/RegisterForm';
import SocialLogin from '../login-page/components/SocialLogin';
import TermsModal from './components/TermsModal';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showTerms, setShowTerms] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    businessName: '',
    propertyCount: '',
    experience: ''
  });

  const handleUserTypeSelect = (type) => {
    setUserType(type);
    setCurrentStep(2);
  };

  const handleRegister = async (data) => {
    setIsLoading(true);
    setError('');
    
    try {
      // Mock registration - in real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock success - redirect to dashboard or welcome page
      navigate('/host-dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    setError('');
    
    try {
      // Mock social authentication
      await new Promise(resolve => setTimeout(resolve, 800));
      navigate('/host-dashboard');
    } catch (err) {
      setError(`Failed to sign up with ${provider}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Icon name="Home" size={24} className="text-primary" />
            <span className="text-xl font-heading font-bold text-primary">HomeFinder</span>
          </Link>
          <Link to="/" className="text-text-secondary hover:text-primary transition-colors">
            <Icon name="X" size={20} />
          </Link>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              1
            </div>
            <div className={`flex-1 h-1 rounded ${
              currentStep >= 2 ? 'bg-primary' : 'bg-muted'
            }`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              2
            </div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-text-secondary">
            <span>User Type</span>
            <span>Account Details</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md space-y-6">
          {currentStep === 1 && (
            <>
              {/* Step 1: User Type Selection */}
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Icon name="UserPlus" size={32} className="text-primary" />
                </div>
                <h1 className="text-2xl font-heading font-bold text-text-primary">
                  Join HomeFinder
                </h1>
                <p className="text-text-secondary font-body">
                  Choose how you'd like to use our Moroccan real estate platform
                </p>
              </div>

              <UserTypeSelection onSelect={handleUserTypeSelect} />

              {/* Social Login */}
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-background text-text-secondary">or sign up with</span>
                  </div>
                </div>

                <SocialLogin 
                  onSocialLogin={handleSocialLogin}
                  isLoading={isLoading}
                />
              </div>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-text-secondary">
                  Already have an account?{' '}
                  <Link 
                    to="/login-page" 
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              {/* Step 2: Registration Form */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleBack}
                  className="p-2 text-text-secondary hover:text-text-primary transition-colors"
                >
                  <Icon name="ArrowLeft" size={20} />
                </button>
                <div>
                  <h1 className="text-xl font-heading font-bold text-text-primary">
                    Complete Registration
                  </h1>
                  <p className="text-sm text-text-secondary">
                    {userType === 'owner' ? 'Property Owner Account' : 'Buyer Account'}
                  </p>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-error/10 border border-error/20 rounded-lg p-3 flex items-center space-x-2">
                  <Icon name="AlertCircle" size={16} className="text-error flex-shrink-0" />
                  <p className="text-sm text-error">{error}</p>
                </div>
              )}

              <RegisterForm
                userType={userType}
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleRegister}
                isLoading={isLoading}
                onShowTerms={() => setShowTerms(true)}
              />
            </>
          )}
        </div>
      </div>

      {/* Terms Modal */}
      {showTerms && (
        <TermsModal onClose={() => setShowTerms(false)} />
      )}
    </div>
  );
};

export default RegisterPage;