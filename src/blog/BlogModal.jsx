"use client"

import { X, Calendar, Clock, User } from "lucide-react"
import { useEffect } from "react"

const BlogModal = ({ post, onClose }) => {
  // Handle keyboard events (e.g., Escape key to close)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [onClose]) // Re-run effect if onClose changes

  // If no post is provided, don't render the modal
  if (!post) return null

  // Close modal when clicking outside of the content area
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // Format the date for better readability
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-header">
          <div>
            {/* Category */}
            {post.category && (
              <span className="blog-category" style={{ marginBottom: "1rem" }}>
                {post.category}
              </span>
            )}
            {/* Title */}
            <h1 id="modal-title" className="blog-title" style={{ fontSize: "2.2rem", marginBottom: "1rem" }}>
              {post.title}
            </h1>
            {/* Meta Info */}
            <div className="blog-meta" style={{ marginBottom: 0 }}>
              <div className="blog-meta-item">
                <User size={16} aria-hidden="true" /> {/* Add aria-hidden for decorative icons */}
                <span>{post.author}</span>
              </div>
              <div className="blog-meta-item">
                <Calendar size={16} aria-hidden="true" />
                <span>{formattedDate}</span>
              </div>
              <div className="blog-meta-item">
                <Clock size={16} aria-hidden="true" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
          {/* Close button */}
          <button className="modal-close" onClick={onClose} aria-label="Close modal">
            <X size={24} aria-hidden="true" />
          </button>
        </div>

        <div className="modal-body">
          {/* Post Image */}
          {post.image && (
            <img src={post.image} alt={post.title} className="modal-image" />
          )}
          {/* Post Content */}
          <div className="modal-content-text">{post.content}</div>
        </div>
      </div>
    </div>
  )
}

export default BlogModal