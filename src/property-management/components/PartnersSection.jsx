import { partners } from "../../utils/dummyData"

export default function PartnersSection() {
  return (
    <section className="partners-section">
      <div className="container">
        <div className="partner-logos">
          {partners.map((partner) => (
            <img
              key={partner.name}
              src={partner.logo ? require(`../../assets/${partner.logo}`) : require("../../assets/logo.png")}
              alt={partner.name}
              width={100}
              height={40}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
