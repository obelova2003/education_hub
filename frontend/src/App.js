import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Courses from "./main_pages/Courses";
import CourseCard from "./main_pages/CourseCard";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseCard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
