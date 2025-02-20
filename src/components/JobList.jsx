import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/JobList.css"; // Import CSS from styles folder

function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("https://opportune.pythonanywhere.com/api/jobs/")
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  return (
    <div className="job-list-container">
      <h2 style={{ marginLeft: "2rem" }}>Available Jobs</h2>

      {jobs.length === 0 ? (
        <p className="no-job">No jobs available at the moment.</p>
      ) : (
        <ul className="job-list">
          {jobs.map((job) => (
            <li key={job.slug} className="job-item">
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <p>
                <strong>Company:</strong> {job.company || "N/A"}
              </p>
              <p>
                <strong>Category:</strong> {job.category || "N/A"}
              </p>
              <a
                href={job.application_link}
                target="_blank"
                rel="noopener noreferrer"
                className="apply-link0"
              >
                Apply Now
              </a>{" "}
              |{" "}
              <Link to={`/jobs/${job.slug}`} className="more-info0">
                More Info
              </Link>
            </li>
          ))}
        </ul>
      )}
      <br />
      <Link to="/" className="back-home0">
        Back to Home
      </Link>
    </div>
  );
}

export default JobList;
