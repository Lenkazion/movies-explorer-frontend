import { API_CONFIG } from "./constants";

class MovieApi {
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

  getCards() {
    return fetch(this._url, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._getResponse(res));
  }
}

const movieApi = new MovieApi({
  baseUrl: API_CONFIG.MOVIES_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default movieApi;