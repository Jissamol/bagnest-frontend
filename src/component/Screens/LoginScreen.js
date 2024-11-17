import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginScreen() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/login/', {
        username: credentials.username,
        password: credentials.password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const { redirect_url } = response.data;
        // Redirect based on role
        navigate(redirect_url);
      }
    } catch (error) {
      console.error('Login failed:', error.response.data);
      alert(error.response.data.error || 'Login failed');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: '400px',
        margin: 'auto',
        padding: '2rem',
        backgroundColor: '#333',
        borderRadius: '8px',
        color: '#fff',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Login</h2>

      {/* Username */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          style={{ width: '100%', padding: '0.5rem', backgroundColor: '#222', color: '#fff' }}
        />
      </div>

      {/* Password */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          style={{ width: '100%', padding: '0.5rem', backgroundColor: '#222', color: '#fff' }}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        style={{
          width: '100%',
          padding: '0.75rem',
          backgroundColor: '#555',
          color: '#fff',
          borderRadius: '4px',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Login
      </button>
    </form>
  );
}

export default LoginScreen;
