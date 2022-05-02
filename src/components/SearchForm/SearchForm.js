import React, { forwardRef } from 'react';
import './SearchForm.css';

const SearchForm = forwardRef(
  (
    {
      values,
      onChange,
      isValid,
      onGetMovies,
      checked,
      onSubmitFilter,
      isLoading,
      onCheckMovies = () => null,
    },
    ref
  ) => {
    const handleChange = (e) => {
      onChange(e);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onGetMovies(checked, values.search, () => {
        onSubmitFilter();
        onCheckMovies();
      });
    };

  return (
      <form 
        className="search-form"
        name='movies-search-form'
        ref={ref}
        onSubmit={handleSubmit}
        noValidate>
          <div className='search-form__container'>
            <label className='search-form__input-row'>
              <input
                className="search-form__input"
                type='text'
                name='search'
                id='search'
                placeholder={'Фильм'}
                value={values.search || ''}
                onChange={handleChange}
                disabled={isLoading}
                required />
              <button 
                className={`search-form__button ${
                  !isLoading && isValid  ? "" : "search-form__button_disabled"
                } hover-btn`} 
                type='submit'
                disabled={!isValid && !isLoading}>
                  Найти
              </button>
            </label>
          </div>
      </form>
    );
  }
);

export default SearchForm;