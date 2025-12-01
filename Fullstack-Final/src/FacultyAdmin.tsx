import React, { useState } from "react";
import bobcatLogo from "./bobcat.png";
import FacultyFeedbackModal from "./FacultyFeedbackModal";
import "./Student.css";

interface CourseSection {
  sectionName: string;
  sectionCode: string;
}

interface Course {
  courseName: string;
  sections: CourseSection[];
}

const FacultyAdmin: React.FC = () => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState<string>("");
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  //Mock course data with sections - we need to replace with actual data from Supabase
  const courses: Course[] = [
    {
      courseName: "Introduction to Computer Science",
      sections: [
        { sectionName: "Section 01", sectionCode: "CS101-01" },
        { sectionName: "Section 02", sectionCode: "CS101-02" },
        { sectionName: "Section 03", sectionCode: "CS101-03" },
      ],
    },
    {
      courseName: "Data Structures",
      sections: [
        { sectionName: "Section 01", sectionCode: "CS201-01" },
        { sectionName: "Section 02", sectionCode: "CS201-02" },
      ],
    },
    {
      courseName: "Database Systems",
      sections: [{ sectionName: "Section 01", sectionCode: "CS301-01" }],
    },
  ];

  //Mock feedback data - we need to replace with actual data from Supabase
  const mockFeedbackData = [
    {
      clarity: 5,
      pace: "Too Slow",
      suggestion: "This is an example response to the question above.",
    },
    {
      clarity: 4,
      pace: "Just Right",
      suggestion: "This is another example response from a different student.",
    },
    {
      clarity: 5,
      pace: "Just Right",
      suggestion: "This is a short response.",
    },
    {
      clarity: 3,
      pace: "Just Right",
      suggestion:
        "This is a longer response that takes up more space and has many more words.",
    },
    {
      clarity: 5,
      pace: "Too Fast",
      suggestion: "",
    },
  ];

  const handleViewFeedback = (courseName: string, sectionCode: string) => {
    setSelectedLecture(`${courseName} - ${sectionCode}`);
    setSelectedSection(sectionCode);
    setShowFeedbackModal(true);
  };

  const toggleCourse = (courseName: string) => {
    setExpandedCourse(expandedCourse === courseName ? null : courseName);
  };

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
              {courses.map((course, index) => (
                <div key={index} className="col-12">
                  <div className="card border-0 bg-light w-100">
                    <div className="card-body">
                      <div
                        className="d-flex justify-content-between align-items-center"
                        style={{ cursor: "pointer" }}
                        onClick={() => toggleCourse(course.courseName)}
                      >
                        <h3 className="fw-bold mb-0">{course.courseName}</h3>
                        <i
                          className={`bi ${
                            expandedCourse === course.courseName
                              ? "bi-chevron-up"
                              : "bi-chevron-down"
                          }`}
                          style={{ fontSize: "1.5rem" }}
                        ></i>
                      </div>

                      {expandedCourse === course.courseName && (
                        <div className="mt-4">
                          <div className="row g-3">
                            {course.sections.map((section, sectionIndex) => (
                              <div key={sectionIndex} className="col-md-4">
                                <div className="card bg-white border">
                                  <div className="card-body">
                                    <h5 className="card-title">
                                      {section.sectionName}
                                    </h5>
                                    <p className="text-muted small mb-3">
                                      {section.sectionCode}
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
                                          section.sectionCode
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
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <FacultyFeedbackModal
        showModal={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        lectureTitle={selectedLecture}
        feedbackData={mockFeedbackData}
      />
    </div>
  );
};

export default FacultyAdmin;
