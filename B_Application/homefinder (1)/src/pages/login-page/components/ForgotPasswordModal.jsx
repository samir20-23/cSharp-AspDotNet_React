import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const ForgotPasswordModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Mock API call for password reset
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSuccess(true);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      // Reset success message can be shown here
    } catch (err) {
      setError('Failed to resend email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-lg shadow-warm-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-heading font-bold text-text-primary">
              Reset Password
            </h2>
            <button
              onClick={onClose}
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {!isSuccess ? (
            <>
              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <p className="text-text-secondary text-sm">
                    Enter your email address and we'll send you a link to reset your password.
                  </p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-error/10 border border-error/20 rounded-lg p-3 flex items-center space-x-2">
                    <Icon name="AlertCircle" size={16} className="text-error flex-shrink-0" />
                    <p className="text-sm text-error">{error}</p>
                  </div>
                )}

                {/* Email Field */}
                <div className="space-y-1">
                  <label htmlFor="reset-email" className="block text-sm font-medium text-text-primary">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Icon name="Mail" size={16} className="text-text-secondary" />
                    </div>
                    <Input
                      id="reset-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError('');
                      }}
                      placeholder="Enter your email"
                      className="pl-10"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex space-x-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    disabled={isLoading}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    loading={isLoading}
                    disabled={isLoading || !email}
                    className="flex-1"
                  >
                    {isLoading ? 'Sending...' : 'Send Reset Link'}
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                  <Icon name="CheckCircle" size={32} className="text-success" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-heading font-semibold text-text-primary">
                    Check Your Email
                  </h3>
                  <p className="text-text-secondary text-sm">
                    We've sent a password reset link to <strong>{email}</strong>
                  </p>
                  <p className="text-text-secondary text-sm">
                    Click the link in the email to reset your password. If you don't see it, check your spam folder.
                  </p>
                </div>

                <div className="space-y-3">
                  <Button
                    variant="primary"
                    onClick={onClose}
                    fullWidth
                  >
                    Got it
                  </Button>
                  
                  <button
                    onClick={handleResend}
                    disabled={isLoading}
                    className="text-sm text-primary hover:text-primary/80 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? 'Resending...' : 'Resend email'}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;