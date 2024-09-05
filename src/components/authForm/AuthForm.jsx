import { useState } from "react";
import "./authForm.scss";

function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8; // Минимум 8 символов
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!validateEmail(email)) {
      validationErrors.email = "Please enter a valid email address";
    }

    if (!validatePassword(password)) {
      validationErrors.password = "Password must be at least 8 characters long";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    const response = await fakeAuthRequest({ email, password });

    if (response.ok) {
      setMessage("Authentication successful!");
    } else {
      setMessage("Invalid credentials!");
    }
  };

  const fakeAuthRequest = ({ email, password }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === "test@example.com" && password === "password123") {
          resolve({ ok: true });
        } else {
          resolve({ ok: false });
        }
      }, 1000);
    });
  };

  return (
    <div className="auth-form">
      <h2 className="auth-form__title">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="auth-form__input-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && (
            <span className="auth-form__error">{errors.email}</span>
          )}
        </div>
        <div className="auth-form__input-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && (
            <span className="auth-form__error">{errors.password}</span>
          )}
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p className="auth-form__message">{message}</p>}
    </div>
  );
}

export default AuthForm;
