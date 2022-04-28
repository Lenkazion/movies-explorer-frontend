import React from 'react';
import {useLocation} from 'react-router-dom';
import { API_CONFIG } from '../../utils/constants';
import './MoviesCard.css';


const MoviesCard = ({ movie, savedMovies, onCardLike, checkbox }) => {
    const { pathname } = useLocation();

    const handleSaveClick = () => {
        onCardLike(movie);
    };

    const getMovieDuration = (mins) => {
        let hours = Math.trunc(mins / 60);
        let minutes = mins % 60;
        return hours + "ч" + minutes + "м";
    };

    const isSaved = savedMovies.some((i) => i.movieId === movie.id);
    const movieClick = (e) => {
        window.open(movie.trailerLink);
    };
    const saveButtonName = `${isSaved ? "movies-card__button_type_saved" : ""}`;
    const saveButtonText = `${!isSaved ? 'Сохранить' : ""}`;

    return (
        <li className="movies-card">
            <div className="movies-card__container">
                <h3 className="movies-card__title">{movie.nameRU}</h3>
                <span className="movies-card__duration">{getMovieDuration(movie.duration)}</span>
            </div>
            <img
                src = { checkbox ? `${movie.image}` : `${API_CONFIG.IMAGE_URL}${movie.image.url}`}
                alt="Обложка фильма"
                className="movies-card__image"
                onClick={(e) => movieClick(e)}
            />
            {pathname === "/saved-movies" ? (
                <button
                    className="movies-card__button movies-card__button_type_delete"
                    aria-label="Delete"
                    onClick={handleSaveClick}
                />
            ) : (
                <button
                className={`movies-card__button ${saveButtonName}`}
                aria-label="Save"
                onClick={handleSaveClick}
                >{saveButtonText}</button>
        )}
        </li>
    );
}

export default MoviesCard;