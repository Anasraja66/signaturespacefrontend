"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/searchBar.css"

// Icon rendering component
const renderIcon = (iconName) => {
  switch (iconName) {
    case "navigation":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
      )
    case "building":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="2" width="18" height="20" rx="2" ry="2"></rect><line x1="12" y1="6" x2="12" y2="18"></line></svg>
      )
    case "building-2":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 10V2H6v18a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8h-4z"></path><path d="M18 2h4v8h-4z"></path><path d="M14 2h-2v2"></path></svg>
      )
    case "anchor":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="3"></circle><line x1="12" y1="22" x2="12" y2="8"></line><path d="M5 12H2a10 10 0 0 0 20 0h-3"></path></svg>
      )
    case "home":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
      )
    case "briefcase":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
      )
    case "waves":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 13.5a6 6 0 0 0 12 0 6 6 0 0 1 12 0"></path><path d="M2 10v6a6 6 0 0 0 12 0 6 6 0 0 1 12 0V10"></path></svg>
      )
    case "mountain":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3l4 8 5-5 5 15H2L8 3z"></path></svg>
      )
    case "trees":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10"></path><path d="M12 20V4"></path><path d="M6 20v-4"></path><path d="M10 20h8"></path><path d="M6 16.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"></path><path d="M12 4.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"></path><path d="M18 10.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"></path></svg>
      )
    default:
      return null
  }
}

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
    id: "marina",
    name: "Marina",
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
    description: "Family community with parks",
    icon: "trees",
  },
  {
    id: "jumeirah-lake-towers",
    name: "Jumeirah Lake Towers",
    description: "Lakeside towers and dining",
    icon: "building",
  },
]

