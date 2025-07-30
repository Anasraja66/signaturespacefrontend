import { Link } from "react-router-dom"
import { useScrollAnimation } from "../../hooks/useScrollAnimation"
import bgImg from "../../assets/list-property-image.png"

import "../styles/ListPropertySection.css"

export default function ListPropertySection() {
  const [containerRef, containerVisible] = useScrollAnimation({
    threshold: 0.3,
    delay: 0,
  })

  const [contentRef, contentVisible] = useScrollAnimation({
    threshold: 0.3,
    delay: 300,
  })

  return (
    <section className="list-property-section">
      <div ref={containerRef} className={`list-property-container ${containerVisible ? "visible" : ""}`}>
        <img
          src={bgImg}
          alt="List your property background"
          className="list-property-background"
        />
        <div ref={contentRef} className={`list-property-content ${contentVisible ? "visible" : ""}`}>
          <h2 className="list-property-title">Rent your property confidently with Signature Space</h2>
          <p className="list-property-description">
            With live-support, quick signup, and highly-rated guests, hosting on Vrbo can feel like a vacation.
          </p>
          <Link to="/property-management" className="list-property-btn">
            List your property
          </Link>
        </div>
      </div>
    </section>
  )
}
