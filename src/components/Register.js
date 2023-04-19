import { Link } from 'react-router-dom';

function Register() {

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <section>
      <section>
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-form__title">Регистрация</h2>
          <input className="login-form__input" name="userEmail" type="email" placeholder="Email" required />
          <span className="login-form__input-error" />
          <input className="login-form__input" name="userPassword" type="text" placeholder="Пароль" maxLength="40" minLength="6" required />
          <span className="login-form__input-error" />
          <button className="login-form__button" type="submit">Зарегистрироваться</button>
        </form>
        <p className="login-form__subtitle">Уже зарегистрированы?&nbsp;<Link to="/sign-in" className='login-form__link'>Войти</Link></p>
      </section>
    </section>
  )
}

export default Register;