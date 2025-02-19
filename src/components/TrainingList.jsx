import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/TrainingList.css"; // Import CSS for styling

function TrainingList() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/trainings/")
      .then((response) => response.json())
      .then((data) => setTrainings(data))
      .catch((error) => console.error("Error fetching trainings:", error));
  }, []);

  return (
    <div className="training-list-container">
      <h2 className="training-list-title">Available Trainings</h2>
      {trainings.length === 0 ? (
        <p className="no-trainings">No trainings available at the moment.</p>
      ) : (
        <ul className="training-list">
          {trainings.map((training) => (
            <li key={training.slug} className="training-item">
              <h3 className="training-title">{training.title}</h3>
              {training.image && (
                <img
                  src={training.image}
                  alt={training.title}
                  className="training-image"
                />
              )}
              <p className="training-description">{training.description}</p>
              <p>
                <strong>Organizer:</strong> {training.organizer || "N/A"}
              </p>
              <p>
                <strong>Start Date:</strong> {training.start_date || "N/A"}
              </p>
              <div className="training-links">
                <a
                  href={training.application_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="apply-button"
                >
                  Apply Now
                </a>{" "}
                |{" "}
                <Link to={`/trainings/${training.slug}`} className="more-info">
                  More Info
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="navigation-links">
        <Link to="/" className="home-button">
           Back to Home
        </Link>
      </div>
    </div>
  );
}

export default TrainingList;
