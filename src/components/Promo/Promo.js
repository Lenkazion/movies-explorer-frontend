import React from 'react';
import './Promo.css'

function Promo(props) {
  return (
    <section className="promo">
      {props.children}
      <div className="promo__container">
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        <div className="promo__image"></div>
      </div>
    </section>

  );
}

export default Promo;