import React from 'react';
import './Main.css';

function Main() {
  return (
    <div className="main-container">

      <section className="hero-section">
        <div className="hero-content">
          <h1>EducationalHUB</h1>
          <p>ваш персональный помощник в мире образования и саморазвития</p>
          <a href="#about" className="cta-button">Узнать больше</a>
        </div>
      </section>


       <section id="about" className="about-section">
         <p>
           EducationalHUB — это платформа, которая помогает вам находить лучшие образовательные ресурсы, 
           курсы и материалы для саморазвития. Мы стремимся сделать образование доступным и увлекательным 
           для каждого, независимо от возраста и уровня подготовки.
         </p>
       </section>


       <section className="features-section">
         <h2>Почему выбирают нас?</h2>
         <div className="features-grid">
           <div className="feature">
             <h3>Широкий выбор курсов</h3>
             <p>От программирования до искусства — у нас есть курсы на любой вкус.</p>
           </div>
           <div className="feature">
             <h3>Экспертные знания</h3>
             <p>Все курсы создаются профессионалами в своих областях.</p>
           </div>
           <div className="feature">
             <h3>Гибкость обучения</h3>
             <p>Учитесь в удобное для вас время и в своем темпе.</p>
           </div>
         </div>
       </section>


      <section className="cta-section">
        <h2>Начните свое обучение сегодня!</h2>
        <p>Присоединяйтесь к тысячам студентов, которые уже улучшают свои навыки с EducationalHUB.</p>
        <a href="/auth" className="cta-button">Зарегистрироваться</a>
      </section>
    </div>
  );
}

export default Main;