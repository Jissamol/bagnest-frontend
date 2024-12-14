import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const loginData = {
      email: formData.username, // Use email instead of username
      password: formData.password,
    };
  
    axios
      .post('http://127.0.0.1:8000/api/login/', loginData)
      .then((response) => {
        const { role, token } = response.data.data;
  
        // Store the token in localStorage
        localStorage.setItem('token', token);
  
        // Navigate based on the role
        if (role === 'admin') {
          navigate('/adminhome');
        } else {
          navigate('/');
        }
      })
      .catch((error) => {
        alert('Login failed: ' + error.response?.data?.error || 'Unknown error');
      });
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

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your email"
          required
          style={{ width: '100%', padding: '0.5rem', backgroundColor: '#222', color: '#fff' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
          style={{ width: '100%', padding: '0.5rem', backgroundColor: '#222', color: '#fff' }}
        />
      </div>

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
};

export default LoginScreen;
