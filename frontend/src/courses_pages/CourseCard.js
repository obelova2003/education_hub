import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function CourseCard() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/courses/${id}/`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Сеть ответила с ошибкой');
        }
        return response.json();
      })
      .then(data => {
        setCourse(data);
      })
      .catch(error => {
        console.error('Ошибка при получении данных курса:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/lessons/?lesson_course=${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Сеть ответила с ошибкой');
        }
        return response.json();
      })
      .then(data => {
        setLessons(data);
      })
      .catch(error => {
        console.error('Ошибка при получении данных уроков:', error);
      });
  }, [id]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (!course) {
    return <div>Курс не найден.</div>;
  }

  return (
    <div>
      <h1>{course.course_name}</h1>
      <p>Продолжительность: {course.course_duration}</p>
      <p>Стоимость всего курса: {course.course_price}</p>
      <p>Цена в месяц: {course.price_for_month}</p>
      <p>Описание курса: {course.course_description}</p>
      <p>Для кого: {course.course_for_who}</p>
      <p>Кол-во уроков в курсе: {course.amount_of_lessons}</p>
      <Link to={`/courses/${id}/lesson_add`}>
        <button>Добавить урок</button>
      </Link>

      <h1>План курса</h1>
      {lessons && lessons.length > 0 ? (
        lessons.map((lesson, index) => (
          <div key={index}>
            <Link to={`/lessons/${lesson.id}`}>{lesson.lesson_number}. {lesson.lesson_name}</Link>
            <p>Описание урока: {lesson.lesson_description}</p>
          </div>
        ))
      ) : (
        <p>Уроки не найдены.</p>
      )}
    </div>
  );
}

export default CourseCard;