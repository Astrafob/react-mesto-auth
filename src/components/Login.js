import { useState } from 'react'

function Login({ onAuthorize }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(event) {
    setEmail(event.target.value)
  }

  function handleChangePassword(event) {
    setPassword(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault();

    onAuthorize({
      email: email,
      password: password
    });
  }

  return (
    <section>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-form__title">Вход</h2>
        <input className="login-form__input" name="email" type="email" placeholder="Email" onChange={handleChangeEmail} autoComplete="email" value={email} required />
        <span className="login-form__input-error" />
        <input className="login-form__input" name="password" type="password" placeholder="Пароль" maxLength="40" minLength="6" onChange={handleChangePassword} autoComplete="password" value={password} required />
        <span className="login-form__input-error" />
        <button className="login-form__button" type="submit">Войти</button>
      </form>
    </section>
  )
}

export default Login;