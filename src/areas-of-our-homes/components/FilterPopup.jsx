"use client"

import { useState, useEffect } from "react"
// No direct imports from lucide-react, all icons are custom SVGs

export default function FilterPopup({ onClose, onApplyFilters, initialFilters }) {
  const [filters, setFilters] = useState(
    initialFilters || {
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
      priceMax: 1161,
      adults: 1,
      children: 0,
      bedrooms: 0,
      bathrooms: 0,
      petsAllowed: 0,
      accommodationTypes: [],
      reviews: "Any",
      distanceToWater: "Any",
      distanceToSkiing: "Any",
    },
  )

  // Sync internal state with initialFilters prop
  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters)
    }
  }, [initialFilters])

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setFilters((prev) => ({ ...prev, [name]: checked }))
  }

  const handleRangeChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: Number.parseInt(value) }))
  }

  const handleGuestRoomChange = (type, increment) => {
    setFilters((prev) => ({
      ...prev,
      [type]: increment ? prev[type] + 1 : Math.max(type === "adults" ? 1 : 0, prev[type] - 1),
    }))
  }

  const handleAccommodationTypeChange = (type) => {
    setFilters((prev) => {
      const newTypes = prev.accommodationTypes.includes(type)
        ? prev.accommodationTypes.filter((t) => t !== type)
        : [...prev.accommodationTypes, type]
      return { ...prev, accommodationTypes: newTypes }
    })
  }

  const handleReviewChange = (value) => {
    setFilters((prev) => ({ ...prev, reviews: value }))
  }

  const handleDistanceChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }))
  }

  const handleClear = () => {
    const clearedFilters = {
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
      priceMax: 1161,
      adults: 1,
      children: 0,
      bedrooms: 0,
      bathrooms: 0,
      petsAllowed: 0,
      accommodationTypes: [],
      reviews: "Any",
      distanceToWater: "Any",
      distanceToSkiing: "Any",
    }
    setFilters(clearedFilters)
    onApplyFilters(clearedFilters) // Apply cleared filters immediately
  }

  const handleApply = () => {
    onApplyFilters(filters)
    onClose()
  }

  const removeFilter = (key, valueToRemove = null) => {
    setFilters((prev) => {
      const newFilters = { ...prev }
      if (typeof newFilters[key] === "boolean") {
        newFilters[key] = false
      } else if (Array.isArray(newFilters[key])) {
        newFilters[key] = newFilters[key].filter((item) => item !== valueToRemove)
      } else if (key === "priceMin" || key === "priceMax") {
        newFilters.priceMin = 10
        newFilters.priceMax = 1161
      } else if (key === "adults") {
        newFilters.adults = 1
      } else if (key === "children" || key === "bedrooms" || key === "bathrooms" || key === "petsAllowed") {
        newFilters[key] = 0
      } else if (key === "reviews" || key === "distanceToWater" || key === "distanceToSkiing") {
        newFilters[key] = "Any"
      }
      return newFilters
    })
  }

  const renderIcon = (iconName, size = 24, fill = "none") => {
    const iconProps = {
      width: String(size),
      height: String(size),
      viewBox: "0 0 24 24",
      fill: fill,
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    }

    switch (iconName) {
      case "close":
        return (
          <svg {...iconProps}>
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        )
      case "dog":
        return (
          <svg {...iconProps}>
            <path d="M10 12.5a4.5 4.5 0 0 0-4.5 4.5v0A4.5 4.5 0 0 0 10 21h4a4.5 4.5 0 0 0 4.5-4.5v0A4.5 4.5 0 0 0 14 12.5"></path>
            <path d="M12 12.5V6"></path>
            <path d="M18 12.5V6"></path>
            <path d="M6 12.5V6"></path>
            <path d="M12 6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z"></path>
            <path d="M6 6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z"></path>
          </svg>
        )
      case "pool":
        return (
          <svg {...iconProps}>
            <path d="M12 22c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z"></path>
            <path d="M12 10V2"></path>
            <path d="M12 16h8"></path>
            <path d="M12 16H4"></path>
          </svg>
        )
      case "wifi":
        return (
          <svg {...iconProps}>
            <path d="M5 12.55s2.5-3.9 7-3.9 7 3.9 7 3.9"></path>
            <path d="M1.49 9s2.5-3.9 7-3.9 7 3.9 7 3.9"></path>
            <path d="M8.51 16.1s2.5-3.9 7-3.9 7 3.9 7 3.9"></path>
            <path d="M12 20.55s2.5-3.9 7-3.9 7 3.9 7 3.9"></path>
          </svg>
        )
      case "kitchen":
        return (
          <svg {...iconProps}>
            <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"></path>
            <path d="M12 18V8"></path>
            <path d="M8 12h8"></path>
            <path d="M12 4v4"></path>
          </svg>
        )
      case "air-conditioning":
        return (
          <svg {...iconProps}>
            <path d="M12 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"></path>
            <path d="M12 10h8"></path>
            <path d="M12 14h8"></path>
            <path d="M12 6h8"></path>
            <path d="M12 18h8"></path>
          </svg>
        )
      case "tv":
        return (
          <svg {...iconProps}>
            <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
            <polyline points="17 2 12 7 7 2"></polyline>
          </svg>
        )
      case "parking":
        return (
          <svg {...iconProps}>
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <path d="M9 17V7h4a3 3 0 0 1 0 6H9"></path>
          </svg>
        )
      case "washing-machine":
        return (
          <svg {...iconProps}>
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="12" cy="12" r="4"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4" y1="12" x2="2" y2="12"></line>
            <line x1="22" y1="12" x2="20" y2="12"></line>
          </svg>
        )
      case "balcony":
        return (
          <svg {...iconProps}>
            <path d="M12 22h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8"></path>
            <path d="M12 18V6"></path>
            <path d="M16 18V6"></path>
            <path d="M8 18V6"></path>
          </svg>
        )
      case "microwave":
        return (
          <svg {...iconProps}>
            <rect x="2" y="4" width="20" height="18" rx="2" ry="2"></rect>
            <path d="M12 8h8"></path>
            <path d="M12 12h8"></path>
            <path d="M12 16h8"></path>
            <path d="M6 8v8"></path>
            <path d="M2 12h4"></path>
          </svg>
        )
      case "home":
        return (
          <svg {...iconProps}>
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9,22 9,12 15,12 15,22"></polyline>
          </svg>
        )
      case "building-type": // Using a generic building icon for condo/apartment
        return (
          <svg {...iconProps}>
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="9" y1="3" x2="9" y2="21"></line>
            <line x1="15" y1="3" x2="15" y2="21"></line>
            <line x1="3" y1="9" x2="21" y2="9"></line>
            <line x1="3" y1="15" x2="21" y2="15"></line>
          </svg>
        )
      case "tent":
        return (
          <svg {...iconProps}>
            <path d="M10 13L2 22h20L14 13"></path>
            <path d="M10 13L12 2l2 11"></path>
          </svg>
        )
      case "hotel":
        return (
          <svg {...iconProps}>
            <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"></path>
            <path d="M12 18V8"></path>
            <path d="M8 12h8"></path>
            <path d="M12 4v4"></path>
          </svg>
        )
      case "bed":
        return (
          <svg {...iconProps}>
            <path d="M2 4v16h20V4H2zm0 8h20"></path>
            <path d="M12 8v8"></path>
            <path d="M8 8v8"></path>
            <path d="M16 8v8"></path>
          </svg>
        )
      case "star":
        return (
          <svg {...iconProps} fill="currentColor">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        )
      default:
        return null
    }
  }

  const amenityIcons = {
    petFriendly: { icon: "dog", label: "Pet-friendly" },
    pool: { icon: "pool", label: "Pool" },
    wifi: { icon: "wifi", label: "WiFi" },
    kitchen: { icon: "kitchen", label: "Kitchen" },
    airConditioning: { icon: "air-conditioning", label: "Air conditioning" },
    tv: { icon: "tv", label: "TV" },
    parking: { icon: "parking", label: "Parking" },
    washingMachine: { icon: "washing-machine", label: "Washing machine" },
    balconyPatio: { icon: "balcony", label: "Balcony/patio" },
    microwave: { icon: "microwave", label: "Microwave" },
  }

  const accommodationTypeIcons = {
    Condo: { icon: "building-type", label: "Condo" },
    Cabin: { icon: "tent", label: "Cabin" },
    Lodge: { icon: "home", label: "Lodge" },
    House: { icon: "home", label: "House" },
    Apartment: { icon: "building-type", label: "Apartment" },
    Resort: { icon: "hotel", label: "Resort" },
    Hotel: { icon: "hotel", label: "Hotel" },
    Farmhouse: { icon: "home", label: "Farmhouse" },
    Castle: { icon: "home", label: "Castle" }, // Placeholder, using home icon
    "Bed and breakfast": { icon: "bed", label: "Bed and breakfast" },
  }

  const getActiveFilters = () => {
    const active = []

    // Boolean amenities
    for (const key in amenityIcons) {
      if (filters[key]) {
        active.push({ type: "amenity", key: key, label: amenityIcons[key].label })
      }
    }

    // Price range
    if (filters.priceMin !== 10 || filters.priceMax !== 1161) {
      active.push({ type: "price", key: "price", label: `US$${filters.priceMin} - US$${filters.priceMax}` })
    }

    // Guests and rooms
    if (filters.adults > 1) active.push({ type: "guestRoom", key: "adults", label: `${filters.adults} Adults` })
    if (filters.children > 0) active.push({ type: "guestRoom", key: "children", label: `${filters.children} Children` })
    if (filters.bedrooms > 0) active.push({ type: "guestRoom", key: "bedrooms", label: `${filters.bedrooms} Bedrooms` })
    if (filters.bathrooms > 0)
      active.push({ type: "guestRoom", key: "bathrooms", label: `${filters.bathrooms} Bathrooms` })
    if (filters.petsAllowed > 0)
      active.push({ type: "guestRoom", key: "petsAllowed", label: `${filters.petsAllowed} Pets` })

    // Accommodation types
    filters.accommodationTypes.forEach((type) => {
      active.push({
        type: "accommodation",
        key: "accommodationTypes",
        value: type,
        label: accommodationTypeIcons[type]?.label || type,
      })
    })

    // Reviews
    if (filters.reviews !== "Any") {
      active.push({ type: "review", key: "reviews", label: `Reviews: ${filters.reviews}` })
    }

    // Instant Booking & Book with HomeToGo
    if (filters.instantBooking) active.push({ type: "boolean", key: "instantBooking", label: "Instant Booking" })
    if (filters.bookWithHomeToGo) active.push({ type: "boolean", key: "bookWithHomeToGo", label: "Book with HomeToGo" })

    // Distance filters (if data was available)
    if (filters.distanceToWater !== "Any")
      active.push({ type: "distance", key: "distanceToWater", label: `Water: ${filters.distanceToWater}` })
    if (filters.distanceToSkiing !== "Any")
      active.push({ type: "distance", key: "distanceToSkiing", label: `Skiing: ${filters.distanceToSkiing}` })

    return active
  }

  const activeFilters = getActiveFilters()

  return (
    <div className="filter-popup-overlay">
      <div className="filter-popup-content">
        <div className="filter-popup-header">
          <button className="close-filter-btn" onClick={onClose}>
            {renderIcon("close", 20)}
          </button>
          <h2>Filters</h2>
        </div>

        <div className="filter-popup-body">
          {activeFilters.length > 0 && (
            <section className="active-filters-section">
              <h3>Active Filters</h3>
              <div className="active-filters-chips">
                {activeFilters.map((filter, index) => (
                  <div key={index} className="filter-chip">
                    {filter.label}
                    <button className="filter-chip-clear" onClick={() => removeFilter(filter.key, filter.value)}>
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Quick Filters */}
          <section className="filter-section">
            <h3>Quick filters</h3>
            <div className="amenities-grid">
              {["petFriendly", "pool", "wifi", "kitchen"].map((key) => (
                <label key={key} className="amenity-item">
                  <div className="amenity-icon-wrapper">{renderIcon(amenityIcons[key].icon, 24)}</div>
                  <span>{amenityIcons[key].label}</span>
                  <input
                    type="checkbox"
                    name={key}
                    checked={filters[key]}
                    onChange={handleCheckboxChange}
                    className="amenity-checkbox"
                  />
                </label>
              ))}
              <label className="amenity-item">
                <div className="amenity-icon-wrapper">
                  {/* Placeholder for Instant Booking icon */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2v10"></path>
                    <path d="M18.4 6.6a9 9 0 1 1-12.8 0"></path>
                  </svg>
                </div>
                <span>Instant Booking</span>
                <input
                  type="checkbox"
                  name="instantBooking"
                  checked={filters.instantBooking}
                  onChange={handleCheckboxChange}
                  className="amenity-checkbox"
                />
              </label>
              <label className="amenity-item">
                <div className="amenity-icon-wrapper">
                  {/* Placeholder for HomeToGo icon */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    <path d="M2 17l10 5 10-5"></path>
                    <path d="M2 12l10 5 10-5"></path>
                  </svg>
                </div>
                <span>Book with HomeToGo</span>
                <input
                  type="checkbox"
                  name="bookWithHomeToGo"
                  checked={filters.bookWithHomeToGo}
                  onChange={handleCheckboxChange}
                  className="amenity-checkbox"
                />
              </label>
            </div>
            <button className="more-filters-btn">+ 14 more</button>
          </section>

          {/* Price Range */}
          <section className="filter-section">
            <h3>Price per night</h3>
            <div className="price-range-display">
              US${filters.priceMin} - US${filters.priceMax}
            </div>
            <div className="price-range-slider">
              <input
                type="range"
                min="10"
                max="1161"
                value={filters.priceMin}
                onChange={(e) => handleRangeChange("priceMin", e.target.value)}
                className="slider-min"
              />
              <input
                type="range"
                min="10"
                max="1161"
                value={filters.priceMax}
                onChange={(e) => handleRangeChange("priceMax", e.target.value)}
                className="slider-max"
              />
            </div>
          </section>

          {/* Amenities */}
          <section className="filter-section">
            <h3>Amenities</h3>
            <div className="amenities-grid">
              {Object.entries(amenityIcons).map(([key, { icon, label }]) => (
                <label key={key} className="amenity-item">
                  <div className="amenity-icon-wrapper">{renderIcon(icon, 24)}</div>
                  <span>{label}</span>
                  <input
                    type="checkbox"
                    name={key}
                    checked={filters[key]}
                    onChange={handleCheckboxChange}
                    className="amenity-checkbox"
                  />
                </label>
              ))}
            </div>
          </section>

          {/* Guests and Rooms */}
          <section className="filter-section">
            <h3>Guests and rooms</h3>
            <div className="guest-room-controls">
              <div className="guest-room-item">
                <span>Adults 18 and older</span>
                <div className="controls">
                  <button onClick={() => handleGuestRoomChange("adults", false)} disabled={filters.adults <= 1}>
                    -
                  </button>
                  <span>{filters.adults}</span>
                  <button onClick={() => handleGuestRoomChange("adults", true)}>+</button>
                </div>
              </div>
              <div className="guest-room-item">
                <span>Children 0–17</span>
                <div className="controls">
                  <button onClick={() => handleGuestRoomChange("children", false)} disabled={filters.children <= 0}>
                    -
                  </button>
                  <span>{filters.children}</span>
                  <button onClick={() => handleGuestRoomChange("children", true)}>+</button>
                </div>
              </div>
              <div className="guest-room-item">
                <span>Bedrooms</span>
                <div className="controls">
                  <button onClick={() => handleGuestRoomChange("bedrooms", false)} disabled={filters.bedrooms <= 0}>
                    -
                  </button>
                  <span>{filters.bedrooms}</span>
                  <button onClick={() => handleGuestRoomChange("bedrooms", true)}>+</button>
                </div>
              </div>
              <div className="guest-room-item">
                <span>Bathrooms</span>
                <div className="controls">
                  <button onClick={() => handleGuestRoomChange("bathrooms", false)} disabled={filters.bathrooms <= 0}>
                    -
                  </button>
                  <span>{filters.bathrooms}</span>
                  <button onClick={() => handleGuestRoomChange("bathrooms", true)}>+</button>
                </div>
              </div>
              <div className="guest-room-item">
                <span>Pets allowed</span>
                <div className="controls">
                  <button
                    onClick={() => handleGuestRoomChange("petsAllowed", false)}
                    disabled={filters.petsAllowed <= 0}
                  >
                    -
                  </button>
                  <span>{filters.petsAllowed}</span>
                  <button onClick={() => handleGuestRoomChange("petsAllowed", true)}>+</button>
                </div>
              </div>
            </div>
          </section>

          {/* Accommodation Types */}
          <section className="filter-section">
            <h3>Accommodation types</h3>
            <div className="accommodation-types-grid">
              {Object.entries(accommodationTypeIcons).map(([type, { icon, label }]) => (
                <label
                  key={type}
                  className={`accommodation-type-item ${filters.accommodationTypes.includes(type) ? "selected" : ""}`}
                >
                  <input
                    type="checkbox"
                    name="accommodationTypes"
                    value={type}
                    checked={filters.accommodationTypes.includes(type)}
                    onChange={() => handleAccommodationTypeChange(type)}
                    className="sr-only" // Hide native checkbox
                  />
                  <div className="accommodation-icon-wrapper">{renderIcon(icon, 28)}</div>
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Reviews */}
          <section className="filter-section">
            <h3>Reviews</h3>
            <div className="review-options">
              {["Any", "4+", "4.5+"].map((option) => (
                <button
                  key={option}
                  className={`review-option ${filters.reviews === option ? "active" : ""}`}
                  onClick={() => handleReviewChange(option)}
                >
                  {option === "Any" ? (
                    option
                  ) : (
                    <>
                      {renderIcon("star", 16, "currentColor")} {option}
                    </>
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* Distance to Water */}
          <section className="filter-section">
            <h3>Distance to water</h3>
            <div className="distance-options">
              {["Any", "250 yd", "500 yd", "1 mi", "3 mi"].map((option) => (
                <button
                  key={option}
                  className={`distance-option ${filters.distanceToWater === option ? "active" : ""}`}
                  onClick={() => handleDistanceChange("distanceToWater", option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </section>

          {/* Distance to Skiing Area */}
          <section className="filter-section">
            <h3>Distance to skiing area</h3>
            <div className="distance-options">
              {["Any", "250 yd", "500 yd", "1 mi", "3 mi", "5 mi"].map((option) => (
                <button
                  key={option}
                  className={`distance-option ${filters.distanceToSkiing === option ? "active" : ""}`}
                  onClick={() => handleDistanceChange("distanceToSkiing", option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="filter-popup-footer">
          <button className="clear-filters-btn" onClick={handleClear}>
            Clear
          </button>
          <button className="apply-filters-btn" onClick={handleApply}>
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}
