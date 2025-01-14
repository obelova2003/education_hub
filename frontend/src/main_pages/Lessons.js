import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Lessons() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [textContent, setTextContent] = useState('');

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/lessons/${id}/`)
      .then(response => response.json())
      .then(data => {
        setLesson(data);
        // Загружаем текстовый файл
        fetch(data.text_file.text_file)
          .then(response => response.text())
          .then(text => setTextContent(text))
          .catch(error => console.error('Ошибка загрузки текстового файла:', error));
      })
      .catch(error => console.error('Ошибка:', error));
  }, [id]);

  if (!lesson) return <div>Загрузка...</div>;

  return (
    <div>
      <h1>{lesson.lesson_number}. {lesson.lesson_name || 'Название недоступно'}</h1>
      <p>{lesson.lesson_description || 'Описание недоступно'}</p>

      {lesson.video_file && (
        <div>
          <h2>{lesson.video_file.video_name}</h2>
          <video width="300" controls>
            <source src={lesson.video_file.video_file} type="video/mp4" />
            Ваш браузер не поддерживает видео.
          </video>
          <p>{lesson.video_file.video_description}</p>
        </div>
      )}

      {lesson.text_file && (
        <div>
          <h2>{lesson.text_file.text_name}</h2>
          <p>{textContent || 'Ошибка загрузки текста.'}</p>
        </div>
      )}
    </div>
  );
}

export default Lessons;
