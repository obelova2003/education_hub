import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Courses from "./main_pages/Courses";
import CourseCard from "./main_pages/CourseCard";
import Lessons from "./main_pages/Lessons";
import Menu from "./main_pages/Menu";

function App() {
  return (
    <Router>
      <div>
        {/* <Menu /> */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<div>Главная</div>} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseCard />} />
            <Route path="/lessons/:id" element={<Lessons />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;