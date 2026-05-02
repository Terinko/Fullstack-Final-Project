import React, { useState } from "react";
import bobcatLogo from "./assets/bobcat.png";
import teach from "./assets/knowledge-transfer.png";
import trust from "./assets/trust.png";
import present from "./assets/presentation.png";
import process from "./assets/process.png";
import LoginModal from "./LoginModal";
import "./LandingPage.css";
import CreateAccountModal from "./CreateAccountModal";
import CreatePasswordModal from "./CreatePasswordModal";

const App: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [tempUserData, setTempUserData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    userType: "",
  });

  return (
    <div className="landing-page bg-white min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container-fluid px-4 py-2">
          <a className="navbar-brand fw-bold fs-5" href="/">
            RateMyLectures
          </a>
          <div className="d-flex align-items-center mx-auto">
            <ul className="navbar-nav flex-row me-4 d-none d-md-flex">
              <li className="nav-item me-4">
                <a className="nav-link text-dark" href="#what-we-do">
                  What We Do
                </a>
              </li>
              <li className="nav-item me-4">
                <a className="nav-link text-dark" href="#getting-started">
                  Getting Started
                </a>
              </li>
            </ul>
          </div>
          <button
            type="button"
            className="btn btn-primary rounded-pill px-4"
            onClick={() => setShowLoginModal(true)}
            style={{ backgroundColor: "#1e1b4b", borderColor: "#1e1b4b" }}
          >
            Sign In
          </button>
        </div>
      </nav>

      <main>
        <section
          className="py-5 bg-white position-relative"
          style={{ minHeight: "50vh" }}
        >
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
              </div>
            </div>
          </div>
        </section>

        <section id="what-we-do" className="py-5 bg-light">
          <div className="container">
            <p className="text-muted text-uppercase small mb-3">
              What we enable
            </p>
            <h2 className="display-6 fw-bold mb-4">
              Direct Communication Between Students and Faculty
            </h2>
            <p
              className="text-muted mb-5 text-center mx-auto"
              style={{ maxWidth: "800px" }}
            >
              RateMyLectures provides real feedback from anonymized students
              directly to university faculty, without the data overload. Faculty
              can use these direct reviews to improve lecture content, drive
              classroom engagement, and provide an avenue for students to
              communicate their wants and needs.
            </p>

            <div className="row g-4 mb-5">
              <div className="col-md-3">
                <div className="card border-0 h-100">
                  <div className="card-body">
                    <div className="mb-3">
                      <img
                        src={teach}
                        alt="Bobcat Logo"
                        className="img-fluid"
                        style={{ width: "100px", height: "auto" }}
                      />
                    </div>
                    <h3 className="h6 fw-bold mb-2">
                      Enhance Teaching Quality
                    </h3>
                    <p className="text-muted small">
                      Give faculty targeted, actionable insights pulled directly
                      from student experiences helping instructors refine
                      delivery, pacing, and content clarity without needign all
                      the extra work.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card border-0 h-100">
                  <div className="card-body">
                    <div className="mb-3">
                      <img
                        src={trust}
                        alt="Global Icon"
                        className="img-fluid"
                        style={{ width: "100px", height: "auto" }}
                      />
                    </div>
                    <h3 className="h6 fw-bold mb-2">
                      Strengthen Trust & Transparency
                    </h3>
                    <p className="text-muted small">
                      Create a safe environment for students to voice concerns
                      and praise anonymously, fostering healthier communication
                      channels and stronger relationships between students and
                      instructors.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card border-0 h-100">
                  <div className="card-body">
                    <div className="mb-3">
                      <img
                        src={present}
                        alt="Language Icon"
                        className="img-fluid"
                        style={{ width: "100px", height: "auto" }}
                      />
                    </div>
                    <h3 className="h6 fw-bold mb-2">
                      Monitor Classroom Engagement
                    </h3>
                    <p className="text-muted small">
                      Track engagement trends over time to identify which
                      lectures resonate, which need refinement, and where
                      student participation can be improved.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card border-0 h-100">
                  <div className="card-body">
                    <div className="mb-3">
                      <img
                        src={process}
                        alt="Process Icon"
                        className="img-fluid"
                        style={{ width: "100px", height: "auto" }}
                      />
                    </div>
                    <h3 className="h6 fw-bold mb-2">
                      Streamline Faculty Workflows
                    </h3>
                    <p className="text-muted small">
                      Cut down on manual review collection and organization with
                      automated tools that help instructors quickly access,
                      understand, and act on student feedback.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="getting-started" className="py-5 bg-white">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-5">
              <h2 className="display-6 fw-bold">Getting Started</h2>
              <button
                type="button"
                id="createAccountButton"
                className="btn btn-primary rounded-pill px-4"
                onClick={() => setShowCreateModal(true)}
                style={{ backgroundColor: "#1e1b4b", borderColor: "#1e1b4b" }}
              >
                Get Started
              </button>
            </div>

            <div className="row g-5">
              <div className="col-md-4">
                <div className="mb-3">
                  <span
                    className="display-4 fw-light"
                    style={{ color: "#c4b5fd" }}
                  >
                    01
                  </span>
                </div>
                <h3 className="h5 fw-bold mb-3">Get Started</h3>
                <p className="text-muted">
                  Set up your faculty or department portal in minutes and begin
                  receiving real, anonymized student feedback right away.
                </p>
              </div>

              <div className="col-md-4">
                <div className="mb-3">
                  <span
                    className="display-4 fw-light"
                    style={{ color: "#fbbf24" }}
                  >
                    02
                  </span>
                </div>
                <h3 className="h5 fw-bold mb-3">Customize and Configure</h3>
                <p className="text-muted">
                  Choose what types of insights you want to collect, tailor
                  question sets, and configure how reviews are routed to
                  instructors.
                </p>
              </div>

              <div className="col-md-4">
                <div className="mb-3">
                  <span
                    className="display-4 fw-light"
                    style={{ color: "#c4b5fd" }}
                  >
                    03
                  </span>
                </div>
                <h3 className="h5 fw-bold mb-3">
                  Improve Teaching With Actionable Insights
                </h3>
                <p className="text-muted">
                  Leverage clear, focused analytics to enhance lecture content,
                  boost engagement, and better understand student needs.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <LoginModal
        showModal={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />

      <CreateAccountModal
        showModal={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onContinue={(data) => {
          setTempUserData(data);
          setShowCreateModal(false);
          setShowPasswordModal(true);
        }}
      />

      <CreatePasswordModal
        showModal={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        userData={tempUserData}
      />
    </div>
  );
};

export default App;
