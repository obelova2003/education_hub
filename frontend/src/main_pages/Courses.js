import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CategoryFilter from './CategoryFilter';
import PriceFilter from './PriceFilter';
import './courses.css';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

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

    // Фильтрация по категории
    if (selectedCategory !== null && selectedCategory !== '') {
      filteredCourses = filteredCourses.filter(course => 
        course.course_categories.includes(parseInt(selectedCategory))
      );
    }

    // Фильтрация по цене
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

    setFilteredCourses(filteredCourses);
  }, [courses, selectedCategory, minPrice, maxPrice]);

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

  return (
    <div className="container">
      <h1 className="header">Курсы</h1>
      <div className="main-content">
        <div className="filters">
          <h3>Фильтры</h3>
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
        </div>
        <div className="courses-list">
          {filteredCourses.map(course => (
            <div className="card" key={course.id}>
              <img src={course.course_picture} alt={course.course_name} className="course-image" />
              <div className="course-info">
                <Link to={`/courses/${course.id}`} className="link">
                  <h2>{course.course_name}</h2>
                </Link>
                <p>{course.course_description}</p>
                <p>Цена: {course.course_price} ₽</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Courses;