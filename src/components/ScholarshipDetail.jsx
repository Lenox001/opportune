import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/ScholarshipDetail.css"; // Import CSS from styles folder

function ScholarshipDetail() {
  const { slug } = useParams();
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/api/scholarships/${slug}/`)
      .then((response) => response.json())
      .then((data) => {
        setScholarship(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching scholarship details:", error);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <p className="loading">Loading...</p>;
  if (!scholarship) return <p className="not-found">Scholarship not found.</p>;

  return (
    <div className="scholarship-detail-container">
      <h2 className="scholarship-title">{scholarship.title}</h2>
      {scholarship.image && (
        <img
          src={scholarship.image}
          alt={scholarship.title}
          className="scholarship-image"
        />
      )}
      <p>
        <strong>Provider:</strong> {scholarship.provider || "N/A"}
      </p>
      <p>
        <strong>Deadline:</strong> {scholarship.deadline || "Ongoing"}
      </p>
      <p>
        <strong>Posted At:</strong>{" "}
        {new Date(scholarship.posted_at).toLocaleString()}
      </p>
      <p>
        <strong>Eligible Nations:</strong>{" "}
        {scholarship.eligible_nations && scholarship.eligible_nations.length > 0
          ? scholarship.eligible_nations.join(", ")
          : "Not specified"}
      </p>
      <p>
        <strong>Level of Study:</strong>{" "}
        {scholarship.level_of_study || "Not specified"}
      </p>
      <p>
        <strong>Eligible Age:</strong>{" "}
        {scholarship.eligible_age || "Not specified"}
      </p>
      <p>
        <strong>Required Documents:</strong>
      </p>
      {scholarship.required_documents &&
      scholarship.required_documents.length > 0 ? (
        <ul className="required-documents">
          {scholarship.required_documents.map((doc, index) => (
            <li key={index}>{doc}</li>
          ))}
        </ul>
      ) : (
        <p>Not specified</p>
      )}
      <p
        className="scholarship-description"
        dangerouslySetInnerHTML={{ __html: scholarship.description }}
      ></p>
      <a
        href={scholarship.application_link}
        target="_blank"
        rel="noopener noreferrer"
        className="apply-link"
      >
        Apply Now
      </a>
      <br />
      <div className="navigation-links">
        <Link to="/scholarships" className="back-button">
          🔙 Back to Scholarships
        </Link>{" "}
        |{" "}
        <Link to="/" className="home-button">
          🏠 Back to Home
        </Link>
      </div>
    </div>
  );
}

export default ScholarshipDetail;
