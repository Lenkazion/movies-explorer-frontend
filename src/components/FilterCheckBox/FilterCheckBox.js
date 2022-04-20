import React from 'react';
import './FilterCheckBox.css'

const FilterCheckbox = () => {
    return (
        <div className="filter-checkbox">
            <label className="filter-checkbox__switch">
                <input type="checkbox" className="filter-checkbox__input" />
                <span className="filter-checkbox__slider" />
            </label>
            <h3 className="filter-checkbox__title">Короткометражки</h3>
        </div>
    );
};

export default FilterCheckbox;