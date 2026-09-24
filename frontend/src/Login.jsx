
import { useState } from 'react';
import Register from './Register';
import './Login.css';

function Login({ onLogin, onRegister, onHome }) {

  const [showRegister, setShowRegister] = useState(false);

  // =====================================
  // REGISTER PAGE
  // =====================================

  if (showRegister) {

    return (
      <Register
        onRegister={onRegister}
        onLoginClick={() => setShowRegister(false)}
      />
    );
  }


  // =====================================
  // LOGIN PAGE
  // =====================================

  const handleLogin = async (e) => {

    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {

      const response = await fetch('https://quizly-s4ns.onrender.com/login', {

        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          email,
          password
        })

      });

      const data = await response.json();

      console.log('Login response:', data);

      if (data.user) {

  alert("Name received: " + data.user.name);

  onLogin(data.user);

} else {

  alert(
    data.message ||
    'Invalid email or password.'
  );

}

    } catch (error) {

      console.error(
        'Login error:',
        error
      );

      alert(
        'Unable to connect to server.'
      );
    }
  };


  return (

    <div className="login-page">

      {/* BACK TO HOME */}

      <button
        className="back-home-button"
        onClick={onHome}
      >
        ← Back to Home
      </button>


      {/* LOGIN CARD */}

      <div className="login-card">

        {/* LOGO */}

        <div className="login-logo">
          Quizly
        </div>


        {/* TITLE */}

        <h1>
          Welcome Back!
        </h1>


        {/* SUBTITLE */}

        <p className="login-subtitle">
          Login to continue your learning journey.
        </p>


        {/* LOGIN FORM */}

        <form onSubmit={handleLogin}>

          {/* EMAIL */}

          <div className="form-group">

            <label htmlFor="email">
              Email Address
            </label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
            />

          </div>


          {/* PASSWORD */}

          <div className="form-group">

            <label htmlFor="password">
              Password
            </label>

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
            />

          </div>


          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="login-button"
          >
            Login
          </button>

        </form>


        {/* REGISTER */}

        <p className="register-text">

          Don't have an account?

          {' '}

          <span
            onClick={() => setShowRegister(true)}
          >
            Create Account
          </span>

        </p>

      </div>

    </div>
  );
}

export default Login;
