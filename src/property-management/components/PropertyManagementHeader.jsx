import { Link } from "react-router-dom"
import { renderIcon } from "../../utils/renderIcon"
import HomeHeader from "../../home/components/HomeHeader"

function PropertyManagementHeader() {
  return (
    <header className="pm-header">
      <div className="logo">
        <Link to="/">
          <img
            src={require("../../assets/logo.png")}
            alt="Deluxe Holiday Homes Logo"
            width={150}
            height={40}
          />
        </Link>
      </div>
      <nav className="nav-links">
        <Link to="/search" className="active">
          Search Homes
        </Link>
        <Link to="/monthly-stays">Monthly Stays</Link>
        <Link to="/property-management">Property Management</Link>
        <Link to="/owner-portal">Owner's Portal</Link>
        <div className="dropdown">
          <span className="dropdown-toggle">Company {renderIcon("ChevronDown", { className: "icon" })}</span>
          <div className="dropdown-content">
            <Link to="/about">About Us</Link>
            <Link to="/careers">Careers</Link>
            <Link href="/contact">Contact Us</Link>
          </div>
        </div>
      </nav>
    </header>

  )
}

export default PropertyManagementHeader;
