import React from 'react';
import PropTypes from 'prop-types';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import Preloader from '../Preloader/Preloader';


function MoviesCardList({isLoading}) {
    return (
        <section className="movies-cardlist">
            {isLoading ? <Preloader/>
                : (
                    <ul className="movies-cardlist__list">
                        <MoviesCard/>
                        <MoviesCard/>
                        <MoviesCard/>
                        <MoviesCard/>
                        <MoviesCard/>
                        <MoviesCard/>
                        <MoviesCard/>
                        <MoviesCard/>
                        <MoviesCard/>
                        <MoviesCard/>
                        <MoviesCard/>
                        <MoviesCard/>
                    </ul>
                )}
        </section>

    );
}

MoviesCardList.propTypes = {
    isLoading: PropTypes.bool.isRequired,
};

export default MoviesCardList;