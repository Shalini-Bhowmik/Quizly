
import { useState } from 'react';
import './Register.css';

function Register({ onRegister, onLoginClick }) {

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {

    if (!fullName || !email || !password || !confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {

      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: fullName,
          email: email,
          password: password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Registration failed.');
        return;
      }

      alert('Registration successful!');

      // Send the complete user object to App.jsx
      if (data.user) {
        onRegister(data.user);
      }

    } catch (error) {

      console.log('Registration error:', error);

      alert('Unable to connect to the server.');

    }

  };

  return (
    <div className="register-page">

      <div className="register-card">

        <div className="register-logo">
          Quizly
        </div>

        <h1>
          Create Account
        </h1>

        <p className="register-subtitle">
          Create your account and start learning.
        </p>

        <div className="form-group">

          <label>
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

        </div>

        <div className="form-group">

          <label>
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        </div>

        <div className="form-group">

          <label>
            Password
          </label>

          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

        </div>

        <div className="form-group">

          <label>
            Confirm Password
          </label>

          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

        </div>

        <button
          className="register-button"
          onClick={handleRegister}
        >
          Create Account
        </button>

        <p className="login-text">

          Already have an account?

          <span onClick={onLoginClick}>
            {' '}Login
          </span>

        </p>

      </div>

    </div>
  );
}

export default Register;
