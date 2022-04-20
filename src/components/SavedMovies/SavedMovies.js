import React from 'react';
import './SavedMovies.css';
import PropTypes from 'prop-types';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({isLoading}) {
    return (
        <div className="movies">
            <SearchForm/>
            <MoviesCardList isLoading={isLoading}/>
            <button
                className="movies-cardlist__button"
                type="button">
                Ещё
            </button>
        </div>
    );
}

SavedMovies.propTypes = {
    isLoading: PropTypes.bool.isRequired,
};

export default SavedMovies;