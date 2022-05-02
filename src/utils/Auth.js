import { API_CONFIG } from "./constants";

class Auth {
  constructor(config) {
    this._url = config.baseUrl;
  }

  _getResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  register(name, email, password) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then((response) => this._getResponse(response))
      .then((res) => res);
  }

  login(email, password) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((response) => this._getResponse(response));
  }

  checkToken(jwt) {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => this._getResponse(response))
      .then((data) => data);
  }
}

const auth = new Auth({
  baseUrl: API_CONFIG.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})
export default auth;