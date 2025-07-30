
"use client";

import React, { useState, useRef } from "react";

const getDateString = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  return year + "-" + month + "-" + day;
};

// Helper to check if a date is booked
const isDateBooked = (dateStr, bookedDates) => {
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

export default function BookingDatePicker({
  label,
  id,
  value,
  onChange,
  minDate,
  maxDate,
  bookedDates = [],
}) {
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const val = e.target.value;
    if (!val) {
      setError("");
      onChange(null);
      return;
    }
    const selectedDate = new Date(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setError("Date cannot be in the past.");
      return;
    }
    if (isDateBooked(val, bookedDates)) {
      setError("Selected date is not available.");
      return;
    }
    if (minDate && selectedDate < new Date(minDate)) {
      setError("Date cannot be before " + minDate);
      return;
    }
    if (maxDate && selectedDate > new Date(maxDate)) {
      setError("Date cannot be after " + maxDate);
      return;
    }
    setError("");
    onChange(val);
  };

  const handleInputClick = () => {
    if (inputRef.current) {
      inputRef.current.showPicker?.(); // For browsers that support showPicker()
      inputRef.current.focus();
    }
  };

  return (
    <div className="booking-input">
      <label className="input-label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type="date"
        className="input-value"
        value={getDateString(value)}
        onChange={handleChange}
        min={minDate}
        max={maxDate}
        ref={inputRef}
        onClick={handleInputClick}
      />
      {error && <div className="input-error">{error}</div>}
    </div>
  );
}
