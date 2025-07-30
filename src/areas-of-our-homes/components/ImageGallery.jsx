"use client"

import { useState } from "react"

export default function ImageGallery({ images, onExpand }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="property-images">
      <div className="main-image">
        <img src={images[currentImageIndex] || "/placeholder.svg"} alt="Property view" />
        <button className="expand-btn" onClick={onExpand}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M2 2L6 6M2 2V6M2 2H6M14 14L10 10M14 14V10M14 14H10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {images.length > 1 && (
          <>
            <button className="nav-btn prev-btn" onClick={prevImage}>
              ‹
            </button>
            <button className="nav-btn next-btn" onClick={nextImage}>
              ›
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="thumbnail-grid">
          {images.slice(1, 4).map((image, index) => (
            <img
              key={index}
              src={image || "/placeholder.svg"}
              alt={`Property view ${index + 2}`}
              onClick={() => setCurrentImageIndex(index + 1)}
              className="thumbnail"
            />
          ))}
          {images.length > 4 && (
            <div className="more-photos" onClick={onExpand}>
              <span>+{images.length - 4}</span>
            </div>
          )}
        </div>
      )}

      {images.length > 1 && (
        <div className="image-dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentImageIndex ? "active" : ""}`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
