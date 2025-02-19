/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaTimes } from "react-icons/fa";
import "../styles/Home.css";

function Home() {
  const [animate, setAnimate] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [scholarships, setScholarships] = useState([]);
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 300);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const endpoints = {
        jobs: "http://localhost:8000/api/jobs/",
        scholarships: "http://localhost:8000/api/scholarships/",
        trainings: "http://localhost:8000/api/trainings/",
      };

      const responses = await Promise.all(
        Object.entries(endpoints).map(async ([key, url]) => {
          const res = await fetch(url);
          return res.ok ? { key, data: await res.json() } : { key, data: [] };
        })
      );

      responses.forEach(({ key, data }) => {
        if (key === "jobs") setJobs(data.slice(0, 2));
        if (key === "scholarships") setScholarships(data.slice(0, 2));
        if (key === "trainings") setTrainings(data.slice(0, 2));
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      setNoResults(false);
      return;
    }

    try {
      const endpoints = ["jobs", "scholarships", "trainings"].map((type) => ({
        url: `http://localhost:8000/api/${type}/`,
        type,
      }));

      const responses = await Promise.all(
        endpoints.map(async ({ url, type }) => {
          const res = await fetch(url);
          return res.ok ? { type, data: await res.json() } : { type, data: [] };
        })
      );

      const combinedResults = responses.flatMap(({ type, data }) =>
        data.map((item) => ({ ...item, type }))
      );

      const filteredResults = combinedResults.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );

      setSearchResults(filteredResults);
      setNoResults(filteredResults.length === 0);
    } catch (error) {
      console.error("Error fetching search data:", error);
      setSearchResults([]);
      setNoResults(true);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setNoResults(false);
  };

  return (
    <div className={`home-container ${animate ? "fade-in" : ""}`}>
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search jobs, scholarships, trainings..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {searchQuery && (
          <FaTimes className="clear-icon" onClick={clearSearch} />
        )}
        <FaSearch className="search-icon" />
      </div>

      {/* No Results Message */}
      {noResults && (
        <p className="no-results">No results found for "{searchQuery}"</p>
      )}

      {/* Dropdown Search Results */}
      {searchResults.length > 0 && (
        <div className="search-dropdown">
          {searchResults.map((item, index) => (
            <Link
              key={index}
              to={`/${item.type}/${item.slug}`}
              className="search-item"
            >
              <strong>{item.title}</strong>{" "}
              <span className="search-type">({item.type})</span>
            </Link>
          ))}
        </div>
      )}

      {/* Hero Section */}
      <section className="hero">
        <h1
          className="hero-title"
          style={{
            fontWeight: "bold",

            opacity: 0,
            transform: "translateY(20px)",
            animation: "fadeInUp 0.6s ease-in-out forwards",
          }}
        >
          Your Future Starts Here
        </h1>

        <div className="hero-container">
          <div className="paragraph-hero">
            <p
              className="hero-subtitle"
              style={{ fontWeight: "bold", textAlign: "left" }}
            >
              Discover endless opportunities with our carefully curated list of
              jobs, scholarships, and training programs. Whether you're seeking
              career growth, financial aid for education, or skill-enhancing
              courses, we've got you covered. Start exploring today and take the
              next step toward a brighter future!
            </p>
          </div>
        </div>
      </section>

      {/* Two-Column Layout */}
      <div className="content-grid">
        {/* Left Column: Jobs */}
        <div className="left-column">
          <h2 className="section-title">Latest Jobs</h2>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div key={job.slug} className="item-card">
                <h3>{job.title}</h3>
                <p>{job.description.substring(0, 200)}...</p>
                <Link to={`/jobs/${job.slug}`} className="details-btn">
                  View Details
                </Link>
              </div>
            ))
          ) : (
            <p>None available</p>
          )}
          <Link to="/jobs" className="explore-btn">
            Explore More Jobs
          </Link>
        </div>

        {/* Right Column: Scholarships & Trainings */}
        <div className="right-column">
          <h2 className="section-title">Latest Scholarships</h2>
          {scholarships.length > 0 ? (
            scholarships.map((scholarship) => (
              <div key={scholarship.slug} className="item-card">
                <h3>{scholarship.title}</h3>
                <p>{scholarship.description.substring(0, 200)}...</p>
                <Link
                  to={`/scholarships/${scholarship.slug}`}
                  className="details-btn"
                >
                  View Details
                </Link>
              </div>
            ))
          ) : (
            <p>None available</p>
          )}
          <Link to="/scholarships" className="explore-btn">
            Explore More Scholarships
          </Link>

          <h2 className="section-title">Latest Trainings</h2>
          {trainings.length > 0 ? (
            trainings.map((training) => (
              <div key={training.slug} className="item-card">
                <h3>{training.title}</h3>
                <p>{training.description.substring(0, 300)}...</p>
                <Link
                  to={`/trainings/${training.slug}`}
                  className="details-btn"
                >
                  View Details
                </Link>
              </div>
            ))
          ) : (
            <p>None available</p>
          )}
          <Link to="/trainings" className="explore-btn">
            Explore More Trainings
          </Link>
        </div>
      </div>

      {/* Career Advice Section */}
      <div className="career-advice">
        <h2>Career Advice & Guidance</h2>
        <p>
          Building a successful career requires dedication, continuous learning,
          and strategic planning. Start by tailoring your resume and cover
          letter for each job application, ensuring they highlight your most
          relevant skills and experiences. Employers appreciate candidates who
          take the time to align their applications with the job description. If
          you're seeking scholarships, research thoroughly and apply to those
          that match your skills, achievements, and aspirations. A well-crafted
          application, backed by a strong personal statement, can significantly
          boost your chances of securing financial aid for your education.
          Investing in your growth through training programs is essential. The
          job market is constantly evolving, and acquiring new certifications or
          skills can set you apart from the competition. Whether it's technical
          training, soft skills development, or leadership courses, continuous
          learning keeps you adaptable and relevant in your field. After
          submitting applications, don’t hesitate to follow up with a polite and
          professional email. Expressing your enthusiasm for a role or
          opportunity shows initiative and keeps you on the employer’s radar.
          Networking is another powerful tool—connect with professionals in your
          industry, attend job fairs, and engage in discussions on platforms
          like LinkedIn. Confidence and persistence are key to success.
          Rejections are part of the journey, but each experience is a learning
          opportunity. Analyze feedback, refine your approach, and keep moving
          forward. Remember, success doesn’t happen overnight—it’s built through
          resilience, skill-building, and seizing opportunities as they come.
          Stay motivated, keep learning, and never stop striving for excellence!
        </p>
      </div>
    </div>
  );
}

export default Home;
