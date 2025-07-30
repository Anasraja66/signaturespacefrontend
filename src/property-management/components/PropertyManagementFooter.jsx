import { Link } from "react-router-dom"
import { renderIcon } from "../../utils/renderIcon"

export default function PropertyManagementFooter() {
  return (
    <footer className="pm-footer">
      <div className="container">
        <div className="pm-footer-content">
          <div className="pm-footer-col">
            <img
              src={require("../../assets/logo.png")}
              alt="Deluxe Holiday Homes Logo"
              width={150}
              height={40}
              style={{ marginBottom: "20px" }}
            />
            <p>
              Deluxe Holiday Homes™ Rental LLC is a DET licensed Operator managing vacation rental apartments for Short
              term stay in Dubai. With a handpicked collection of properties, our guests will enjoy boutique and
              authentic experience and live in real homes like locals, while enjoying housekeeping and concierge
              services like in luxurious hotel. All our holiday homes offer a stylish living experience and excellent
              value.
            </p>
            <div className="social-icons">
              <a href="#" aria-label="Facebook">
                {renderIcon("Facebook")}
              </a>
              <a href="#" aria-label="Twitter">
                {renderIcon("Twitter")}
              </a>
              <a href="#" aria-label="Instagram">
                {renderIcon("Instagram")}
              </a>
              <a href="#" aria-label="LinkedIn">
                {renderIcon("Linkedin")}
              </a>
              <a href="#" aria-label="YouTube">
                {renderIcon("Youtube")}
              </a>
            </div>
            <div className="payment-logos">
                  <img src="/property-management-assets/visa-logo.png" alt="Visa" width={50} height={20} />
                  <img src="/property-management-assets/mastercard-logo.png" alt="Mastercard" width={50} height={20} />
                  <img src="/property-management-assets/amex-logo.png" alt="Amex" width={50} height={20} />
                  <img src="/property-management-assets/tether-logo.png" alt="Tether" width={50} height={20} />
            </div>
          </div>

          <div className="pm-footer-col">
            <h3>Cities</h3>
            <ul>
              <li>
                <Link href="#">Dubai</Link>
              </li>
              <li>
                <Link href="#">Fujairah</Link>
              </li>
              <li>
                <Link href="#">Areas</Link>
              </li>
              <li>
                <Link href="#">Dubai Marina</Link>
              </li>
              <li>
                <Link href="#">Business Bay</Link>
              </li>
              <li>
                <Link href="#">Downtown Dubai</Link>
              </li>
              <li>
                <Link href="#">Jumeirah Beach Residence</Link>
              </li>
              <li>
                <Link href="#">Dubailand</Link>
              </li>
              <li>
                <Link href="#">Palm Jumeirah</Link>
              </li>
              <li>
                <Link href="#">All Areas {renderIcon("ArrowRight", { className: "icon", width: 16, height: 16 })}</Link>
              </li>
            </ul>
          </div>

          <div className="pm-footer-col">
            <h3>Holiday Homes By Projects</h3>
            <ul>
              <li>
                <Link href="#">Sky Gardens (DIFC)</Link>
              </li>
              <li>
                <Link href="#">The Address JBR</Link>
              </li>
              <li>
                <Link href="#">The Address Marina Mall</Link>
              </li>
              <li>
                <Link href="#">The Palm Tower</Link>
              </li>
              <li>
                <Link href="#">See All {renderIcon("ArrowRight", { className: "icon", width: 16, height: 16 })}</Link>
              </li>
            </ul>
            <h3>Holiday Homes By Types</h3>
            <ul>
              <li>
                <Link href="#">Studio Apartments</Link>
              </li>
              <li>
                <Link href="#">1 Bedroom Apartments</Link>
              </li>
              <li>
                <Link href="#">2 Bedroom Apartments</Link>
              </li>
              <li>
                <Link href="#">3 Bedroom Apartments</Link>
              </li>
              <li>
                <Link href="#">See All {renderIcon("ArrowRight", { className: "icon", width: 16, height: 16 })}</Link>
              </li>
            </ul>
          </div>

          <div className="pm-footer-col">
            <h3>Company</h3>
            <ul>
              <li>
                <Link href="#">About Us</Link>
              </li>
              <li>
                <Link href="#">Social Responsibility</Link>
              </li>
              <li>
                <Link href="#">Property Management Dubai</Link>
              </li>
              <li>
                <Link href="#">Landlord&apos;s FAQs</Link>
              </li>
              <li>
                <Link href="#">
                  Pay With Cryptocurrency{" "}
                  <span
                    style={{
                      backgroundColor: "#007bff",
                      padding: "2px 5px",
                      borderRadius: "3px",
                      fontSize: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    NEW
                  </span>
                </Link>
              </li>
              <li>
                <Link href="#">Careers</Link>
              </li>
              <li>
                <Link href="#">Blogs</Link>
              </li>
              <li>
                <Link href="#">Guest FAQs</Link>
              </li>
              <li>
                <Link href="#">
                  Contact Us{" "}
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                    {renderIcon("Phone", { className: "icon", width: 16, height: 16 })} +97143848526
                  </span>
                </Link>
              </li>
              <li>
                <Link href="#">
                  Chat On WhatsApp{" "}
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                    {renderIcon("Whatsapp", { className: "icon", width: 16, height: 16 })}
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pm-footer-bottom">
          <p>Copyright 2015-2025 | Deluxe Holiday Homes™ Rental LLC. All Rights Reserved.</p>
          <div className="links">
            <Link href="#">Reservation Terms</Link>
            <Link href="#">House Rules</Link>
            <Link href="#">Refund Policy</Link>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
