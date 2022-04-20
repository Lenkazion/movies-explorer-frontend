import React from "react";
import { Link } from "react-router-dom";
import "./PageNotFound.css";

const PageNotFound = () => {
  return (
    <section className="not-found page__not-found">
      <h2 className="not-found__title">404</h2>
      <p className="not-found__subtitle">Страница не найдена</p>
      <Link to="/" className="not-found__link hover-link">
        Назад
      </Link>
    </section>
  );
};

export default PageNotFound;