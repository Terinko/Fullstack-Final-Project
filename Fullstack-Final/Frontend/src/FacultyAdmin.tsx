/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import bobcatLogo from "./assets/bobcat.png";
import FacultyFeedbackModal from "./FacultyFeedbackModal";
import ProfileModal from "./ProfileModal";
import profilePicture from "./assets/athimineur.jpeg";
import "./Student.css";

interface CourseSection {
  sectionName: string;
  sectionCode: string;
}

interface Course {
  _id?: string;
  courseName: string;
  sections: CourseSection[];
}

interface FeedbackEntry {
  clarity: number;
  pace: string;
  suggestion: string;
}

const FacultyAdmin: React.FC = () => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedLectureLabel, setSelectedLectureLabel] = useState<string>("");
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [feedbackData, setFeedbackData] = useState<FeedbackEntry[]>([]);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: "Loading...",
    email: "loading@quinnipiac.edu",
    department: "Loading...",
    bio: "",
    profilePicture: profilePicture,
  });
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);

  // Lectures per course — fetched when a course is expanded
  const [courseLectures, setCourseLectures] = useState<
    Record<string, { _id: string; title: string; lecture_number: number }[]>
  >({});

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      window.location.href = "/";
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const profileRes = await fetch(
          `http://localhost:3001/api/faculty/${userId}`,
        );
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setProfile({
            name: `${profileData.first_name} ${profileData.last_name}`,
            email: profileData.qu_email,
            department: profileData.department || "Faculty Department",
            bio: profileData.bio || "No bio added yet.",
            profilePicture: profilePicture,
          });
        }

        const coursesRes = await fetch(
          `http://localhost:3001/api/faculty/${userId}/courses`,
        );
        if (coursesRes.ok) {
          const coursesData = await coursesRes.json();
          setCourses(coursesData);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchDashboardData();
  }, []);

  const toggleCourse = async (course: Course) => {
    const courseName = course.courseName;
    const courseId = course._id;

    if (expandedCourse === courseName) {
      setExpandedCourse(null);
      return;
    }

    setExpandedCourse(courseName);

    // Fetch lectures for this course if we don't have them yet
    if (courseId && !courseLectures[courseId]) {
      try {
        const res = await fetch(
          `http://localhost:3001/api/courses/${courseId}/lectures`,
        );
        if (res.ok) {
          const lectures = await res.json();
          setCourseLectures((prev) => ({ ...prev, [courseId]: lectures }));
        }
      } catch (err) {
        console.error("Error fetching lectures:", err);
      }
    }
  };

  const handleViewFeedback = async (
    courseName: string,
    lectureId: string,
    lectureTitle: string,
  ) => {
    setSelectedLectureLabel(`${courseName} — ${lectureTitle}`);
    setFeedbackLoading(true);
    setShowFeedbackModal(true);

    try {
      const res = await fetch(
        `http://localhost:3001/api/lectures/${lectureId}/feedback`,
      );
      if (res.ok) {
        const data = await res.json();
        setFeedbackData(data.feedbackData);
      }
    } catch (err) {
      console.error("Error fetching feedback:", err);
    } finally {
      setFeedbackLoading(false);
    }
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
                  Faculty Dashboard
                </h3>
              </div>
            </div>
          </div>
        </section>

        <section id="courses" className="py-5">
          <div className="container">
            <h1 className="display-6 fw-bold mb-4 text-start">My Courses</h1>
            <div className="row g-4 mb-4">
              {courses.length === 0 ? (
                <p className="text-muted text-start">No courses found.</p>
              ) : (
                courses.map((course, index) => {
                  const lectures = course._id
                    ? (courseLectures[course._id] ?? [])
                    : [];
                  return (
                    <div key={index} className="col-12">
                      <div className="card border-0 bg-light w-100">
                        <div className="card-body">
                          <div
                            className="d-flex justify-content-between align-items-center"
                            style={{ cursor: "pointer" }}
                            onClick={() => toggleCourse(course)}
                          >
                            <h3 className="fw-bold mb-0">
                              {course.courseName}
                            </h3>
                            <i
                              className={`bi ${expandedCourse === course.courseName ? "bi-chevron-up" : "bi-chevron-down"}`}
                              style={{ fontSize: "1.5rem" }}
                            ></i>
                          </div>

                          {expandedCourse === course.courseName && (
                            <div className="mt-4">
                              {lectures.length === 0 ? (
                                <p className="text-muted">
                                  No lectures added yet for this course.
                                </p>
                              ) : (
                                <div className="row g-3">
                                  {lectures.map((lecture) => (
                                    <div key={lecture._id} className="col-md-4">
                                      <div className="card bg-white border">
                                        <div className="card-body">
                                          <h5 className="card-title">
                                            Lecture {lecture.lecture_number}
                                          </h5>
                                          <p className="text-muted small mb-3">
                                            {lecture.title}
                                          </p>
                                          <button
                                            className="btn btn-primary w-100"
                                            style={{
                                              backgroundColor: "#1e1b4b",
                                              borderColor: "#1e1b4b",
                                            }}
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleViewFeedback(
                                                course.courseName,
                                                lecture._id,
                                                `Lecture ${lecture.lecture_number}: ${lecture.title}`,
                                              );
                                            }}
                                          >
                                            View Feedback
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </section>
      </main>

      <FacultyFeedbackModal
        showModal={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        lectureTitle={selectedLectureLabel}
        feedbackData={feedbackLoading ? [] : feedbackData}
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

export default FacultyAdmin;
