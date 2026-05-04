/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";

export interface ProfileData {
  name: string;
  email: string;
  department: string; // faculty: department name / student: major
  bio: string;
}

interface ProfileModalProps {
  showModal: boolean;
  onClose: () => void;
  profile?: ProfileData;
  onSave?: (data: ProfileData) => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  showModal,
  onClose,
  profile,
  onSave,
}) => {
  const defaultData: ProfileData = {
    name: "",
    email: "",
    department: "",
    bio: "",
  };

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>(
    profile ?? defaultData,
  );
  const [editData, setEditData] = useState<ProfileData>(profile ?? defaultData);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const userType = localStorage.getItem("userType"); // "Faculty" | "Student"
  const userId = localStorage.getItem("userId");
  const isFaculty = userType === "Faculty";

  useEffect(() => {
    const incoming = profile ?? defaultData;
    setProfileData(incoming);
    setEditData(incoming);
  }, [profile]);

  const handleEditClick = () => {
    setSaveError("");
    setIsEditing(true);
    setEditData(profileData);
  };

  const handleSaveClick = async () => {
    if (!userId) {
      setSaveError("Not logged in — please sign in again.");
      return;
    }

    setSaving(true);
    setSaveError("");

    // Split "First Last" back into first_name / last_name
    const nameParts = editData.name.trim().split(" ");
    const first_name = nameParts[0] ?? "";
    const last_name = nameParts.slice(1).join(" ") || first_name;

    // Build the body — faculty sends department, student sends major
    const body = isFaculty
      ? {
          first_name,
          last_name,
          department: editData.department,
          bio: editData.bio,
        }
      : {
          first_name,
          last_name,
          major: editData.department,
          bio: editData.bio,
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
        name: `${data.first_name} ${data.last_name}`,
        email: data.qu_email,
        department: isFaculty ? data.department || "" : data.major || "",
        bio: data.bio || "",
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
    setEditData(profileData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  if (!showModal) return null;

  // Label changes based on role
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
                  <div className="mb-3">
                    <label className="form-label text-muted small mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={editData.name}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                    />
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

                  <div className="mb-3">
                    <label className="form-label text-muted small mb-1">
                      Biography
                    </label>
                    <textarea
                      className="form-control"
                      name="bio"
                      value={editData.bio}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="A short bio..."
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
                    <p className="fw-bold">{profileData.name || "—"}</p>
                  </div>
                  <div className="mb-3">
                    <p className="text-muted small mb-1">Email</p>
                    <p className="fw-bold">{profileData.email || "—"}</p>
                  </div>
                  <div className="mb-3">
                    <p className="text-muted small mb-1">{deptLabel}</p>
                    <p className="fw-bold">{profileData.department || "—"}</p>
                  </div>
                  <div className="mb-3">
                    <p className="text-muted small mb-1">Biography</p>
                    <p className="fw-bold">{profileData.bio || "—"}</p>
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
