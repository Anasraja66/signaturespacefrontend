import { renderIcon } from "../../utils/renderIcon"
import { services } from "../../utils/dummyData"

export default function ServicesSection() {
  return (
    <section className="services-section">
      <div className="container">
        <h2 className="section-title">Property Management Services</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-item">
              <div className="icon-wrapper">
                {renderIcon(service.icon, { size: 32, color: "#fff" })} {/* Use Lucid icon */}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
