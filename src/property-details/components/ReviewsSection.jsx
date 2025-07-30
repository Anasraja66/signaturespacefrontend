// app/property-details/components/ReviewsSection.jsx
import { renderIcon } from "../../utils/renderIcon"; // Adjusted path

export default function ReviewsSection({ reviews }) {
  return (
    <div className="card reviews-section">
      <h2>Reviews</h2>
      {reviews && reviews.length === 0 ? (
        <div className="review-card reviews-placeholder">
          <div className="reviews-icon">{renderIcon("Star", 48)}</div> {/* Still using star for placeholder icon */}
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