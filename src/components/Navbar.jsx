import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          Opportune
        </Link>

        {/* Hamburger Menu Icon */}
        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Navigation Links */}
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li>
            <Link to="/jobs" onClick={() => setMenuOpen(false)}>
              Jobs
            </Link>
          </li>
          <li>
            <Link to="/scholarships" onClick={() => setMenuOpen(false)}>
              Scholarships
            </Link>
          </li>
          <li>
            <Link to="/trainings" onClick={() => setMenuOpen(false)}>
              Trainings
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
