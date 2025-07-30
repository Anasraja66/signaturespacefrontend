"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import { blogPosts } from "./data.js"
import BlogCard from "./BlogCard.jsx"
import BlogModal from "./BlogModal.jsx"
import NoResults from "./NoResults.jsx"
import HomeHeader from "../home/components/HomeHeader.jsx"
import Footer from "../home/components/Footer.jsx"
import { Search, Calendar, Clock, User, ArrowRight } from "lucide-react"
import "./styles.css"

function Blog() {
  const [selectedPost, setSelectedPost] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [visiblePosts, setVisiblePosts] = useState(6)

  const sectionHeaderRef = useRef(null)
  const blogGridRef = useRef(null)
  const loadMoreRef = useRef(null)

  // Get featured post (first post with featured flag)
  const featuredPost = blogPosts.find((post) => post.featured) || blogPosts[0]
  const otherPosts = blogPosts.filter((post) => post.id !== featuredPost.id)

  // Filter posts based on search term
  const filteredPosts = useMemo(() => {
    if (!searchTerm.trim()) {
      return otherPosts
    }

    const searchLower = searchTerm.toLowerCase()
    return otherPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.content.toLowerCase().includes(searchLower) ||
        post.author.toLowerCase().includes(searchLower) ||
        post.category.toLowerCase().includes(searchLower),
    )
  }, [searchTerm, otherPosts])

  const displayedPosts = filteredPosts.slice(0, visiblePosts)

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate")
        }
      })
    }, observerOptions)

    const elements = [sectionHeaderRef.current, blogGridRef.current, loadMoreRef.current].filter(Boolean)

    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  const handlePostClick = (post) => {
    setSelectedPost(post)
  }

  const handleCloseModal = () => {
    setSelectedPost(null)
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setVisiblePosts(6) // Reset visible posts when searching
  }

  const handleClearSearch = () => {
    setSearchTerm("")
    setVisiblePosts(6)
  }

  const handleLoadMore = () => {
    setVisiblePosts((prev) => prev + 6)
  }

  return (
    <div className="App">
      <HomeHeader />
      {/* Featured Post Section */}
      <section className="featured-section">
        <div className="container">
          <div className="featured-container">
            <div className="featured-content">
              <div className="featured-badge">Featured Article</div>
              <h1 className="featured-title">{featuredPost.title}</h1>
              <p className="featured-excerpt">{featuredPost.excerpt}</p>

              <div className="featured-meta">
                <div className="featured-meta-item">
                  <User size={16} />
                  <span>{featuredPost.author}</span>
                </div>
                <div className="featured-meta-item">
                  <Calendar size={16} />
                  <span>
                    {new Date(featuredPost.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="featured-meta-item">
                  <Clock size={16} />
                  <span>{featuredPost.readTime}</span>
                </div>
              </div>

              <a
                href="#"
                className="featured-cta"
                onClick={(e) => {
                  e.preventDefault()
                  handlePostClick(featuredPost)
                }}
              >
                Read Full Article <ArrowRight size={18} />
              </a>
            </div>

            <div className="featured-image-container">
              <img src={featuredPost.image || "/placeholder.svg"} alt={featuredPost.title} className="featured-image" />
            </div>
          </div>
        </div>
      </section>

      {/* Latest Stories Section */}
      <section className="latest-section">
        <div className="container">
          <div className="section-header" ref={sectionHeaderRef}>
            <h2 className="section-title">Latest stories</h2>
            <div className="search-container">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                className="search-input"
                placeholder="What are you looking for?"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          {filteredPosts.length > 0 ? (
            <>
              <div className="blog-grid" ref={blogGridRef}>
                {displayedPosts.map((post) => (
                  <BlogCard key={post.id} post={post} onClick={handlePostClick} />
                ))}
              </div>

              {displayedPosts.length < filteredPosts.length && (
                <div className="load-more-section" ref={loadMoreRef}>
                  <button className="load-more-btn" onClick={handleLoadMore}>
                    Load more
                  </button>
                </div>
              )}
            </>
          ) : (
            <NoResults searchTerm={searchTerm} onClearSearch={handleClearSearch} />
          )}
        </div>
      </section>

      {selectedPost && <BlogModal post={selectedPost} onClose={handleCloseModal} />}
      <Footer />

    </div>
  )
}

export default Blog
