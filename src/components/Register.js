import { useState } from 'react'
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
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

    onRegister({
      email: email,
      password: password
    });
  }

  return (
    <section>
      <section>
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-form__title">Регистрация</h2>
          <input className="login-form__input" name="userEmail" type="email" placeholder="Email" onChange={handleChangeEmail} autoComplete="email" value={email} required />
          <span className="login-form__input-error" />
          <input className="login-form__input" name="userPassword" type="password" placeholder="Пароль" maxLength="40" minLength="6" onChange={handleChangePassword} autoComplete="password" value={password} required />
          <span className="login-form__input-error" />
          <button className="login-form__button" type="submit">Зарегистрироваться</button>
        </form>
        <p className="login-form__subtitle">Уже зарегистрированы?&nbsp;<Link to="/sign-in" className='login-form__link'>Войти</Link></p>
      </section>
    </section>
  )
}

export default Register;