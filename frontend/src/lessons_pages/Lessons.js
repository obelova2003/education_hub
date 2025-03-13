import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import mammoth from 'mammoth';

function Lessons() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/lessons/${id}/`)
      .then(response => response.json())
      .then(data => {
        setLesson(data);
        if (data.text_file) {
          fetch(data.text_file)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => {
              mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
                .then(result => {
                  setHtmlContent(result.value);
                })
                .catch(error => console.error('Ошибка конвертации:', error));
            })
            .catch(error => console.error('Ошибка загрузки файла:', error));
        }
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
          <h2>Видео урока</h2>
          <video width="300" controls>
            <source src={lesson.video_file} type="video/mp4" />
            Ваш браузер не поддерживает видео.
          </video>
        </div>
      )}

      {lesson.text_file && (
        <div>
          <h2>Текстовый материал</h2>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
      )}
    </div>
  );
}

export default Lessons;