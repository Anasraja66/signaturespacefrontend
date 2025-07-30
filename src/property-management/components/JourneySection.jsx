import { journeySteps } from "../../utils/dummyData"

export default function JourneySection() {
  return (
    <section className="journey-section">
      <div className="container">
        <p className="subtitle">8-Steps to Success</p>
        <h2>Your Seamless Journey with Signature Space</h2>
        <div className="journey-flow">
          {journeySteps.map((step) => (
            <div key={step.number} className="journey-step">
              <div className="number-circle">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
