// app/property-details/components/StillLookingCard.jsx

export default function StillLookingCard() {
  return (
    <div className="card still-looking-card">
      <h2 className="still-looking-title">Still looking for the right stay?</h2>
      {/* Option 1: A simple button that could trigger a function (e.g., navigate programmatically or open a modal)
        <button className="keep-searching-btn" onClick={() => window.location.href = '/search'}>
          Keep searching
        </button>
      */}
      {/* Option 2: A standard anchor tag for navigation (if a full page reload is acceptable) 
        This is typically what you'd use if not using a client-side router like React Router.
      */}
      <a href="/listing" className="keep-searching-btn show-more-btn">
        Keep searching
      </a>
    </div>
  );
}