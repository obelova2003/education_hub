import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Courses from "./courses_pages/Courses";
import CourseCard from "./courses_pages/CourseCard";
import Lessons from "./lessons_pages/Lessons";
import Menu from "./menu/Menu";
import AddCourse from './courses_pages/AddCourse';
import AddLessonPage from './lessons_pages/AddLessonPage';
import Main from './main_pages/Main';
import Forum from './main_pages/Forum';
import Registration from './auth/Registration';
import Login from './auth/Login';
import Logout from './auth/Logout';


function App() {
  return (
    <Router>
      <div>
        <Menu />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/courses_add" element={<AddCourse />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseCard />} />
            <Route path="/lessons/:id" element={<Lessons />} />
            <Route path="/courses/:id/lesson_add" element={<AddLessonPage />} />
            <Route path="/auth" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;