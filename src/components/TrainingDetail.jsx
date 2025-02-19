import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/TrainingDetail.css"; // Import CSS for styling

function TrainingDetail() {
  const { slug } = useParams();
  const [training, setTraining] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/api/trainings/${slug}/`)
      .then((response) => response.json())
      .then((data) => {
        setTraining(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching training details:", error);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <p className="loading-text">Loading...</p>;
  if (!training) return <p className="not-found-text">Training not found.</p>;

  return (
    <div className="training-detail-container">
      <h2 className="training-title">{training.title}</h2>
      {training.image && (
        <img
          src={training.image}
          alt={training.title}
          className="training-image"
        />
      )}
      <p>
        <strong>Organizer:</strong> {training.organizer || "N/A"}
      </p>
      <p>
        <strong>Start Date:</strong> {training.start_date || "N/A"}
      </p>
      <p className="training-description">
        <strong>Description:</strong> {training.description}
      </p>
      <a
        href={training.application_link}
        target="_blank"
        rel="noopener noreferrer"
        className="apply-button"
      >
        Apply Now
      </a>
      <div className="navigation-links">
        <Link to="/trainings" className="back-link">
          🔙 Back to Trainings
        </Link>{" "}
        <br />
        <Link to="/" className="home-link">
          🏠 Back to Home
        </Link>
      </div>
    </div>
  );
}

export default TrainingDetail;
