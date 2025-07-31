"use client"

import { useState } from "react"
import { CheckCircle } from "lucide-react"
import "./styles.css"

export default function BookingForm() {
  const [bookingId, setBookingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  // Form state
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [guests, setGuests] = useState(1)
  const [children, setChildren] = useState(0)
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [address, setAddress] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("Washington")
  const [country, setCountry] = useState("United States")
  const [deals, setDeals] = useState(true)

  // Example: property and user can be passed as props or context
  const property = 1
  const user = 1

  // Use backend-required field names!
  const bookingData = {
    property,
    user,
    user_name: `${firstName} ${lastName}`.trim(),
    user_email: email,
    user_phone: phone,
    address,
    zip_code: zipCode,
    city,
    state,
    country,
    check_in_date: checkIn,
    check_out_date: checkOut,
    guests,
    children,
    total_price: "15000.00"
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)
    try {
      const response = await fetch("http://localhost:8000/api/bookings/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData)
      })
      if (!response.ok) {
        const errorData = await response.json()
        setError(JSON.stringify(errorData))
        return
      }
      const result = await response.json()
      setBookingId(result.id)
      setSuccess(true)
    } catch (err) {
      setError(err.message || "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="confirmation-content text-center py-10">
        <CheckCircle size={80} className="mx-auto text-green-500 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Booking Confirmed!</h1>
        <p className="mb-4">Your booking has been successfully completed. A confirmation email has been sent.</p>
        <button className="primary-button" onClick={() => window.location.href = "/"}>
          Go to Home
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">Book Your Stay</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="firstName">First Name *</label>
          <input id="firstName" required value={firstName} onChange={e => setFirstName(e.target.value)} className="form-input" />
        </div>
        <div>
          <label htmlFor="lastName">Last Name *</label>
          <input id="lastName" required value={lastName} onChange={e => setLastName(e.target.value)} className="form-input" />
        </div>
        <div>
          <label htmlFor="email">Email *</label>
          <input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} className="form-input" />
        </div>
        <div>
          <label htmlFor="phone">Phone *</label>
          <input id="phone" type="tel" required value={phone} onChange={e => setPhone(e.target.value)} className="form-input" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="checkIn">Check-in *</label>
          <input id="checkIn" type="date" required value={checkIn} onChange={e => setCheckIn(e.target.value)} className="form-input" />
        </div>
        <div>
          <label htmlFor="checkOut">Check-out *</label>
          <input id="checkOut" type="date" required value={checkOut} onChange={e => setCheckOut(e.target.value)} className="form-input" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="guests">Guests *</label>
          <input id="guests" type="number" min={1} required value={guests} onChange={e => setGuests(Number(e.target.value))} className="form-input" />
        </div>
        <div>
          <label htmlFor="children">Children</label>
          <input id="children" type="number" min={0} value={children} onChange={e => setChildren(Number(e.target.value))} className="form-input" />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="address">Address *</label>
        <input id="address" required value={address} onChange={e => setAddress(e.target.value)} className="form-input" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label htmlFor="zipCode">ZIP Code *</label>
          <input id="zipCode" required value={zipCode} onChange={e => setZipCode(e.target.value)} className="form-input" />
        </div>
        <div>
          <label htmlFor="city">City *</label>
          <input id="city" required value={city} onChange={e => setCity(e.target.value)} className="form-input" />
        </div>
        <div>
          <label htmlFor="country">Country *</label>
          <select value={country} onChange={e => setCountry(e.target.value)} className="form-select">
            <option>United States</option>
            <option>Canada</option>
            <option>United Kingdom</option>
          </select>
        </div>
      </div>
      <div className="mb-6">
        <label htmlFor="state">State *</label>
        <select value={state} onChange={e => setState(e.target.value)} className="form-select">
          <option>Washington</option>
          <option>California</option>
          <option>New York</option>
          <option>Texas</option>
        </select>
      </div>
      <div className="checkbox-group mb-4">
        <input type="checkbox" id="deals" checked={deals} onChange={e => setDeals(e.target.checked)} />
        <label htmlFor="deals">Yes, I wish to receive exclusive deals by email</label>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="primary-button w-full py-3 text-lg font-semibold text-white rounded-lg bg-gradient-to-r from-yellow-600 to-yellow-400 hover:from-yellow-400 hover:to-yellow-600 transition-all duration-200"
      >
        {loading ? "Processing..." : <>Book Now</>}
      </button>
      {error && <p className="text-center text-sm text-red-500 mt-2">{error}</p>}
      {bookingId && <p className="text-center text-sm text-green-600 mt-2">Booking created! ID: {bookingId}</p>}
      <p className="text-center text-sm text-gray-500 mt-2">You won't be charged yet</p>
    </form>
  )
}