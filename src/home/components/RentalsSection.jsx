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
      return `From ${currency} ${price}/month`
    }
    return `From ${currency} ${price}`
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
                  style={{ transitionDelay: `${getItemDelay(index)}ms`, minWidth: 280, maxWidth: 320, margin: "0 12px", borderRadius: 16, boxShadow: "0 2px 12px #0001", background: "#fff" }}
                >
                  <div className="rental-image-container" style={{ position: "relative", borderRadius: 12, overflow: "hidden" }}>
                    <img
                      src={imageSrc}
                      alt={property.title}
                      style={{ width: "100%", height: "180px", objectFit: "cover" }}
                    />
                  </div>
                  <div className="rental-info" style={{ padding: "16px" }}>
                    <div style={{ fontWeight: "bold", fontSize: "1.1rem", marginBottom: 4 }}>{property.title}</div>
                    <div style={{ color: "#888", fontSize: "0.95rem", marginBottom: 8 }}>{property.type}</div>
                    <div style={{ display: "flex", gap: 12, marginBottom: 8 }}>
                      <span>💰 {formatPrice(property.price, property.currency || "PKR", property.type)}</span>
                      <span>🛏 {property.bedrooms} BR</span>
                      <span>🛁 {property.bathrooms} Bath</span>
                    </div>
                    <button
                      className="view-deal-btn"
                      style={{ background: "#cba135", color: "#fff", borderRadius: 8, padding: "8px 16px", fontWeight: 500, marginTop: 8 }}
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
  )
}
