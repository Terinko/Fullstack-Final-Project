/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";

export interface ProfileData {
  firstName: string;
  lastName: string;
  name?: string; // Kept for backwards compatibility if the parent still passes 'name'
  email: string;
  department: string; // faculty: department name / student: major
}

interface ProfileModalProps {
  showModal: boolean;
  onClose: () => void;
  profile?: Partial<ProfileData>; // Allow partial data to come from the parent
  onSave?: (data: ProfileData) => void;
}

const defaultData: ProfileData = {
  firstName: "",
  lastName: "",
  email: "",
  department: "",
};

// Smart initializer to handle both the new format and the legacy "name" string format
const initializeData = (p?: Partial<ProfileData>): ProfileData => {
  if (!p) return defaultData;

  let fName = p.firstName || "";
  let lName = p.lastName || "";

  // If the parent component passed the old single 'name' string, split it up
  if (!fName && !lName && p.name) {
    const nameParts = p.name.trim().split(" ");
    fName = nameParts[0] ?? "";
    lName = nameParts.slice(1).join(" ") || "";
  }

  return {
    firstName: fName,
    lastName: lName,
    email: p.email || "",
    department: p.department || "",
  };
};

const ProfileModal: React.FC<ProfileModalProps> = ({
  showModal,
  onClose,
  profile,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  // Initialize state immediately so it renders correctly on the very first paint
  const [profileData, setProfileData] = useState<ProfileData>(() =>
    initializeData(profile),
  );
  const [editData, setEditData] = useState<ProfileData>(() =>
    initializeData(profile),
  );

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const userType = localStorage.getItem("userType"); // "Faculty" | "Student"
  const userId = localStorage.getItem("userId");
  const isFaculty = userType === "Faculty";

  // Sync state if the parent component updates the 'profile' prop after mounting
  useEffect(() => {
    const incoming = initializeData(profile);
    setProfileData(incoming);
    setEditData(incoming);
  }, [profile]);

  const handleEditClick = () => {
    setSaveError("");
    setIsEditing(true);
    setEditData(profileData); // Pre-fill edit inputs with the current profile data
  };

  const handleSaveClick = async () => {
    if (!userId) {
      setSaveError("Not logged in — please sign in again.");
      return;
    }

    setSaving(true);
    setSaveError("");

    // Build the body using the explicitly separated first and last names
    const body = isFaculty
      ? {
          first_name: editData.firstName.trim(),
          last_name: editData.lastName.trim(),
          department: editData.department,
        }
      : {
          first_name: editData.firstName.trim(),
          last_name: editData.lastName.trim(),
          major: editData.department,
        };

    const url = isFaculty
      ? `http://localhost:3001/api/faculty/${userId}`
      : `http://localhost:3001/api/students/${userId}`;

    try {
      const res = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to save profile.");

      // Reconstruct the local profile from the saved document
      const saved: ProfileData = {
        firstName: data.first_name || "",
        lastName: data.last_name || "",
        email: data.qu_email,
        department: isFaculty ? data.department || "" : data.major || "",
      };

      setProfileData(saved);
      setEditData(saved);
      setIsEditing(false);
      if (onSave) onSave(saved);
    } catch (err: any) {
      setSaveError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setSaveError("");
    setEditData(profileData); // Reset the edit form back to the original data
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  if (!showModal) return null;

  const deptLabel = isFaculty ? "Department" : "Major";

  return (
    <div
      className="modal d-block"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-light">
            <h5 className="modal-title fw-bold">Profile</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            />
          </div>

          <div className="modal-body">
            <div className="mb-4">
              {isEditing ? (
                <>
                  <div className="row mb-3">
                    <div className="col">
                      <label className="form-label text-muted small mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={editData.firstName}
                        onChange={handleInputChange}
                        placeholder="First Name"
                      />
                    </div>
                    <div className="col">
                      <label className="form-label text-muted small mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={editData.lastName}
                        onChange={handleInputChange}
                        placeholder="Last Name"
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-muted small mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      value={editData.email}
                      disabled
                      title="Email cannot be changed"
                      style={{
                        backgroundColor: "#f8f9fa",
                        cursor: "not-allowed",
                      }}
                    />
                    <div className="form-text">Email cannot be changed.</div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-muted small mb-1">
                      {deptLabel}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="department"
                      value={editData.department}
                      onChange={handleInputChange}
                      placeholder={deptLabel}
                    />
                  </div>

                  {saveError && (
                    <div
                      className="alert alert-danger py-2"
                      style={{ fontSize: "0.875rem" }}
                    >
                      {saveError}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="mb-3">
                    <p className="text-muted small mb-1">Name</p>
                    <p className="fw-bold">
                      {profileData.firstName} {profileData.lastName}
                    </p>
                  </div>
                  <div className="mb-3">
                    <p className="text-muted small mb-1">Email</p>
                    <p className="fw-bold">{profileData.email || "—"}</p>
                  </div>
                  <div className="mb-3">
                    <p className="text-muted small mb-1">{deptLabel}</p>
                    <p className="fw-bold">{profileData.department || "—"}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="modal-footer bg-light">
            {isEditing ? (
              <>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancelClick}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ backgroundColor: "#1e1b4b", borderColor: "#1e1b4b" }}
                  onClick={handleSaveClick}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ backgroundColor: "#1e1b4b", borderColor: "#1e1b4b" }}
                  onClick={handleEditClick}
                >
                  Edit Profile
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
