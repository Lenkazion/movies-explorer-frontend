import React from 'react';
import './MoviesCardList.css';
import { useLocation } from "react-router-dom";


const MoviesCardList = ({
    children,
    movies,
    loadMovies,
    countMovies,
    checked,
    checkMovies,
    isLoading
  }) => {
    const { pathname } = useLocation();
    return (
        <section
        className={`movies-cardlist ${
            isLoading || (checkMovies && !movies?.length) ? "movies-cardlist_search-result" : ""
          }`}>
                    <ul className="movies-cardlist__list">
                        {children}
                    </ul>
            {pathname === "/movies" &&
                !isLoading &&
                 !!movies?.length &&
                    countMovies < movies?.length &&
                    !checked ? (
                    <button className="movies-cardlist__button" type="button" onClick={loadMovies}>
                        Ещё
                    </button>
                ) : (
                    ""
            )}
        </section>

    );
}

export default MoviesCardList;