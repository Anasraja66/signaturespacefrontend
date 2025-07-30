"use client"

const NoResults = ({ searchTerm, onClearSearch }) => {
  return (
    <div className="no-results">
      <h3>No articles found</h3>
      <p>
        We couldn't find any articles matching "<strong>{searchTerm}</strong>".
        <br />
        Try searching for different keywords or browse all articles below.
      </p>
      <button className="clear-search" onClick={onClearSearch}>
        Show All Articles
      </button>
    </div>
  )
}

export default NoResults
