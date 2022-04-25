import React from "react";
import "./AboutMe.css";
import avatar from "../../images/avatar.png";

const AboutMe = () => {
  return (
    <section id={"about-me"} className="about-me page__about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__description">
        <div className="about-me__info">
          <h3 className="about-me__name">Виталий</h3>
          <p className="about-me__subtitle">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__text">
          Я родился и живу в Саратове, закончил факультет экономики СГУ. 
          У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. 
          С 2015 года работал в компании «СКБ Контур». 
          После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <ul className="about-me__social-links">
            <li className="about-me__social-item">
              <a
                href="https://www.linkedin.com/in/lenkazion/"
                className="about-me__social-link hover-link"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li className="about-me__social-item">
              <a
                href="https://github.com/lenkazion"
                className="about-me__social-link hover-link"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
          </ul>
        </div>

        <img src={avatar} alt="Avatar" className="about-me__avatar" />
      </div>
    </section>
  );
};

export default AboutMe;