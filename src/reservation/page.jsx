"use client"

import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import BookingCard from "./booking-card"
import LeftCard from "./left-card"
import { dummyProperties } from "../utils/dummyData"
import "./styles.css"

function Reservation() {
  const location = useLocation()
  const passedState = location.state || {}

  useEffect(() => {
    console.log("Reservation page location.state:", location.state)
  }, [location.state])

  const [currentStep, setCurrentStep] = useState("personal-details")

  // Lookup propertyData by id from dummyProperties
  const propertyData = passedState.propertyId
    ? dummyProperties.find((p) => p.id === passedState.propertyId) || dummyProperties[0]
    : dummyProperties[0]

  // Transform passedState to match BookingCard expected data shape
  const bookingData = {
    ...propertyData,
    checkIn: passedState.checkInDate || "",
    checkOut: passedState.checkOutDate || "",
    nights:
      passedState.checkInDate && passedState.checkOutDate
        ? Math.ceil((new Date(passedState.checkOutDate) - new Date(passedState.checkInDate)) / (1000 * 60 * 60 * 24))
        : 0,
    guestCount: passedState.guests || 0,
    pricePerNight: passedState.pricePerNight || propertyData.price || 0,
    totalPrice:
      passedState.pricePerNight && passedState.checkInDate && passedState.checkOutDate
        ? passedState.pricePerNight *
          Math.ceil((new Date(passedState.checkOutDate) - new Date(passedState.checkInDate)) / (1000 * 60 * 60 * 24))
        : 0,
    currency: "$",
    images: propertyData.images || ["/placeholder.svg"],
  }

  useEffect(() => {
    console.log("Booking data passed to BookingCard:", bookingData)
  }, [bookingData])

  const getStepData = (step) => {
    switch (step) {
      case "personal-details":
        return {
          step: "personal-details",
          title: "Start your booking",
          subtitle: "Enter your personal details",
        }
      case "payment-method":
        return {
          step: "payment-method",
          title: "Choose how to pay",
          subtitle: null,
        }
      case "payment-details":
        return {
          step: "payment-details",
          title: "Complete the payment",
          subtitle: null,
        }
      case "confirmation":
        return {
          step: "confirmation",
          title: "Booking Confirmed!",
          subtitle: null,
        }
      default:
        return {
          step: "personal-details",
          title: "Start your booking",
          subtitle: "Enter your personal details",
        }
    }
  }

  const handleNextStep = () => {
    switch (currentStep) {
      case "personal-details":
        setCurrentStep("payment-method")
        break
      case "payment-method":
        setCurrentStep("payment-details")
        break
      case "payment-details":
        setCurrentStep("confirmation")
        break
      default:
        break
    }
  }

  const handleStepClick = (step) => {
    setCurrentStep(step)
  }

  return (
    <div className="app">
      <LeftCard data={getStepData(currentStep)} onNext={handleNextStep} onStepClick={handleStepClick} />
      <BookingCard data={bookingData} />
    </div>
  )
}

export default Reservation
