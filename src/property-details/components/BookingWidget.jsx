"use client"
import { renderIcon } from "../../utils/renderIcon"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import BookingDatePicker from "./BookingDatePicker"
export default function BookingWidget({ pricePerNight, checkInDate, checkOutDate, setCheckInDate = () => {}, setCheckOutDate = () => {}, propertyData, bookedDates = [], guests, setGuests }) {  // Added default no-op functions for setters
  const navigate = useNavigate()

  // Remove internal state for dates, use props instead
  // Remove internal guests state, use props instead
  // const [guests, setGuests] = useState(1)

  const calculateNights = (start, end) => {
    if (!start || !end) return 0
    const startDate = new Date(start)
    const endDate = new Date(end)
    const diffTime = Math.abs(endDate - startDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  // Helper function to check if a date is booked
  const isDateBooked = (dateStr) => {
    const date = new Date(dateStr);
    date.setHours(0, 0, 0, 0);
    for (const range of bookedDates) {
      const startDate = new Date(range.startDate);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(range.endDate);
      endDate.setHours(0, 0, 0, 0);
      if (date >= startDate && date <= endDate) {
        return true;
      }
    }
    return false;
  };

  const handleCheckInChange = (value) => {
    if (value) {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        alert("Check-in date cannot be in the past.");
        return;
      }
      if (isDateBooked(value)) {
        alert("Selected check-in date is not available.");
        return;
      }
      if (checkOutDate && new Date(checkOutDate) <= selectedDate) {
        alert("Check-in date must be before check-out date.");
        return;
      }
      setCheckInDate(value);
    } else {
      setCheckInDate(null);
    }
  };

  const handleCheckOutChange = (value) => {
    if (value) {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        alert("Check-out date cannot be in the past.");
        return;
      }
      if (isDateBooked(value)) {
        alert("Selected check-out date is not available.");
        return;
      }
      if (checkInDate && selectedDate <= new Date(checkInDate)) {
        alert("Check-out date must be after check-in date.");
        return;
      }
      setCheckOutDate(value);
    } else {
      setCheckOutDate(null);
    }
  };

  const totalNights = calculateNights(checkInDate, checkOutDate)
  const totalPrice = pricePerNight * totalNights

  // Helper to format date to YYYY-MM-DD for input[type=date]
  const formatDateForInput = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const day = d.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Format dates for display with day included
  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return "Add date";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" });
  };

  const formattedCheckIn = formatDisplayDate(checkInDate);
  const formattedCheckOut = formatDisplayDate(checkOutDate);

  const handleReserve = () => {
    if (!checkInDate || !checkOutDate) {
      alert("Please select check-in and check-out dates.");
      return;
    }
    if (new Date(checkOutDate).getTime() <= new Date(checkInDate).getTime()) {
      alert("Check-out date must be after check-in date.");
      return;
    }
    if (guests < 1) {
      alert("Please select at least one guest.");
      return;
    }
    navigate("/reservation", { state: { propertyId: propertyData.id, checkInDate, checkOutDate, pricePerNight, guests } });
  };

  return (
    <div className="card booking-widget">
      <div className="price-summary">
        ${totalPrice} <span>for {totalNights} nights</span>
      </div>
      <div className="booking-input-group">
        <BookingDatePicker
          label="CHECK-IN"
          id="checkin"
          value={checkInDate}
          onChange={handleCheckInChange}
          minDate={new Date().toISOString().split("T")[0]}
          maxDate={formattedCheckOut || ""}
          bookedDates={bookedDates}
        />
        <BookingDatePicker
          label="CHECKOUT"
          id="checkout"
          value={checkOutDate}
          onChange={handleCheckOutChange}
          minDate={formattedCheckIn || new Date().toISOString().split("T")[0]}
          bookedDates={bookedDates}
        />
      </div>
      <div className="booking-input-with-icon">
        <div className="input-text">
          <label className="input-label" htmlFor="guests">GUESTS</label>
          <input
            id="guests"
            type="number"
            className="input-value"
            value={guests}
            onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value)))}
            min="1"
          />
        </div>
        {renderIcon("ChevronDown")}
      </div>
      <button className="reserve-btn" onClick={handleReserve}>
        Reserve
      </button>
      <p className="charge-info">You won't be charged yet</p>
    </div>
  )
}
