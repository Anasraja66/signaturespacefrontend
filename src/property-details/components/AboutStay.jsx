// app/property-details/components/AboutStay.jsx
"use client"

import { useState } from "react"

export default function AboutStay({ description }) {
  const [showFullDescription, setShowFullDescription] = useState(false)

  const displayedDescription = showFullDescription ? description : `${description.substring(0, 300)}...` // Show first 300 chars

  return (
    <div className="card about-stay-section">
      <h2>All about this stay</h2>
      <p className="text-sm text-gray-500 mb-4">Information about the housing unit</p>
      <div className="about-stay-content">
        <p>{displayedDescription}</p>
        {description.length > 300 && (
          <button onClick={() => setShowFullDescription(!showFullDescription)} className="show-more-btn">
            {showFullDescription ? "Show less" : "Show more"}
          </button>
        )}
      </div>
    </div>
  )
}
