import React, { useState, useEffect } from "react";
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
    name: "Loading...",
    email: "loading@quinnipiac.edu",
    department: "Loading...",
    bio: "",
    profilePicture: profilePicture,
  });
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedLecture, setSelectedLecture] = useState<string>("");

  // Initialize as empty. Will be populated from MongoDB.
  const [courses, setCourses] = useState<string[]>([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      // Boot back to the homepage if a valid user identity is not found
      window.location.href = "/";
      return;
    }

    const fetchStudentData = async () => {
      try {
        // 1. Fetch Student Profile
        const res = await fetch(`http://localhost:3001/api/students/${userId}`);
        if (res.ok) {
          const data = await res.json();
          setProfile({
            name: `${data.first_name} ${data.last_name}`,
            email: data.qu_email,
            department: data.major || "Undecided",
            bio: "Student at Quinnipiac University",
            profilePicture: profilePicture,
          });
        }

        // 2. Fetch Student Courses
        const coursesRes = await fetch(
          `http://localhost:3001/api/students/${userId}/courses`,
        );
        if (coursesRes.ok) {
          const coursesData = await coursesRes.json();
          setCourses(coursesData);
        }
      } catch (err) {
        console.error("Error fetching student data:", err);
      }
    };

    fetchStudentData();
  }, []);

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
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
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
              {courses.length === 0 ? (
                <p className="text-muted text-start">
                  No courses found. Add courses in your backend to see them
                  here.
                </p>
              ) : (
                courses.map((course) => (
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
                ))
              )}
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
