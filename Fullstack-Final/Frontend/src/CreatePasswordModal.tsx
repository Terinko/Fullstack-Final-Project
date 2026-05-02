/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CreatePasswordModalProps {
  showModal: boolean;
  onClose: () => void;
  userData: {
    email: string;
    firstName: string;
    lastName: string;
    userType: string;
  };
}

const CreatePasswordModal: React.FC<CreatePasswordModalProps> = ({
  showModal,
  onClose,
  userData,
}) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          userType: userData.userType === "Student" ? "Student" : "Faculty",
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create account");
      }

      // Save user info/token in localStorage to persist login
      localStorage.setItem("userId", data.id);
      localStorage.setItem("userType", data.userType);

      onClose();

      // Navigate to the correct dashboard
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

  if (!showModal) return null;

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Set Your Password</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <p className="text-muted small">
              Creating account for{" "}
              <strong>{userData.email}@quinnipiac.edu</strong>
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm Password"
                />
              </div>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary w-100"
                style={{ backgroundColor: "#1e1b4b", borderColor: "#1e1b4b" }}
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePasswordModal;
