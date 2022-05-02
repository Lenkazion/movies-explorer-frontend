import { API_CONFIG } from "./constants";

class Api {
  constructor(config) {
    this._headers = config.headers;
    this._url = config.baseUrl;
  }

  _getResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  getUserInfo(token) {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: { ...this._headers, authorization: `Bearer ${token}` },
    }).then((res) => this._getResponse(res));
  }

  getMovies(token) {
    return fetch(`${this._url}/movies`, {
      method: "GET",
      headers: { ...this._headers, authorization: `Bearer ${token}` },
    }).then((res) => this._getResponse(res));
  }

  setUserInfo(name, email, token) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: { ...this._headers, authorization: `Bearer ${token}` },
      body: JSON.stringify({
        name,
        email,
      }),
    }).then((res) => this._getResponse(res));
  }

  saveMovie(movie, isSaved, token) {
    const mvId = isSaved
      ? movie.find((mv) => {
          return mv._id;
        })
      : movie;
    return fetch(`${this._url}/movies/${isSaved ? mvId._id : ""}`, {
      method: isSaved ? "DELETE" : "POST",
      headers: { ...this._headers, authorization: `Bearer ${token}` },
      body: isSaved
        ? JSON.stringify({ movieId: mvId._id })
        : JSON.stringify({
            country: movie.country,
            director: movie.director,
            duration: movie.duration,
            year: movie.year,
            description: movie.description,
            image: `${API_CONFIG.IMAGE_URL}${movie.image.url}`,
            trailerLink:
              movie.trailerLink || `${API_CONFIG.IMAGE_URL}${movie.image.url}`,
            thumbnail: `${API_CONFIG.IMAGE_URL}${movie.image.formats.thumbnail.url}`,
            movieId: movie.id,
            nameRU: movie.nameRU || movie.nameEN,
            nameEN: movie.nameEN || movie.nameRU,
          }),
    }).then((res) => this._getResponse(res));
  }
}

const api = new Api({
  baseUrl: API_CONFIG.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;