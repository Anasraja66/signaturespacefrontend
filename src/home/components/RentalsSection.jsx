// app/home/components/RentalsSection.jsx

import React from "react";
"use client"

import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useScrollAnimation, useStaggeredAnimation } from "../../hooks/useScrollAnimation"
import "../styles/RentalsSection.css"
import "../styles/animations.css"
import { ChevronLeft, ChevronRight, MapPin, Star } from "lucide-react"

const PROPERTIES_PER_LOAD = 8

export default function RentalsSection({ activeRentalTab, setActiveRentalTab }) {
  const [rentalImageIndexes, setRentalImageIndexes] = useState({})
  const [visiblePropertyCount, setVisiblePropertyCount] = useState(PROPERTIES_PER_LOAD)
  const [favoriteRentals, setFavoriteRentals] = useState({})
  const navigate = useNavigate()

  // Animation hooks
  const [titleRef, titleVisible] = useScrollAnimation({ delay: 0 })
  const [tabsRef, tabsVisible] = useScrollAnimation({ delay: 200 })
  const [gridRef, gridVisible, getItemDelay] = useStaggeredAnimation(PROPERTIES_PER_LOAD, {
    staggerDelay: 100,
    threshold: 0.1,
  })
  const [buttonRef, buttonVisible] = useScrollAnimation({ delay: 300 })

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch properties from API
  React.useEffect(() => {
    fetch("http://localhost:8000/api/properties/")
      .then((res) => res.json())
      .then((data) => {
        setProperties(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Show all properties regardless of type
  const currentRentals = useMemo(() => {
    return properties;
  }, [properties]);

  const handleImageNavigation = (propertyId, direction) => {
    setRentalImageIndexes((prev) => {
      const currentIndex = prev[propertyId] || 0
      const property = properties.find((r) => r.id === propertyId)

      if (!property || !property.images || property.images.length === 0) {
        return prev
      }

      const maxIndex = property.images.length - 1

      let newIndex
      if (direction === "next") {
        newIndex = currentIndex < maxIndex ? currentIndex + 1 : currentIndex
      } else {
        newIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex
      }

      return {
        ...prev,
        [propertyId]: newIndex,
      }
    })
  }

  const formatPrice = (price, currency, type) => {
    if (type === "monthly") {
      return `From ${currency} ${price}/month`;
    }
    return `From ${currency} ${price}`;
  }

  const toggleFavorite = (propertyId) => {
    setFavoriteRentals((prev) => ({
      ...prev,
      [propertyId]: !prev[propertyId],
    }))
  }

  const handleShowMore = () => {
    setVisiblePropertyCount((prevCount) => prevCount + PROPERTIES_PER_LOAD)
  }

  const displayedRentals = currentRentals.slice(0, visiblePropertyCount)
  const hasMoreProperties = visiblePropertyCount < currentRentals.length

  return (
    <section className="rentals-section">
      <div className="rentals-container">
        <h2 ref={titleRef} className={`rentals-title animate-title ${titleVisible ? "visible" : ""}`}>
          Our top vacation rentals
        </h2>

        <div ref={tabsRef} className={`rental-tabs animate-tabs ${tabsVisible ? "visible" : ""}`}>
          <button
            className={`rental-tab ${activeRentalTab === "daily" ? "active" : ""}`}
            onClick={() => {
              setActiveRentalTab("daily")
              setVisiblePropertyCount(PROPERTIES_PER_LOAD)
            }}
          >
            Daily Rentals
          </button>
          <button
            className={`rental-tab ${activeRentalTab === "monthly" ? "active" : ""}`}
            onClick={() => {
              setActiveRentalTab("monthly")
              setVisiblePropertyCount(PROPERTIES_PER_LOAD)
            }}
          >
            Monthly Rentals
          </button>
        </div>

        <div ref={gridRef} className="rentals-grid">
          {displayedRentals.length > 0 ? (
            displayedRentals.map((property, index) => {
              // Use first image only
              const imageSrc = property.images && property.images.length > 0
                ? property.images[0]
                : "/placeholder.svg?height=240&width=320&query=property";
              return (
                <div
                  key={property.id}
                  className={`rental-card animate-card ${gridVisible ? "visible" : ""}`}
                  style={{ transitionDelay: `${getItemDelay(index)}ms` }}
                >
                  <div className="rental-image-container">
                    <button
                      className="carousel-btn left"
                      onClick={() => handleImageNavigation(property.id, "prev")}
                      disabled={
                        !property.images ||
                        property.images.length <= 1 ||
                        (rentalImageIndexes[property.id] || 0) === 0
                      }
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <img
                      src={
                        property.images && property.images.length > 0
                          ? property.images[rentalImageIndexes[property.id] || 0]
                          : "/placeholder.svg?height=240&width=320&query=property"
                      }
                      alt={property.title}
                      className="rental-image"
                    />
                    <button
                      className="carousel-btn right"
                      onClick={() => handleImageNavigation(property.id, "next")}
                      disabled={
                        !property.images ||
                        property.images.length <= 1 ||
                        (rentalImageIndexes[property.id] || 0) === property.images.length - 1
                      }
                      aria-label="Next image"
                    >
                      <ChevronRight size={24} />
                    </button>
                    {property.images && property.images.length > 1 && (
                      <div className="carousel-indicator">
                        {(rentalImageIndexes[property.id] || 0) + 1} / {property.images.length}
                      </div>
                    )}
                  </div>
                  <div className="rental-info">
                    <div className="rental-title">{property.title}</div>
                    <div className="rental-type">{property.type} | {property.bedrooms} Bedrooms | {property.bathrooms} Bathrooms</div>
                    <div className="rental-details">
                      <span style={{ color: "#cba135", fontSize: "1.4rem", fontWeight: "bold" }}>{formatPrice(property.price, property.currency || "AED", property.type)}</span>
                    </div>
                    <button
                      className="view-deal-btn"
                      onClick={() => navigate("/property-details", { state: { property } })}
                    >
                      View deal
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-rentals-message">No rentals available for this category yet.</div>
          )}
        </div>

        {hasMoreProperties && (
          <button
            ref={buttonRef}
            className={`show-more-btn animate-button ${buttonVisible ? "visible" : ""}`}
            onClick={handleShowMore}
          >
            Show more
          </button>
        )}
      </div>
    </section>
  );
}