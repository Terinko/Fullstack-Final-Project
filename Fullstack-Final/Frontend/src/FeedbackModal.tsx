import React, { useState } from "react";

interface FeedbackModalProps {
    showModal: boolean;
    onClose: () => void;
    onBack: () => void;
    lectureTitle: string;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
    showModal,
    onClose,
    onBack,
    lectureTitle,
}) => {
    const [clarity, setClarity] = useState<number>(0);
    const [pace, setPace] = useState<string>("");
    const [suggestions, setSuggestions] = useState<string>("");

    const handleSave = () => {
        console.log({
            lecture: lectureTitle,
            clarity,
            pace,
            suggestions,
        });
        // Reset form and close
        setClarity(0);
        setPace("");
        setSuggestions("");
        onClose();
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
                            onClick={onBack}
                            style={{ position: "absolute", left: "15px", backgroundColor: "#dbdbdbff" }}
                        >
                            ← Back
                        </button>
                        <h5 className="modal-title" style={{ width: "100%", textAlign: "center" }}>
                            {lectureTitle} Feedback
                        </h5>
                    </div>
                    <div className="modal-body">
                        <div className="mb-4">
                            <label className="form-label fw-bold">
                                Was the lesson content clear and easy to understand?
                            </label>
                            <div className="d-flex gap-2 justify-content-center">
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <button
                                        key={num}
                                        className={`btn ${clarity === num
                                            ? "btn-dark"
                                            : "btn-outline-secondary"
                                            }`}
                                        onClick={() => setClarity(num)}
                                        style={{
                                            width: "40px",
                                            height: "40px",
                                            borderRadius: "50%",
                                        }}
                                    >
                                        {num}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-bold">
                                Was the pace of the lesson appropriate for your understanding?
                            </label>
                            <div className="d-flex gap-2 justify-content-center flex-wrap">
                                {["Too Fast", "Just Right", "Too Slow"].map((option) => (
                                    <button
                                        key={option}
                                        className={`btn ${pace === option
                                            ? "btn-dark"
                                            : "btn-outline-secondary"
                                            }`}
                                        onClick={() => setPace(option)}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="suggestions" className="form-label fw-bold">
                                Do you have any suggestions to improve the lesson?
                            </label>
                            <textarea
                                id="suggestions"
                                className="form-control"
                                rows={4}
                                placeholder="Share your feedback..."
                                value={suggestions}
                                onChange={(e) => setSuggestions(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleSave}
                            style={{ backgroundColor: "#1e1b4b", borderColor: "#1e1b4b" }}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedbackModal;
