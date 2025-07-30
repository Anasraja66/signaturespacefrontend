"use client"

import { renderIcon } from "../../utils/renderIcon"
import { trustedOperatorPoints } from "../../utils/dummyData"

export default function TrustedOperatorSection() {
  const renderPoints = (points) => (
    <ul>
      {points.map((point, index) => (
        <li key={index}>
          {renderIcon("Check", { className: "icon" })} {point}
        </li>
      ))}
    </ul>
  )

  return (
    <section className="trusted-operator-section">
      <div className="container">
        <div className="trusted-operator-content">
          <div className="text-content">
            <h2>Trusted Holiday Home Operator in Dubai</h2>
            <p>
              Signature Space provides property management solutions to maximize value and enhance guest experiences in Dubai.
            </p>
            <div className="points-grid">
              <div className="point-list">{renderPoints(trustedOperatorPoints.propertyTypes)}</div>
            </div>
          </div>
          <div className="image-content">
            <img src={require("../../assets/header-image.jpg")} alt="Dubai Skyline" width={500} height={350} />
          </div>
        </div>
      </div>
    </section>
  )
}
