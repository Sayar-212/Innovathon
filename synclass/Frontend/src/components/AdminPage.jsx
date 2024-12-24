import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminPage.css';
import videoBG from '../assets/videoBg.mp4';
import GoogleIcon from '../assets/search.png';
import AppleIcon from '../assets/apple.png';

const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Check credentials
    if (id === 'admin@2024' && password === 'Admin@2024') {
      navigate('/create-timetable'); // Ensure the route matches App.jsx
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid ID or Password. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <video src={videoBG} autoPlay loop muted />
      <div className="login-form">
        <h2 className="form-title">Log in with</h2>

        <div className="social-login-buttons">
          <button className="social-login google">
            <img src={GoogleIcon} alt="Google Icon" className="social-icon" />
            Google
          </button>
          <button className="social-login apple">
            <img src={AppleIcon} alt="Apple Icon" className="social-icon" />
            Apple
          </button>
        </div>
        <p className="separator">
          <span>or</span>
        </p>

        <form onSubmit={handleFormSubmit}>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="input-group">
            <label htmlFor="id">ID:</label>
            <input
              type="text"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="Email address"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <a href="#" className="forgot-password-link">
            Forgot password?
          </a>
          <button type="submit" className="login-button">
            Log In
          </button>
        </form>

        <p className="signup-prompt">
          Don’t have an account?{' '}
          <a href="#" className="signup-link">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
