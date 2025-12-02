import React from "react";

interface FeedbackEntry {
  clarity: number;
  pace: string;
  suggestion: string;
}

interface FacultyFeedbackModalProps {
  showModal: boolean;
  onClose: () => void;
  lectureTitle: string;
  feedbackData: FeedbackEntry[];
}

const FacultyFeedbackModal: React.FC<FacultyFeedbackModalProps> = ({
  showModal,
  onClose,
  lectureTitle,
  feedbackData,
}) => {
  if (!showModal) return null;

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "800px" }}
      >
        <div className="modal-content">
          <div className="modal-header border-0 d-flex flex-column align-items-center">
            <div className="w-100 d-flex justify-content-start">
              <button
                type="button"
                className="btn rounded-pill px-4 py-2 ms-3"
                onClick={onClose}
                style={{
                  backgroundColor: "#1e1b4b",
                  color: "white",
                  border: "none",
                }}
              >
                Back
              </button>
            </div>
            <h2
              className="modal-title w-100 text-center fw-bold mt-3"
              style={{ fontSize: "2.5rem" }}
            >
              {lectureTitle} Feedback
            </h2>
          </div>
          <div className="modal-body px-5 py-4">
            <div className="mb-5">
              <h5 className="text-center mb-4">
                Was the lesson content clear and easy to understand?
              </h5>
              <div className="d-flex flex-column align-items-center gap-2">
                {feedbackData.map((feedback, index) => (
                  <div key={index} className="d-flex gap-3">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <div
                        key={rating}
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                          width: "50px",
                          height: "50px",
                          backgroundColor:
                            feedback.clarity === rating ? "#86efac" : "#d1d5db",
                          fontWeight: "500",
                          fontSize: "1.1rem",
                        }}
                      >
                        {rating}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <h5 className="text-center mb-4">
                Was the pace of the lesson appropriate for your understanding?
              </h5>
              <div className="d-flex flex-column align-items-center gap-2">
                {feedbackData.map((feedback, index) => (
                  <div key={index} className="d-flex gap-3">
                    {["Too Fast", "Just Right", "Too Slow"].map((option) => (
                      <div
                        key={option}
                        className="rounded-pill d-flex align-items-center justify-content-center px-4"
                        style={{
                          minWidth: "120px",
                          height: "45px",
                          backgroundColor:
                            feedback.pace === option ? "#86efac" : "#d1d5db",
                          fontWeight: "500",
                          fontSize: "0.95rem",
                        }}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h5 className="text-center mb-4">
                Do you have any suggestions to improve this lesson?
              </h5>
              <div className="d-flex flex-column align-items-center gap-3">
                {feedbackData
                  .filter((f) => f.suggestion && f.suggestion.trim() !== "")
                  .map((feedback, index) => (
                    <div
                      key={index}
                      className="rounded-pill px-4 py-3"
                      style={{
                        backgroundColor: "#e5e7eb",
                        maxWidth: "90%",
                        textAlign: "center",
                      }}
                    >
                      {feedback.suggestion}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyFeedbackModal;
