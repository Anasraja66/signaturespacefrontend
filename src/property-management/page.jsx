import { useEffect } from "react"
import PropertyManagementHeader from "./components/PropertyManagementHeader"
import HeroSection from "./components/HeroSection"
import PartnersSection from "./components/PartnersSection"
import TrustedOperatorSection from "./components/TrustedOperatorSection"
import MaximizeEarningsSection from "./components/MaximizeEarningsSection"
import OwnersPortalSection from "./components/OwnersPortalSection"
import BestChoiceSection from "./components/BestChoiceSection"
import ServicesSection from "./components/ServicesSection"
import StatsSection from "./components/StatsSection"
import JourneySection from "./components/JourneySection"
import ListPropertyForm from "./components/ListPropertyForm"
import TestimonialsSection from "./components/TestimonialsSection"
import FAQSection from "./components/FAQSection"
import GetStartedSection from "./components/GetStartedSection"
import Footer from "../home/components/Footer.jsx"
import HomeHeader from "../home/components/HomeHeader.jsx"

import "./styles/property-management.css"

export default function PropertyManagementPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="property-management-page">
      <HomeHeader />
      <HeroSection />
      {/* <PartnersSection /> */}
      <TrustedOperatorSection />
      <MaximizeEarningsSection />
      <OwnersPortalSection />
      <BestChoiceSection />
      <ServicesSection />
      <StatsSection />
      <JourneySection />
      <ListPropertyForm />
      <TestimonialsSection />
      {/* <FAQSection /> */}
      <GetStartedSection />
      <Footer />
    </div>
  )
}
