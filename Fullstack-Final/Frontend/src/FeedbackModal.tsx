/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";

interface FeedbackModalProps {
  showModal: boolean;
  onClose: () => void;
  onBack: () => void;
  lectureTitle: string;
  lectureId: string;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  showModal,
  onClose,
  onBack,
  lectureTitle,
  lectureId,
}) => {
  const [clarity, setClarity] = useState<number>(0);
  const [pace, setPace] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [prefilling, setPrefilling] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if (!showModal || !lectureId) return;

    const studentId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!studentId || !token) return;

    const fetchExisting = async () => {
      setPrefilling(true);
      try {
        const res = await fetch(
          `http://localhost:3001/api/lectures/${lectureId}/my-feedback?student_id=${studentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );
        if (res.ok) {
          const existing = await res.json();
          if (existing) {
            setClarity(existing.clarity);
            setPace(existing.pace);
            setSuggestions(existing.suggestion || "");
            setIsUpdate(true);
          } else {
            setClarity(0);
            setPace("");
            setSuggestions("");
            setIsUpdate(false);
          }
        }
      } catch (err) {
        console.error("Could not fetch existing feedback:", err);
      } finally {
        setPrefilling(false);
      }
    };

    fetchExisting();
  }, [showModal, lectureId]);

  const handleSave = async () => {
    if (!clarity || !pace) {
      setError("Please select a clarity rating and a pace option.");
      return;
    }

    setLoading(true);
    setError("");

    const studentId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:3001/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          lecture_id: lectureId,
          student_id: studentId,
          clarity,
          pace,
          suggestion: suggestions,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Feedback POST failed:", data);
        throw new Error(data.error || "Failed to submit feedback");
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1200);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
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
          <div className="modal-header d-flex flex-column align-items-start">
            <button
              type="button"
              className="btn btn-link text-dark text-decoration-none mb-2"
              onClick={onBack}
              style={{
                backgroundColor: "#dbdbdbff",
                padding: "5px 15px",
                borderRadius: "4px",
              }}
            >
              Back
            </button>

            <h5 className="modal-title m-0">{lectureTitle} Feedback</h5>

            <button
              type="button"
              className="btn-close"
              style={{ position: "absolute", right: "1rem", top: "1rem" }}
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            {prefilling ? (
              <p className="text-center text-muted py-4">
                Loading your previous feedback...
              </p>
            ) : (
              <>
                {isUpdate && (
                  <div
                    className="alert alert-info py-2 mb-3"
                    style={{ fontSize: "0.875rem" }}
                  >
                    You've already reviewed this lecture. Saving will update
                    your previous response.
                  </div>
                )}

                <div className="mb-4">
                  <label className="form-label fw-bold">
                    Was the lesson content clear and easy to understand?
                  </label>
                  <div className="d-flex gap-2 justify-content-center">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        className={`btn ${clarity === num ? "btn-dark" : "btn-outline-secondary"}`}
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
                    Was the pace of the lesson appropriate for your
                    understanding?
                  </label>
                  <div className="d-flex gap-2 justify-content-center flex-wrap">
                    {["Too Fast", "Just Right", "Too Slow"].map((option) => (
                      <button
                        key={option}
                        className={`btn ${pace === option ? "btn-dark" : "btn-outline-secondary"}`}
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

                {error && <div className="alert alert-danger">{error}</div>}
                {success && (
                  <div className="alert alert-success">
                    {isUpdate ? "Feedback updated!" : "Feedback submitted!"}
                  </div>
                )}
              </>
            )}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
              disabled={loading || success || prefilling}
              style={{ backgroundColor: "#1e1b4b", borderColor: "#1e1b4b" }}
            >
              {loading ? "Saving..." : isUpdate ? "Update Feedback" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
