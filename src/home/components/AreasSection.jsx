// app/home/components/AreasSection.jsx
"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { areas } from "../../utils/dummyData"
import { renderIcon } from "../utils"
import { useScrollAnimation, useStaggeredAnimation } from "../../hooks/useScrollAnimation"
import "../styles/AreasSection.css"
import "../styles/animations.css"

export default function AreasSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const navigate = useNavigate()

  // Animation hooks
  const [titleRef, titleVisible] = useScrollAnimation({ delay: 0 })
  const [sliderRef, sliderVisible] = useScrollAnimation({ threshold: 0.2 })
  const [cardsRef, cardsVisible, getItemDelay] = useStaggeredAnimation(areas.length, {
    staggerDelay: 150,
  })

  const nextSlide = () => {
    const numVisibleCards = 4
    if (currentSlide < areas.length - numVisibleCards) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const handleViewProperties = (city) => {
    navigate(`/listing?city=${encodeURIComponent(city)}`)
  }

  return (
    <section className="areas-section">
      <h2 ref={titleRef} className={`section-title animate-title ${titleVisible ? "visible" : ""}`}>
        Explore Our Prime Locations
      </h2>
      <div className="areas-container">
        <div ref={sliderRef} className={`areas-wrapper animate-slider ${sliderVisible ? "visible" : ""}`}>
          <div ref={cardsRef} className="areas-slider" style={{ transform: `translateX(-${currentSlide * 260}px)` }}>
            {areas.map((area, index) => (
              <div
                key={area.id}
                className={`area-card animate-card ${cardsVisible ? "visible" : ""}`}
                style={{
                  transitionDelay: `${getItemDelay(index)}ms`,
                }}
                onClick={() => handleViewProperties(area.title)}
              >
                <img
                  src={area.image ? area.image : "/placeholder.svg?height=120&width=120&query=city location"}
                  alt={area.title}
                  className="area-image"
                />
                <h3 className="area-title">{area.title}</h3>
                <button className="view-properties-btn">View properties</button>
              </div>
            ))}
          </div>
        </div>

        <button className="nav-button prev" onClick={prevSlide} disabled={currentSlide === 0}>
          {renderIcon("chevron-left", 20)}
        </button>

        <button className="nav-button next" onClick={nextSlide} disabled={currentSlide >= areas.length - 4}>
          {renderIcon("chevron-right", 20)}
        </button>
      </div>
    </section>
  )
}
