import { useState } from "react"
import { Star, Check, Lock } from "lucide-react"

function BookingCard({ data }) {
  // Booking form state
  const [form, setForm] = useState({
    user_name: "",
    user_email: "",
    user_phone: "",
    guests: data.guests || 1,
    check_in_date: data.checkIn || "",
    check_out_date: data.checkOut || "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  // Handle booking form submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess("")
    setError("")
    try {
      const res = await fetch("http://localhost:8000/api/bookings/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          property: data.id || data.propertyId || 1,
          user_name: form.user_name,
          user_email: form.user_email,
          user_phone: form.user_phone,
          guests: form.guests,
          check_in_date: form.check_in_date,
          check_out_date: form.check_out_date,
        }),
      })
      if (!res.ok) throw new Error("Booking failed")
      setSuccess("Booking successful! Check your email for confirmation.")
      setForm({
        user_name: "",
        user_email: "",
        user_phone: "",
        guests: data.guests || 1,
        check_in_date: data.checkIn || "",
        check_out_date: data.checkOut || "",
      })
    } catch (err) {
      setError("Booking failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }
  const {
    propertyImage = "/placeholder.svg",
    propertySize = "",
    propertyType = "",
    guests = 0,
    bedrooms = 0,
    rating = 0,
    reviewCount = 0,
    location = "",
    checkIn = "",
    checkOut = "",
    nights = 0,
    guestCount = 0,
    pricePerNight = 0,
    totalPrice = 0,
    currency = "$",
    includedFees = [],
  } = data || {}

  // Helper to format price safely
  const formatPrice = (price) => {
    if (typeof price === "number") {
      return price.toLocaleString()
    }
    if (typeof price === "string") {
      return price
    }
    return "N/A"
  }

  // Helper to format date strings safely
  const formatDate = (date) => {
    if (!date) return ""
    if (typeof date === "string") return date
    if (date instanceof Date) return date.toLocaleDateString("en-US")
    return ""
  }

  return (
    <div className="booking-card">
      {/* Property Header */}
      <div className="property-header">
        <div className="property-image">
          <img src={data.images?.[0] || "/placeholder.svg"} alt="Property" />
        </div>
        <div className="property-info">
          <div className="property-title">
            {data.type} • {data.guests} guests • {data.bedrooms} bedrooms
          </div>
          <div className="rating">
            <Star className="star-icon filled" size={16} />
            <span className="rating-score">{data.rating}</span>
            <span className="review-count">({data.reviewCount})</span>
          </div>
          <div className="location">{data.location}</div>
        </div>
      </div>

      {/* Booking Details */}
      <div className="booking-details">
        <div className="dates">
          {formatDate(checkIn)} - {formatDate(checkOut)}, ({nights} nights)
        </div>
        <div className="guest-info">{guestCount} guests</div>
      </div>

      {/* Pricing */}
      <div className="pricing-section">
        <div className="price-row">
          <span>Price for {nights} nights</span>
        </div>
        <div className="total-row">
          <span className="total-label">Total</span>
          <span className="total-price">
            {currency} {formatPrice(totalPrice)} <span className="tax-info">Incl. taxes and fees</span>
          </span>
        </div>
      </div>

      {/* Booking Form */}
      <form className="booking-form" onSubmit={handleSubmit} style={{ marginTop: 24, marginBottom: 12, padding: 12, border: "1px solid #eee", borderRadius: 8 }}>
        <h4>Book this property</h4>
        <div style={{ marginBottom: 8 }}>
          <input name="user_name" type="text" placeholder="Your Name" value={form.user_name} onChange={handleChange} required style={{ width: "100%", padding: 8, marginBottom: 8 }} />
          <input name="user_email" type="email" placeholder="Email" value={form.user_email} onChange={handleChange} required style={{ width: "100%", padding: 8, marginBottom: 8 }} />
          <input name="user_phone" type="tel" placeholder="Phone" value={form.user_phone} onChange={handleChange} required style={{ width: "100%", padding: 8, marginBottom: 8 }} />
          <input name="guests" type="number" min="1" placeholder="Guests" value={form.guests} onChange={handleChange} required style={{ width: "100%", padding: 8, marginBottom: 8 }} />
          <input name="check_in_date" type="date" placeholder="Check-in" value={form.check_in_date} onChange={handleChange} required style={{ width: "100%", padding: 8, marginBottom: 8 }} />
          <input name="check_out_date" type="date" placeholder="Check-out" value={form.check_out_date} onChange={handleChange} required style={{ width: "100%", padding: 8, marginBottom: 8 }} />
        </div>
        <button type="submit" disabled={loading} style={{ padding: 10, width: "100%", background: "#222", color: "#fff", border: "none", borderRadius: 4 }}>
          {loading ? "Booking..." : "Reserve"}
        </button>
        {success && <div style={{ color: "green", marginTop: 8 }}>{success}</div>}
        {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
      </form>

      {/* Cancellation Policy */}
      <div className="policy-section">
        <button className="policy-button">
          <Lock size={16} />
          View cancellation policy
        </button>
      </div>
    </div>
  )
}

export default BookingCard
