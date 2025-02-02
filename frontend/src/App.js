import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Courses from "./main_pages/Courses";
import CourseCard from "./main_pages/CourseCard";
import Lessons from "./main_pages/Lessons";
import Menu from "./main_pages/Menu";
import AddCourse from './main_pages/AddCourse';
import AddLessonPage from './main_pages/AddLessonPage';

function App() {
  return (
    <Router>
      <div>
        {/* <Menu /> */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<div>Главная</div>} />
            <Route path="/courses_add" element={<AddCourse />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseCard />} />
            <Route path="/lessons/:id" element={<Lessons />} />
            <Route path="/courses/:id/lesson_add" element={<AddLessonPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;