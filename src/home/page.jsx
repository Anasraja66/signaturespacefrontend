// app/home/page.jsx
"use client"

import HomeHeader from "./components/HomeHeader"
import HeroSection from "./components/HeroSection"
import AreasSection from "./components/AreasSection"
import RentalsSection from "./components/RentalsSection"
import ListPropertySection from "./components/ListPropertySection"
import AgentsSection from "./components/AgentsSection"
import ReviewsSection from "./components/ReviewsSection"
import NewsletterSection from "./components/NewsletterSection"
import Footer from "./components/Footer"
// import "./styles/home.css"

import React, { useState, useRef } from "react";


export default function HomePage() {
  const [activeRentalTab, setActiveRentalTab] = useState("daily");
  const rentalsRef = useRef(null);

  const handleScrollToRentals = (tab) => {
    setActiveRentalTab(tab);
    if (rentalsRef.current) {
      rentalsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="App">
      <HomeHeader onSelectRentalTab={handleScrollToRentals} />
      <HeroSection />
      <AreasSection />
      <div ref={rentalsRef}>
        <RentalsSection
          activeRentalTab={activeRentalTab}
          setActiveRentalTab={setActiveRentalTab}
        />
      </div>
      <ListPropertySection />
      <AgentsSection />
      <ReviewsSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}
