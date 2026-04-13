import React, { useState } from "react";
import bobcatLogo from "./assets/bobcat.png";
import LoginModal from "./LoginModal";
import LectureModal from "./LectureModal";
import FeedbackModal from "./FeedbackModal";
import ProfileModal from "./ProfileModal";
import profilePicture from "./assets/trinko.jpeg";
import "./Student.css";

const Student: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLectureModal, setShowLectureModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profile, setProfile] = useState({
    name: "Tyler Rinko",
    email: "tyler.rinko@quinnipiac.edu",
    department: "Software Engineering",
    bio: "Did you guys know I am an intern at Liberty Mutual!",
    profilePicture: profilePicture,
  });
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedLecture, setSelectedLecture] = useState<string>("");

  const courses = [
    "Course 1",
    "Course 2",
    "Course 3",
    "Course 4",
    "Course 5",
    "Course 6",
    "Course 7",
    "Course 8",
  ];

  const handleCourseClick = (courseName: string) => {
    console.log(
      `Navigating to: /studentdashboard/courses/${encodeURIComponent(courseName)}/lectures`,
    );
    setSelectedCourse(courseName);
    setShowLectureModal(true);
  };

  return (
    <div className="landing-page bg-white min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container-fluid px-4 py-2">
          <a className="navbar-brand fw-bold fs-5" href="/">
            RateMyLectures
          </a>
          <div className="d-flex gap-3">
            <button
              type="button"
              className="btn btn-primary rounded-pill px-2.5"
              style={{ backgroundColor: "#1e1b4b", borderColor: "#1e1b4b" }}
              onClick={() => setShowProfileModal(true)}
            >
              <i
                className="bi bi-person-circle"
                style={{ fontSize: "1.5rem" }}
              ></i>
            </button>
            <button
              type="button"
              className="btn btn-primary rounded-pill px-4"
              onClick={() => (window.location.href = "/")}
              style={{ backgroundColor: "#1e1b4b", borderColor: "#1e1b4b" }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <main>
        <section className="py-5 bg-white position-relative">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-auto text-center">
                <img
                  src={bobcatLogo}
                  alt="Bobcat Logo"
                  className="img-fluid"
                  style={{ width: "150px", height: "auto" }}
                />
              </div>
              <div className="col text-center">
                <h1
                  className="display-3 fw-bold mb-4 mx-auto"
                  style={{ fontSize: "5rem" }}
                >
                  RateMyLectures
                </h1>
                <h3
                  className="display-3 mb-4 mx-auto"
                  style={{ fontSize: "3rem" }}
                >
                  Student's Dashboard
                </h3>
              </div>
            </div>
          </div>
        </section>

        <section id="courses" className="py-5">
          <div className="container">
            <h1 className="display-6 fw-bold mb-4 text-start">Courses</h1>
            <div className="row g-4 mb-4">
              {courses.map((course) => (
                <div key={course} className="col-md-3">
                  <button
                    className="card border-0 h-auto bg-secondary w-100"
                    style={{
                      cursor: "pointer",
                      border: "none",
                      background: "inherit",
                    }}
                    onClick={() => handleCourseClick(course)}
                  >
                    <div className="card-body">
                      <h1 className="fw-bold">{course}</h1>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <LoginModal
        showModal={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />

      <LectureModal
        showModal={showLectureModal}
        onClose={() => setShowLectureModal(false)}
        onContinue={(lecture) => {
          setSelectedLecture(lecture);
          setShowLectureModal(false);
          setShowFeedbackModal(true);
        }}
        courseName={selectedCourse}
      />

      <FeedbackModal
        showModal={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        onBack={() => {
          setShowFeedbackModal(false);
          setShowLectureModal(true);
        }}
        lectureTitle={selectedLecture}
      />

      <ProfileModal
        showModal={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        profile={profile}
        onSave={(data) => setProfile(data)}
      />
    </div>
  );
};

export default Student;
