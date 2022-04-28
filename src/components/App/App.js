import React, { useEffect, useState }  from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./App.css";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";
import movieApi from "../../utils/MovieApi";
import auth from "../../utils/Auth";
import api from "../../utils/Api";

const App = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const jwt = localStorage.getItem("jwt") || "";
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [movie, setMovie] = useState(
    JSON.parse(localStorage.getItem("movies")) || []
  );
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [globalError, setGlobalError] = useState(false);

  useEffect(() => {
    if (jwt && (pathname === "/signin" || pathname === "/signup")) {
      navigate("/movies");
    }
  }, []);

  useEffect(() => {
    if (jwt) {
      api
        .getUserInfo(jwt)
        .then((userInfo) => {
          const { name, email } = userInfo;
          setCurrentUser({name, email});
        })
        .catch((err) => console.log(err));
    }
  }, [jwt]);

  useEffect(() => {
    if (jwt) {
      api
        .getMovies(jwt)
        .then((movie) => {
          setSavedMovies(() => movie);
          setLoggedIn(true);
        })
        .catch((err) => console.log(err));
    }
  }, [jwt]);

  useEffect(() => {
    setGlobalError("");
  }, [pathname]);

  const handleRegisterSubmit = (
    { name, email, password},
    callbackResetValues
  ) => {
    setIsLoading(true);
    auth
      .register(name, email, password)
      .then((res) => {
        if (res) {
          callbackResetValues();
          handleLoginSubmit({ email, password}, () => undefined);
          setGlobalError(200);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err === "Ошибка: 400") setGlobalError(400);
        if (err === "Ошибка: 409") setGlobalError(409);
        if (err === "Ошибка: 500") setGlobalError(500);
      })
      .finally(() => setIsLoading(false));
  };
  const handleLoginSubmit = ({ email, password }, callbackResetValues) => {
    setIsLoading(true);
    auth
      .login(email, password)
      .then((res) => {
        if (res.token) {
          callbackResetValues();
          handleLogin();
          localStorage.setItem("jwt", res.token);
          setCurrentUser(res);
          navigate("/movies");
          setGlobalError(200);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err === "Ошибка: 400") setGlobalError(400);
        if (err === "Ошибка: 401") setGlobalError(401);
        if (err === "Ошибка: 500") setGlobalError(500);
      })
      .finally(() => setIsLoading(false));
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("jwt");
    localStorage.removeItem("input");
    localStorage.removeItem("checkbox");
    localStorage.removeItem("movies");
    setMovie([]);
    setLoggedIn(false);
    setCurrentUser({});
    navigate("/");
  };


  const setLocalStorage = (input, checkbox, movie) => {
    localStorage.setItem("input", input);
    localStorage.setItem("checkbox", checkbox);
    localStorage.setItem("movies", JSON.stringify(movie));
  };

  const handleGetMovies = (checked, inputText, callback) => {
    if (!localStorage.getItem("movies")) {
      setIsLoading(true);
      movieApi
        .getCards()
        .then((cards) => {
          setMovie(() => cards);
          setLocalStorage(inputText, checked, cards);
          callback();
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    } else {
      setLocalStorage(inputText, checked, movie);
      callback();
    }
  };

  const handleSaveMovie = (movie) => {
    const moviesId = savedMovies.filter((i) => {
      return i.movieId === (movie.id !== undefined ? movie.id : movie.movieId);
    });

    const isSaved = savedMovies.some((i) => {
      return i.movieId === (movie.id !== undefined ? movie.id : movie.movieId);
    });

    api
      .saveMovie(isSaved ? moviesId : movie, isSaved, jwt)
      .then((newMovie) => {
        if (isSaved) {
          setSavedMovies((state) => {
            return state.filter((i) => i.movieId !== newMovie.movieId);
          });
        } else {
          setSavedMovies((state) => [...state, newMovie]);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err === "Ошибка: 500") setGlobalError(500);
      });
  };

  const handleUpdateUser = ({ name, email }, callback) => {
    setIsLoading(true);
    api
      .setUserInfo(name, email, jwt)
      .then((user) => {
        setCurrentUser(user);
        setGlobalError(200);
        callback();
      })
      .catch((err) => {
        console.log(err);
        if (err === "Ошибка: 400") setGlobalError(400);
        if (err === "Ошибка: 409") setGlobalError(409);
        if (err === "Ошибка: 500") setGlobalError(500);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
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
        <Route exact path="/" element={<Main />} />
        <Route 
          exact path="/movies" 
          element={
            <ProtectedRoute loggedIn={jwt}>
            <Movies
              isLoading={isLoading}
              savedMovies={savedMovies}
              onGetMovies={handleGetMovies}
              onCardLike={handleSaveMovie}
            />
          </ProtectedRoute>
          } 
        />
        <Route
            exact path="/saved-movies"
            element={
              <ProtectedRoute loggedIn={jwt}>
                <SavedMovies
                  savedMovies={savedMovies}
                  onCardLike={handleSaveMovie}
                />
              </ProtectedRoute>
            }
          />
          <Route
            exact path="/profile"
            element={
              <ProtectedRoute loggedIn={jwt}>
                <Profile
                  onUpdateUser={handleUpdateUser}
                  onLogout={handleLogout}
                  globalError={globalError}
                  isLoading={isLoading}
                />
              </ProtectedRoute>
            }
          />
          <Route
            exact path="/signup"
            element={
              <Register
                isLoading={isLoading}
                onRegister={handleRegisterSubmit}
                globalError={globalError}
              />
            }
          />
          <Route
            exact path="/signin"
            element={
              <Login
                isLoading={isLoading}
                onLogin={handleLoginSubmit}
                globalError={globalError}
              />
            }
          />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      {pathname === "/" ? <Footer /> : null}
      {pathname === "/movies" ? <Footer /> : null}
      {pathname === "/saved-movies" ? <Footer /> : null}
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
