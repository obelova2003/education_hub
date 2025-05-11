import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import mammoth from 'mammoth';

function Lessons() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [htmlContent, setHtmlContent] = useState('');

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
    description: {
      fontSize: '1rem',
      color: '#34495e',
      marginBottom: '1.5rem',
      lineHeight: '1.6',
    },
    videoContainer: {
      marginBottom: '1.5rem',
    },
    video: {
      width: '100%',
      maxWidth: '100%',
      height: 'auto',
      borderRadius: '8px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    contentTitle: {
      fontSize: '1.3rem',
      color: '#2c3e50',
      marginTop: '1.5rem',
      marginBottom: '0.5rem',
      fontWeight: 'bold',
    },
    documentContent: {
      border: '1px solid #ddd',
      borderRadius: '6px',
      padding: '1rem',
      backgroundColor: '#fdfdfd',
      color: '#333',
      lineHeight: '1.6',
      fontFamily: '"Courier New", Courier, monospace',
      fontSize: '0.95rem',
    },
    loading: {
      textAlign: 'center',
      fontSize: '1.2rem',
      color: '#7f8c8d',
      marginTop: '2rem',
    },
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/lessons/${id}/`)
      .then(response => {
        if (!response.ok) throw new Error('Ошибка загрузки урока');
        return response.json();
      })
      .then(data => {
        setLesson(data);
        if (data.text_file) {
          fetch(data.text_file)
            .then(res => res.arrayBuffer())
            .then(buffer => {
              mammoth.convertToHtml({ arrayBuffer: buffer })
                .then(result => {
                  setHtmlContent(result.value);
                })
                .catch(err => console.error('Ошибка конвертации:', err));
            })
            .catch(err => console.error('Ошибка загрузки файла:', err));
        }
      })
      .catch(error => {
        console.error('Ошибка при получении данных:', error);
        setLesson(null);
      });
  }, [id]);

  if (!lesson) {
    return <div style={styles.loading}>Загрузка урока...</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        {lesson.lesson_number}. {lesson.lesson_name || 'Название недоступно'}
      </h1>
      <p style={styles.description}>
        {lesson.lesson_description || 'Описание недоступно'}
      </p>

      {lesson.video_file && (
        <div style={styles.videoContainer}>
          <h2 style={styles.contentTitle}>Видео-лекция</h2>
          <video style={styles.video} controls>
            <source src={lesson.video_file} type="video/mp4" />
            Ваш браузер не поддерживает видео.
          </video>
        </div>
      )}

      {lesson.text_file && (
        <div>
          <h2 style={styles.contentTitle}>Текстовый материал</h2>
          <div style={styles.documentContent} dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
      )}
    </div>
  );
}

export default Lessons;