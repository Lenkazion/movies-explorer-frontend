import React from "react";
import "./Portfolio.css";
import arrow from "../../images/arrow.svg";

const Portfolio = () => {
  return (
    <section className="portfolio page__portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__links">
        <li className="portfolio__item">
          <a
            href="https://github.com/Lenkazion/how-to-learn"
            className="porfolio__link hover-link"
            target="_blank"
            rel="noreferrer"
          >
            Статичный сайт
            <img className="portfolio__arrow" src={arrow} alt="Arrow" />
          </a>
        </li>
        <li className="portfolio__item">
          <a
            href="https://github.com/Lenkazion/russian-travel"
            className="porfolio__link hover-link"
            target="_blank"
            rel="noreferrer"
          >
            Адаптивный сайт
            <img className="portfolio__arrow" src={arrow} alt="Arrow" />
          </a>
        </li>
        <li className="portfolio__item">
          <a
            href="https://lenkazion.nomoredomains.work/"
            className="porfolio__link hover-link"
            target="_blank"
            rel="noreferrer"
          >
            Одностраничное приложение
            <img className="portfolio__arrow" src={arrow} alt="Arrow" />
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;