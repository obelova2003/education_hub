import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CategoryFilter from './CategoryFilter';
import PriceFilter from './PriceFilter';
import LevelFilter from './LevelFilter';
import './courses.css';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedLevels, setSelectedLevels] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/courses/')
      .then(response => response.json())
      .then(data => {
        setCourses(data);
      })
      .catch(error => {
        console.error('Ошибка при получении данных:', error);
      });
  }, []);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/categories/')
      .then(response => response.json())
      .then(data => {
        setCategories(data);
      })
      .catch(error => {
        console.error('Ошибка при получении данных:', error);
      });
  }, []);

  useEffect(() => {
    let filteredCourses = courses;

    if (selectedCategory !== null && selectedCategory !== '') {
      filteredCourses = filteredCourses.filter(course => 
        course.course_categories.some(category => category.id === parseInt(selectedCategory))
      );
    }

    if (minPrice !== '') {
      filteredCourses = filteredCourses.filter(course => 
        course.course_price >= parseFloat(minPrice)
      );
    }

    if (maxPrice !== '') {
      filteredCourses = filteredCourses.filter(course => 
        course.course_price <= parseFloat(maxPrice)
      );
    }

    if (selectedLevels.length > 0) {
      filteredCourses = filteredCourses.filter(course =>
        selectedLevels.includes(course.course_for_who)
      );
    }

    setFilteredCourses(filteredCourses);
  }, [courses, selectedCategory, minPrice, maxPrice, selectedLevels]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handlePriceChange = (type, value) => {
    if (type === 'min') {
      setMinPrice(value);
    } else if (type === 'max') {
      setMaxPrice(value);
    }
  };

  const handleLevelChange = (level) => {
    setSelectedLevels(prevLevels =>
      prevLevels.includes(level)
        ? prevLevels.filter(l => l !== level)
        : [...prevLevels, level]
    );
  };

  return (
    <div className="container">
      <div className="main-content">
        <div className="filters">
          <CategoryFilter 
            categories={categories} 
            onCategoryChange={handleCategoryChange} 
            selectedCategory={selectedCategory} 
          />
          <PriceFilter 
            minPrice={minPrice}
            maxPrice={maxPrice}
            onPriceChange={handlePriceChange}
          />
          <LevelFilter 
            selectedLevels={selectedLevels}
            onLevelChange={handleLevelChange}
          />
        </div>
        <div className="courses-list">
          {filteredCourses.map(course => (
            <Link to={`/courses/${course.id}`} className="card" key={course.id}>
              <img src={course.course_picture} alt={course.course_name} className="course-image" />
              <div className="course-info">
                <h2>{course.course_name}</h2>
                <div className="course-teacher"><p>Иван Иванов</p></div>
                <div className="course-details">
                  <p>{course.course_description}</p>
                  <p className="course-price">{course.course_price}₽</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Courses;
