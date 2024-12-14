import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory

// Reusable ProductCard Component
const ProductCard = ({ product, onViewMore }) => (
    <div
        style={{
            ...styles.productCard,
            ...(styles.productCardHover && { transition: "transform 0.2s ease, box-shadow 0.2s ease" }),
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
    >
        {product.image ? (
            <img
                src={product.image.startsWith("http") ? product.image : `http://localhost:8000${product.image}`}
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
            style={{ ...styles.viewMoreButton, ...(styles.viewMoreButtonHover && { transition: "background-color 0.2s ease" }) }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#0056b3"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#007bff"}
            onClick={() => onViewMore(product.id)}
        >
            View More
        </button>
    </div>
);

function CategoryProductsPage() {
    const { categoryId } = useParams(); // Get the category ID from the URL
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!categoryId) {
            setError("Invalid category ID.");
            setLoading(false);
            return;
        }

        axios
            .get(`http://localhost:8000/api/categories/${categoryId}/products/`)
            .then((response) => {
                setProducts(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setError("Failed to fetch products. Please try again later.");
                setLoading(false);
            });
    }, [categoryId]);

    const handleViewMore = (productId) => {
        navigate(`/products/${productId}`); // Navigate to the Product Detail Page
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Products</h2>

            {loading ? (
                <p>Loading products...</p>
            ) : error ? (
                <div style={styles.errorMessage}>{error}</div>
            ) : products.length > 0 ? (
                <div style={styles.productsContainer}>
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} onViewMore={handleViewMore} />
                    ))}
                </div>
            ) : (
                <p>No products found for this category.</p>
            )}
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
