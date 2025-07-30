import { renderIcon } from "../../utils/renderIcon"
import { Link } from "react-router-dom"

export default function BestChoiceSection() {
  return (
    <section className="best-choice-section">
      <div className="container container-d">
        <div className="video-content">
          <img src={require("../../assets/list-property-image.png")} alt="Video Thumbnail" width={600} height={400} />
          <div className="play-button">{renderIcon("PlayCircle", { className: "icon" })}</div>
        </div>
        <div className="text-content">
          <h2>
            What Makes Us <br />
            <span>The Best Choice</span>
          </h2>
          <p>Signature Space Homes top tier property management can easily be defined in two words:</p>
          <ul>
            <li>Transparent</li>
            <li>Simple</li>
          </ul>
          <p className="description">
            We exemplify a commitment to honesty, clarity, and straightforwardness in all interactions while ensuring a
            hassle-free experience for property owners.
          </p>
          <Link to="#list-property-form" className="button button-primary">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  )
}