export default function SearchBar({ location, setLocation }) {
  const navigate = useNavigate()
  const [isMobile, setIsMobile] = useState(false)
  const [activeSection, setActiveSection] = useState(null)
  const [filteredDestinations, setFilteredDestinations] = useState(destinations)
  const [checkIn, setCheckIn] = useState(null)
  const [checkOut, setCheckOut] = useState(null)
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  })
  const [calendarView, setCalendarView] = useState("dates")
  const [stayDuration, setStayDuration] = useState("month")
  const [selectedMonth, setSelectedMonth] = useState(8) // September (0-indexed)
  const [dateFlexibility, setDateFlexibility] = useState("2")

  // Debounce setup for mobile search
  const debounceTimeoutRef = useRef(null);

  // useEffect to handle window resize and determine mobile view
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // The core search function
  const handleSearch = useCallback(() => {
    console.log("Searching with:", {
      location,
      checkIn,
      checkOut,
      guests,
      calendarView,
      stayDuration,
      selectedMonth,
      dateFlexibility,
    })
    navigate(`/search?location=${location}&checkIn=${checkIn || ''}&checkOut=${checkOut || ''}&adults=${guests.adults}&children=${guests.children}`)
    // Optionally close popups after a search is initiated (especially useful on mobile)
    setActiveSection(null);
  }, [location, checkIn, checkOut, guests, calendarView, stayDuration, selectedMonth, dateFlexibility, navigate]);


  const handleLocationSearch = (value) => {
    setLocation(value)
    setFilteredDestinations(
      destinations.filter((dest) =>
        dest.name.toLowerCase().includes(value.toLowerCase()) ||
        dest.description.toLowerCase().includes(value.toLowerCase())
      )
    )

    // Trigger debounced search ONLY on mobile
    if (isMobile) {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      debounceTimeoutRef.current = setTimeout(() => {
        handleSearch();
      }, 500); // Trigger search after 500ms of no typing
    }
  }

  const handleDestinationSelect = (destination) => {
    setLocation(destination.name)
    setActiveSection(null) // Close the location popup
    if (isMobile) {
      handleSearch(); // Trigger search immediately on selection for mobile
    }
  }

  const handleGuestChange = (type, increment) => {
    setGuests((prevGuests) => {
      const newGuests = { ...prevGuests }
      if (increment) {
        newGuests[type]++
      } else {
        newGuests[type]--
      }
      return newGuests
    })
    // Trigger debounced search ONLY on mobile
    if (isMobile) {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      debounceTimeoutRef.current = setTimeout(() => {
        handleSearch();
      }, 500);
    }
  }

  const handleDateChange = (newCheckIn, newCheckOut) => {
    setCheckIn(newCheckIn);
    setCheckOut(newCheckOut);
    if (isMobile && newCheckIn && newCheckOut) {
      handleSearch(); // Trigger search once both dates are selected for mobile
    }
  };

  const formatDate = (date) => {
    if (!date) return ""
    const d = new Date(date)
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  const getWhenText = () => {
    if (calendarView === "flexible") {
      switch (stayDuration) {
        case "weekend":
          return "Weekend"
        case "week":
          return "Week"
        case "month":
          const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
          return monthNames[selectedMonth]
        default:
          return "Add dates"
      }
    } else {
      if (checkIn && checkOut) {
        return `${formatDate(checkIn)} - ${formatDate(checkOut)}`
      } else if (checkIn) {
        return `Check-in: ${formatDate(checkIn)}`
      } else {
        return "Add dates"
      }
    }
  }

  const formatGuestText = () => {
    const parts = []
    if (guests.adults > 0) parts.push(`${guests.adults} adult${guests.adults > 1 ? "s" : ""}`)
    if (guests.children > 0) parts.push(`${guests.children} child${guests.children > 1 ? "ren" : ""}`)
    if (guests.infants > 0) parts.push(`${guests.infants} infant${guests.infants > 1 ? "s" : ""}`)
    if (guests.pets > 0) parts.push(`${guests.pets} pet${guests.pets > 1 ? "s" : ""}`)
    return parts.length > 0 ? parts.join(", ") : "Add guests"
  }

  const totalGuests = guests.adults + guests.children + guests.infants + guests.pets

  return (
    <div className="searchbar-bg">
      <div className="search-container">
        {isMobile ? (
          <div className="search-bar mobile-grid" style={{ display: "grid", gridTemplateRows: "1fr 1fr", gridTemplateColumns: "1fr 1fr", gap: "12px", width: "100%" }}>
            {/* First row: Where */}
            <div style={{ gridColumn: "1 / span 2" }}>
              <div
                className={`search-section ${activeSection === "location" ? "active" : ""}`}
                onClick={() => setActiveSection(activeSection === "location" ? null : "location")}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
              >
                <div className="section-content" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <label style={{ textAlign: "center" }}>Where</label>
                  <input
                    type="text"
                    placeholder="Search destinations"
                    value={location}
                    onChange={(e) => handleLocationSearch(e.target.value)}
                    className="location-input"
                    style={{ textAlign: "center" }}
                  />
                </div>
              </div>
            </div>
            {/* Second row: When and Who */}
            <div>
              {calendarView === "flexible" ? (
                <div
                  className={`search-section when-section ${activeSection === "when" ? "active" : ""}`}
                  onClick={() => setActiveSection(activeSection === "when" ? null : "when")}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
                >
                  <div className="section-content" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <label style={{ textAlign: "center" }}>When</label>
                    <span className="date-text" style={{ textAlign: "center" }}>{getWhenText()}</span>
                  </div>
                </div>
              ) : (
                <div
                  className={`search-section when-section ${(activeSection === "checkin" || activeSection === "checkout") ? "active" : ""}`}
                  onClick={() => setActiveSection(activeSection === "checkin" ? "checkout" : "checkin")}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
                >
                  <div className="section-content" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <label style={{ textAlign: "center" }}>When</label>
                    <span className="date-text" style={{ textAlign: "center" }}>
                      {checkIn && checkOut
                        ? `${formatDate(checkIn)} - ${formatDate(checkOut)}`
                        : checkIn
                          ? formatDate(checkIn)
                          : "Add dates"}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div>
              <div
                className={`search-section guests-section ${activeSection === "guests" ? "active" : ""}`}
                onClick={() => setActiveSection(activeSection === "guests" ? null : "guests")}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
              >
                <div className="section-content" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <label style={{ textAlign: "center" }}>Who</label>
                  <span className="guest-text" style={{ textAlign: "center" }}>{totalGuests > 0 ? formatGuestText() : "Add guests"}</span>
                </div>
              </div>
            </div>
            {/* Search button removed here for mobile, auto-search from popups will handle it */}
          </div>

        ) : (
          <div className="search-bar desktop-grid">
            <div
              className={`search-section ${activeSection === "location" ? "active" : ""}`}
              onClick={() => setActiveSection(activeSection === "location" ? null : "location")}
            >
              <div className="section-content">
                <label>Where</label>
                <input
                  type="text"
                  placeholder="Search destinations"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)} // Direct update, no auto-search here
                  className="location-input"
                />
              </div>
            </div>
            <div
              className={`search-section ${activeSection === "when" ? "active" : ""}`}
              onClick={() => setActiveSection(activeSection === "when" ? null : "when")}
            >
              <div className="section-content">
                <label>When</label>
                <span className="date-text">{getWhenText()}</span>
              </div>
            </div>
            <div
              className={`search-section ${activeSection === "guests" ? "active" : ""}`}
              onClick={() => setActiveSection(activeSection === "guests" ? null : "guests")}
            >
              <div className="section-content">
                <label>Who</label>
                <span className="guest-text">{totalGuests > 0 ? formatGuestText() : "Add guests"}</span>
              </div>
            </div>
            {/* Explicit search button for desktop */}
            <button className="search-button" onClick={handleSearch}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              {totalGuests > 0 && <span>Search</span>}
            </button>
          </div>
        )}

        {/* Mobile Popups (rendered conditionally based on activeSection) */}
        {activeSection === "location" && isMobile && (
          <div className="mobile-popup-overlay" style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "#fff", zIndex: 1000, overflowY: "auto" }}>
            <div className="location-header" style={{ padding: "24px 16px 8px" }}>
              <h3>Suggested destinations</h3>
            </div>
            <div className="destinations-list">
              {filteredDestinations.map((destination) => (
                <div
                  key={destination.id}
                  className="destination-item"
                  onClick={() => handleDestinationSelect(destination)} // Search on select for mobile
                  style={{ padding: "16px", borderBottom: "1px solid #eee", display: "flex", alignItems: "center", cursor: "pointer" }}
                >
                  <div className="destination-icon">{renderIcon(destination.icon)}</div>
                  <div className="destination-info" style={{ marginLeft: "12px" }}>
                    <div className="destination-name">{destination.name}</div>
                    <div className="destination-description">{destination.description}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Close button that doesn't trigger search, because selection already did */}
            <button className="close-popup" style={{ position: "absolute", top: 12, right: 16 }} onClick={() => setActiveSection(null)}>Close</button>
          </div>
        )}
        {(activeSection === "checkin" || activeSection === "checkout" || activeSection === "when") && isMobile && (
          <div className="mobile-popup-overlay" style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "#fff", zIndex: 1000, overflowY: "auto" }}>
            <div className="calendar-tabs" style={{ padding: "24px 16px 8px" }}>
              <button
                className={`calendar-tab ${calendarView === "dates" ? "active" : ""}`}
                onClick={() => setCalendarView("dates")}
              >
                Dates
              </button>
              <button
                className={`calendar-tab ${calendarView === "flexible" ? "active" : ""}`}
                onClick={() => setCalendarView("flexible")}
              >
                Flexible
              </button>
            </div>
            <div style={{ padding: "16px" }}>
              {calendarView === "dates" && (
                <div>
                  <p>Date picker goes here for precise dates.</p>
                  {/* Simulate date selection and trigger search on mobile */}
                  <input type="date" onChange={(e) => handleDateChange(e.target.value, checkOut)} />
                  <input type="date" onChange={(e) => handleDateChange(checkIn, e.target.value)} />
                  <p>Selected: {checkIn ? formatDate(checkIn) : "None"} to {checkOut ? formatDate(checkOut) : "None"}</p>
                  <button onClick={() => { setCheckIn(null); setCheckOut(null); }}>Clear Dates</button>
                  {/* Apply button triggers search on mobile */}
                  <button onClick={() => { setActiveSection(null); handleSearch(); }}>Apply</button>
                </div>
              )}
              {calendarView === "flexible" && (
                <div>
                  <p>Flexible date options go here.</p>
                  <label htmlFor="stayDuration">Stay Duration:</label>
                  <select id="stayDuration" value={stayDuration} onChange={(e) => { setStayDuration(e.target.value); if (isMobile) handleSearch(); }}>
                    <option value="weekend">Weekend</option>
                    <option value="week">Week</option>
                    <option value="month">Month</option>
                  </select>
                  {stayDuration === "month" && (
                    <>
                      <label htmlFor="selectedMonth">Select Month:</label>
                      <select id="selectedMonth" value={selectedMonth} onChange={(e) => { setSelectedMonth(Number(e.target.value)); if (isMobile) handleSearch(); }}>
                        {Array.from({ length: 12 }).map((_, i) => (
                          <option key={i} value={i}>{new Date(2025, i).toLocaleString('en-US', { month: 'long' })}</option>
                        ))}
                      </select>
                    </>
                  )}
                  <label htmlFor="dateFlexibility">Date Flexibility:</label>
                  <select id="dateFlexibility" value={dateFlexibility} onChange={(e) => { setDateFlexibility(e.target.value); if (isMobile) handleSearch(); }}>
                    <option value="0">Exact dates</option>
                    <option value="1">+- 1 day</option>
                    <option value="2">+- 2 days</option>
                    <option value="7">+- 7 days</option>
                  </select>
                  {/* Apply button triggers search on mobile */}
                  <button onClick={() => { setActiveSection(null); handleSearch(); }}>Apply</button>
                </div>
              )}
            </div>

            <button className="close-popup" style={{ position: "absolute", top: 12, right: 16 }} onClick={() => setActiveSection(null)}>Close</button>
          </div>
        )}
        {activeSection === "guests" && isMobile && (
          <div className="mobile-popup-overlay" style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "#fff", zIndex: 1000, overflowY: "auto" }}>
            <div style={{ padding: "24px 16px 8px" }}>
              <h3>Guests</h3>
            </div>
            <div className="guest-row" style={{ padding: "16px", borderBottom: "1px solid #eee", display: "flex", alignItems: "center" }}>
              <div className="guest-info">
                <span className="guest-type">Adults</span>
              </div>
              <div className="guest-controls" style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
                <button
                  className="guest-button"
                  onClick={() => handleGuestChange("adults", false)}
                  disabled={guests.adults <= 1}
                >
                  -
                </button>
                <span className="guest-count" style={{ margin: "0 8px" }}>{guests.adults}</span>
                <button className="guest-button" onClick={() => handleGuestChange("adults", true)}>
                  +
                </button>
              </div>
            </div>
            <div className="guest-row" style={{ padding: "16px", borderBottom: "1px solid #eee", display: "flex", alignItems: "center" }}>
              <div className="guest-info">
                <span className="guest-type">Children</span>
              </div>
              <div className="guest-controls" style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
                <button
                  className="guest-button"
                  onClick={() => handleGuestChange("children", false)}
                  disabled={guests.children <= 0}
                >
                  -
                </button>
                <span className="guest-count" style={{ margin: "0 8px" }}>{guests.children}</span>
                <button className="guest-button" onClick={() => handleGuestChange("children", true)}>
                  +
                </button>
              </div>
            </div>
            <div className="guest-row" style={{ padding: "16px", borderBottom: "1px solid #eee", display: "flex", alignItems: "center" }}>
              <div className="guest-info">
                <span className="guest-type">Infants</span>
              </div>
              <div className="guest-controls" style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
                <button
                  className="guest-button"
                  onClick={() => handleGuestChange("infants", false)}
                  disabled={guests.infants <= 0}
                >
                  -
                </button>
                <span className="guest-count" style={{ margin: "0 8px" }}>{guests.infants}</span>
                <button className="guest-button" onClick={() => handleGuestChange("infants", true)}>
                  +
                </button>
              </div>
            </div>
            <div className="guest-row" style={{ padding: "16px", borderBottom: "1px solid #eee", display: "flex", alignItems: "center" }}>
              <div className="guest-info">
                <span className="guest-type">Pets</span>
              </div>
              <div className="guest-controls" style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
                <button
                  className="guest-button"
                  onClick={() => handleGuestChange("pets", false)}
                  disabled={guests.pets <= 0}
                >
                  -
                </button>
                <span className="guest-count" style={{ margin: "0 8px" }}>{guests.pets}</span>
                <button className="guest-button" onClick={() => handleGuestChange("pets", true)}>
                  +
                </button>
              </div>
            </div>
            {/* Close button triggers search on mobile */}
            <button className="close-popup" style={{ position: "absolute", top: 12, right: 16 }} onClick={() => { setActiveSection(null); handleSearch(); }}>Close</button>
          </div>
        )}

        {/* Overlay for desktop */}
        {!isMobile && activeSection && <div className="overlay" onClick={() => setActiveSection(null)}></div>}
      </div>
    </div>
  )
}