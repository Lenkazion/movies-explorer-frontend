import React, { createRef, useCallback, useEffect, useState } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import FieldErrorText from '../FieldErrorText/FieldErrorText';
import FilterCheckbox from '../FilterCheckBox/FilterCheckBox';
import MoviesCard from "../MoviesCard/MoviesCard";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

const SavedMovies = ({ savedMovies, onCardLike }) => {
    const { values, handleChange, isValid, setIsValid } =
    useFormWithValidation();
    const ref = createRef();
    const checkbox = true;

    const [cards, setCards] = useState([]);
    const [checkMovies, setCheckMovies] = useState(false);
    const [checked, setChecked] = useState(false);
    const [unchecked, setUnchecked] = useState(false);
    const [inputText, setInputText] = useState("");

    const filterCheckboxOn = savedMovies.filter(
        (c) =>
          c.nameRU.toLowerCase().includes(inputText.toLowerCase()) &&
          c.duration <= 40
      );
    
    const filterCheckboxOff = savedMovies.filter((c) =>
        c.nameRU.toLowerCase().includes(inputText.toLowerCase())
    );

    const handleUncheck = () => {
        setUnchecked(true);
    };

    const handleCheckboxChange = (e) => {
        setChecked(e.target.checked);
    };

    const checkEmptyMovies = () => {
        setCheckMovies(true);
    };

    const switchCheckbox = useCallback(() => {
        checked || unchecked
          ? setCards(filterCheckboxOn)
          : setCards(filterCheckboxOff);
        setUnchecked(false);
    });

    useEffect(() => {
        setIsValid(ref.current.checkValidity());
    }, [setIsValid, ref]);
    
    useEffect(() => {
        setCards(savedMovies);
        switchCheckbox();
    }, [savedMovies]);

    useEffect(() => {
        switchCheckbox();
    }, [checked, unchecked]);

    const handleSubmitForm = (checked, input, callback) => {
        setInputText(input);
        setChecked(checked);
        callback();
    };

    return (
        <div className="saved-movies">
            <SearchForm
                name="search-SavedMovies"
                ref={ref}
                values={values}
                onChange={handleChange}
                isValid={isValid}
                checked={checked}
                onGetMovies={handleSubmitForm}
                onSubmitFilter={handleUncheck}
                onCheckMovies={checkEmptyMovies}
            />
            <FilterCheckbox onChange={handleCheckboxChange} checked={checked} />
            <MoviesCardList checkMovies={checkMovies}>
                {!cards?.length && checkMovies && (
                <FieldErrorText>Ничего не найдено.</FieldErrorText>
            )}
                {!!cards.length &&
                    cards.map((movie) => (
                    <MoviesCard
                    key={movie.movieId}
                    movie={movie}
                    savedMovies={savedMovies}
                    checkbox={checkbox}
                    onCardLike={onCardLike}
                />
            ))}
            </MoviesCardList>
        </div>
    );
}

export default SavedMovies;