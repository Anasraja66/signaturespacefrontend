import React, { useState } from "react";

export default function BookingForm({ propertyId, userId, onSuccess }) {
    const [form, setForm] = useState({
        guest_name: "",
        guest_first_name: "",
        guest_last_name: "",
        guest_email: "",
        guest_phone: "",
        address: "",
        zip_code: "",
        city: "",
        state: "",
        country: "",
        check_in: "",
        check_out: "",
        guests: 1,
        children: 0,
        total_price: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await fetch("http://localhost:8000/api/bookings/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    property: propertyId,
                    user: userId,
                    ...form
                })
            });
            if (!res.ok) throw new Error("Booking failed");
            setLoading(false);
            if (onSuccess) onSuccess();
            alert("Booking successful!");
        } catch (err) {
            setLoading(false);
            setError(err.message);
        }
    };
    return (
        <form onSubmit={handleSubmit} className="booking-form">
            <input name="guest_name" placeholder="Full Name" value={form.guest_name} onChange={handleChange} required />
            <input name="guest_first_name" placeholder="First Name" value={form.guest_first_name} onChange={handleChange} required />
            <input name="guest_last_name" placeholder="Last Name" value={form.guest_last_name} onChange={handleChange} required />
            <input name="guest_email" type="email" placeholder="Email" value={form.guest_email} onChange={handleChange} required />
            <input name="guest_phone" placeholder="Phone" value={form.guest_phone} onChange={handleChange} required />
            <input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
            <input name="zip_code" placeholder="ZIP Code" value={form.zip_code} onChange={handleChange} required />
            <input name="city" placeholder="City" value={form.city} onChange={handleChange} required />
            <input name="state" placeholder="State" value={form.state} onChange={handleChange} required />
            <input name="country" placeholder="Country" value={form.country} onChange={handleChange} required />
            <input name="check_in" type="date" value={form.check_in} onChange={handleChange} required />
            <input name="check_out" type="date" value={form.check_out} onChange={handleChange} required />
            <input name="guests" type="number" min="1" value={form.guests} onChange={handleChange} required />
            <input name="children" type="number" min="0" value={form.children} onChange={handleChange} />
            <input name="total_price" type="number" min="0" step="0.01" placeholder="Total Price" value={form.total_price} onChange={handleChange} required />
            <button type="submit" disabled={loading}>{loading ? "Booking..." : "Reserve"}</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
}
