"use client"

import { Calendar, Clock, User } from "lucide-react"

const BlogCard = ({ post, onClick }) => {
  return (
    <article className="blog-card" onClick={() => onClick(post)}>
      <img src={post.image || "/placeholder.svg"} alt={post.title} className="blog-image" />
      <div className="blog-content">
        <div className="blog-category">{post.category}</div>
        <h3 className="blog-title">{post.title}</h3>
        <p className="blog-excerpt">{post.excerpt}</p>
        <div className="blog-meta">
          <div className="blog-meta-item">
            <User size={14} />
            <span>{post.author}</span>
          </div>
          <div className="blog-meta-item">
            <Calendar size={14} />
            <span>
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="blog-meta-item">
            <Clock size={14} />
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>
    </article>
  )
}

export default BlogCard
