"use client"


import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/property-card.css"
import { Bath } from 'lucide-react';
import { FaBath, FaBed, FaUserFriends } from 'react-icons/fa';

export default function PropertyCard({ property, isFavorite, onToggleFavorite, onShare }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const navigate = useNavigate()

  // Fallback for images
  const images = property.images && property.images.length > 0 ? property.images : ["/placeholder.svg?height=300&width=400"];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleViewDeal = () => {
    navigate("/property-details", { state: { property } })
  }

  const handleExpand = () => {
    alert("Opening full gallery view")
  }


  return (
    <div className="property-card-horizontal">
      {/* Image Section */}
      <div className="property-image-section">
        <img
          src={images[currentImageIndex]}
          alt={property.title || property.name || "Property view"}
          className="main-property-image"
          onError={e => { e.target.src = "/placeholder.svg?height=300&width=400" }}
        />
        {images.length > 1 && (
          <>
            <button className="image-nav-btn prev-btn" onClick={prevImage}>‹</button>
            <button className="image-nav-btn next-btn" onClick={nextImage}>›</button>
          </>
        )}
        <button className="expand-btn-horizontal" onClick={handleExpand}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 2L6 6M2 2V6M2 2H6M14 14L10 10M14 14V10M14 14H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {images.length > 1 && (
          <div className="image-dots-horizontal">
            {images.map((_, index) => (
              <span
                key={index}
                className={`dot-horizontal ${index === currentImageIndex ? "active" : ""}`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="property-content-section">
        <div className="property-header-horizontal">
          <div className="property-actions-horizontal">
            <button className="action-btn-horizontal share-btn" onClick={onShare}>
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L8 11M8 1L4 5M8 1L12 5M3 11V13C3 14.1046 3.89543 15 5 15H11C12.1046 15 13 14.1046 13 13V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button className={`action-btn-horizontal favorite-btn ${isFavorite ? "favorited" : ""}`} onClick={onToggleFavorite}>
              <svg width="20" height="20" viewBox="0 0 16 16" fill={isFavorite ? "currentColor" : "none"}>
                <path d="M8 14L7.05 13.15C3.4 9.86 1 7.74 1 5.25C1 3.42 2.42 2 4.25 2C5.27 2 6.27 2.49 7 3.24C7.73 2.49 8.73 2 9.75 2C11.58 2 13 3.42 13 5.25C13 7.74 10.6 9.86 6.95 13.15L8 14Z" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        </div>
        <div className="property-info-horizontal">
          <h2 className="property-name-horizontal" >{property.name || property.title}</h2>
          <p className="property-location-horizontal">
            {typeof property.location === "string"
              ? property.location
              : property.city || property.area || ""}
          </p>
        </div>
        <div className="property-meta-horizontal">
          <span><FaBed /> {property.bedrooms || 0} </span>
          <span><FaBath /> {property.bathrooms || 0} </span>
          <span><FaUserFriends /> {property.guests || 0}</span>
        </div>
        {property.rating && (
          <div className="rating-horizontal">
            <span className="star">⭐</span>
            <span className="rating-score">{property.rating}</span>
            <span className="rating-count">({property.reviewCount || property.reviewsCount || 0} reviews)</span>
          </div>
        )}
        <div className="pricing-section-horizontal">
          <div className="price-info-horizontal">
            <span className="price-from-horizontal">from</span>
            <span className="price-horizontal">{property.currency ? property.currency + ' ' : ''}{property.price}</span>
            <span className="price-period-horizontal">per night, incl. fees</span>
          </div>
        </div>
        {property.agent && (
          <div className="agent-info-horizontal">
            <span>Agent: {property.agent.name}</span>
            {property.agent.phone && <span> | {property.agent.phone}</span>}
          </div>
        )}
        <button className="view-deal-btn-horizontal" onClick={handleViewDeal}>
          View deal
        </button>
      </div>
    </div>
  )
}
