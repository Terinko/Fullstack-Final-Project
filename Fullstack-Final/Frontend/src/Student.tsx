import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import bobcatLogo from "./assets/bobcat.png";
import LoginModal from "./LoginModal";
import LectureModal from "./LectureModal";
import FeedbackModal from "./FeedbackModal";
import ProfileModal from "./ProfileModal";
import "./Student.css";

interface Course {
  _id: string;
  name: string;
  code: string;
}

const Student: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLectureModal, setShowLectureModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profile, setProfile] = useState({
    name: "Loading...",
    email: "loading@quinnipiac.edu",
    department: "Loading...",
  });
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedLectureTitle, setSelectedLectureTitle] = useState<string>("");
  const [selectedLectureId, setSelectedLectureId] = useState<string>("");

  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!id || !token) {
      window.location.href = "/";
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const fetchStudentData = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/students/${id}`, {
          headers,
        });
        if (res.ok) {
          const data = await res.json();
          setProfile({
            name: `${data.first_name} ${data.last_name}`,
            email: data.qu_email,
            department: data.major || "Undecided",
          });
        }

        const coursesRes = await fetch(
          `http://localhost:3001/api/students/${id}/courses`,
          { headers },
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
  }, [id]);

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
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
            <div className="row g-4 mb-4 align-items-stretch">
              {courses.length === 0 ? (
                <p className="text-muted text-start">
                  No courses found. Enroll in courses to see them here.
                </p>
              ) : (
                courses.map((course) => (
                  <div key={course._id} className="col-md-3 d-flex">
                    <button
                      className="card border-0 h-100 w-100 text-start course-card"
                      style={{
                        cursor: "pointer",
                        border: "1px solid #e0e0e0",
                        backgroundColor: "#f8f9fa",
                        borderRadius: "12px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                        transition: "transform 0.2s, box-shadow 0.2s",
                        wordBreak: "normal",
                        overflowWrap: "normal",
                        hyphens: "auto",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-5px)";
                        e.currentTarget.style.boxShadow =
                          "0 8px 15px rgba(0, 0, 0, 0.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow =
                          "0 4px 6px rgba(0, 0, 0, 0.05)";
                      }}
                      onClick={() => handleCourseClick(course)}
                    >
                      <div className="card-body d-flex flex-column w-100 p-4">
                        <h1
                          className="fw-bold mb-2"
                          style={{
                            fontSize: "1.25rem",
                            color: "#1e1b4b",
                            lineHeight: "1.4",
                          }}
                        >
                          {course.name}
                        </h1>
                        <p className="text-muted fw-semibold small mt-auto mb-0">
                          {course.code}
                        </p>
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
        onContinue={(lectureTitle, lectureId) => {
          if (!lectureId) {
            console.error(
              "LectureModal returned no lectureId — check that lectures exist for this course.",
            );
            return;
          }
          setSelectedLectureTitle(lectureTitle);
          setSelectedLectureId(lectureId);
          setShowLectureModal(false);
          setShowFeedbackModal(true);
        }}
        courseName={selectedCourse?.name ?? ""}
        courseId={selectedCourse?._id ?? ""}
      />

      <FeedbackModal
        showModal={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        onBack={() => {
          setShowFeedbackModal(false);
          setShowLectureModal(true);
        }}
        lectureTitle={selectedLectureTitle}
        lectureId={selectedLectureId}
      />

      <ProfileModal
        showModal={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        profile={profile}
        onSave={(data) =>
          setProfile({
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            department: data.department,
          })
        }
      />
    </div>
  );
};

export default Student;
