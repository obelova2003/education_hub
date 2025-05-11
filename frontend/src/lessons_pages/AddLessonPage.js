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

  const styles = {
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      padding: '2rem',
    },
    container: {
      maxWidth: '600px',
      width: '100%',
      backgroundColor: '#ffffff',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      padding: '2rem',
    },
    title: {
      fontSize: '2rem',
      color: '#2c3e50',
      marginBottom: '1rem',
      borderBottom: '2px solid #EDF7D3',
      paddingBottom: '0.5rem',
    },
    label: {
      display: 'block',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
      color: '#34495e',
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #ccc',
      borderRadius: '6px',
      fontSize: '1rem',
      transition: 'border-color 0.3s ease',
      marginBottom: '1rem',
    },
    textarea: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #ccc',
      borderRadius: '6px',
      fontSize: '1rem',
      transition: 'border-color 0.3s ease',
      resize: 'vertical',
      height: '100px',
      marginBottom: '1rem',
    },
    fileInput: {
      width: '100%',
      padding: '0.5rem 0',
      border: 'none',
      marginBottom: '1rem',
    },
    button: {
      display: 'inline-block',
      width: '100%',
      padding: '0.75rem',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      color: 'white',
      background: 'linear-gradient(to right, #007bff, #0056b3)',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    buttonHover: {
      background: 'linear-gradient(to right, #0056b3, #003f7f)',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 10px rgba(0, 0, 0, 0.2)',
    },
    error: {
      color: 'red',
      textAlign: 'center',
      marginBottom: '1rem',
    },
  };

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

    try {
      const data = new FormData();
      data.append('lesson_name', formData.lesson_name);
      data.append('lesson_number', formData.lesson_number);
      data.append('lesson_description', formData.lesson_description);
      data.append('lesson_course', id);
      if (formData.video_file) data.append('video_file', formData.video_file);
      if (formData.text_file) data.append('text_file', formData.text_file);

      await axios.post(`http://127.0.0.1:8000/api/lessons/`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      navigate(`/courses/${id}`);
    } catch (err) {
      console.error('Ошибка при создании урока:', err);
      setError('Ошибка при создании урока. Пожалуйста, попробуйте снова.');
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h1 style={styles.title}>Создание урока</h1>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={styles.label}>Название урока:</label>
            <input
              type="text"
              name="lesson_name"
              value={formData.lesson_name}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={styles.label}>Номер урока:</label>
            <input
              type="number"
              name="lesson_number"
              value={formData.lesson_number}
              onChange={handleChange}
              style={styles.input}
              min="1"
              required
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={styles.label}>Описание урока:</label>
            <textarea
              name="lesson_description"
              value={formData.lesson_description}
              onChange={handleChange}
              style={styles.textarea}
              required
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={styles.label}>Видеофайл:</label>
            <input
              type="file"
              name="video_file"
              onChange={handleFileChange}
              style={styles.fileInput}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={styles.label}>Текстовый файл:</label>
            <input
              type="file"
              name="text_file"
              onChange={handleFileChange}
              style={styles.fileInput}
            />
          </div>

          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => (e.currentTarget.style.background = styles.buttonHover.background)}
            onMouseOut={(e) => (e.currentTarget.style.background = styles.button.background)}
          >
            Создать урок
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLessonPage;