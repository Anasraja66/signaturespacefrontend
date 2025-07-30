"use client"

import { Routes, Route } from "react-router-dom"
import { useState } from "react"
import HomePage from "./home/page.jsx"
import PropertyManagementPage from "./property-management/page.jsx"
import AreasOfOurHomesPage from "./areas-of-our-homes/page.jsx"
import PropertyDetailsPage from "./property-details/page.jsx"
import Reservation from "./reservation/page.jsx"
import RentalsSection from "./home/components/RentalsSection.jsx"
import Blog from "./blog/page.jsx"


function RentalsWrapper({ initialTab }) {
  const [activeRentalTab, setActiveRentalTab] = useState(initialTab)
  return (
    <RentalsSection
      activeRentalTab={activeRentalTab}
      setActiveRentalTab={setActiveRentalTab}
    />
  )
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/areas-of-our-homes" element={<AreasOfOurHomesPage />} />
        <Route path="/listing" element={<AreasOfOurHomesPage />} />
        <Route path="/property-details" element={<PropertyDetailsPage />} />
        <Route path="/property-management" element={<PropertyManagementPage />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/rentals/monthly" element={<HomePage />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </div>
  )
}

export default App
