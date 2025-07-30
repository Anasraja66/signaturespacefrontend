import { Link } from "react-router-dom"

export default function GetStartedSection() {
  return (
    <section className="get-started-section">
      <div className="coontainer-p">
        <div className="text-content">
          <h2>Get started Today!</h2>
          <p>Maximize your Holiday Home&apos;s ROI</p>
          <a href="#list-property-form" className="button button-secondary-1">
            List With Us
          </a>
        </div>
      </div>
        <div className="points-list">
          <ul>
            <li>Hassle-free management</li>
            <li>Top notch marketing</li>
            <li>Customized for every property</li>
            <li>24x7 communication</li>
          </ul>
        </div>
    </section>
  )
}
