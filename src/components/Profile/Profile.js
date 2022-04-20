import React, { useState } from "react";
import { Link } from "react-router-dom";
import FieldErrorText from "../FieldErrorText/FieldErrorText";
import "./Profile.css";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const edit = ({ bool }) => {
    isEdit ? setIsEdit(false) : setIsEdit(true);
  };
  return (
    <section className="profile page__profile">
      <h2 className="profile__title">Привет, Виталий!</h2>
      <form name="profile" className="profile__form">
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
              value="Виталий"
              required
              disabled
            />
          </label>
          <label className="profile__label">
            E-mail
            <input
              type="email"
              id="email"
              name="email"
              className="profile__input"
              value="pochta@yandex.ru"
              required
              disabled
            />
          </label>
          {isEdit ? (
            <>
              <FieldErrorText err="profile-err">
                При обновлении профиля произошла ошибка.
              </FieldErrorText>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  edit(false);
                }}
                className="profile__save hover-btn"
              >
                Назад
              </button>
            </>
          ) : (
            <>
              <button onClick={() => edit(true)} className="profile__edit btn">
                Редактировать
              </button>
              <Link to="/">
              <button className="profile__logout btn">Выйти из аккаунта</button>
              </Link>
            </>
          )}
        </fieldset>
      </form>
    </section>
  );
};

export default Profile;