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
            <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
              {feedbackData.length === 0 ? (
                <p className="text-center">No feedback submitted yet.</p>
              ) : (
                feedbackData.map((feedback, index) => (
                  <div
                    key={index}
                    className="card mb-3"
                    style={{ borderRadius: "12px" }}
                  >
                    <div className="card-body text-center">
                      <h6 className="card-title fw-bold text-center">Feedback #{index + 1}</h6>

                      <div className="mb-3">
                        <p className="mb-2 fw-semibold">
                          Was the lesson content clear and easy to understand?
                        </p>
                        <div className="d-flex gap-2 justify-content-center">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <div
                              key={rating}
                              className="rounded-circle d-flex align-items-center justify-content-center"
                              style={{
                                width: "36px",
                                height: "36px",
                                backgroundColor:
                                  feedback.clarity === rating ? "#86efac" : "#d1d5db",
                                fontWeight: 500,
                                fontSize: "1rem",
                              }}
                            >
                              {rating}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mb-3">
                        <p className="mb-2 fw-semibold">
                          Was the pace of the lesson appropriate for your understanding?
                        </p>
                        <div className="d-flex gap-2 justify-content-center">
                          {["Too Fast", "Just Right", "Too Slow"].map((option) => (
                            <div
                              key={option}
                              className="rounded-pill d-flex align-items-center justify-content-center px-3"
                              style={{
                                minWidth: "110px",
                                height: "36px",
                                backgroundColor:
                                  feedback.pace === option ? "#86efac" : "#d1d5db",
                                fontWeight: 500,
                                fontSize: "0.95rem",
                              }}
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="mb-2 fw-semibold">Suggestions to improve this lesson</p>
                        <div
                          className="p-3 mx-auto"
                          style={{ backgroundColor: "#f3f4f6", borderRadius: "8px", maxWidth: "90%" }}
                        >
                          {feedback.suggestion && feedback.suggestion.trim() !== "" ? (
                            feedback.suggestion
                          ) : (
                            <em>No Feedback</em>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyFeedbackModal;
