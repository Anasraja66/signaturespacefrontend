"use client"

import { useState, useRef, useCallback, useEffect, useMemo } from "react"
import { useLocation } from "react-router-dom"
import ImageGallery from "./components/ImageGallery"
import PropertyOverview from "./components/PropertyOverview"
// import RoomsSection from "./components/RoomsSection"
import AboutStay from "./components/AboutStay"
import BookingWidget from "./components/BookingWidget"
import LocationSection from "./components/LocationSection"
import ReviewsSection from "./components/ReviewsSection"
import AgentCard from "../home/components/AgentCard"
import AgentDetailModal from "../home/components/AgentDetailModal"
import AvailabilitySection from "./components/AvailabilitySection"
import StillLookingCard from "./components/StillLookingCard"
import { dummyProperties } from "../utils/dummyData"
import HomeHeader from "../home/components/HomeHeader"
import Footer from "../home/components/Footer"

import "../globals.css"
import "./styles/property-details.css"



export default function PropertyDetailsPage() {
  const yourStayRef = useRef(null);
  const locationRef = useRef(null);
  const reviewsRef = useRef(null);
  const availabilityRef = useRef(null);
  const cancellationRef = useRef(null);

  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState(1);

  const [showModal, setShowModal] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState(null)

  const handleDatesChange = useCallback((inDate, outDate) => {
    setCheckInDate(inDate);
    setCheckOutDate(outDate);
  }, []);

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Get property from navigation state or fetch from backend
  const location = useLocation();
  const [propertyData, setPropertyData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Try to get property from navigation state
    if (location.state && location.state.property) {
      setPropertyData(location.state.property);
      setLoading(false);
    } else {
      // If not in state, try to get id from query params and fetch from API
      const searchParams = new URLSearchParams(window.location.search);
      const propertyId = searchParams.get("id");
      if (propertyId) {
        fetch(`http://localhost:8000/api/properties/${propertyId}/`)
          .then(res => res.json())
          .then(data => {
            setPropertyData(data);
            setLoading(false);
          })
          .catch(() => setLoading(false));
      } else {
        setLoading(false);
      }
    }
  }, [location]);

  const [bookedDates, setBookedDates] = useState([]);

  useEffect(() => {
    if (!propertyData?.id) return;

    fetch(`http://localhost:8000/api/bookings/?property=${propertyData.id}`)
      .then(res => res.json())
      .then(data => {
        // data should be an array of bookings
        const dates = [];
        data.forEach(booking => {
          const start = new Date(booking.check_in_date);
          const end = new Date(booking.check_out_date);
          for (
            let d = new Date(start);
            d <= end;
            d.setDate(d.getDate() + 1)
          ) {
            dates.push(new Date(d).toISOString().split("T")[0]);
          }
        });
        setBookedDates(dates);
      })
      .catch(() => setBookedDates([]));
  }, [propertyData]);

  // AgentCard props and logic
  const [cardsVisible, setCardsVisible] = useState(false);

  useEffect(() => {
    // Show agent cards after mount for animation
    setCardsVisible(true);
  }, []);

  // Delay for staggered animation
  const getItemDelay = useCallback((index) => index * 100, []);

  // Simple star icon renderer
  const renderIcon = useCallback((type, size = 16, color = "currentColor") => {
    if (type === "star") {
      return (
        <svg width={size} height={size} fill={color} viewBox="0 0 20 20"></svg>
      );
    }
    return null;
  }, [scrollToSection]);

  // Handler for AgentCard to open modal
  const handleContactAgent = (agent) => {
    setSelectedAgent(agent);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAgent(null);
  };

  if (loading) {
    return <div>Loading property details...</div>;
  }
  if (!propertyData) {
    return <div>Property not found.</div>;
  }

  const agents = propertyData.agent ? [propertyData.agent] : [];

  return (
    <div>
      <HomeHeader />
      <ImageGallery images={propertyData.images} />
      <div className="tabs-row">
        <button className="tab-button" onClick={() => scrollToSection(yourStayRef)}>
          Your Stay
        </button>
        <button className="tab-button" onClick={() => scrollToSection(locationRef)}>
          Location
        </button>
        <button className="tab-button" onClick={() => scrollToSection(reviewsRef)}>
          Reviews
        </button>
        <button className="tab-button" onClick={() => scrollToSection(availabilityRef)}>
          Availability
        </button>
        <button className="tab-button" onClick={() => scrollToSection(cancellationRef)}>
          Cancellation
        </button>
      </div>

      <div className="content-layout">
        <div className="main-content-area">
          <div id="your-stay-section" ref={yourStayRef} className="">
            <PropertyOverview property={propertyData} />
            {/* <RoomsSection rooms={propertyData.rooms} additionalRooms={propertyData.additionalRooms} /> */}
            <AboutStay description={propertyData.description} />
          </div>

          <div id="location-section" ref={locationRef} className="">
            <LocationSection
              location={{
                lat: propertyData?.location?.lat ?? 24.8607,
                lng: propertyData?.location?.lng ?? 67.0011
              }}
              locationDetails={propertyData?.locationDetails}
              isLoaded={true} // Or use a state for Google Maps API loading
            />
          </div>

          <div id="reviews-section" ref={reviewsRef} className="">
            <ReviewsSection reviews={propertyData.reviews} />
          </div>

          <div id="availability-section" ref={availabilityRef} className="">
            <AvailabilitySection
              checkInDate={checkInDate ? new Date(checkInDate) : null}
              checkOutDate={checkOutDate ? new Date(checkOutDate) : null}
              setCheckInDate={setCheckInDate}
              setCheckOutDate={setCheckOutDate}
              bookedDates={bookedDates}
            />
          </div>

          {/* <div id="cancellation-section" ref={cancellationRef} className="">
            <h2>Cancellation Policy</h2>
            <p>{propertyData.cancellationPolicy}</p>
          </div> */}
        </div>
        <div className="sidebar-area">
          <BookingWidget
            pricePerNight={propertyData.price}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            setCheckInDate={setCheckInDate}
            setCheckOutDate={setCheckOutDate}
            bookedDates={bookedDates}
            propertyData={propertyData}
            guests={guests}
            setGuests={setGuests}
          />
          <AgentCard
            agents={agents}
            cardsVisible={cardsVisible}
            getItemDelay={getItemDelay}
            renderIcon={renderIcon}
            handleContactAgent={handleContactAgent}
          />
        </div>
        <StillLookingCard />
      </div>
      <Footer />
      {showModal && <AgentDetailModal agent={selectedAgent} onClose={handleCloseModal} />}
    </div>
  );
}
