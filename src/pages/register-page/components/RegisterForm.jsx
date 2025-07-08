import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const RegisterForm = ({ 
  userType, 
  formData, 
  setFormData, 
  onSubmit, 
  isLoading, 
  onShowTerms 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+212[0-9]{9}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid Moroccan phone number (+212XXXXXXXXX)';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }

    // Property owner specific validations
    if (userType === 'owner') {
      if (!formData.businessName.trim()) {
        newErrors.businessName = 'Business name is required';
      }
      
      if (!formData.propertyCount) {
        newErrors.propertyCount = 'Please select property count';
      }
      
      if (!formData.experience) {
        newErrors.experience = 'Please select experience level';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Calculate password strength
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-error';
    if (passwordStrength <= 3) return 'bg-warning';
    return 'bg-success';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength <= 3) return 'Medium';
    return 'Strong';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name Fields */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label htmlFor="firstName" className="block text-sm font-medium text-text-primary">
            First Name
          </label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First name"
            className={errors.firstName ? 'border-error focus:border-error focus:ring-error' : ''}
            disabled={isLoading}
          />
          {errors.firstName && (
            <p className="text-xs text-error">{errors.firstName}</p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="lastName" className="block text-sm font-medium text-text-primary">
            Last Name
          </label>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last name"
            className={errors.lastName ? 'border-error focus:border-error focus:ring-error' : ''}
            disabled={isLoading}
          />
          {errors.lastName && (
            <p className="text-xs text-error">{errors.lastName}</p>
          )}
        </div>
      </div>

      {/* Email Field */}
      <div className="space-y-1">
        <label htmlFor="email" className="block text-sm font-medium text-text-primary">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="Mail" size={16} className="text-text-secondary" />
          </div>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={`pl-10 ${errors.email ? 'border-error focus:border-error focus:ring-error' : ''}`}
            disabled={isLoading}
          />
        </div>
        {errors.email && (
          <p className="text-xs text-error">{errors.email}</p>
        )}
      </div>

      {/* Phone Field */}
      <div className="space-y-1">
        <label htmlFor="phone" className="block text-sm font-medium text-text-primary">
          Phone Number
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="Phone" size={16} className="text-text-secondary" />
          </div>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+212600123456"
            className={`pl-10 ${errors.phone ? 'border-error focus:border-error focus:ring-error' : ''}`}
            disabled={isLoading}
          />
        </div>
        {errors.phone && (
          <p className="text-xs text-error">{errors.phone}</p>
        )}
      </div>

      {/* Property Owner Specific Fields */}
      {userType === 'owner' && (
        <>
          <div className="space-y-1">
            <label htmlFor="businessName" className="block text-sm font-medium text-text-primary">
              Business Name
            </label>
            <Input
              id="businessName"
              name="businessName"
              type="text"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="Your real estate business name"
              className={errors.businessName ? 'border-error focus:border-error focus:ring-error' : ''}
              disabled={isLoading}
            />
            {errors.businessName && (
              <p className="text-xs text-error">{errors.businessName}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label htmlFor="propertyCount" className="block text-sm font-medium text-text-primary">
                Properties
              </label>
              <select
                id="propertyCount"
                name="propertyCount"
                value={formData.propertyCount}
                onChange={handleChange}
                className={`w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${errors.propertyCount ? 'border-error focus:border-error focus:ring-error' : ''}`}
                disabled={isLoading}
              >
                <option value="">Select</option>
                <option value="1">1 property</option>
                <option value="2-5">2-5 properties</option>
                <option value="6-10">6-10 properties</option>
                <option value="10+">10+ properties</option>
              </select>
              {errors.propertyCount && (
                <p className="text-xs text-error">{errors.propertyCount}</p>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="experience" className="block text-sm font-medium text-text-primary">
                Experience
              </label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className={`w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${errors.experience ? 'border-error focus:border-error focus:ring-error' : ''}`}
                disabled={isLoading}
              >
                <option value="">Select</option>
                <option value="new">New to real estate</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5+">5+ years</option>
              </select>
              {errors.experience && (
                <p className="text-xs text-error">{errors.experience}</p>
              )}
            </div>
          </div>
        </>
      )}

      {/* Password Field */}
      <div className="space-y-1">
        <label htmlFor="password" className="block text-sm font-medium text-text-primary">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="Lock" size={16} className="text-text-secondary" />
          </div>
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a strong password"
            className={`pl-10 pr-10 ${errors.password ? 'border-error focus:border-error focus:ring-error' : ''}`}
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary hover:text-text-primary transition-colors"
            disabled={isLoading}
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} />
          </button>
        </div>
        
        {/* Password Strength Indicator */}
        {formData.password && (
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-muted rounded-full h-1">
                <div 
                  className={`h-1 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                  style={{ width: `${(passwordStrength / 5) * 100}%` }}
                ></div>
              </div>
              <span className={`text-xs font-medium ${
                passwordStrength <= 2 ? 'text-error' : 
                passwordStrength <= 3 ? 'text-warning' : 'text-success'
              }`}>
                {getPasswordStrengthText()}
              </span>
            </div>
          </div>
        )}
        
        {errors.password && (
          <p className="text-xs text-error">{errors.password}</p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div className="space-y-1">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary">
          Confirm Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="Lock" size={16} className="text-text-secondary" />
          </div>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-error focus:border-error focus:ring-error' : ''}`}
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary hover:text-text-primary transition-colors"
            disabled={isLoading}
          >
            <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={16} />
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-xs text-error">{errors.confirmPassword}</p>
        )}
      </div>

      {/* Terms and Conditions */}
      <div className="space-y-2">
        <div className="flex items-start space-x-2">
          <Input
            id="acceptTerms"
            name="acceptTerms"
            type="checkbox"
            checked={formData.acceptTerms}
            onChange={handleChange}
            className={`mt-0.5 ${errors.acceptTerms ? 'border-error' : ''}`}
            disabled={isLoading}
          />
          <div className="flex-1">
            <label htmlFor="acceptTerms" className="text-sm text-text-secondary">
              I agree to the{' '}
              <button
                type="button"
                onClick={onShowTerms}
                className="text-primary hover:text-primary/80 underline"
              >
                Terms of Service
              </button>
              {' '}and{' '}
              <button
                type="button"
                onClick={onShowTerms}
                className="text-primary hover:text-primary/80 underline"
              >
                Privacy Policy
              </button>
            </label>
          </div>
        </div>
        {errors.acceptTerms && (
          <p className="text-xs text-error">{errors.acceptTerms}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        className="mt-6"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>

      {/* Email Verification Notice */}
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
        <div className="flex items-start space-x-2">
          <Icon name="Mail" size={16} className="text-accent flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="text-accent-foreground font-medium">Email Verification Required</p>
            <p className="text-accent-foreground/80">
              We'll send you a verification email to confirm your account after registration.
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;