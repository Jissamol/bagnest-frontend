import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory

function CategoryProductsPage() {
    const { categoryId } = useParams(); // Get the category ID from the URL
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Use useNavigate instead of useHistory
  
    useEffect(() => {
        // Make a GET request to fetch products based on categoryId
        axios
            .get(`http://localhost:8000/api/categories/${categoryId}/products/`) // Pass categoryId in the URL
            .then((response) => {
                setProducts(response.data.data); // Store the product data
            })
            .catch((error) => {
                setError("Failed to fetch products.");
            });
    }, [categoryId]);
  
    const handleViewMore = (productId) => {
        navigate(`/products/${productId}`); // Navigate to the Product Detail Page
    };
  
    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Products</h2>
  
            {error && <div style={styles.errorMessage}>{error}</div>}
  
            <div style={styles.productsContainer}>
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.id} style={styles.productCard}>
                            {product.image ? (
                                <img
                                    src={`http://localhost:8000${product.image}`} // Concatenate base URL with image path
                                    alt={product.name}
                                    style={styles.productImage}
                                />
                            ) : (
                                <div style={styles.noImageFallback}>
                                    <p>No Image Available</p>
                                </div>
                            )}
                            <h3 style={styles.productName}>{product.name}</h3>
                            <p style={styles.productPrice}>${product.price}</p>
                            <button
                                style={styles.viewMoreButton}
                                onClick={() => handleViewMore(product.id)} // Handle navigation on button click
                            >
                                View More
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No products found for this category.</p>
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
    productsContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "20px",
        justifyItems: "center",
    },
    productCard: {
        backgroundColor: "#222",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
        textAlign: "center",
        width: "200px",
    },
    productImage: {
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
    productName: {
        fontSize: "18px",
        fontWeight: "bold",
        marginBottom: "10px",
    },
    productPrice: {
        fontSize: "16px",
        fontWeight: "bold",
    },
    viewMoreButton: {
        marginTop: "10px",
        padding: "8px 16px",
        fontSize: "14px",
        fontWeight: "bold",
        color: "#fff",
        backgroundColor: "#007bff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
};

export default CategoryProductsPage;
