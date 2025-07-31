// app/home/components/HeroSection.jsx
"use client"

import { useEffect, useState } from "react"
import SearchBar from "../../Searchbar/search-bar"
import headerVideo from "../../assets/header-bg.mp4"
import "../styles/HeroSection.css" // Make sure this CSS file is updated

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false) // New state for animation trigger

  // The texts for the rotating animation
  const rotatingTexts = [
    "Anytime, Anywhere",
    "For Every Journey",
    "Your Ideal Escape",
    "With Ease & Confidence",
  ]

  useEffect(() => {
    // Trigger animations immediately when component mounts
    const loadTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 100) // Small delay to ensure smooth animation start

    // Set up the interval for text rotation
    const textInterval = setInterval(() => {
      setIsAnimating(false); // Reset animation state to trigger re-animation
      setTimeout(() => {
        setCurrentTextIndex((prevIndex) =>
          (prevIndex + 1) % rotatingTexts.length
        );
        setIsAnimating(true); // Start animation after text updates
      }, 50); // Small delay to allow CSS reset before re-animating

    }, 3000); // Change text every 3 seconds (adjust as needed)

    return () => {
      clearTimeout(loadTimer);
      clearInterval(textInterval); // Clean up the interval on unmount
    };
  }, [rotatingTexts.length]); // Add rotatingTexts.length to dependencies

  // Trigger initial animation for the rotating text when first loaded
  useEffect(() => {
    if (isLoaded) {
      setIsAnimating(true);
    }
  }, [isLoaded]);


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
            <span
              className={`hero-rotating-text ${isAnimating ? "animate-3d" : ""}`}
            >
              {rotatingTexts[currentTextIndex]}
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