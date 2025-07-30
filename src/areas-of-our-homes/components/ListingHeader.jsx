// app/listing/components/ListingHeader.jsx (Renamed from app/components/Header.jsx)
"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import FilterPopup from "./FilterPopup" // Import the new FilterPopup component
import ListingSearchBar from "./ListingSearchBar" // Import the new ListingSearchBar
import "../styles/header.css" // Import the new header specific styles
import logoImg from "../../assets/logo.png"

const destinations = [
  {
    id: "nearby",
    name: "Nearby",
    description: "Find what's around you",
    icon: "navigation",
  },
  {
    id: "dubai",
    name: "Dubai",
    description: "City of gold and luxury",
    icon: "building",
  },
  {
    id: "dubai-marina",
    name: "Dubai Marina",
    description: "Waterfront living and dining",
    icon: "anchor",
  },
  {
    id: "jumeirah-village-circle",
    name: "Jumeirah Village Circle",
    description: "Family-friendly community",
    icon: "home",
  },
  {
    id: "downtown",
    name: "Downtown",
    description: "Heart of Dubai with Burj Khalifa",
    icon: "building-2",
  },
  {
    id: "business-bay",
    name: "Business Bay",
    description: "Modern business district",
    icon: "briefcase",
  },
  {
    id: "jumeirah-beach-residence",
    name: "Jumeirah Beach Residence",
    description: "Beachfront luxury living",
    icon: "waves",
  },
  {
    id: "damac-hills-2",
    name: "DAMAC Hills 2",
    description: "Premium residential community",
    icon: "mountain",
  },
  {
    id: "barsha-heights",
    name: "Barsha Heights",
    description: "High-rise living experience",
    icon: "building-2",
  },
  {
    id: "town-square",
    name: "Town Square",
    description: "Community living with parks",
    icon: "trees",
  },
  {
    id: "jumeirah-lake-towers",
    name: "Jumeirah Lake Towers",
    description: "Lakeside towers and dining",
    icon: "building",
  },
]

export default function ListingHeader({ onApplyFilters, initialFilters, location, setLocation }) {
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const renderIcon = (iconName, size = 20) => {
    const iconProps = {
      width: String(size),
      height: String(size),
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    }

    switch (iconName) {
      case "filter":
        return (
          <svg {...iconProps}>
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
        )
      case "menu":
        return (
          <svg {...iconProps}>
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="4" y1="18" x2="20" y2="18"></line>
          </svg>
        )
      case "close":
        return (
          <svg {...iconProps}>
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        )
      default:
        return (
          <svg {...iconProps}>
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        )
    }
  }

  return (
    <header className="main-header">
      <div className="header-main-row">
        <div className="logo">
          <a href="/">
            <img src={logoImg} alt="Logo" />
          </a>
        </div>
        <div className="header-search-bar-wrapper">
          <ListingSearchBar location={location} setLocation={setLocation} />
        </div>
        <div className="header-actions">
          <button className="filter-button" onClick={() => setIsFilterPopupOpen(true)}>
            {renderIcon("filter", 16)}
            <span>Filters</span>
          </button>
          <button className="hamburger-menu" onClick={() => setIsMobileMenuOpen(true)}>
            {renderIcon("menu", 24)}
          </button>
        </div>
      </div>

      {/* Filter Popup */}
      {isFilterPopupOpen && (
        <FilterPopup
          onClose={() => setIsFilterPopupOpen(false)}
          onApplyFilters={onApplyFilters}
          initialFilters={initialFilters}
        />
      )}

      {/* Mobile Menu Overlay */}
      <div className={`mobile-nav ${isMobileMenuOpen ? "active" : ""}`}>
        <div className="mobile-nav-header">
          <a href="#" className="logo">
            <div className="logo-icon">
              <img src={logoImg} alt="Logo" />
            </div>
          </a>
          <button className="close-mobile-menu" onClick={() => setIsMobileMenuOpen(false)}>
            {renderIcon("close", 24)}
          </button>
        </div>
        <ul>
          <li>
            <a href="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </a>
          </li>
          <li>
            <Link to="/rentals/monthly" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Monthly Properties
            </Link>
          </li>
          <li>
            <Link to="/rentals/daily" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Daily Properties
            </Link>
          </li>
          <li>
            <a href="#" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              List Property (Owner)
            </a>
          </li>
          <li>
            <a href="#" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Blog
            </a>
          </li>
          <li>
            <a
              onClick={() => setIsMobileMenuOpen(false)}
              className="nav-link mobile-login-link"
            >
              Log in
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}