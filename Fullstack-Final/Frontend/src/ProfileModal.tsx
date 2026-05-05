import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  department: z.string().min(1, "This field is required"),
  email: z.string(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export interface ProfileData {
  firstName: string;
  lastName: string;
  name?: string;
  email: string;
  department: string;
}

interface ProfileModalProps {
  showModal: boolean;
  onClose: () => void;
  profile?: Partial<ProfileData>;
  onSave?: (data: ProfileData) => void;
}

const defaultData: ProfileData = {
  firstName: "",
  lastName: "",
  email: "",
  department: "",
};

const initializeData = (p?: Partial<ProfileData>): ProfileData => {
  if (!p) return defaultData;

  let fName = p.firstName || "";
  let lName = p.lastName || "";

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
  const [profileData, setProfileData] = useState<ProfileData>(() =>
    initializeData(profile),
  );
  const [apiError, setApiError] = useState("");

  const userType = localStorage.getItem("userType");
  const userId = localStorage.getItem("userId");
  const isFaculty = userType === "Faculty";
  const deptLabel = isFaculty ? "Department" : "Major";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: profileData,
  });

  const profileString = JSON.stringify(profile);

  useEffect(() => {
    const incoming = initializeData(profile);
    setProfileData(incoming);

    if (!isEditing) {
      reset(incoming);
    }
  }, [profileString, reset, isEditing, profile]);

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setApiError("");
    setIsEditing(true);
    reset(profileData);
  };

  const onSubmit = async (data: ProfileFormData) => {
    if (!userId) {
      setApiError("Not logged in — please sign in again.");
      return;
    }

    setApiError("");

    const body = isFaculty
      ? {
          first_name: data.firstName.trim(),
          last_name: data.lastName.trim(),
          department: data.department.trim(),
        }
      : {
          first_name: data.firstName.trim(),
          last_name: data.lastName.trim(),
          major: data.department.trim(),
        };

    const url = isFaculty
      ? `http://localhost:3001/api/faculty/${userId}`
      : `http://localhost:3001/api/students/${userId}`;

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      const resData = await res.json();

      if (!res.ok) throw new Error(resData.error || "Failed to save profile.");

      const saved: ProfileData = {
        firstName: resData.first_name || "",
        lastName: resData.last_name || "",
        email: resData.qu_email,
        department: isFaculty ? resData.department || "" : resData.major || "",
      };

      setProfileData(saved);
      setIsEditing(false);
      if (onSave) onSave(saved);
    } catch (err) {
      setApiError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setApiError("");
    reset(profileData);
  };

  if (!showModal) return null;

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

          {isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body">
                <div className="mb-4">
                  <div className="row mb-3">
                    <div className="col">
                      <label className="form-label text-muted small mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                        placeholder="First Name"
                        {...register("firstName")}
                      />
                      {errors.firstName && (
                        <div className="invalid-feedback">
                          {errors.firstName.message}
                        </div>
                      )}
                    </div>
                    <div className="col">
                      <label className="form-label text-muted small mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                        placeholder="Last Name"
                        {...register("lastName")}
                      />
                      {errors.lastName && (
                        <div className="invalid-feedback">
                          {errors.lastName.message}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-muted small mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      disabled
                      title="Email cannot be changed"
                      style={{
                        backgroundColor: "#f8f9fa",
                        cursor: "not-allowed",
                      }}
                      {...register("email")}
                    />
                    <div className="form-text">Email cannot be changed.</div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-muted small mb-1">
                      {deptLabel}
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.department ? "is-invalid" : ""}`}
                      placeholder={deptLabel}
                      {...register("department")}
                    />
                    {errors.department && (
                      <div className="invalid-feedback">
                        {errors.department.message}
                      </div>
                    )}
                  </div>

                  {apiError && (
                    <div
                      className="alert alert-danger py-2"
                      style={{ fontSize: "0.875rem" }}
                    >
                      {apiError}
                    </div>
                  )}
                </div>
              </div>

              <div className="modal-footer bg-light">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancelClick}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    backgroundColor: "#1e1b4b",
                    borderColor: "#1e1b4b",
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="modal-body">
                <div className="mb-4">
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
                </div>
              </div>

              <div className="modal-footer bg-light">
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
                  style={{
                    backgroundColor: "#1e1b4b",
                    borderColor: "#1e1b4b",
                  }}
                  onClick={handleEditClick}
                >
                  Edit Profile
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
