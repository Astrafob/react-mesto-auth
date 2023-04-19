function Login() {

  function handleSubmit(event) {
    event.preventDefault();
  } 

  return (
    <section>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-form__title">Вход</h2>
        <input className="login-form__input" name="userEmail" type="email" placeholder="Email" required />
        <span className="login-form__input-error" />
        <input className="login-form__input" name="userPassword" type="text" placeholder="Пароль" maxLength="40" minLength="6" required />
        <span className="login-form__input-error" />
        <button className="login-form__button" type="submit">Войти</button>
      </form>
    </section>
  )
}

export default Login;