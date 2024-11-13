import React, { useState } from 'react';
import axios from 'axios';

function LoginScreen() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login/', credentials);
      alert('Login successful');
    } catch (error) {
      console.error('Login error:', error);
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
        color: '#fff' 
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Login</h2>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={credentials.username}
          onChange={handleChange}
          style={{ 
            width: '100%', 
            padding: '0.5rem', 
            marginTop: '0.5rem', 
            borderRadius: '4px', 
            border: '1px solid #555', 
            backgroundColor: '#222', 
            color: '#fff' 
          }}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={credentials.password}
          onChange={handleChange}
          style={{ 
            width: '100%', 
            padding: '0.5rem', 
            marginTop: '0.5rem', 
            borderRadius: '4px', 
            border: '1px solid #555', 
            backgroundColor: '#222', 
            color: '#fff' 
          }}
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
          cursor: 'pointer' 
        }}
      >
        Login
      </button>
    </form>
  );
}

export default LoginScreen;
