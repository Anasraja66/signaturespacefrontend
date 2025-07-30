// app/listing/page.jsx (Moved from app/page.jsx)
"use client" // Keep this directive if you're using React 18 with Server Components (even if client-side rendering)

import { useState, useEffect } from "react"
import { useSearchParams, useNavigate, createSearchParams } from "react-router-dom"
import ListingHeader from "./components/ListingHeader" // Renamed import
import PropertyCard from "./components/PropertyCard"
import MapSection from "./components/MapSection"
import "./globals.css"
import { dummyProperties } from '../utils/dummyData';
import Footer from "../home/components/Footer.jsx"

// Assuming dummyProperties is correctly structured as per our last conversation

export default function ListingPage() {
  const [favorites, setFavorites] = useState([])
  const [location, setLocation] = useState("");
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const cityFilterParam = searchParams.get("city")
  const checkInParam = searchParams.get("checkIn")
  const checkOutParam = searchParams.get("checkOut")
  const adultsParam = parseInt(searchParams.get("adults")) || 1
  const childrenParam = parseInt(searchParams.get("children")) || 0
  const infantsParam = parseInt(searchParams.get("infants")) || 0
  const petsParam = parseInt(searchParams.get("pets")) || 0

  const [appliedFilters, setAppliedFilters] = useState({
    petFriendly: false,
    pool: false,
    wifi: false,
    kitchen: false,
    airConditioning: false,
    tv: false,
    parking: false,
    washingMachine: false,
    balconyPatio: false,
    microwave: false,
    instantBooking: false,
    bookWithHomeToGo: false,
    priceMin: 10,
    priceMax: 1500,
    adults: adultsParam,
    children: childrenParam,
    infants: infantsParam,
    pets: petsParam,
    bedrooms: 0,
    bathrooms: 0,
    accommodationTypes: [],
    reviews: "Any",
    checkIn: checkInParam ? new Date(checkInParam) : null,
    checkOut: checkOutParam ? new Date(checkOutParam) : null,
    city: cityFilterParam || "",
  })

  // Fetch properties from backend
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const city = appliedFilters.city;
    const searchText = searchParams.get("search") || "";
    const checkIn = appliedFilters.checkIn ? appliedFilters.checkIn.toISOString().split("T")[0] : "";
    const checkOut = appliedFilters.checkOut ? appliedFilters.checkOut.toISOString().split("T")[0] : "";
    const guestMales = appliedFilters.adults || 1;
    const guestFemales = 0;
    const guestChildren = appliedFilters.children || 0;

    let url = "";
    if (searchText) {
      url = `http://localhost:8000/api/properties/search-properties/?search_text=${encodeURIComponent(searchText)}&check_in=${checkIn}&check_out=${checkOut}&guest_males=${guestMales}&guest_females=${guestFemales}&guest_children=${guestChildren}`;
    } else if (city) {
      url = `http://localhost:8000/api/properties/by-city/?city_name=${encodeURIComponent(city)}`;
    } else {
      url = "http://localhost:8000/api/properties/";
    }

    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log('API response:', data); // Log API response for debugging
        setProperties(Array.isArray(data) ? data : []); // Always use the response array directly
        setLoading(false);
      })
      .catch(err => {
        console.error('API error:', err); // Log error for debugging
        setLoading(false);
      });
  }, [appliedFilters.city, searchParams]);

  // Effect to sync URL search params with filter state on initial load
  useEffect(() => {
    setAppliedFilters((prev) => ({
      ...prev,
      city: cityFilterParam || "",
      checkIn: checkInParam ? new Date(checkInParam) : null,
      checkOut: checkOutParam ? new Date(checkOutParam) : null,
      adults: adultsParam,
      children: childrenParam,
      infants: infantsParam,
      pets: petsParam,
    }))
  }, [searchParams, cityFilterParam, checkInParam, checkOutParam, adultsParam, childrenParam, infantsParam, petsParam]);

  const toggleFavorite = (propertyId) => {
    setFavorites((prev) => (prev.includes(propertyId) ? prev.filter((id) => id !== propertyId) : [...prev, propertyId]))
  }

  const handleShare = (propertyId) => {
    if (navigator.share) {
      navigator.share({
        title: "Check out this vacation rental",
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  const handleApplyFilters = (filters) => {
    setAppliedFilters(filters)
    // Update URL search params for city (and other filters if needed)
    const params = {};
    if (filters.city) {
      params.city = filters.city;
    }
    // Add other filters to params if you want them reflected in the URL
    navigate({
      search: createSearchParams(params).toString()
    });
  }

  const filterProperties = () => {
    return properties.filter((property) => {
      // Only city/area filter for now (case-insensitive, partial match)
      if (appliedFilters.city && appliedFilters.city.trim() !== "") {
        const cityFilter = appliedFilters.city.trim().toLowerCase();
        const propertyCity = (property.city || "").toLowerCase();
        const propertyArea = (property.area || "").toLowerCase();
        if (
          propertyCity.includes(cityFilter) ||
          propertyArea.includes(cityFilter)
        ) {
          return true;
        } else {
          return false;
        }
      }
      return true;
    })
  }

  const filteredProperties = filterProperties()

  // Use the first filtered property's area/city for the map location
  const mapLocation =
    filteredProperties.length > 0
      ? filteredProperties[0].area || filteredProperties[0].city || ""
      : location;

  return (
    <>
      <div className="app-wrapper">
        <ListingHeader onApplyFilters={handleApplyFilters} initialFilters={appliedFilters} location={location} setLocation={setLocation} />
        <div className="main-content-wrapper static-map-layout">
          <div className="listings-scrollable">
            <div className="listings-section">
              {loading ? (
                <div className="no-results-message">Loading properties...</div>
              ) : filteredProperties.length > 0 ? (
                filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    isFavorite={favorites.includes(property.id)}
                    onToggleFavorite={() => toggleFavorite(property.id)}
                    onShare={() => handleShare(property.id)}
                  />
                ))
              ) : (
                <div className="no-results-message">No properties found matching your filters.</div>
              )}
            </div>
          </div>
          <div className="map-static">
            <MapSection location={mapLocation} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}