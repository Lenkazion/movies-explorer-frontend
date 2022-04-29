import React, { createRef, useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import FieldErrorText from "../FieldErrorText/FieldErrorText";
import "./Profile.css";

const Profile = ({ onLogout, onUpdateUser, isLoading }) => {
  const { email, name } = useContext(CurrentUserContext);
  const ref = createRef();
  const [isEditing, setIsEditing] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidName, setIsValidName] = useState(false);
  const {
    values,
    handleChange,
    errors,
    isValid = false,
    setIsValid,
    setValues,
  } = useFormWithValidation();

  useEffect(() => {
    setValues({
      name: name,
      email: email,
    });
  }, [name, email]);

  useEffect(() => {
    setIsValid(ref.current.checkValidity());
  }, [setIsValid, ref]);

  const handleSwitch = () => {
    isEditing ? setIsEditing(false) : setIsEditing(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, email } = values;
    onUpdateUser(
      {
        name,
        email,
      },
      () => {
        setIsEditing(false);
        alert("Данные успешно обновлены!");
      }
    );
  };

  const validEmail = (event) => {
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (re.test(event.target.value)) {
      setIsValidEmail(false);
    } else {
      setIsValidEmail(true);
    }
  };

  const validName = (event) => {
    const re =
    /^([^0-9]*)$/;
    if (re.test(event.target.value)) {
      setIsValidName(false);
    } else {
      setIsValidName(true);
    }
  }

  return (
    <section className="profile page__profile">
      <h2 className="profile__title">Привет, {name}!</h2>
      <form 
        name="profile" 
        className="profile__form" 
        ref={ref}
        onSubmit={handleSubmit}
        noValidate>
        <fieldset className="profile__fieldset">
          <label className="profile__label">
            Имя
            <input
              type="text"
              id="name"
              name="name"
              className="profile__input"
              minLength="2"
              maxLength="30"
              value={values.name || ""}
              onChange={(event) => {
                handleChange(event);
                validName(event);
            }}
              required
              disabled={isLoading || !isEditing}
            />
          </label>
          <FieldErrorText err="input-err">{errors.name || ""}</FieldErrorText>
          {isEditing &&
            <FieldErrorText err="err-auth">
                {isValidName
                  ? "Имя пользователя должно содержать только буквы."
                  : ""}
            </FieldErrorText>
          }
          <label className="profile__label">
            E-mail
            <input
              type="email"
              id="email"
              name="email"
              className="profile__input"
              value={values.email || ""}
              onChange={(event) => {
                  handleChange(event);
                  validEmail(event);
              }}
              required
              disabled={isLoading || !isEditing}
            />
          </label>
          <FieldErrorText err="err-auth">{errors.email || ""}</FieldErrorText>
          {isEditing ? (
            <>
              <FieldErrorText err="err-auth">
                {isValidEmail
                  ? "E-mail должен быть в формате 'example@mail.com'."
                  : ""}
              </FieldErrorText>
              <button
                type="submit"
                className={`profile__save ${
                  !isLoading &&
                  isValid &&
                  !isValidEmail &&
                  !isValidName &&
                  !(values.email === email && values.name === name)
                    ? ""
                    : "profile__save_disabled"
                } hover-btn`}
                disabled={!isLoading && !isValid}
              >
                Сохранить
              </button>
            </>
          ) : (
            <>
              <button className="profile__edit btn"  onClick={handleSwitch} >
                Редактировать
              </button>
              <button className="profile__logout btn" onClick={onLogout}>Выйти из аккаунта</button>
            </>
          )}
        </fieldset>
      </form>
    </section>
  );
};

export default Profile;