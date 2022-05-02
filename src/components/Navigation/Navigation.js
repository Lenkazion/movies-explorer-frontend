import React, {useState} from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import ProfileButton from '../ProfileButton/ProfileButton';
import './Navigation.css';

function Navigation() {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const { pathname } = useLocation();
    function toggleMenu() {
        setMenuOpen(!isMenuOpen);
    }

    return (
        <nav className="navigation">
            <div className={`navigation__menu ${isMenuOpen ? 'navigation_menu-open' : ''}`}>
                <div className="navigation__container">
                    <NavLink
                        to="/"
                        className="navigation__link navigation__link_hidden"
                    >
                        Главная
                    </NavLink>
                    <NavLink
                        to="/movies"
                        className={`${
                            pathname === "/" && !isMenuOpen ? "navigation__link_main" : "navigation__link"}
                            navigation__link_films ${
                            pathname === "/movies" ? "navigation__link_selected" : ""
                        }`}
                    >
                        Фильмы
                    </NavLink>
                    <NavLink
                        to="/saved-movies"
                        className={`${
                            pathname === "/" && !isMenuOpen ? "navigation__link_main" : "navigation__link"}
                            navigation__link_films ${
                            pathname === "/saved-movies" ? "navigation__link_selected" : ""
                        }`}
                    >
                        Сохраненные фильмы
                    </NavLink>
                </div>
               <ProfileButton />
            </div>
            <button
                type="button"
                onClick={toggleMenu}
                aria-label="toggleMenu"
                className={`${ pathname === "/" ? "navigation__button_main" : "navigation__button"} ${isMenuOpen ? 'navigation__button_type_close' : ''}`}
            />

            <div
                className={`navigation__fade ${isMenuOpen ? 'navigation_menu-open' : ''}`}/>
        </nav>
    );
}

export default Navigation;