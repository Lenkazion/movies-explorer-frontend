import { React, forwardRef, useState } from "react";
import "./AuthForm.css";
import logo from "../../images/header-logo.svg";
import { Link } from "react-router-dom";
import FieldErrorText from "../FieldErrorText/FieldErrorText";

const AuthForm = forwardRef(
  (
    {
      title,
      name,
      buttonText,
      userName,
      userEmail,
      userPassword,
      isValid = true,
      onSubmit,
      onChange,
      errors,
      errorApi,
      isLoading,
    },
    ref
  ) => {
    const [isValidEmail, setIsValidEmail] = useState(false);
    const handleChange = (e) => {
      onChange(e);
    };
    const validEmail = (e) => {
      const re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (re.test(e.target.value)) {
        setIsValidEmail(false);
      } else {
        setIsValidEmail(true);
      }
    };

  return (
    <section className="auth page__auth">
      <Link to="/" className="auth__home">
        <img src={logo} alt="Logo" className="auth__logo" />
      </Link>
      <h2 className="auth__title">{title}</h2>
      <form 
        ref={ref}
        name={name}
        onSubmit={onSubmit}
        className="auth__form"
        noValidate>
        <fieldset className="auth__fieldset">
          {name === "register" ? (
            <div className="auth__label-container">
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
                onChange={handleChange}
                value={userName || ""}
                disabled={isLoading}
                required
              />
            </label>
            <FieldErrorText err="err-auth">{errors.name || ""}</FieldErrorText>
            </div>
          ) : null}
          <div className="auth__label-container">
          <label className="auth__label">
            E-mail
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Введите ваш e-mail"
              className="auth__input"
              onChange={(e) => {
                handleChange(e);
                validEmail(e);
              }}
              value={userEmail || ""}
              disabled={isLoading}
              required
            />
          </label>
          <FieldErrorText err="err-auth">{errors.email || ""}</FieldErrorText>
          </div>
          
          <div className="auth__label-container">
          <label className="auth__label">
            Пароль
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Введите ваш пароль"
              className="auth__input last"
              onChange={handleChange}
              value={userPassword || ""}
              disabled={isLoading}
              required
            />
          </label>
          <FieldErrorText err="err-auth">{errors.password || ""}</FieldErrorText>
          </div>
          <div
              className={`auth__button-container ${
                name === "login" ? "login" : "register"
              }`}
            >
              <FieldErrorText err="err-auth">{errorApi || ""}</FieldErrorText>
              <button
                disabled={!isValid && !isLoading && !isValidEmail}
                type="submit"
                className={`auth__submit-btn hover-btn ${
                  isValid && !isLoading && !isValidEmail
                    ? ""
                    : "auth__submit-btn_disabled"
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
          </div>
        </fieldset>
      </form>
    </section>
  );
}
);

export default AuthForm;