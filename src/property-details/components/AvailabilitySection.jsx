// app/property-details/components/AvailabilitySection.jsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { renderIcon } from "../utils.js"; // Assuming renderIcon is correctly implemented

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay(); // 0 for Sunday, 6 for Saturday

const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getMonthName = (date) => {
  return new Date(date).toLocaleDateString("en-US", { month: "long", year: "numeric" });
};

// Helper function to check if a date is within a booked range
const isDateBooked = (date, bookedDates) => {
  const checkDate = date.getTime();
  for (const range of bookedDates) {
    const startDate = new Date(range.startDate).setHours(0, 0, 0, 0);
    const endDate = new Date(range.endDate).setHours(0, 0, 0, 0);
    if (checkDate >= startDate && checkDate <= endDate) {
      return true;
    }
  }
  return false;
};


export default function AvailabilitySection({ checkInDate, checkOutDate, setCheckInDate, setCheckOutDate, bookedDates = [] }) { // Add bookedDates prop with default
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDateClick = useCallback(
    (year, month, day) => {
      const clickedDate = new Date(year, month, day);
      clickedDate.setHours(0, 0, 0, 0); // Normalize to start of day

      // Prevent selecting past or booked dates
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (clickedDate < today || isDateBooked(clickedDate, bookedDates)) {
        return; // Do nothing if date is in past or booked
      }

      if (!checkInDate || (checkInDate && checkOutDate)) {
        // If no dates selected, or both are selected, start new selection
        setCheckInDate(clickedDate);
        setCheckOutDate(null);
      } else if (checkInDate && !checkOutDate) {
        // If only check-in is selected
        if (clickedDate < checkInDate) {
          // If clicked date is before check-in, make it new check-in
          setCheckInDate(clickedDate);
          setCheckOutDate(null);
        } else if (clickedDate.getTime() === checkInDate.getTime()) {
          // If clicked date is same as check-in, clear both
          setCheckInDate(null);
          setCheckOutDate(null);
        } else {
          // Check if any booked dates are in the range being selected
          let foundBookedBetween = false;
          const tempEndDate = clickedDate; // The potential check-out date
          const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day

          for (let d = new Date(checkInDate.getTime() + oneDay); d < tempEndDate; d.setDate(d.getDate() + 1)) {
            if (isDateBooked(d, bookedDates)) {
              foundBookedBetween = true;
              break;
            }
          }

          if (foundBookedBetween) {
            // If a booked date is found between check-in and clicked date,
            // make the clicked date the new check-in and clear check-out.
            setCheckInDate(clickedDate);
            setCheckOutDate(null);
          } else {
            // Set as check-out if no booked dates are in between
            setCheckOutDate(clickedDate);
          }
        }
      }
    },
    [checkInDate, checkOutDate, bookedDates], // Add bookedDates to useCallback dependencies
  );

  const renderMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month); // 0 for Sunday

    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${year}-${month}-${i}`} className="day-cell empty" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const fullDate = new Date(year, month, day);
      fullDate.setHours(0, 0, 0, 0); // Normalize

      let className = "day-cell";
      const isDisabled = fullDate < today || isDateBooked(fullDate, bookedDates); // Disable past and booked dates

      if (isDisabled) {
        className += " disabled";
      }

      if (checkInDate && checkOutDate) {
        if (fullDate.getTime() === checkInDate.getTime()) {
          className += " selected-start";
        } else if (fullDate.getTime() === checkOutDate.getTime()) {
          className += " selected-end";
        } else if (fullDate > checkInDate && fullDate < checkOutDate) {
          // If a date is in range, but is booked, it shouldn't be selectable or look selected
          if (!isDisabled) { // Only add in-range if not disabled
            className += " in-range";
          }
        }
      } else if (checkInDate && fullDate.getTime() === checkInDate.getTime()) {
        className += " selected-start";
      }

      days.push(
        <div
          key={`${year}-${month}-${day}`}
          className={className}
          onClick={() => !isDisabled && handleDateClick(year, month, day)}
        >
          {day}
        </div>,
      );
    }

    return (
      <div className="month-calendar">
        <div className="month-name">{getMonthName(date)}</div>
        <div className="weekdays">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => (
            <div key={`${day}-${idx}`}>{day}</div>
          ))}
        </div>
        <div className="days-grid">{days}</div>
      </div>
    );
  };

  const handlePrevMonth = () => {
    // Prevent navigating to past months if all dates in the current month are past/booked
    const firstDayOfCurrentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    firstDayOfCurrentMonth.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (firstDayOfCurrentMonth > today) { // Only allow going back if the current month's first day is in the future
      setCurrentMonth((prev) => {
        const newMonth = new Date(prev);
        newMonth.setMonth(newMonth.getMonth() - 1);
        return newMonth;
      });
    }
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      newMonth.setMonth(newMonth.getMonth() + 1);
      return newMonth;
    });
  };

  const handleClearDates = () => {
    setCheckInDate(null);
    setCheckOutDate(null);
  };

  const calculateNights = (start, end) => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const numberOfNights = calculateNights(checkInDate, checkOutDate);
  const dateRangeText =
    checkInDate && checkOutDate ? `${formatDate(checkInDate)} - ${formatDate(checkOutDate)}` : "Select dates";

  const nextMonth = new Date(currentMonth);
  nextMonth.setMonth(nextMonth.getMonth() + 1);

  // Define today for use in JSX
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="card availability-section">
      <div className="nights-summary">
        {numberOfNights > 0 ? `${numberOfNights} nights in stay` : "Select your dates"}
      </div>
      <div className="date-range-summary">{dateRangeText}</div>

      <div className="calendar-navigation">
        <button
          onClick={handlePrevMonth}
          disabled={currentMonth.getMonth() < today.getMonth() && currentMonth.getFullYear() <= today.getFullYear()}
        >
          <ChevronLeftIcon size={20} />
        </button>
        <button onClick={handleNextMonth}>
          <ChevronRightIcon size={20} />
        </button>
      </div>

      <div className="calendar-grid-container">
        {renderMonth(currentMonth)}
        {!isMobileView && renderMonth(nextMonth)}
      </div>

      <div className="calendar-footer">
        <button className="clear-dates-btn" onClick={handleClearDates}>
          Clear dates
        </button>
      </div>
    </div>
  );
}
