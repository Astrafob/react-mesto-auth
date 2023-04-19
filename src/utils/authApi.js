import {authApiConfig} from './constants';

class authApi {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  register({password, email}) {
    return fetch(`${this._url}/sign-up`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email
      })
    })
    .then(res => res.json())
  }

  authorize({password, email}) {
    return fetch(`${this._url}/sign-in`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email
      })
    })
    .then(res => res.json())
  }

}

const auth = new authApi(authApiConfig);

export default auth;