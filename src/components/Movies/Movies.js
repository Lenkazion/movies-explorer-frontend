import { React, createRef, useEffect, useState } from 'react';
import './Movies.css';
import FilterCheckbox from '../FilterCheckBox/FilterCheckBox';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCard from '../MoviesCard/MoviesCard';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import FieldErrorText from '../FieldErrorText/FieldErrorText';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { useError } from '../../hooks/useError';
import { useWidthSize } from '../../hooks/useWidthSize';
import { MOVIES, WIDTH_SIZE } from "../../utils/constants";


const Movies= ({
    onGetMovies,
    onCardLike,
    savedMovies,
    globalError,
    isLoading
  }) => {
    const { values, handleChange, isValid, setIsValid, setValues } =
    useFormWithValidation();
    const ref = createRef();

    const [movies, setMovies] = useState([]);
    const [countMovies, setCountMovies] = useState(MOVIES.COUNT_INITIAL_CARDS);
    const [checkMovies, setCheckMovies] = useState(false);
    const [checked, setChecked] = useState(false);
    const [unchecked, setUnchecked] = useState(false);

    const cards = JSON.parse(localStorage.getItem("movies")) || [];
    const checkbox = JSON.parse(localStorage.getItem("checkbox")) || false;
    const widthSize = useWidthSize();
    const errorApi = useError(globalError);
    const inputText = localStorage.getItem("input") || "";

    const filterCheckboxOn = [
        ...cards?.filter(
          (c) =>
            c.nameRU.toLowerCase().includes(inputText.toLowerCase()) &&
            c.duration <= MOVIES.SHORT_MOVIE_DURATION
        ),
      ];
    
    const filterCheckboxOff = [
        ...cards?.filter((c) =>
          c.nameRU.toLowerCase().includes(inputText.toLowerCase())
        ),
    ];

    const handleUncheck = () => {
        setUnchecked(true);
      };
    const handleCheckboxChange = (e) => {
        setChecked(e.target.checked);
    };

    const checkEmptyMovies = () => {
        setCheckMovies(true);
      };

    const loadMovies = () => {
        if (widthSize <= WIDTH_SIZE.MEDIUM && widthSize >= WIDTH_SIZE.SMALL)
          setCountMovies(countMovies + MOVIES.RENDER_MIN_CARDS);
        if (widthSize <= WIDTH_SIZE.LARGE && widthSize > WIDTH_SIZE.MEDIUM)
          setCountMovies(countMovies + MOVIES.RENDER_MIN_CARDS);
        if (widthSize > WIDTH_SIZE.LARGE)
          setCountMovies(countMovies + MOVIES.RENDER_MAX_CARDS);
    };
    
    useEffect(() => {
        setIsValid(ref.current.checkValidity());
    }, [setIsValid, ref]);
    
    useEffect(() => {
        setValues({
          search: inputText,
        });
        setChecked(checkbox);
    }, []);

    useEffect(() => {
        if (widthSize <= WIDTH_SIZE.MEDIUM && widthSize >= WIDTH_SIZE.SMALL)
          setCountMovies(MOVIES.COUNT_320PX_CARD);
        if (widthSize <= WIDTH_SIZE.LARGE && widthSize > WIDTH_SIZE.MEDIUM)
          setCountMovies(MOVIES.COUNT_768PX_CARD);
        if (widthSize > WIDTH_SIZE.LARGE)
          setCountMovies(MOVIES.COUNT_INITIAL_CARDS);
    }, [widthSize]);
    
    useEffect(() => {
        localStorage.setItem("checkbox", checked);
    }, [checked]);
    
    useEffect(() => {
        checked || unchecked
          ? setMovies(filterCheckboxOn)
          : setMovies(filterCheckboxOff);
        setUnchecked(false);
    }, [checked, unchecked]);


    return (
        <div className="movies">
            <SearchForm
            ref={ref}
            values={values}
            onChange={handleChange}
            isValid={isValid}
            onGetMovies={onGetMovies}
            onSubmitFilter={handleUncheck}
            checked={checked}
            isLoading={isLoading}
            onCheckMovies={checkEmptyMovies}/>
            <FilterCheckbox onChange={handleCheckboxChange} checked={checked} />
            <MoviesCardList
            movies={movies}
            loadMovies={loadMovies}
            countMovies={countMovies}
            checked={checked}
            isLoading={isLoading}
            checkMovies={checkMovies}>

            {isLoading && <Preloader />}
            {errorApi === 500 && <FieldErrorText>{errorApi}</FieldErrorText>}

            {!movies?.length && checkMovies && (
             <FieldErrorText>Ничего не найдено.</FieldErrorText>
            )}
            {!checked
                ? !!movies?.length &&
                movies
                    .slice(0, countMovies)
                    .map((movie) => (
                    <MoviesCard
                        key={movie.id}
                        movie={movie}
                        savedMovies={savedMovies}
                        onCardLike={onCardLike}
                    />
                ))
            : !!movies?.length &&
                movies.map((movie) => (
                    <MoviesCard
                    key={movie.id}
                    movie={movie}
                    savedMovies={savedMovies}
                    onCardLike={onCardLike}
                />
            ))}
            </MoviesCardList>
        </div>
    );
}

export default Movies;