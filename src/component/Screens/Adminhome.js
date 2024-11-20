import React from 'react';
import { Link } from 'react-router-dom';

const Adminhome = () => {
  const buttonStyle = {
    position: 'fixed',
    top: '20px',
    left: '20px',
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '41px',
    marginBottom: '10px',
  };

  const buttonHoverStyle = {
    backgroundColor: '#ff9800',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
      {/* Left-side Add Category Button */}
      <Link to="/add-category">
        <button
          style={buttonStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#333')}
        >
          Add Category
        </button>
      </Link>
      {/* Left-side Add Product Button */}
      <Link to="/add-product">
        <button
          style={{ ...buttonStyle, top: '70px' }} // Move down slightly to avoid overlap with the category button
          onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#333')}
        >
          Add Product
        </button>
      </Link>
      {/* Main content area */}
      <div className="content">
        {/* Other content */}
      </div>
    </div>
  );
};

export default Adminhome;
