import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/ScholarshipList.css"; // Import CSS from styles folder

function ScholarshipList() {
  const [scholarships, setScholarships] = useState([]);

  useEffect(() => {
    fetch("https://opportune.pythonanywhere.com/api/scholarships/")
      .then((response) => response.json())
      .then((data) => setScholarships(data))
      .catch((error) => console.error("Error fetching scholarships:", error));
  }, []);

  return (
    <div className="scholarship-list-container">
      <h2 className="title">Available Scholarships</h2>
      {scholarships.length === 0 ? (
        <p className="no-scholarships">
          No scholarships available at the moment.
        </p>
      ) : (
        <ul className="scholarship-list">
          {scholarships.map((scholarship) => (
            <li key={scholarship.slug} className="scholarship-item">
              <h3 className="scholarship-title">{scholarship.title}</h3>
              <p>
                <strong>Provider:</strong> {scholarship.provider || "N/A"}
              </p>
              <p className="scholarship-description">
                {scholarship.description}
              </p>

              <p>
                <strong>Deadline:</strong> {scholarship.deadline || "Ongoing"}
              </p>
              <div className="scholarship-links">
                <a
                  href={scholarship.application_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="apply-link"
                >
                  Apply Now
                </a>
                <span> | </span>
                <Link
                  to={`/scholarships/${scholarship.slug}`}
                  className="more-info"
                >
                  More Info
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
      <br />
      <Link to="/" className="home-button2">
         Back to Home
      </Link>
    </div>
  );
}

export default ScholarshipList;
