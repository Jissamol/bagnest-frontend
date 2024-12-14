import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function ProductDetailPage() {
    const { productId } = useParams(); // Get the productId from the URL
    const [product, setProduct] = useState(null); // Store product details
    const [error, setError] = useState(""); // Error state
    const [quantity, setQuantity] = useState(1); // Track the quantity of the product
    const [loading, setLoading] = useState(false); // Loading state for "Add to Cart" button
    const navigate = useNavigate(); // Hook to navigate to different pages

    useEffect(() => {
        // Fetch product details by productId
        axios
            .get(`http://localhost:8000/api/products/${productId}/`) // Make sure this URL is correct
            .then((response) => {
                setProduct(response.data); // Adjust based on response structure
            })
            .catch((error) => {
                setError("Failed to fetch product details.");
                console.error(error); // Log error for debugging
            });
    }, [productId]);

    const handleAddToCart = () => {
        setLoading(true); // Start loading

        const user = localStorage.getItem("user"); // Get user data from localStorage
    
        if (!user) {
            navigate("/login");
        } else {
            // Parse the user data from localStorage
            const parsedUser = JSON.parse(user); 
    
            // Send API request to add the product to the cart
            axios
                .post(
                    "http://localhost:8000/api/cart/", // Backend API endpoint
                    {
                        productId: productId, // Product ID from the URL params
                        quantity: quantity,   // Quantity selected by the user
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${parsedUser.token}`, // Include token for authentication
                        },
                    }
                )
                .then((response) => {
                    console.log("Product added to cart:", response.data); // Success message
                    navigate("/cart"); // Redirect to the cart page
                })
                .catch((error) => {
                    console.error("Failed to add product to cart:", error); // Log error for debugging
                })
                .finally(() => setLoading(false)); // End loading
        }
    };
    
    const totalPrice = product ? (product.price * quantity).toFixed(2) : 0; // Calculate total price

    return (
        <div style={styles.container}>
            {error && <div style={styles.errorMessage}>{error}</div>}
            {product ? (
                <div style={styles.flexContainer}>
                    <div style={styles.imageContainer}>
                        {product.image ? (
                            <img
                                src={product.image}
                                alt={product.name}
                                style={styles.productImage}
                            />
                        ) : (
                            <div style={styles.noImageFallback}>
                                <p>No Image Available</p>
                            </div>
                        )}
                    </div>
                    <div style={styles.detailsContainer}>
                        <h2 style={styles.heading}>{product.name}</h2>
                        <p style={styles.productDescription}>{product.description}</p>
                        <p style={styles.productPrice}>Price: ${product.price}</p>
                        <div style={styles.quantityContainer}>
                            <button
                                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                                style={styles.quantityButton}
                                disabled={quantity <= 1} // Disable "-" button when quantity is 1
                            >
                                -
                            </button>
                            <span style={styles.quantity}>{quantity}</span>
                            <button
                                onClick={() => setQuantity((prev) => prev + 1)}
                                style={styles.quantityButton}
                            >
                                +
                            </button>
                        </div>
                        <p style={styles.totalPrice}>Total: ${totalPrice}</p>
                        <button 
                            onClick={handleAddToCart} 
                            style={styles.addToCartButton} 
                            disabled={loading}
                        >
                            {loading ? "Adding..." : "Add to Cart"}
                        </button>
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
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
    errorMessage: {
        backgroundColor: "#f8d7da",
        color: "#721c24",
        padding: "10px",
        borderRadius: "4px",
        textAlign: "center",
    },
    flexContainer: {
        display: "flex",
        gap: "20px",
        alignItems: "flex-start",
    },
    imageContainer: {
        flex: "0 0 auto",
    },
    productImage: {
        maxWidth: "200px",
        height: "auto",
        objectFit: "cover",
        borderRadius: "4px",
    },
    noImageFallback: {
        width: "200px",
        height: "200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#333",
        color: "#aaa",
        borderRadius: "4px",
    },
    detailsContainer: {
        flex: "1",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    heading: {
        fontSize: "24px",
        marginBottom: "20px",
    },
    productDescription: {
        fontSize: "16px",
        marginBottom: "15px",
    },
    productPrice: {
        fontSize: "18px",
        fontWeight: "bold",
        marginBottom: "10px",
    },
    totalPrice: {
        fontSize: "18px",
        fontWeight: "bold",
        marginBottom: "15px",
        color: "#28a745", // Green color for total price
    },
    quantityContainer: {
        display: "flex",
        alignItems: "center",
        marginBottom: "20px",
    },
    quantityButton: {
        padding: "5px 10px",
        fontSize: "18px",
        backgroundColor: "#007bff",
        border: "none",
        borderRadius: "4px",
        color: "#fff",
        cursor: "pointer",
    },
    quantity: {
        margin: "0 10px",
        fontSize: "18px",
    },
    addToCartButton: {
        padding: "10px 20px",
        fontSize: "16px",
        fontWeight: "bold",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
};

export default ProductDetailPage;
