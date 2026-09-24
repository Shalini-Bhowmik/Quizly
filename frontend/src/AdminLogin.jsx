import { useState } from 'react';
import './AdminLogin.css';

function AdminLogin({ onAdminLogin, onHome }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const response = await fetch(
        'https://quizly-s4ns.onrender.com/admin/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (response.ok) {

        onAdminLogin(data.admin);

      } else {

        alert(data.message || 'Invalid admin credentials.');

      }

    } catch (error) {

      console.error('Admin login error:', error);

      alert('Unable to connect to server.');

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="admin-login-page">

      <button
        className="admin-back-home"
        onClick={onHome}
      >
        ← Back to Home
      </button>

      <div className="admin-login-card">

        <div className="admin-login-icon">
          🛡️
        </div>

        <div className="admin-login-logo">
          Quiz<span>ly</span>
        </div>

        <div className="admin-badge">
          ADMIN PANEL
        </div>

        <h1>Welcome, Admin</h1>

        <p className="admin-login-subtitle">
          Sign in to manage your Quizly platform.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="admin-form-group">

            <label htmlFor="admin-email">
              Admin Email
            </label>

            <input
              type="email"
              id="admin-email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>

          <div className="admin-form-group">

            <label htmlFor="admin-password">
              Password
            </label>

            <input
              type="password"
              id="admin-password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>

          <button
            type="submit"
            className="admin-login-button"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In to Admin Panel →'}
          </button>

        </form>

        <div className="admin-login-footer">
          <span>🔒</span>
          Authorized administrators only
        </div>

      </div>

    </div>

  );
}

export default AdminLogin;