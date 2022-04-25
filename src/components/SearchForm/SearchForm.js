import React from 'react';
import './SearchForm.css';
import FilterCheckBox from '../FilterCheckBox/FilterCheckBox';

function SearchForm() {
  return (
    <form className="search-form" noValidate name='movies-search-form'>
      <div className='search-form__container'>
        <div className='search-form__input-row'>
          <input
            className='search-form__input'
            type='text'
            name='movie'
            id='movie-input'
            placeholder='Фильм'
            required
            minLength='2'
            maxLength='40' />
          <button className='app__link app__button search-form__button' type='submit'>Найти</button>
        </div>
        <FilterCheckBox />
      </div>
    </form>
  );
}

export default SearchForm;