"use client"

import { Search } from "lucide-react"

const SearchBar = ({ searchTerm, onSearchChange, resultsCount, totalCount }) => {
  return (
    <section className="search-section">
      <div className="container">
        <div className="search-container-b">
          <h2 className="search-title">Find Your Perfect Read</h2>
          <p className="search-subtitle">Search through our collection of real estate insights and expert advice</p>

          <div className="search-bar">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              className="search-input"
              placeholder="Search articles, topics, or authors..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          {searchTerm && (
            <div className="search-results-info">
              {resultsCount > 0
                ? `Found ${resultsCount} article${resultsCount !== 1 ? "s" : ""} matching "${searchTerm}"`
                : `No articles found matching "${searchTerm}"`}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default SearchBar
