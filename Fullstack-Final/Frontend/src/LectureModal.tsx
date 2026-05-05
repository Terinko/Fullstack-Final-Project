import React, { useState, useEffect } from "react";

interface Lecture {
  _id: string;
  title: string;
  lecture_number: number;
  date: string;
}

interface LectureModalProps {
  showModal: boolean;
  onClose: () => void;
  onContinue: (lectureTitle: string, lectureId: string) => void;
  courseName: string;
  courseId: string;
}

const LectureModal: React.FC<LectureModalProps> = ({
  showModal,
  onClose,
  onContinue,
  courseName,
  courseId,
}) => {
  const [selectedLectureId, setSelectedLectureId] = useState<string>("");
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!showModal || !courseId) return;

    const token = localStorage.getItem("token");

    const fetchLectures = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:3001/api/courses/${courseId}/lectures`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );
        if (res.ok) {
          const data = await res.json();
          setLectures(data);
        }
      } catch (err) {
        console.error("Error fetching lectures:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLectures();
  }, [showModal, courseId]);

  const handleContinue = () => {
    const selected = lectures.find((l) => l._id === selectedLectureId);
    if (selected) {
      onContinue(
        `${courseName} — Lecture ${selected.lecture_number}: ${selected.title}`,
        selected._id,
      );
      setSelectedLectureId("");
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
              style={{
                position: "absolute",
                left: "15px",
                backgroundColor: "#dbdbdbff",
              }}
            >
              Back
            </button>
            <h5
              className="modal-title"
              style={{ width: "100%", textAlign: "center" }}
            >
              Select Lecture
            </h5>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="lectureSelect" className="form-label">
                {courseName}
              </label>
              {loading ? (
                <p className="text-muted">Loading lectures...</p>
              ) : lectures.length === 0 ? (
                <p className="text-muted">
                  No lectures available for this course yet.
                </p>
              ) : (
                <select
                  id="lectureSelect"
                  className="form-select"
                  value={selectedLectureId}
                  onChange={(e) => setSelectedLectureId(e.target.value)}
                >
                  <option value="">Choose a lecture...</option>
                  {lectures.map((lecture) => (
                    <option key={lecture._id} value={lecture._id}>
                      Lecture {lecture.lecture_number}: {lecture.title}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleContinue}
              disabled={!selectedLectureId}
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
