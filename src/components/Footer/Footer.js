import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer page__footer">
      <div className="footer__container">
        <h3 className="footer__title">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h3>
        <div className="footer__description">
          <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
          <ul className="footer__links">
            <li className="footer__item">
              <a
                href="https://practicum.yandex.ru/"
                className="footer__link hover-link"
                target="_blank"
                rel="noreferrer"
              >
                Яндекс.Практикум
              </a>
            </li>
            <li className="footer__item">
              <a
                href="https://github.com/lenkazion"
                className="footer__link hover-link"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
            <li className="footer__item">
              <a
                href="https://www.linkedin.com/in/lenkazion/"
                className="footer__link hover-link"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;