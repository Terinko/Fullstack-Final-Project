import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginModalProps {
  showModal: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ showModal, onClose }) => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<string>("Student");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (userType === "Student") {
      console.log("Navigating to: /studentdashboard");
      onClose();
      navigate("/studentdashboard");
    } else {
      console.log("Navigating to: /facultyAdmin");
      onClose();
      navigate("/facultyAdmin");
    }
  };

  const handleClose = () => {
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
                  />
                  <span className="input-group-text">@quinnipiac.edu</span>
                </div>
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
              </div>

              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-dark flex-grow-1">
                  Log In
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
