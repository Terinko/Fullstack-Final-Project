import React, { useState } from "react";
import { supabase } from "../supabaseClient";

interface CreateAccountModalProps {
  showModal: boolean;
  onClose: () => void;
  onContinue: (userData: {
    email: string;
    firstName: string;
    lastName: string;
    userType: string;
  }) => void;
}

const CreateAccountModal: React.FC<CreateAccountModalProps> = ({
  showModal,
  onClose,
  onContinue,
}) => {
  const [userType, setUserType] = useState<string>("Student");
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const tableName = userType === "Student" ? "Student" : "Faculty_Admin";
      const emailColumn =
        userType === "Student" ? "Student_Qu_Email" : "Faculty_Qu_Email";

      const { data: existingUser } = await supabase
        .from(tableName)
        .select("*")
        .eq(emailColumn, email)
        .single();

      if (existingUser) {
        throw new Error("An account with this email already exists");
      }

      onContinue({ email, firstName, lastName, userType });
      resetForm();
    } catch (err: any) {
      if (err.code === "PGRST116") {
        onContinue({ email, firstName, lastName, userType });
        resetForm();
      } else {
        setError(err.message || "Failed to validate account");
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setUserType("Student");
    setEmail("");
    setFirstName("");
    setLastName("");
    setError("");
  };

  const handleClose = () => {
    resetForm();
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
        className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create Account</h5>
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
                  required
                >
                  <option value="Student">Student</option>
                  <option value="Faculty/Administrator">
                    Faculty/Administrator
                  </option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Quinnipiac E-Mail</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  {loading ? "Checking..." : "Next: Create Password"}
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

export default CreateAccountModal;
