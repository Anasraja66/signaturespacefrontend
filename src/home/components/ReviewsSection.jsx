// app/home/components/ReviewsSection.jsx
"use client"

import React, { useState, useEffect } from "react";

import { renderIcon } from "../utils";

import { useScrollAnimation, useStaggeredAnimation } from "../../hooks/useScrollAnimation";


export default function ReviewsSection({ property_id }) {
  const [reviewsCurrentSlide, setReviewsCurrentSlide] = useState(0);
  const [reviews, setReviews] = useState([]);

  // Animation hooks
  const [titleRef, titleVisible] = useScrollAnimation({ delay: 0 });
  const [sliderRef, sliderVisible] = useScrollAnimation({ delay: 200 });
  const [cardsRef, cardsVisible, getItemDelay] = useStaggeredAnimation(reviews.length, {
    staggerDelay: 150,
  });

  // Fetch reviews from backend if property_id is provided
  useEffect(() => {
    if (!property_id) return;
    fetch(`/api/reviews/?property=${property_id}`)
      .then(res => res.json())
      .then(data => setReviews(data));
  }, [property_id]);

  const nextReviewsSlide = () => {
    const numVisibleReviews = 2;
    if (reviewsCurrentSlide < reviews.length - numVisibleReviews) {
      setReviewsCurrentSlide(reviewsCurrentSlide + 1);
    }
  };

  const prevReviewsSlide = () => {
    if (reviewsCurrentSlide > 0) {
      setReviewsCurrentSlide(reviewsCurrentSlide - 1);
    }
  };

  return (
    <section className="reviews-section">
      <div className="reviews-container">
        <div className="reviews-header">
          <div ref={titleRef} className={`reviews-title-container animate-on-scroll ${titleVisible ? "visible" : ""}`}>
            {renderIcon("star", 24, "currentColor")}
            <h2 className="reviews-title" style={{ marginBottom: "0" }}>
              Popular Reviews
            </h2>
          </div>
        </div>

        <div ref={sliderRef} className={`reviews-slider-container animate-slider ${sliderVisible ? "visible" : ""}`}>
          <div className="reviews-wrapper">
            <div
              ref={cardsRef}
              className="reviews-slider"
              style={{ transform: `translateX(-${reviewsCurrentSlide * 280}px)` }}
            >
              {reviews.length === 0 ? (
                <div>No reviews yet.</div>
              ) : (
                reviews.map((review, index) => (
                  <div
                    key={review.id}
                    className={`review-card animate-card ${cardsVisible ? "visible" : ""}`}
                    style={{
                      transitionDelay: `${getItemDelay(index)}ms`,
                    }}
                  >
                    <div className="review-header">
                      <img
                        src={review.user?.profile_pic ? `http://localhost:8000${review.user.profile_pic}` : "/placeholder.svg?height=50&width=50&query=reviewer profile"}
                        alt={review.user?.name || "User"}
                        className="reviewer-image"
                      />
                      <div className="reviewer-info">
                        <div className="reviewer-name-container">
                          <h4 className="reviewer-name">{review.user?.name || "User"}</h4>
                        </div>
                        <p className="review-date">{new Date(review.date).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="review-rating">
                      {[...Array(5)].map((_, idx) => (
                        <span key={idx}>{renderIcon("star", 16, idx < review.rating ? "currentColor" : "none")}</span>
                      ))}
                    </div>

                    <p className="review-text">{review.text}</p>
                    <div className="review-property">
                      <a href={`/property/${review.property?.id}`}>{review.property?.title || "Property"}</a>
                    </div>
                  </div>
                ))
              )}
            </div>

            <button
              className="nav-button prev reviews-prev"
              onClick={prevReviewsSlide}
              disabled={reviewsCurrentSlide === 0}
            >
              {renderIcon("chevron-left", 20)}
            </button>

            <button
              className="nav-button next reviews-next"
              onClick={nextReviewsSlide}
              disabled={reviewsCurrentSlide >= reviews.length - 2}
            >
              {renderIcon("chevron-right", 20)}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
