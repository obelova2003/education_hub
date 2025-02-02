import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddCourse = () => {
  const [formData, setFormData] = useState({
    course_name: '',
    course_duration: 1,
    course_price: 1,
    course_description: '',
    course_for_who: 'Для начинающих',
    course_categories: [],
    course_picture: null,
  });

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/categories/');
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      course_picture: e.target.files[0],
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const categoryId = parseInt(value);

    if (checked) {
      const selectedCategory = categories.find((category) => category.id === categoryId);
      if (selectedCategory) {
        setFormData((prevState) => ({
          ...prevState,
          course_categories: [...prevState.course_categories, selectedCategory],
        }));
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        course_categories: prevState.course_categories.filter(
          (category) => category.id !== categoryId
        ),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Данные для отправки:", formData);

    try {
      const data = new FormData();
      data.append('course_name', formData.course_name);
      data.append('course_duration', formData.course_duration);
      data.append('course_price', formData.course_price);
      data.append('course_description', formData.course_description);
      data.append('course_for_who', formData.course_for_who);

      formData.course_categories.forEach((category, index) => {
        data.append(`course_categories[${index}]id`, category.id);
        data.append(`course_categories[${index}]category_name`, category.category_name);
        data.append(`course_categories[${index}]category_description`, category.category_description);
      });

      if (formData.course_picture) {
        data.append('course_picture', formData.course_picture);
      }

      const response = await axios.post('http://127.0.0.1:8000/api/courses/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("Ответ сервера:", response.data);
      window.location.href = '/courses';
    } catch (error) {
      console.error("Ошибка при создании курса:", error.response?.data || error.message);
      setError('Ошибка при создании курса. Пожалуйста, проверьте данные и попробуйте снова.');
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <span className="visually-hidden">Создание курса</span>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form className="course-form" onSubmit={handleSubmit}>
          <label>
            Название курса:
            <input
              type="text"
              name="course_name"
              value={formData.course_name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Длительность курса (в месяцах):
            <input
              type="number"
              name="course_duration"
              value={formData.course_duration}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Цена курса (в руб.):
            <input
              type="number"
              name="course_price"
              value={formData.course_price}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Описание курса:
            <textarea
              name="course_description"
              value={formData.course_description}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Для кого курс:
            <select
              name="course_for_who"
              value={formData.course_for_who}
              onChange={handleChange}
              required
            >
              <option value="Для начинающих">Для начинающих</option>
              <option value="Для продолжающих">Для продолжающих</option>
              <option value="Для продвинутых">Для продвинутых</option>
              <option value="Для всех">Для всех</option>
            </select>
          </label>

          <label>
            Категории:
            <ul className="categories-data choice">
              {categories.map((category) => (
                <li key={category.id} className="sub-category add">
                  <input
                    type="checkbox"
                    name="course_categories"
                    value={String(category.id)}
                    checked={formData.course_categories.some(
                      (c) => c.id === category.id
                    )}
                    onChange={handleCheckboxChange}
                  />
                  <span>{category.category_name}</span>
                </li>
              ))}
            </ul>
          </label>

          <label>
            Картинка курса:
            <input
              type="file"
              name="course_picture"
              onChange={handleFileChange}
            />
          </label>

          <button type="submit">Создать курс</button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;