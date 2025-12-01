import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import "./App.css";
import App from "./App.tsx";
import Student from "./Student";
import FacultyAdmin from "./FacultyAdmin";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/studentdashboard" element={<Student />} />
      <Route path="/facultyAdmin" element={<FacultyAdmin />} />
    </Routes>
  </BrowserRouter>
);
