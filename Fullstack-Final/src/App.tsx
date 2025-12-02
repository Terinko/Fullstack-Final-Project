import React, { useState } from "react";
import bobcatLogo from "./assets/bobcat.png";
import LoginModal from "./LoginModal";
import "./LandingPage.css";

const App: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  //This is a comment to test git changes

  return (
    <div className="landing-page bg-white min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container-fluid px-4 py-2">
          <a className="navbar-brand fw-bold fs-5" href="#">
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
                      {/* Icons we can replace with an SVG or image as needed */}
                      <span className="fs-3">🧠</span>
                    </div>
                    <h3 className="h6 fw-bold mb-2">Amplify Insights</h3>
                    <p className="text-muted small">
                      Unlock data-driven decisions with comprehensive analytics,
                      revealing key opportunities for strategic regional growth.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card border-0 h-100">
                  <div className="card-body">
                    <div className="mb-3">
                      <span className="fs-3">🌍</span>
                    </div>
                    <h3 className="h6 fw-bold mb-2">
                      Control Your Global Presence
                    </h3>
                    <p className="text-muted small">
                      Manage and track satellite offices, ensuring consistent
                      performance and streamlined operations everywhere.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card border-0 h-100">
                  <div className="card-body">
                    <div className="mb-3">
                      <span className="fs-3">🔧</span>
                    </div>
                    <h3 className="h6 fw-bold mb-2">
                      Remove Language Barriers
                    </h3>
                    <p className="text-muted small">
                      Adapt to diverse markets with built-in localization for
                      clear communication and enhanced user experience.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card border-0 h-100">
                  <div className="card-body">
                    <div className="mb-3">
                      <span className="fs-3">📈</span>
                    </div>
                    <h3 className="h6 fw-bold mb-2">Visualize Growth</h3>
                    <p className="text-muted small">
                      Generate precise, visually compelling reports that
                      illustrate your growth trajectories across all regions.
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
                  With our intuitive setup, you're up and running in minutes.
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
                  Adapt Aries to your specific requirements and preferences.
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
                <h3 className="h5 fw-bold mb-3">Grow Your Business</h3>
                <p className="text-muted">
                  Make informed decisions to exceed your goals.
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
    </div>
  );
};

export default App;
