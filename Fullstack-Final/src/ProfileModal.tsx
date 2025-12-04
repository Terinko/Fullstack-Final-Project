import React, { useState, useEffect } from "react";
import defaultProfilePic from "./assets/bobcat.png";

export interface ProfileData {
    name: string;
    email: string;
    department: string;
    bio: string;
    profilePicture: string;
}

interface ProfileModalProps {
    showModal: boolean;
    onClose: () => void;
    profile?: ProfileData;
    onSave?: (data: ProfileData) => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ showModal, onClose, profile, onSave }) => {
    const defaultData: ProfileData = {
        name: "John Doe",
        email: "john.doe@quinnipiac.edu",
        department: "Software Engineering",
        bio: "Example biography text.",
        profilePicture: defaultProfilePic,
    };

    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState<ProfileData>(profile ?? defaultData);
    const [editData, setEditData] = useState<ProfileData>(profile ?? defaultData);

    useEffect(() => {
        const incoming = profile ?? defaultData;
        setProfileData(incoming);
        setEditData(incoming);
    }, [profile]);

    const handleEditClick = () => {
        setIsEditing(true);
        setEditData(profileData);
    };

    const handleSaveClick = () => {
        setProfileData(editData);
        setIsEditing(false);
        if (onSave) onSave(editData);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditData(profileData);
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setEditData({
            ...editData,
            [name]: value,
        });
    };

    if (!showModal) return null;

    return (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-light">
                        <h5 className="modal-title fw-bold">Profile</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                            aria-label="Close"
                        ></button>
                    </div>

                    <div className="modal-body">
                        <div className="text-center mb-4">
                            <img
                                src={editData.profilePicture}
                                alt="Profile"
                                className="rounded-circle"
                                style={{ width: "120px", height: "120px", objectFit: "cover" }}
                            />
                        </div>

                        <div className="mb-4">
                            {isEditing ? (
                                <>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={editData.name}
                                            onChange={handleInputChange}
                                            placeholder="Name"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={editData.email}
                                            onChange={handleInputChange}
                                            placeholder="Email"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="department"
                                            value={editData.department}
                                            onChange={handleInputChange}
                                            placeholder="Department"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <textarea
                                            className="form-control"
                                            name="bio"
                                            value={editData.bio}
                                            onChange={handleInputChange}
                                            rows={3}
                                            placeholder="Biography"
                                        ></textarea>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="mb-3">
                                        <p className="text-muted small mb-1">Name</p>
                                        <p className="fw-bold">{profileData.name}</p>
                                    </div>

                                    <div className="mb-3">
                                        <p className="text-muted small mb-1">Email</p>
                                        <p className="fw-bold">{profileData.email}</p>
                                    </div>

                                    <div className="mb-3">
                                        <p className="text-muted small mb-1">Department</p>
                                        <p className="fw-bold">{profileData.department}</p>
                                    </div>

                                    <div className="mb-3">
                                        <p className="text-muted small mb-1">Biography</p>
                                        <p className="fw-bold">{profileData.bio}</p>
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
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    style={{ backgroundColor: "#1e1b4b", borderColor: "#1e1b4b" }}
                                    onClick={handleSaveClick}
                                >
                                    Save Changes
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
