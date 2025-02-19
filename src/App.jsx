import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import JobList from "./components/JobList";
import JobDetail from "./components/JobDetail";
import ScholarshipList from "./components/ScholarshipList";
import ScholarshipDetail from "./components/ScholarshipDetail";
import TrainingList from "./components/TrainingList";
import TrainingDetail from "./components/TrainingDetail";
import BackToTop from "./components/BackToTop"; // Import the button

function App() {
  return (
    <Router>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/jobs/:slug" element={<JobDetail />} />
          <Route path="/scholarships" element={<ScholarshipList />} />
          <Route path="/scholarships/:slug" element={<ScholarshipDetail />} />
          <Route path="/trainings" element={<TrainingList />} />
          <Route path="/trainings/:slug" element={<TrainingDetail />} />
        </Routes>
      </main>
      <BackToTop /> {/* Add the Back to Top button */}
      <Footer />
    </Router>
  );
}

export default App;
