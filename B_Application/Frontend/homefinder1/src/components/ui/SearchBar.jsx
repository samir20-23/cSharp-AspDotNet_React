import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../AppIcon";
import Input from "./Input";

const SearchBar = ({ isMobile = false }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Mock suggestions data
  const mockSuggestions = [
    // locations
    { type: "location", value: "Casablanca", count: 320 },
    { type: "location", value: "Rabat", count: 275 },
    { type: "location", value: "Marrakech", count: 260 },
    { type: "location", value: "Fez", count: 220 },
    { type: "location", value: "Tangier", count: 200 },
    { type: "location", value: "Agadir", count: 180 },
    { type: "location", value: "Meknes", count: 160 },
    { type: "location", value: "Oujda", count: 140 },
    { type: "location", value: "Kenitra", count: 130 },
    { type: "location", value: "Tetouan", count: 120 },
    { type: "location", value: "Safi", count: 110 },
    { type: "location", value: "El Jadida", count: 100 },
    { type: "location", value: "Ouarzazate", count: 90 },
    { type: "location", value: "Chefchaouen", count: 85 },
    { type: "location", value: "Nador", count: 80 },
    { type: "location", value: "Dakhla", count: 75 },
    { type: "location", value: "Laayoune", count: 70 },
    { type: "location", value: "Settat", count: 65 },
    { type: "location", value: "Beni Mellal", count: 60 },
    { type: "location", value: "Khouribga", count: 55 },

    // property types
    { type: "property", value: "Riad", count: 310 },
    { type: "property", value: "Villa", count: 280 },
    { type: "property", value: "Apartment", count: 340 },
    { type: "property", value: "Traditional House", count: 150 },
    { type: "property", value: "Dar", count: 90 },
    { type: "property", value: "Kasbah", count: 80 },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
        if (isMobile) {
          setIsExpanded(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = mockSuggestions.filter((item) =>
        item.value.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 6));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(
        `/property-listings-browse?search=${encodeURIComponent(
          searchQuery.trim()
        )}`
      );
      setShowSuggestions(false);
      if (isMobile) {
        setIsExpanded(false);
      }
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.value);
    navigate(
      `/property-listings-browse?search=${encodeURIComponent(suggestion.value)}`
    );
    setShowSuggestions(false);
    if (isMobile) {
      setIsExpanded(false);
    }
  };

  const handleFocus = () => {
    if (isMobile) {
      setIsExpanded(true);
    }
    if (searchQuery.length > 0) {
      setShowSuggestions(true);
    }
  };

  const getSuggestionIcon = (type) => {
    return type === "location" ? "MapPin" : "Building";
  };

  if (isMobile) {
    return (
      <div className="relative" ref={searchRef}>
        <button
          onClick={() => setIsExpanded(true)}
          className="p-2 rounded-lg hover:bg-surface transition-colors duration-200"
        >
          <Icon name="Search" size={20} className="text-text-secondary" />
        </button>

        {isExpanded && (
          <div className="fixed inset-0 bg-background z-50 flex flex-col">
            <div className="flex items-center p-4 border-b border-border">
              <button
                onClick={() => setIsExpanded(false)}
                className="p-2 mr-2 rounded-lg hover:bg-surface transition-colors duration-200"
              >
                <Icon
                  name="ArrowLeft"
                  size={20}
                  className="text-text-secondary"
                />
              </button>

              <form onSubmit={handleSearchSubmit} className="flex-1">
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search properties, locations..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-4"
                    autoFocus
                  />
                  <Icon
                    name="Search"
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
                  />
                </div>
              </form>
            </div>

            {showSuggestions && suggestions.length > 0 && (
              <div className="flex-1 overflow-y-auto">
                <div className="p-4">
                  <h3 className="text-sm font-medium text-text-secondary mb-3">
                    Suggestions
                  </h3>
                  <div className="space-y-2">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="flex items-center justify-between w-full p-3 text-left hover:bg-surface rounded-lg transition-colors duration-200"
                      >
                        <div className="flex items-center space-x-3">
                          <Icon
                            name={getSuggestionIcon(suggestion.type)}
                            size={18}
                            className="text-text-secondary"
                          />
                          <span className="text-text-primary">
                            {suggestion.value}
                          </span>
                        </div>
                        <span className="text-sm text-text-secondary">
                          {suggestion.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative" ref={searchRef}>
      <form onSubmit={handleSearchSubmit}>
        <div className="relative">
          <Input
            type="search"
            placeholder="Search properties, locations..."
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={handleFocus}
            className="w-64 pl-10 pr-4"
          />
          <Icon
            name="Search"
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
          />
        </div>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-warm-lg z-60 animate-slide-down">
          <div className="p-2">
            <div className="text-xs font-medium text-text-secondary px-3 py-2">
              Suggestions
            </div>
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="flex items-center justify-between w-full px-3 py-2 text-left hover:bg-surface rounded-lg transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  <Icon
                    name={getSuggestionIcon(suggestion.type)}
                    size={16}
                    className="text-text-secondary"
                  />
                  <span className="text-sm text-text-primary">
                    {suggestion.value}
                  </span>
                </div>
                <span className="text-xs text-text-secondary">
                  {suggestion.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
