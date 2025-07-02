import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary"; 

import PropertyListingsBrowse from "pages/property-listings-browse";
import PropertyDetailView from "pages/property-detail-view";
import HostDashboard from "pages/host-dashboard";
import LoginPage from "pages/login-page";
import RegisterPage from "pages/register-page";
import FavoritesPage from "pages/favorites-page";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<PropertyListingsBrowse />} />
        <Route path="/property-listings-browse" element={<PropertyListingsBrowse />} />
        <Route path="/property-detail-view" element={<PropertyDetailView />} />
        <Route path="/host-dashboard" element={<HostDashboard />} />
        <Route path="/login-page" element={<LoginPage />} />
        <Route path="/register-page" element={<RegisterPage />} />
        <Route path="/favorites-page" element={<FavoritesPage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;