import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    mobile: '',
    email: '',
    address: '',
    password: '',
    confirm_password: '',
  });

  const navigate = useNavigate();  // Initialize the navigate function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match");
      return;
    }

    const user = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      mobile: formData.mobile,
      email: formData.email,
      address: formData.address,
      password: formData.password,
    };

    axios
      .post('http://127.0.0.1:8000/api/register/', user)
      .then((response) => {
        alert("Registration successful");
        navigate('/login');  // Redirect to the login page after successful registration
      })
      .catch((error) => {
        alert("Registration failed: " + error.response.data.detail);
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
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Sign Up</h2>

      {/* First Name */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="First Name"
          required
          style={{ width: '100%', padding: '0.5rem', backgroundColor: '#222', color: '#fff' }}
        />
      </div>

      {/* Last Name */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          placeholder="Last Name"
          required
          style={{ width: '100%', padding: '0.5rem', backgroundColor: '#222', color: '#fff' }}
        />
      </div>

      {/* Mobile */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="mobile">Mobile</label>
        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          placeholder="Mobile"
          required
          style={{ width: '100%', padding: '0.5rem', backgroundColor: '#222', color: '#fff' }}
        />
      </div>

      {/* Email */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          style={{ width: '100%', padding: '0.5rem', backgroundColor: '#222', color: '#fff' }}
        />
      </div>

      {/* Address */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="address">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          style={{ width: '100%', padding: '0.5rem', backgroundColor: '#222', color: '#fff' }}
        />
      </div>

      {/* Password */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          style={{ width: '100%', padding: '0.5rem', backgroundColor: '#222', color: '#fff' }}
        />
      </div>

      {/* Confirm Password */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="confirm_password">Confirm Password</label>
        <input
          type="password"
          name="confirm_password"
          value={formData.confirm_password}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
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
        Register
      </button>
    </form>
  );
};

export default SignUp;
