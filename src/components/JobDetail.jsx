import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/JobDetails.css"; // Import CSS from styles folder

function JobDetails() {
  const { slug } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetch(`https://opportune.pythonanywhere.com/api/jobs/${slug}/`)
      .then((response) => response.json())
      .then((data) => setJob(data))
      .catch((error) => console.error("Error fetching job details:", error));
  }, [slug]);

  if (!job) {
    return <p className="loading">Loading job details...</p>;
  }

  return (
    <div className="job-details-container">
      <h2 className="job-title">{job.title}</h2>

      <p>
        <strong>Company:</strong> {job.company}
      </p>
      <p>
        <strong>Category:</strong> {job.category}
      </p>
      <p className="job-description">
        <strong></strong> {job.description}
      </p>
      <a
        href={job.application_link}
        target="_blank"
        rel="noopener noreferrer"
        className="apply-link1"
      >
        Apply Now
      </a>
      <br />
      <div className="navigation-links">
        <Link to="/jobs">
          <button className="back-button1">Back to Jobs</button>
        </Link>
        <Link to="/">
          <button className="home-button1">Back to Home</button>
        </Link>
      </div>
    </div>
  );
}

export default JobDetails;
