import React, { useState } from "react";
import bobcatLogo from "./assets/bobcat.png";
import LoginModal from "./LoginModal";
import LectureModal from "./LectureModal";
import FeedbackModal from "./FeedbackModal";
import "./Student.css";

const Student: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLectureModal, setShowLectureModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedLecture, setSelectedLecture] = useState<string>("");

  return (
    <div className="landing-page bg-white min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container-fluid px-4 py-2">
          <a className="navbar-brand fw-bold fs-5" href="#">
            RateMyLectures
          </a>
          <button
            type="button"
            className="btn btn-primary rounded-pill px-4"
            onClick={() => (window.location.href = "/")}
            style={{ backgroundColor: "#1e1b4b", borderColor: "#1e1b4b" }}
          >
            Sign Out
          </button>
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
                  Student1's Profile
                </h3>
              </div>
            </div>
          </div>
        </section>

        <section id="courses" className="py-5">
          <div className="container">
            <h1 className="display-6 fw-bold mb-4 text-start">Courses</h1>

            <div className="row g-4 mb-4">
              <div className="col-md-3">
                <button
                  className="card border-0 h-auto bg-secondary w-100"
                  style={{
                    cursor: "pointer",
                    border: "none",
                    background: "inherit",
                  }}
                  onClick={() => {
                    setSelectedCourse("Course 1");
                    setShowLectureModal(true);
                  }}
                >
                  <div className="card-body">
                    <h1 className="fw-bold">Course 1</h1>
                  </div>
                </button>
              </div>
              <div className="col-md-3">
                <button
                  className="card border-0 h-auto bg-secondary w-100"
                  style={{
                    cursor: "pointer",
                    border: "none",
                    background: "inherit",
                  }}
                  onClick={() => {
                    setSelectedCourse("Course 2");
                    setShowLectureModal(true);
                  }}
                >
                  <div className="card-body">
                    <h1 className="fw-bold">Course 2</h1>
                  </div>
                </button>
              </div>
              <div className="col-md-3">
                <button
                  className="card border-0 h-auto bg-secondary w-100"
                  style={{
                    cursor: "pointer",
                    border: "none",
                    background: "inherit",
                  }}
                  onClick={() => {
                    setSelectedCourse("Course 3");
                    setShowLectureModal(true);
                  }}
                >
                  <div className="card-body">
                    <h1 className="fw-bold">Course 3</h1>
                  </div>
                </button>
              </div>
              <div className="col-md-3">
                <button
                  className="card border-0 h-auto bg-secondary w-100"
                  style={{
                    cursor: "pointer",
                    border: "none",
                    background: "inherit",
                  }}
                  onClick={() => {
                    setSelectedCourse("Course 4");
                    setShowLectureModal(true);
                  }}
                >
                  <div className="card-body">
                    <h1 className="fw-bold">Course 4</h1>
                  </div>
                </button>
              </div>
            </div>

            <div className="row g-4 mb-4">
              <div className="col-md-3">
                <button
                  className="card border-0 h-auto bg-secondary w-100"
                  style={{
                    cursor: "pointer",
                    border: "none",
                    background: "inherit",
                  }}
                  onClick={() => {
                    setSelectedCourse("Course 5");
                    setShowLectureModal(true);
                  }}
                >
                  <div className="card-body">
                    <h1 className="fw-bold">Course 5</h1>
                  </div>
                </button>
              </div>
              <div className="col-md-3">
                <button
                  className="card border-0 h-auto bg-secondary w-100"
                  style={{
                    cursor: "pointer",
                    border: "none",
                    background: "inherit",
                  }}
                  onClick={() => {
                    setSelectedCourse("Course 6");
                    setShowLectureModal(true);
                  }}
                >
                  <div className="card-body">
                    <h1 className="fw-bold">Course 6</h1>
                  </div>
                </button>
              </div>
              <div className="col-md-3">
                <button
                  className="card border-0 h-auto bg-secondary w-100"
                  style={{
                    cursor: "pointer",
                    border: "none",
                    background: "inherit",
                  }}
                  onClick={() => {
                    setSelectedCourse("Course 7");
                    setShowLectureModal(true);
                  }}
                >
                  <div className="card-body">
                    <h1 className="fw-bold">Course 7</h1>
                  </div>
                </button>
              </div>
              <div className="col-md-3">
                <button
                  className="card border-0 h-auto bg-secondary w-100"
                  style={{
                    cursor: "pointer",
                    border: "none",
                    background: "inherit",
                  }}
                  onClick={() => {
                    setSelectedCourse("Course 8");
                    setShowLectureModal(true);
                  }}
                >
                  <div className="card-body">
                    <h1 className="fw-bold">Course 8</h1>
                  </div>
                </button>
              </div>
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
    </div>
  );
};

export default Student;
