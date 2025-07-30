"use client"
import { useScrollAnimation } from "../../hooks/useScrollAnimation"
import "../styles/Newsletter.css"
import "../styles/animations.css"

export default function NewsletterSection() {
  const [containerRef, containerVisible] = useScrollAnimation({
    threshold: 0.3,
    delay: 0,
  })
  const [textRef, textVisible] = useScrollAnimation({
    threshold: 0.3,
    delay: 200,
  })
  const [formRef, formVisible] = useScrollAnimation({
    threshold: 0.3,
    delay: 400,
  })

  return (
    <section className="newsletter-section">
      <div ref={containerRef} className={`newsletter-container animate-container ${containerVisible ? "visible" : ""}`}>
        <div className="newsletter-content">
          <div ref={textRef} className={`newsletter-text animate-on-scroll ${textVisible ? "visible" : ""}`}>
            <h2 className="newsletter-title">Join Signature Space email list to stay up to date about</h2>
            <p className="newsletter-subtitle">Affordable Co-Living and Properties in Your Area</p>
          </div>
          <form
            ref={formRef}
            className={`newsletter-form animate-form ${formVisible ? "visible" : ""}`}
            onSubmit={(e) => e.preventDefault()}
          >
            <input type="email" placeholder="Enter your email" className="newsletter-input" required />
            <button type="submit" className="newsletter-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
