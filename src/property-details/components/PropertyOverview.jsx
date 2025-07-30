// app/property-details/components/PropertyOverview.jsx
"use client"

import { useState, useEffect } from "react"
// No need to import renderIcon if you're not using it
// import { renderIcon } from "../utils"

export default function PropertyOverview({ property }) {
  const [showAllAmenities, setShowAllAmenities] = useState(false)

  // Debugging logs (you can remove these once it's working as expected)
  useEffect(() => {
    console.log("PropertyOverview: property prop received:", property);
    if (property && property.included) {
      console.log("PropertyOverview: property.included:", property.included);
      console.log("PropertyOverview: is property.included an array?", Array.isArray(property.included));
      if (Array.isArray(property.included)) {
        property.included.forEach((item, index) => {
          console.log(`PropertyOverview: included item ${index}:`, item);
          console.log(`PropertyOverview: item.text: ${item.text}`); // Only logging text now
        });
      }
    } else {
      console.log("PropertyOverview: property or property.included is missing/null/undefined.");
    }
  }, [property]);

  // Use features from backend if available
  const features = property.features || {};

  return (
    <div className="card property-overview">
      <div className="property-summary">
        <h1>{property.title}</h1>
        <p>
          {property.type} · {property.guests} guests · {property.bedrooms} bedrooms · {property.bathrooms} bathrooms
        </p>
      </div>

      <div className="amenities-section mt-6">
        <h3>What's included</h3>
        {features && Object.keys(features).length > 0 ? (
          <div className="amenities-grid">
            {Object.entries(features).map(([key, value]) => {
              const emojiMap = {
                gym: "🏋️‍♂️",
                garden: "🌳",
                balcony: "🏞️",
                heating: "🔥",
                parking: "🚗",
                pet_friendly: "🐶",
                security_24_7: "🛡️",
                swimming_pool: "🏊‍♂️",
                air_conditioning: "❄️"
              };
              const labelMap = {
                gym: "Gym",
                garden: "Garden",
                balcony: "Balcony",
                heating: "Heating",
                parking: "Parking",
                pet_friendly: "Pet Friendly",
                security_24_7: "24/7 Security",
                swimming_pool: "Swimming Pool",
                air_conditioning: "Air Conditioning"
              };
              return (
                <div key={key} className="amenity-item">
                  <span style={{ fontSize: '1.5em', marginRight: '8px' }}>{emojiMap[key] || ""}</span>
                  <span>{labelMap[key] || key}</span>
                  <span style={{ marginLeft: '8px' }}>{value ? "✅" : "❌"}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No included amenities listed for this property.</p>
        )}
      </div>
    </div>
  )
}