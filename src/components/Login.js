import { useState } from "react";

function Login({ onLogin, submitBtn }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  function handleEmail(evt) {
    setEmail(evt.target.value);
  }

  function handlePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onLogin(password, email );
  }

  return (
    <section className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <label className="auth__field">
          <input
            className="auth__input auth__input_type_email"
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleEmail}
            value={email}
            required
          />
          <span className="auth__input-error"></span>
        </label>
        <label className="auth__field">
          <input
            className="auth__input auth__input_type_password"
            type="password"
            placeholder="Пароль"
            name="password"
            onChange={handlePassword}
            value={password}
            required
          />
          <span className="auth__input-error"></span>
        </label>
        <button className="auth__submit-button" type="submit">
          {submitBtn}
        </button>
      </form>
    </section>
  );
}

export default Login;
