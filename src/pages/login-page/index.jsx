import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


import Icon from '../../components/AppIcon';
import LoginForm from './components/LoginForm';
import SocialLogin from './components/SocialLogin';
import ForgotPasswordModal from './components/ForgotPasswordModal';

const LoginPage = () => {
  const navigate = useNavigate();
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (credentials) => {
    setIsLoading(true);
    setError('');
    
    try {
      // Mock authentication - in real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock success - redirect to dashboard or intended destination
      navigate('/host-dashboard');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
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
      setError(`Failed to sign in with ${provider}. Please try again.`);
    } finally {
      setIsLoading(false);
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

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md space-y-6">
          {/* Welcome Section */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Icon name="Building2" size={32} className="text-primary" />
            </div>
            <h1 className="text-2xl font-heading font-bold text-text-primary">
              Welcome Back
            </h1>
            <p className="text-text-secondary font-body">
              Sign in to access your HomeFinder account and manage your Moroccan properties
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-error/10 border border-error/20 rounded-lg p-3 flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error flex-shrink-0" />
              <p className="text-sm text-error">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <LoginForm 
            onSubmit={handleLogin}
            isLoading={isLoading}
            onForgotPassword={() => setShowForgotPassword(true)}
          />

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-text-secondary">or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <SocialLogin 
            onSocialLogin={handleSocialLogin}
            isLoading={isLoading}
          />

          {/* Register Link */}
          <div className="text-center">
            <p className="text-text-secondary">
              Don't have an account?{' '}
              <Link 
                to="/register-page" 
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <ForgotPasswordModal 
          onClose={() => setShowForgotPassword(false)}
        />
      )}
    </div>
  );
};

export default LoginPage;