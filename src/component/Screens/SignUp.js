import React, { useState } from 'react';
import axios from 'axios';

function SignUp() {
  const [formData, setFormData] = useState({
    customername: '',
    email: '',
    contactno: '',
    username: '',
    password: '',
    confirm_password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match");
      return;
    }

    try {
      const csrfToken = document.cookie.split(';').find(cookie => cookie.trim().startsWith('csrftoken=')).split('=')[1];

      const response = await axios.post('/api/register/', {
        customername: formData.customername,
        email: formData.email,
        contactno: formData.contactno,
        login: {
          username: formData.username,
          password: formData.password,
        },
      }, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });

      if (response.status === 201) {
        alert('Registration successful');
      }
    } catch (error) {
      if (error.response) {
        console.error('Backend error:', error.response);
        alert(error.response.data.error || 'Error during registration');
      } else if (error.request) {
        console.error('No response received:', error.request);
        alert('No response from the server');
      } else {
        console.error('Error during registration', error);
        alert('Error during registration');
      }
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
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Sign Up</h2>
      
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="customername">Customer Name</label>
        <input
          type="text"
          name="customername"
          id="customername"
          value={formData.customername}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '0.5rem',
            marginTop: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #555',
            backgroundColor: '#222',
            color: '#fff',
          }}
        />
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '0.5rem',
            marginTop: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #555',
            backgroundColor: '#222',
            color: '#fff',
          }}
        />
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="contactno">Contact No</label>
        <input
          type="text"
          name="contactno"
          id="contactno"
          value={formData.contactno}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '0.5rem',
            marginTop: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #555',
            backgroundColor: '#222',
            color: '#fff',
          }}
        />
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '0.5rem',
            marginTop: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #555',
            backgroundColor: '#222',
            color: '#fff',
          }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '0.5rem',
            marginTop: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #555',
            backgroundColor: '#222',
            color: '#fff',
          }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="confirm_password">Confirm Password</label>
        <input
          type="password"
          name="confirm_password"
          id="confirm_password"
          value={formData.confirm_password}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '0.5rem',
            marginTop: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #555',
            backgroundColor: '#222',
            color: '#fff',
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
          cursor: 'pointer',
        }}
      >
        Sign Up
      </button>
    </form>
  );
}

export default SignUp;
