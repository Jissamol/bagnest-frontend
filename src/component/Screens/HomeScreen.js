import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Add this line

function HomeScreen() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/categories")
      .then((response) => {
        console.log("Categories fetched:", response.data.data);
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setError("Failed to fetch categories.");
      });
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Categories</h2>

      {error && <div style={styles.errorMessage}>{error}</div>}

      <div style={styles.categoriesContainer}>
        {categories.length > 0 ? (
          categories.map((category) => (
            <div key={category.id} style={styles.categoryCard}>
              {category.image ? (
                <img
                  src={`http://localhost:8000${category.image}`}
                  alt={category.name}
                  style={styles.categoryImage}
                />
              ) : (
                <div style={styles.noImageFallback}>
                  <p>No Image Available</p>
                </div>
              )}
              <h3 style={styles.categoryName}>{category.name}</h3>
              <Link to={`/category/${category.id}`} style={styles.link}>
                View Products
              </Link>
            </div>
          ))
        ) : (
          <p>No categories found.</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "80%",
    margin: "50px auto",
    padding: "20px",
    backgroundColor: "#111",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
    color: "#fff",
  },
  heading: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "24px",
  },
  errorMessage: {
    backgroundColor: "#f8d7da",
    color: "#721c24",
    padding: "10px",
    borderRadius: "4px",
    textAlign: "center",
  },
  categoriesContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
    justifyItems: "center",
  },
  categoryCard: {
    backgroundColor: "#222",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
    width: "200px",
  },
  categoryImage: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "4px",
    marginBottom: "15px",
  },
  noImageFallback: {
    width: "100%",
    height: "150px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#333",
    color: "#aaa",
    borderRadius: "4px",
    marginBottom: "15px",
  },
  categoryName: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  link: {
    textDecoration: "none",
    color: "#007bff",
    fontSize: "14px",
  },
};

export default HomeScreen;
