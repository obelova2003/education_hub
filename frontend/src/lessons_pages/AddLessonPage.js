import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AddLessonPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    lesson_name: '',
    lesson_number: 0,
    lesson_description: '',
    video_file: null,
    text_file: null,
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Данные для отправки:", formData);

    try {
      const data = new FormData();
      data.append('lesson_name', formData.lesson_name);
      data.append('lesson_number', formData.lesson_number);
      data.append('lesson_description', formData.lesson_description);
      data.append('lesson_course', id);
      if (formData.video_file) {
        data.append('video_file', formData.video_file);
      }
      if (formData.text_file) {
        data.append('text_file', formData.text_file);
      }

      const response = await axios.post(`http://127.0.0.1:8000/api/lessons/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("Ответ сервера:", response.data);
      navigate(`/courses/${id}`);
    } catch (error) {
      console.error("Ошибка при создании урока:", error.response?.data || error.message);
      setError('Ошибка при создании урока. Пожалуйста, проверьте данные и попробуйте снова.');
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <span className="visually-hidden">Создание урока</span>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form className="lesson-form" onSubmit={handleSubmit}>
          <label>
            Название урока:
            <input
              type="text"
              name="lesson_name"
              value={formData.lesson_name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Номер урока:
            <input
              type="number"
              name="lesson_number"
              value={formData.lesson_number}
              onChange={handleChange}
              required
            />
          </label>


          <label>
            Описание урока:
            <textarea
              name="lesson_description"
              value={formData.lesson_description}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Видеофайл:
            <input
              type="file"
              name="video_file"
              onChange={handleFileChange}
            />
          </label>

          <label>
            Текстовый файл:
            <input
              type="file"
              name="text_file"
              onChange={handleFileChange}
            />
          </label>

          <button type="submit">Создать урок</button>
        </form>
      </div>
    </div>
  );
};

export default AddLessonPage;