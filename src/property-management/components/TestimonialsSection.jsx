// TestimonialsSection.jsx
"use client";

import { useState, useEffect } from "react"; // Import useEffect
import { renderIcon } from "../../utils/renderIcon";
import { testimonials } from "../../utils/dummyData";

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedStates, setExpandedStates] = useState({});
  const [isMobile, setIsMobile] = useState(false); // State to track mobile view

  // Effect to determine screen size and update isMobile
  useEffect(() => {
    const handleResize = () => {
      // Set breakpoint, typically 768px for md breakpoint in Tailwind or common CSS
      setIsMobile(window.innerWidth <= 768);
    };

    // Set initial state on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array means this runs once on mount and cleanup on unmount

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setExpandedStates({}); // Reset expanded state on navigation
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
    setExpandedStates({}); // Reset expanded state on navigation
  };

  const toggleExpand = (index) => {
    setExpandedStates((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        renderIcon("Star", {
          key: i,
          fill: "currentColor", // Always filled for gold color
        })
      );
    }
    return stars;
  };

  // Determine which testimonials to display based on isMobile state
  const displayedTestimonials = [];
  if (testimonials.length > 0) {
    displayedTestimonials.push(testimonials[currentIndex]); // Always show the current testimonial

    // Only show the next testimonial if not in mobile view AND there's more than one testimonial
    if (!isMobile && testimonials.length > 1) {
      displayedTestimonials.push(
        testimonials[(currentIndex + 1) % testimonials.length]
      );
    }
  }

  return (
    <section className="testimonials-section">
      <div className="testimonial-carousel-wrapper">
        <button
          onClick={prevTestimonial}
          className="nav-arrow left-arrow"
          aria-label="Previous testimonial"
        >
          {renderIcon("ChevronLeft")}
        </button>

        <div className="testimonial-carousel">
          {/* Map over displayedTestimonials, which now conditionally contains 1 or 2 items */}
          {displayedTestimonials.map((testimonial, index) => {
            const isExpanded = expandedStates[index];
            const shortText = testimonial.text.substring(0, 150); // Adjust length as needed
            const needsReadMore = testimonial.text.length > 150;

            return (
              <div key={testimonial.id || index} className="testimonial-card">
                <div className="rating">{renderStars(testimonial.rating)}</div>
                <p>
                  {isExpanded || !needsReadMore
                    ? testimonial.text
                    : `${shortText}...`}
                  {needsReadMore && (
                    <span
                      onClick={() => toggleExpand(index)}
                      className="read-more"
                    >
                      {isExpanded ? " read less" : " read more"}
                    </span>
                  )}
                </p>
                <div className="author-info">
                  <img
                    src={testimonial.avatar || "/path/to/default-avatar.jpg"} // Fallback to a default avatar
                    alt={testimonial.author}
                    width={50}
                    height={50}
                  />
                  <div className="author-details">
                    <div className="name">{testimonial.author}</div>
                    <div className="date">{testimonial.date}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button
          onClick={nextTestimonial}
          className="nav-arrow right-arrow"
          aria-label="Next testimonial"
        >
          {renderIcon("ChevronRight")}
        </button>
      </div>
    </section>
  );
}