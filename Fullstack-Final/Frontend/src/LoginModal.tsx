/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginModalProps {
  showModal: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ showModal, onClose }) => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<string>("Student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.toLowerCase(),
          password: password,
          userType: userType === "Student" ? "Student" : "Faculty",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Save user identity securely
      localStorage.setItem("userId", data.id);
      localStorage.setItem("userType", data.userType);

      onClose();

      if (data.userType === "Student") {
        navigate("/studentdashboard");
      } else {
        navigate("/facultyAdmin");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setError("");
    onClose();
  };

  if (!showModal) return null;

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={handleClose}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Sign In</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Account Type</label>
                <select
                  className="form-select"
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                >
                  <option value="Student">Student</option>
                  <option value="Faculty/Administrator">
                    Faculty/Administrator
                  </option>
                </select>
              </div>

              <div className="mb-3">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Quinnipiac Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <span className="input-group-text">@quinnipiac.edu</span>
                </div>
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <div className="d-flex gap-2">
                <button
                  type="submit"
                  className="btn btn-dark flex-grow-1"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Log In"}
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
