import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import PropertyListingsBrowse from "pages/property-listings-browse";
import PropertyDetailView from "pages/property-detail-view";
import HostDashboard from "pages/host-dashboard";
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
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;