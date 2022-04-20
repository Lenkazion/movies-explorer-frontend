import React, {useState} from 'react';
import {useMatch} from 'react-router-dom';
import './MoviesCard.css';
import image from '../../images/example-movie.png';

function MoviesCard() {
    const [isMovieSaved, setIsMovieSaved] = useState(false);
    const isMovies = useMatch({path: '/movies', exact: true});
    const isSavedMovies = useMatch({path: '/saved-movies', exact: true});

    function handleCardSave() {
        setIsMovieSaved(!isMovieSaved);
    }

    function handleCardDelete(evt) {
        evt.target.closest('.movies-card').remove();
    }

    return (
        <li className="movies-card">
            <div className="movies-card__container">
                <h3 className="movies-card__title">В погоне за Бенкси</h3>
                <span className="movies-card__duration">27 минут</span>
            </div>
            <img
                src={image}
                alt="Обложка фильма"
                className="movies-card__image"
            />
            {isMovies && (isMovieSaved ? (
                <button
                    className="movies-card__button movies-card__button_type_saved"
                    type="button"
                    aria-label="Save"
                    onClick={handleCardSave}
                />
            ) : (
                <button
                    className="movies-card__button"
                    type="button"
                    onClick={handleCardSave}
                >
                    Сохранить
                </button>
            ))}
            {isSavedMovies && (
                <button
                    className="movies-card__button movies-card__button_type_delete"
                    type="button"
                    aria-label="Delete"
                    onClick={handleCardDelete}
                />
            )}
        </li>
    );
}

export default MoviesCard;