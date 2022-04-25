import React from "react";
import "./AboutProject.css";

const AboutProject = () => {
  return (
    <section id={"about-project"} className="about-project page__about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__description">
        <div className="about-project__left-column column">
          <h3 className="about-project__subtitle">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__right-column column">
          <h3 className="about-project__subtitle">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__timeline">
        <div className="timeline timeline__backend">
          <p className="timeline__title title-backend">1 неделя</p>
        </div>
        <p className="timeline__text text-left">Back-end</p>
        <div className="timeline timeline__frontend">
          <p className="timeline__title title-frontend">4 недели</p>
        </div>
        <p className="timeline__text text-right">Front-end</p>
      </div>
    </section>
  );
};

export default AboutProject;