// app/property-details/components/ReviewsSection.jsx
import { useState } from "react";
import { renderIcon } from "../../utils/renderIcon";

export default function ReviewsSection({ reviews, propertyId, userId, onReviewAdded }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:8000/api/reviews/reviews/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          property: propertyId,
          user: userId,
          rating,
          comment,
        }),
      });
      if (!response.ok) throw new Error("Failed to submit review");
      setComment("");
      setRating(5);
      if (onReviewAdded) onReviewAdded(); // Parent can refetch reviews
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card reviews-section">
      <h2>Reviews</h2>
      {/* <form onSubmit={handleSubmit} className="review-form">
        <label>
          Rating:
          <select value={rating} onChange={e => setRating(Number(e.target.value))}>
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </label>
        <label>
          Comment:
          <textarea value={comment} onChange={e => setComment(e.target.value)} required />
        </label>
        <button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit Review"}</button>
        {error && <p className="error">{error}</p>}
      </form> */}
      {reviews && reviews.length === 0 ? (
        <div className="review-card reviews-placeholder">
          <div className="reviews-icon">{renderIcon("Star", 48)}</div>
          <p className="reviews-placeholder-message">No reviews yet</p>
          <p className="reviews-placeholder-subtext">This home is new or hasn't been reviewed yet.</p>
        </div>
      ) : (
        <div className="reviews-grid">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div className="reviewer-info">
                  <h3 className="reviewer-name">{review.author}</h3>
                  <p className="review-meta">
                    <span className="review-rating">{review.rating}/5</span> • <span className="review-date">{review.date}</span>
                  </p>
                </div>
              </div>
              <p className="review-comment">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}