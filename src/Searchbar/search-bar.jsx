"use client"

import { useState, useEffect, useRef } from "react"
import "./search-bar.css"
import PopupPortal from "./PopupPortal"

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

export default function SearchBar() {
  const [activeSection, setActiveSection] = useState(null)
  const popupRef = useRef(null)
  const searchBarRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  // State for dynamic popup positioning
  const [popupStyles, setPopupStyles] = useState({
    location: null, // null means not visible
    calendar: null,
    guests: null,
  })

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Calculate and set popup position
  useEffect(() => {
    if (!activeSection || isMobile) {
      setPopupStyles({ location: null, calendar: null, guests: null })
      return
    }

    const searchBarRect = searchBarRef.current.getBoundingClientRect()
    const offset = 8 // Gap between search bar and dropdown

    const newPopupStyles = { location: null, calendar: null, guests: null }

    if (activeSection === "location") {
      const locationSection = searchBarRef.current.querySelector(".search-section:first-child")
      if (locationSection) {
        const rect = locationSection.getBoundingClientRect()
        newPopupStyles.location = {
          top: searchBarRect.bottom + window.scrollY + offset, // Adjusted for scroll position
          left: rect.left + window.scrollX, // Adjusted for scroll position
          width: rect.width,
        }
      }
    } else if (activeSection === "checkin" || activeSection === "checkout" || activeSection === "when") {
      // Calendar dropdown should be centered under the entire search bar
      const calendarDropdownBaseWidth = 850
      const viewportPadding = 20
      const calendarDropdownWidth = Math.min(calendarDropdownBaseWidth, window.innerWidth - viewportPadding * 2)

      let left = searchBarRect.left + searchBarRect.width / 2 - calendarDropdownWidth / 2

      // Adjust for viewport edges
      if (left < viewportPadding) {
        left = viewportPadding
      }
      const rightEdge = left + calendarDropdownWidth
      if (rightEdge > window.innerWidth - viewportPadding) {
        left = window.innerWidth - calendarDropdownWidth - viewportPadding
      }

      newPopupStyles.calendar = {
        top: searchBarRect.bottom + window.scrollY + offset, // Adjusted for scroll position
        left: left + window.scrollX, // Adjusted for scroll position
        width: calendarDropdownWidth,
      }
    } else if (activeSection === "guests") {
      const guestsSection = searchBarRef.current.querySelector(".search-section.guests-section")
      if (guestsSection) {
        const rect = guestsSection.getBoundingClientRect()
        newPopupStyles.guests = {
          top: searchBarRect.bottom + window.scrollY + offset, // Adjusted for scroll position
          left: rect.left + window.scrollX, // Adjusted for scroll position
          width: rect.width,
        }
      }
    }
    setPopupStyles(newPopupStyles)
  }, [activeSection, isMobile])

  // Update popup positions on window resize and scroll
  useEffect(() => {
    const handlePositionUpdate = () => {
      if (activeSection && !isMobile) {
        // Re-trigger the position calculation by setting activeSection to itself
        setActiveSection(activeSection)
      }
    }

    window.addEventListener("resize", handlePositionUpdate)
    window.addEventListener("scroll", handlePositionUpdate) // Add scroll listener
    return () => {
      window.removeEventListener("resize", handlePositionUpdate)
      window.removeEventListener("scroll", handlePositionUpdate) // Clean up scroll listener
    }
  }, [activeSection, isMobile])

  // Close popup if clicking outside
  useEffect(() => {
    if (!activeSection) return

    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target) && !event.target.closest(".search-section")) {
        setActiveSection(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [activeSection])

  const [location, setLocation] = useState("")
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

  const [mobileCalendarDate, setMobileCalendarDate] = useState(new Date())
  const [mobileFlexibleYear, setMobileFlexibleYear] = useState(new Date().getFullYear())

  const totalGuests = guests.adults + guests.children + guests.infants

  const handleLocationSearch = (value) => {
    setLocation(value)
    if (value.trim() === "") {
      setFilteredDestinations(destinations)
    } else {
      const filtered = destinations.filter(
        (dest) =>
          dest.name.toLowerCase().includes(value.toLowerCase()) ||
          dest.description.toLowerCase().includes(value.toLowerCase()),
      )
      setFilteredDestinations(filtered)
    }
  }

  const handleDestinationSelect = (destination) => {
    setLocation(destination.name)
    setActiveSection(null)
  }

  const handleGuestChange = (type, increment) => {
    setGuests((prev) => ({
      ...prev,
      [type]: increment ? prev[type] + 1 : Math.max(type === "adults" ? 1 : 0, prev[type] - 1),
    }))
  }

  const handleSearch = () => {
    // Build query params
    const params = new URLSearchParams({
      city: location,
      checkIn: checkIn ? checkIn.toISOString().split("T")[0] : "",
      checkOut: checkOut ? checkOut.toISOString().split("T")[0] : "",
      adults: guests.adults,
      children: guests.children,
      infants: guests.infants,
      pets: guests.pets,
    }).toString()
    window.location.href = `/listing?${params}`
  }

  const formatGuestText = () => {
    if (totalGuests === 1) return "1 guest"
    return `${totalGuests} guests`
  }

  const formatDate = (date) => {
    if (!date) return ""
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  const getWhenText = () => {
    if (calendarView === "flexible") {
      if (stayDuration === "month") {
        return `Month in ${monthNames[selectedMonth]}`
      } else if (stayDuration === "week") {
        return "Any week"
      } else if (stayDuration === "weekend") {
        return "Any weekend"
      }
    }

    if (checkIn && dateFlexibility !== "exact") {
      return `${formatDate(checkIn)} ±${dateFlexibility}`
    }

    if (checkIn && checkOut) {
      return `${formatDate(checkIn)} - ${formatDate(checkOut)}`
    }

    if (checkIn) {
      return formatDate(checkIn)
    }

    return "Add dates"
  }

  const generateCalendar = (year, month) => {
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const handleDateClick = (date) => {
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date)
      setCheckOut(null)
    } else if (checkIn && !checkOut && date > checkIn) {
      setCheckOut(date)
    } else {
      setCheckIn(date)
      setCheckOut(null)
    }
  }

  const isDateInRange = (date) => {
    if (!checkIn || !checkOut) return false
    return date >= checkIn && date <= checkOut
  }

  const isDateSelected = (date) => {
    return (checkIn && date.getTime() === checkIn.getTime()) || (checkOut && date.getTime() === checkOut.getTime())
  }

  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()
  const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1
  const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const getStayDurationTitle = () => {
    if (stayDuration === "month") return "Stay for a month"
    if (stayDuration === "week") return "Stay for a week"
    return "Stay for a weekend"
  }

  const getGoTitle = () => {
    if (stayDuration === "month") return `Go in ${monthNames[selectedMonth]}`
    return "Go anytime"
  }

  const renderIcon = (iconName) => {
    const iconProps = {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
    }

    switch (iconName) {
      case "navigation":
        return (
          <svg {...iconProps}>
            <polygon points="3,11 22,2 13,21 11,13 3,11"></polygon>
          </svg>
        )
      case "building":
        return (
          <svg {...iconProps}>
            <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
            <path d="M6 12h12"></path>
            <path d="M6 8h12"></path>
            <path d="M6 16h12"></path>
          </svg>
        )
      case "building-2":
        return (
          <svg {...iconProps}>
            <path d="M3 21h18"></path>
            <path d="M5 21V7l8-4v18"></path>
            <path d="M19 21V11l-6-4"></path>
          </svg>
        )
      case "anchor":
        return (
          <svg {...iconProps}>
            <circle cx="12" cy="5" r="3"></circle>
            <line x1="12" y1="22" x2="12" y2="8"></line>
            <path d="M5 12H2a10 10 0 0 0 20 0h-3"></path>
          </svg>
        )
      case "home":
        return (
          <svg {...iconProps}>
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9,22 9,12 15,12 15,22"></polyline>
          </svg>
        )
      case "briefcase":
        return (
          <svg {...iconProps}>
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
        )
      case "waves":
        return (
          <svg {...iconProps}>
            <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path>
            <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path>
            <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path>
          </svg>
        )
      case "mountain":
        return (
          <svg {...iconProps}>
            <path d="M8 3l4 8 5-5 5 15H2L8 3z"></path>
          </svg>
        )
      case "trees":
        return (
          <svg {...iconProps}>
            <path d="M12 1v6m0 6v6"></path>
            <path d="M17 5a5 5 0 0 0-10 0c0 6 2 8 5 8s5-2 5-8"></path>
            <path d="M20 10a2 2 0 0 0-4 0c0 3 1 4 2 4s2-1 2-4z"></path>
            <path d="M8 10a2 2 0 0 0-4 0c0 3 1 4 2 4s2-1 2-4z"></path>
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

  const renderMobileModal = () => {
    if (!isMobile || !activeSection) return null

    const getModalTitle = () => {
      switch (activeSection) {
        case "location":
          return "Destination"
        case "checkin":
        case "checkout":
        case "when":
          return calendarView === "flexible" ? "1 week in Sep" : "Check-in"
        case "guests":
          return "Guests"
        default:
          return ""
      }
    }

    const getActionButtonText = () => {
      switch (activeSection) {
        case "location":
          return "Done"
        case "checkin":
        case "checkout":
        case "when":
          return calendarView === "flexible" ? "Next" : "Done"
        case "guests":
          return "Apply"
        default:
          return "Done"
      }
    }

    return (
      <PopupPortal>
        <div className="mobile-modal" ref={popupRef}>
          <div className="mobile-modal-header">
            <button className="mobile-close-button" onClick={() => setActiveSection(null)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <h2 className="mobile-modal-title">{getModalTitle()}</h2>
            <div style={{ width: 40 }}></div>
          </div>

          <div className="mobile-modal-content">
            {activeSection === "location" && (
              <>
                <div className="mobile-location-search">
                  <input
                    type="text"
                    placeholder="Where to?"
                    value={location}
                    onChange={(e) => handleLocationSearch(e.target.value)}
                    className="mobile-search-input"
                  />
                </div>
                <div className="mobile-destinations-section">
                  <h3 className="mobile-section-title">Popular destinations</h3>
                  <div className="destinations-list">
                    {filteredDestinations.map((destination) => (
                      <div
                        key={destination.id}
                        className="destination-item"
                        onClick={() => handleDestinationSelect(destination)}
                      >
                        <div className="destination-icon">{renderIcon(destination.icon)}</div>
                        <div className="destination-info">
                          <div className="destination-name">{destination.name}</div>
                          <div className="destination-description">{destination.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {(activeSection === "checkin" || activeSection === "checkout" || activeSection === "when") && (
              <>
                <div className="mobile-calendar-tabs">
                  <button
                    className={`mobile-calendar-tab ${calendarView === "dates" ? "active" : ""}`}
                    onClick={() => setCalendarView("dates")}
                  >
                    Exact dates
                  </button>
                  <button
                    className={`mobile-calendar-tab ${calendarView === "flexible" ? "active" : ""}`}
                    onClick={() => setCalendarView("flexible")}
                  >
                    I'm flexible
                  </button>
                </div>

                {calendarView === "dates" && (
                  <div className="mobile-calendar-container">
                    <div className="mobile-calendar-header">
                      <button
                        className="mobile-calendar-nav"
                        onClick={() => {
                          const newDate = new Date(mobileCalendarDate)
                          newDate.setMonth(newDate.getMonth() - 1)
                          setMobileCalendarDate(newDate)
                        }}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="15,18 9,12 15,6"></polyline>
                        </svg>
                      </button>
                      <div className="mobile-calendar-title">
                        {monthNames[mobileCalendarDate.getMonth()]} {mobileCalendarDate.getFullYear()}
                      </div>
                      <button
                        className="mobile-calendar-nav"
                        onClick={() => {
                          const newDate = new Date(mobileCalendarDate)
                          newDate.setMonth(newDate.getMonth() + 1)
                          setMobileCalendarDate(newDate)
                        }}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="9,18 15,12 9,6"></polyline>
                        </svg>
                      </button>
                    </div>

                    <div className="mobile-calendar-grid">
                      <div className="calendar-grid">
                        <div className="day-headers">
                          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
                            <div key={index} className="day-header">
                              {day}
                            </div>
                          ))}
                        </div>
                        <div className="days-grid">
                          {generateCalendar(mobileCalendarDate.getFullYear(), mobileCalendarDate.getMonth()).map(
                            (date, index) => (
                              <div
                                key={index}
                                className={`calendar-day ${date ? "clickable" : "empty"} ${date && isDateSelected(date) ? "selected" : ""
                                  } ${date && isDateInRange(date) ? "in-range" : ""} ${date && date < currentDate ? "past" : ""
                                  }`}
                                onClick={() => date && date >= currentDate && handleDateClick(date)}
                              >
                                {date ? date.getDate() : ""}
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {calendarView === "flexible" && (
                  <div className="mobile-flexible-view">
                    <div className="mobile-stay-duration-section">
                      <h3 className="section-title">How long would you like to stay?</h3>
                      <div className="mobile-duration-options">
                        <button
                          className={`mobile-duration-option ${stayDuration === "weekend" ? "active" : ""}`}
                          onClick={() => setStayDuration("weekend")}
                        >
                          Weekend stay
                        </button>
                        <button
                          className={`mobile-duration-option ${stayDuration === "week" ? "active" : ""}`}
                          onClick={() => setStayDuration("week")}
                        >
                          1 week
                        </button>
                        <button
                          className={`mobile-duration-option ${stayDuration === "month" ? "active" : ""}`}
                          onClick={() => setStayDuration("month")}
                        >
                          1 month
                        </button>
                      </div>
                    </div>

                    <div className="mobile-month-selection-section">
                      <h3 className="section-title">When do you want to go?</h3>

                      <div className="mobile-flexible-calendar">
                        <div className="mobile-flexible-calendar-header">
                          <button
                            className="mobile-flexible-nav"
                            onClick={() => setMobileFlexibleYear(mobileFlexibleYear - 1)}
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <polyline points="15,18 9,12 15,6"></polyline>
                            </svg>
                          </button>
                          <div className="mobile-flexible-title">{mobileFlexibleYear}</div>
                          <button
                            className="mobile-flexible-nav"
                            onClick={() => setMobileFlexibleYear(mobileFlexibleYear + 1)}
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <polyline points="9,18 15,12 9,6"></polyline>
                            </svg>
                          </button>
                        </div>

                        <div className="mobile-flexible-months-grid">
                          {Array.from({ length: 12 }, (_, index) => (
                            <div
                              key={index}
                              className={`mobile-flexible-month-card ${stayDuration === "month" && selectedMonth === index ? "selected" : ""
                                }`}
                              onClick={() => setSelectedMonth(index)}
                            >
                              <div className="mobile-flexible-month-name">{monthNames[index]}</div>
                              <div className="mobile-flexible-month-year">{mobileFlexibleYear}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {activeSection === "guests" && (
              <div className="mobile-guests-content">
                <div className="mobile-guest-row">
                  <div className="guest-info">
                    <span className="mobile-guest-type">Adults</span>
                    <span className="mobile-guest-description">13 and above</span>
                  </div>
                  <div className="mobile-guest-controls">
                    <button
                      className="mobile-guest-button"
                      onClick={() => handleGuestChange("adults", false)}
                      disabled={guests.adults <= 1}
                    >
                      -
                    </button>
                    <span className="mobile-guest-count">{guests.adults}</span>
                    <button className="mobile-guest-button" onClick={() => handleGuestChange("adults", true)}>
                      +
                    </button>
                  </div>
                </div>

                <div className="mobile-guest-row">
                  <div className="guest-info">
                    <span className="mobile-guest-type">Children</span>
                    <span className="mobile-guest-description">2-12</span>
                  </div>
                  <div className="mobile-guest-controls">
                    <button
                      className="mobile-guest-button"
                      onClick={() => handleGuestChange("children", false)}
                      disabled={guests.children <= 0}
                    >
                      -
                    </button>
                    <span className="mobile-guest-count">{guests.children}</span>
                    <button className="mobile-guest-button" onClick={() => handleGuestChange("children", true)}>
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mobile-modal-footer">
            <button className="mobile-action-button" onClick={() => setActiveSection(null)}>
              {getActionButtonText()}
            </button>
          </div>
        </div>
      </PopupPortal>
    )
  }

  return (
    <>
      <div className="searchbar-bg" style={{ marginBottom: "15px" }}>
        <div className="search-container">
          <div className="search-bar" ref={searchBarRef}>
            {/* Mobile 2x2 Grid Layout */}
            {isMobile ? (
              <>
                {/* Top Row - Location and Guests */}
                <div
                  className={`search-section ${activeSection === "location" ? "active" : ""}`}
                  onClick={() => setActiveSection(activeSection === "location" ? null : "location")}
                >
                  <div className="section-content">
                    <label>Where</label>
                    <span className="date-text">{location || "United States"}</span>
                  </div>
                </div>

                <div
                  className={`search-section guests-section ${activeSection === "guests" ? "active" : ""}`}
                  onClick={() => setActiveSection(activeSection === "guests" ? null : "guests")}
                >
                  <div className="section-content">
                    <label>Who</label>
                    <span className="guest-text">Guests</span>
                  </div>
                </div>

                {/* Bottom Row - When Section */}
                {calendarView === "flexible" ? (
                  <div
                    className={`search-section when-section ${activeSection === "when" ? "active" : ""}`}
                    onClick={() => setActiveSection(activeSection === "when" ? null : "when")}
                  >
                    <div className="section-content">
                      <label>When</label>
                      <span className="date-text">{getWhenText()}</span>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`search-section when-section ${activeSection === "checkin" || activeSection === "checkout" ? "active" : ""}`}
                    onClick={() =>
                      setActiveSection(
                        activeSection === "checkin" ? "checkin" : activeSection === "checkout" ? "checkout" : "checkin",
                      )
                    }
                  >
                    <div className="section-content">
                      <label>When</label>
                      <span className="date-text">
                        {checkIn && checkOut
                          ? `${formatDate(checkIn)} - ${formatDate(checkOut)}`
                          : checkIn
                            ? formatDate(checkIn)
                            : "Anytime"}
                      </span>
                    </div>
                  </div>
                )}

                {/* Notification Bar */}

                <button className="search-button" onClick={handleSearch}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                </button>
              </>
            ) : (
              <>
                {/* Desktop Layout */}
                {/* Location Section */}
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
                      onChange={(e) => handleLocationSearch(e.target.value)}
                      className="location-input"
                    />
                  </div>
                </div>

                <div className="divider"></div>

                {/* When Section - replaces Check-in/Check-out */}
                <div
                  className={`search-section when-section ${activeSection === "when" ? "active" : ""}`}
                  onClick={() => setActiveSection(activeSection === "when" ? null : "when")}
                >
                  <div className="section-content">
                    <label>When</label>
                    <span className="date-text">
                      {checkIn && checkOut
                        ? `${formatDate(checkIn)} - ${formatDate(checkOut)}`
                        : checkIn
                          ? formatDate(checkIn)
                          : "Add dates"}
                    </span>
                  </div>
                </div>

                <div className="divider"></div>

                {/* Guests Section */}
                <div
                  className={`search-section guests-section ${activeSection === "guests" ? "active" : ""}`}
                  onClick={() => setActiveSection(activeSection === "guests" ? null : "guests")}
                >
                  <div className="section-content">
                    <label>Who</label>
                    <span className="guest-text">{totalGuests > 0 ? formatGuestText() : "Add guests"}</span>
                  </div>
                </div>
                <div className="divider"></div>
                <button className="search-button" onClick={handleSearch}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Desktop Dropdowns - Positioned relative to search bar */}
          {!isMobile && (
            <>
              {/* Location Dropdown */}
              {popupStyles.location && (
                <PopupPortal>
                  <div className="location-dropdown" ref={popupRef} style={popupStyles.location}>
                    <div className="location-header">
                      <h3>Suggested destinations</h3>
                    </div>
                    <div className="destinations-list">
                      {filteredDestinations.map((destination) => (
                        <div
                          key={destination.id}
                          className="destination-item"
                          onClick={() => handleDestinationSelect(destination)}
                        >
                          <div className="destination-icon">{renderIcon(destination.icon)}</div>
                          <div className="destination-info">
                            <div className="destination-name">{destination.name}</div>
                            <div className="destination-description">{destination.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </PopupPortal>
              )}

              {/* Calendar Dropdown */}
              {popupStyles.calendar && (
                <PopupPortal>
                  <div className="calendar-dropdown" ref={popupRef} style={popupStyles.calendar}>
                    <div className="calendar-tabs">
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

                    {calendarView === "dates" && (
                      <>
                        <div className="calendar-grid-container">
                          <div className="calendar-month">
                            <h3 className="month-title">
                              {monthNames[currentMonth]} {currentYear}
                            </h3>
                            <div className="calendar-grid">
                              <div className="day-headers">
                                {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                                  <div key={index} className="day-header">
                                    {day}
                                  </div>
                                ))}
                              </div>
                              <div className="days-grid">
                                {generateCalendar(currentYear, currentMonth).map((date, index) => (
                                  <div
                                    key={index}
                                    className={`calendar-day ${date ? "clickable" : "empty"} ${date && isDateSelected(date) ? "selected" : ""
                                      } ${date && isDateInRange(date) ? "in-range" : ""} ${date && date < currentDate ? "past" : ""
                                      }`}
                                    onClick={() => date && date >= currentDate && handleDateClick(date)}
                                  >
                                    {date ? date.getDate() : ""}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="calendar-month">
                            <h3 className="month-title">
                              {monthNames[nextMonth]} {nextYear}
                            </h3>
                            <div className="calendar-grid">
                              <div className="day-headers">
                                {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                                  <div key={index} className="day-header">
                                    {day}
                                  </div>
                                ))}
                              </div>
                              <div className="days-grid">
                                {generateCalendar(nextYear, nextMonth).map((date, index) => (
                                  <div
                                    key={index}
                                    className={`calendar-day ${date ? "clickable" : "empty"} ${date && isDateSelected(date) ? "selected" : ""
                                      } ${date && isDateInRange(date) ? "in-range" : ""}`}
                                    onClick={() => date && handleDateClick(date)}
                                  >
                                    {date ? date.getDate() : ""}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Date Flexibility Options */}
                        <div className="date-flexibility">
                          <button
                            className={`flexibility-option ${dateFlexibility === "exact" ? "active" : ""}`}
                            onClick={() => setDateFlexibility("exact")}
                          >
                            Exact dates
                          </button>
                          <button
                            className={`flexibility-option ${dateFlexibility === "1" ? "active" : ""}`}
                            onClick={() => setDateFlexibility("1")}
                          >
                            ± 1 day
                          </button>
                          <button
                            className={`flexibility-option ${dateFlexibility === "2" ? "active" : ""}`}
                            onClick={() => setDateFlexibility("2")}
                          >
                            ± 2 days
                          </button>
                          <button
                            className={`flexibility-option ${dateFlexibility === "3" ? "active" : ""}`}
                            onClick={() => setDateFlexibility("3")}
                          >
                            ± 3 days
                          </button>
                          <button
                            className={`flexibility-option ${dateFlexibility === "7" ? "active" : ""}`}
                            onClick={() => setDateFlexibility("7")}
                          >
                            ± 7 days
                          </button>
                          <button
                            className={`flexibility-option ${dateFlexibility === "14" ? "active" : ""}`}
                            onClick={() => setDateFlexibility("14")}
                          >
                            ± 14 days
                          </button>
                        </div>
                      </>
                    )}

                    {calendarView === "flexible" && (
                      <div className="flexible-view">
                        <div className="stay-duration-section">
                          <h3 className="section-title">{getStayDurationTitle()}</h3>
                          <div className="duration-options">
                            <button
                              className={`duration-option ${stayDuration === "weekend" ? "active" : ""}`}
                              onClick={() => setStayDuration("weekend")}
                            >
                              Weekend
                            </button>
                            <button
                              className={`duration-option ${stayDuration === "week" ? "active" : ""}`}
                              onClick={() => setStayDuration("week")}
                            >
                              Week
                            </button>
                            <button
                              className={`duration-option ${stayDuration === "month" ? "active" : ""}`}
                              onClick={() => setStayDuration("month")}
                            >
                              Month
                            </button>
                          </div>
                        </div>

                        <div className="month-selection-section">
                          <h3 className="section-title">{getGoTitle()}</h3>
                          <div className="month-cards-container">
                            <div className="month-cards">
                              {[6, 7, 8, 9, 10, 11].map((monthIndex) => (
                                <div
                                  key={monthIndex}
                                  className={`month-card ${stayDuration === "month" && selectedMonth === monthIndex ? "selected" : ""
                                    }`}
                                  onClick={() => setSelectedMonth(monthIndex)}
                                >
                                  <div className="month-icon">
                                    <svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                    >
                                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                      <line x1="16" y1="2" x2="16" y2="6"></line>
                                      <line x1="8" y1="2" x2="8" y2="6"></line>
                                      <line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                  </div>
                                  <div className="month-name">{monthNames[monthIndex]}</div>
                                  <div className="month-year">2025</div>
                                </div>
                              ))}
                            </div>
                            <button className="month-nav-arrow">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <polyline points="9,18 15,12 9,6"></polyline>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </PopupPortal>
              )}

              {/* Guest Dropdown */}
              {popupStyles.guests && (
                <PopupPortal>
                  <div className="guests-dropdown" ref={popupRef} style={popupStyles.guests}>
                    <div className="guest-row">
                      <div className="guest-info">
                        <span className="guest-type">Adults</span>
                      </div>
                      <div className="guest-controls">
                        <button
                          className="guest-button"
                          onClick={() => handleGuestChange("adults", false)}
                          disabled={guests.adults <= 1}
                        >
                          -
                        </button>
                        <span className="guest-count">{guests.adults}</span>
                        <button className="guest-button" onClick={() => handleGuestChange("adults", true)}>
                          +
                        </button>
                      </div>
                    </div>

                    <div className="guest-row">
                      <div className="guest-info">
                        <span className="guest-type">Children</span>
                      </div>
                      <div className="guest-controls">
                        <button
                          className="guest-button"
                          onClick={() => handleGuestChange("children", false)}
                          disabled={guests.children <= 0}
                        >
                          -
                        </button>
                        <span className="guest-count">{guests.children}</span>
                        <button className="guest-button" onClick={() => handleGuestChange("children", true)}>
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </PopupPortal>
              )}
            </>
          )}

          {/* Mobile Modal */}
          {renderMobileModal()}
        </div>
        {/* Overlay */}
        {activeSection && <div className="overlay" onClick={() => setActiveSection(null)}></div>}
      </div>
    </>
  )
}
