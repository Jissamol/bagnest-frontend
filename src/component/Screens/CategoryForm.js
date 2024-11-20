import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CategoryForm = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);

    try {
      await axios.post('http://127.0.0.1:8000/api/categories/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setName('');
      setImage(null);
      setError('');
      setSuccess('Category added successfully!');
    } catch (err) {
      setError('Error adding category');
      setSuccess('');
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url('https://example.com/bags-image.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '500px',
          width: '100%',
          padding: '2rem',
          backgroundColor: 'rgba(0, 0, 0, 0.8)', // Transparent black background
          borderRadius: '12px',
          color: '#fff',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        <h2 style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '1.5rem' }}>
          Add New Category
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label
              htmlFor="name"
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '1rem',
                fontWeight: 'bold',
              }}
            >
              Category Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter category name"
              required
              style={{
                width: '100%',
                padding: '0.6rem',
                backgroundColor: '#222',
                color: '#fff',
                border: '1px solid #555',
                borderRadius: '4px',
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label
              htmlFor="image"
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '1rem',
                fontWeight: 'bold',
              }}
            >
              Category Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              required
              style={{
                width: '100%',
                padding: '0.6rem',
                backgroundColor: '#222',
                color: '#fff',
                border: '1px solid #555',
                borderRadius: '4px',
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
              fontSize: '1rem',
              fontWeight: 'bold',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Add Category
          </button>
        </form>

        {error && (
          <p
            style={{
              marginTop: '1rem',
              color: '#e74c3c',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            {error}
          </p>
        )}
        {success && (
          <p
            style={{
              marginTop: '1rem',
              color: '#2ecc71',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            {success}
          </p>
        )}

        {/* Go back to Admin Home */}
        <Link to="/adminhome">
          <button
            style={{
              marginTop: '1rem',
              padding: '0.75rem',
              width: '100%',
              backgroundColor: '#333',
              color: '#fff',
              fontSize: '1rem',
              fontWeight: 'bold',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Go Back to Admin Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CategoryForm;
