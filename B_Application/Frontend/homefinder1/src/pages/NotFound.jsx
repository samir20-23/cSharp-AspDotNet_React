import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
<div class="min-h-screen flex flex-col items-center justify-center bg-background p-4">
  <div class="text-center max-w-md">
    <div class="flex justify-center mb-6">
      <div class="relative">
        <h1 class="text-9xl font-bold text-primary opacity-20">404</h1>
      </div>
    </div>

    <h2 class="text-2xl font-medium text-onBackground mb-2">Page Not Found</h2>
    <p class="text-onBackground/70 mb-8">
      The page you're looking for doesn't exist. Let's get you back!
    </p>

    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <!-- Back Button -->
      <button class="btn btn-primary flex items-center gap-2">
        <!-- Replace with real icon if needed -->
        <span class="icon-arrow-left"></span>
        Go Back
      </button>

      <!-- Home Button -->
      <button class="btn btn-outline flex items-center gap-2">
        <!-- Replace with real icon if needed -->
        <span class="icon-home"></span>
        Back to Home
      </button>
    </div>
  </div>
</div>

  );
};

export default NotFound;
