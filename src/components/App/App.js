import React, { useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { Route, Routes, useLocation } from "react-router-dom";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";

const App = () => {
  const { pathname } = useLocation();
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <div className="page">
      {pathname === "/" ? (
        <Header logged={loggedIn} />
      ) : null}
      {pathname === "/movies" ? (
        <Header logged={loggedIn} />
      ) : null}
      {pathname === "/saved-movies" ? (
        <Header logged={loggedIn} />
      ) : null}
      {pathname === "/profile" ? (
        <Header logged={loggedIn} />
      ) : null}

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies isLoading={false}/>} />
        <Route path="/saved-movies" element={<SavedMovies isLoading={false}/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/404" element={<PageNotFound />} />
      </Routes>
      {pathname === "/" ? <Footer /> : null}
      {pathname === "/movies" ? <Footer /> : null}
      {pathname === "/saved-movies" ? <Footer /> : null}
    </div>
  );
};

export default App;
