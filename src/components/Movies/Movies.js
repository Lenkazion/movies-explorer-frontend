import React from 'react';
import './Movies.css';
import PropTypes from 'prop-types';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({isLoading}) {
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

Movies.propTypes = {
    isLoading: PropTypes.bool.isRequired,
};

export default Movies;