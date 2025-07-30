// app/home/components/HeroSection.jsx
"use client"

import { useEffect, useState } from "react"
import SearchBar from "../../Searchbar/search-bar"
import headerVideo from "../../assets/header-bg.mp4"
import "../styles/HeroSection.css"

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Trigger animations immediately when component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100) // Small delay to ensure smooth animation start

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="hero">
      <video
        className="hero-video-bg"
        src={headerVideo}
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />
      <div className="hero-overlay"></div>


      {/* Floating Elements */}
      <div className="floating-elements">
        <div className={`floating-element floating-element-1 ${isLoaded ? "animate" : ""}`}></div>
        <div className={`floating-element floating-element-2 ${isLoaded ? "animate" : ""}`}></div>
        <div className={`floating-element floating-element-3 ${isLoaded ? "animate" : ""}`}></div>
      </div>

      <div className="hero-container">
        <div className={`hero-content ${isLoaded ? "loaded" : ""}`}>
          <h1 className="hero-title">
            <span className={`hero-title-line ${isLoaded ? "animate" : ""}`} style={{ animationDelay: "0.2s" }}>
              Find Your Perfect Stay,
            </span>
            <span className={`hero-title-line ${isLoaded ? "animate" : ""}`} style={{ animationDelay: "0.5s" }}>
              Anytime, Anywhere.
            </span>
          </h1>
          {/* <p className={`hero-subtitle ${isLoaded ? "animate" : ""}`} style={{ animationDelay: "0.8s" }}>
            Discover amazing properties for your next adventure. From cozy apartments to luxury villas.
          </p> */}
          <div className={`hero-search ${isLoaded ? "animate" : ""}`} style={{ animationDelay: "1.1s" }}>
            <SearchBar />
          </div>
        </div>
      </div>
    </section>
  )
}