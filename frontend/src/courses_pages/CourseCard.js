import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function CourseCard() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState(null);
  const [loading, setLoading] = useState(true);

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '2rem auto',
      padding: '1.5rem',
      backgroundColor: '#ffffff',
      borderRadius: '10px',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    title: {
      fontSize: '2rem',
      color: '#2c3e50',
      marginBottom: '1rem',
      borderBottom: '2px solid #EDF7D3',
      paddingBottom: '0.5rem',
    },
    infoParagraph: {
      fontSize: '1rem',
      color: '#34495e',
      marginBottom: '0.75rem',
      lineHeight: '1.5',
    },
    buttonContainer: {
      marginTop: '1.5rem',
    },
    addButton: {
      display: 'inline-block',
      padding: '0.75rem 1.5rem',
      fontSize: '1rem',
      color: '#000000',
      background: 'linear-gradient(to right, #DACCFF, #DACCFF)',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      textAlign: 'center',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    addButtonHover: {
      background: 'linear-gradient(to right, #DACCFF, #DACCFF)',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 10px rgba(0, 0, 0, 0.2)',
    },
    lessonList: {
      marginTop: '2rem',
    },
    lessonItem: {
      marginBottom: '1.25rem',
      padding: '1rem',
      borderLeft: '5px solid #DACCFF',
      borderRadius: '6px',
      transition: 'background-color 0.3s ease',
    },
    lessonLink: {
      display: 'block',
      fontSize: '1.1rem',
      fontWeight: 600,
      color: 'black',
      textDecoration: 'none',
      marginBottom: '0.5rem',
    },
    lessonDescription: {
      fontSize: '0.95rem',
      color: '#5a5a5a',
    },
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/courses/${id}/`)
      .then(response => {
        if (!response.ok) throw new Error('Ошибка сети');
        return response.json();
      })
      .then(data => setCourse(data))
      .catch(error => console.error('Ошибка:', error))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/lessons/?lesson_course=${id}`)
      .then(response => {
        if (!response.ok) throw new Error('Ошибка сети');
        return response.json();
      })
      .then(data => setLessons(data))
      .catch(error => console.error('Ошибка:', error));
  }, [id]);

  if (loading) {
    return <div style={styles.container}>Загрузка...</div>;
  }

  if (!course) {
    return <div style={styles.container}>Курс не найден.</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{course.course_name}</h1>
      <p style={styles.infoParagraph}>Продолжительность: {course.course_duration} месяца</p>
      <p style={styles.infoParagraph}>Стоимость всего курса: {course.course_price} ₽</p>
      <p style={styles.infoParagraph}>Цена в месяц: {course.price_for_month} ₽</p>
      <p style={styles.infoParagraph}>Описание курса: {course.course_description}</p>
      <p style={styles.infoParagraph}>Для кого: {course.course_for_who}</p>

      <div style={styles.buttonContainer}>
        <Link to={`/courses/${id}/lesson_add`} style={styles.addButton}>
          Добавить урок
        </Link>
      </div>

      <h2 style={styles.title}>План курса</h2>
      <div style={styles.lessonList}>
        {lessons && lessons.length > 0 ? (
          lessons.map((lesson, index) => (
            <div key={index} style={styles.lessonItem}>
              <Link to={`/lessons/${lesson.id}`} style={styles.lessonLink}>
                {lesson.lesson_number}. {lesson.lesson_name}
              </Link>
              <p style={styles.lessonDescription}>{lesson.lesson_description}</p>
            </div>
          ))
        ) : (
          <p>Уроки не найдены.</p>
        )}
      </div>
    </div>
  );
}

export default CourseCard;