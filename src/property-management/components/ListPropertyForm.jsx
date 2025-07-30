"use client"

import { useState } from "react"

export default function ListPropertyForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneCountryCode: "+92",
    phoneNumber: "",
    city: "",
    propertyType: "",
    noOfBedrooms: "",
    furnishingStatus: "",
    buildingName: "",
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Add form submission logic here (e.g., API call)
    alert("Form submitted! We will get back to you soon.")
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneCountryCode: "+92",
      phoneNumber: "",
      city: "",
      propertyType: "",
      noOfBedrooms: "",
      furnishingStatus: "",
      buildingName: "",
      message: "",
    })
  }

  return (
    <section id="list-property-form" className="list-property-form-section">
      <div className="container">
        <h2>List Your Property Details</h2>
        <form onSubmit={handleSubmit} className="property-form">
          <div className="form-group">
            <label htmlFor="firstName">First name*</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last name*</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email*</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone number*</label>
            <div className="phone-input-group">
              <select
                id="phoneCountryCode"
                name="phoneCountryCode"
                value={formData.phoneCountryCode}
                onChange={handleChange}
              >
                <option value="+92">Pakistan (+92)</option>
                <option value="+971">UAE (+971)</option>
                {/* Add more country codes as needed */}
              </select>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="city">City*</label>
            <select id="city" name="city" value={formData.city} onChange={handleChange} required>
              <option value="">Please Select</option>
              <option value="Dubai">Dubai</option>
              <option value="Abu Dhabi">Abu Dhabi</option>
              <option value="Sharjah">Sharjah</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="propertyType">Property Type*</label>
            <select
              id="propertyType"
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              required
            >
              <option value="">Please Select</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Hotel Apartment">Hotel Apartment</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="noOfBedrooms">No of Bedrooms*</label>
            <select
              id="noOfBedrooms"
              name="noOfBedrooms"
              value={formData.noOfBedrooms}
              onChange={handleChange}
              required
            >
              <option value="">Please Select</option>
              <option value="Studio">Studio</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4+">4+</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="furnishingStatus">Furnishing Status*</label>
            <select
              id="furnishingStatus"
              name="furnishingStatus"
              value={formData.furnishingStatus}
              onChange={handleChange}
              required
            >
              <option value="">Please Select</option>
              <option value="Furnished">Furnished</option>
              <option value="Unfurnished">Unfurnished</option>
              <option value="Semi-Furnished">Semi-Furnished</option>
            </select>
          </div>
          <div className="form-group full-width">
            <label htmlFor="buildingName">Building Name</label>
            <input
              type="text"
              id="buildingName"
              name="buildingName"
              value={formData.buildingName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group full-width">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" value={formData.message} onChange={handleChange}></textarea>
          </div>
          {/* <div className="recaptcha-container">
            <div className="recaptcha-box">reCAPTCHA</div>
            <div className="recaptcha-info">
              protected by reCAPTCHA <br />
              <a href="#">Privacy</a> - <a href="#">Terms</a>
            </div>
          </div> */}
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </section>
  )
}
