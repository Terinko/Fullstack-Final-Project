import React, { useState } from "react";

interface LectureModalProps {
    showModal: boolean;
    onClose: () => void;
    onContinue: (lecture: string) => void;
    courseName: string;
}

const LectureModal: React.FC<LectureModalProps> = ({
    showModal,
    onClose,
    onContinue,
    courseName,
}) => {
    const [selectedLecture, setSelectedLecture] = useState<string>("");

    // Mock lecture data - replace with actual data from API
    const lectures = [
        "Lecture 1",
        "Lecture 2",
        "Lecture 3",
        "Lecture 4",
        "Lecture 5",
    ];

    const handleContinue = () => {
        if (selectedLecture) {
            console.log(`Selected: ${courseName} - ${selectedLecture}`);
            onContinue(selectedLecture);
            setSelectedLecture("");
        }
    };

    if (!showModal) return null;

    return (
        <div
            className="modal fade show d-block"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            onClick={onClose}
        >
            <div
                className="modal-dialog modal-dialog-centered"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <button
                            type="button"
                            className="btn btn-link text-dark text-decoration-none"
                            onClick={onClose}
                            style={{ position: "absolute", left: "15px", backgroundColor: "#dbdbdbff" }}
                        >
                            Back
                        </button>
                        <h5 className="modal-title" style={{ width: "100%", textAlign: "center" }}>
                            Select Lecture
                        </h5>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="lectureSelect" className="form-label">
                                {courseName}
                            </label>
                            <select
                                id="lectureSelect"
                                className="form-select"
                                value={selectedLecture}
                                onChange={(e) => setSelectedLecture(e.target.value)}
                            >
                                <option value="">Choose a lecture...</option>
                                {lectures.map((lecture, index) => (
                                    <option key={index} value={lecture}>
                                        {lecture}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleContinue}
                            disabled={!selectedLecture}
                            style={{ backgroundColor: "#1e1b4b", borderColor: "#1e1b4b" }}
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LectureModal;
