import React from "react";
import { Link, useLocation } from 'react-router-dom'
import './Header.css';
import logo from "../../images/header-logo.svg";
import Navigation from "../Navigation/Navigation";

function Header({ logged }) {
    const { pathname } = useLocation();
    return (
    <>
            {!logged && (
                    <header className="header landing__header">
                        <Link to="/" className="header__link">
                            <img src={logo} alt="Логотип" className="header__logo" />
                        </Link>
                        <div className="header__auth">
                            <Link to="/signup"
                                  className="header__signup hover-link">
                                Регистрация
                            </Link>
                            <Link to="/signin" className="header__signin hover-btn">
                                Войти
                            </Link>
                        </div>
                    </header>
            )}
            {logged && pathname === "/" && (
                    <header className="header landing__header">
                        <Link to="/" className="header__link">
                            <img src={logo} alt="Логотип" className="header__logo" />
                        </Link>
                        <Navigation />
                    </header>
            )}
            {logged && (pathname === "/movies" || pathname === "/saved-movies" || pathname === "/profile") && (
                <header className="header main__header">
                <Link to="/" className="header__link">
                    <img src={logo} alt="Логотип" className="header__logo" />
                </Link>
                <Navigation />
            </header>
            )}
        </>
    );
}

export default Header;