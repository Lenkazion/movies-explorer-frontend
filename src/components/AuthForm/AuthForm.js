import React from "react";
import "./AuthForm.css";
import logo from "../../images/header-logo.svg";
import { Link } from "react-router-dom";

const AuthForm = ({ title, name, buttonText }) => {
  return (
    <section className="auth page__auth">
      <Link to="/" className="auth__home">
        <img src={logo} alt="Logo" className="auth__logo" />
      </Link>
      <h2 className="auth__title">{title}</h2>
      <form name={name} className="auth__form">
        <fieldset className="auth__fieldset">
          {name === "register" ? (
            <label className="auth__label">
              Имя
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Введите ваше имя"
                className="auth__input"
                minLength="2"
                maxLength="30"
                required
              />
            </label>
          ) : null}
          <label className="auth__label">
            E-mail
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Введите ваш e-mail"
              className="auth__input"
              required
            />
          </label>
          <label className="auth__label">
            Пароль
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Введите ваш пароль"
              className="auth__input last"
              required
            />
          </label>
          <button
            className={`auth__submit-btn hover-btn ${
              name === "login" ? "login" : "register"
            }`}
          >
            {buttonText}
          </button>
          {name === "register" ? (
            <p className="auth__text">
              Уже зарегистрированы?
              <Link to="/signin" className="auth__link hover-link">
                Войти
              </Link>
            </p>
          ) : (
            <p className="auth__text">
              Ещё не зарегистрированы?
              <Link to="/signup" className="auth__link hover-link">
                Регистрация
              </Link>
            </p>
          )}
        </fieldset>
      </form>
    </section>
  );
};

export default AuthForm;