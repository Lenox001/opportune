import "../styles/Footer.css";
import { FaWhatsapp, FaInstagram } from "react-icons/fa"; // Import Icons

function Footer() {
  return (
    <footer className="footer">
      <div className="social-links">
        <a
          href="https://wa.me/your-whatsapp-number"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon whatsapp"
        >
          <FaWhatsapp />
        </a>
        <a
          href="https://instagram.com/your-instagram"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon instagram"
        >
          <FaInstagram />
        </a>
      </div>
      <p className="footer-text">
        &copy; {new Date().getFullYear()} Opportune. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
