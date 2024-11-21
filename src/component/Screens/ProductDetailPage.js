import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";

function ProductDetailPage() {
    const { productId } = useParams(); // Get the productId from the URL
    const [product, setProduct] = useState(null); // Store product details
    const [error, setError] = useState("");
    const [quantity, setQuantity] = useState(1); // Track the quantity of the product
    const navigate = useNavigate(); // Hook to navigate to different pages

    useEffect(() => {
        // Fetch product details by productId
        axios
            .get(`http://localhost:8000/api/products/${productId}/`)
            .then((response) => {
                setProduct(response.data); // Store the product data
            })
            .catch((err) => {
                setError("Failed to fetch product details."); // Handle API errors
            });
    }, [productId]);

    // Increase the quantity
    const handleIncrease = () => {
        setQuantity((prev) => prev + 1);
    };

    // Decrease the quantity (ensure it doesn't go below 1)
    const handleDecrease = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    };

    // Handle Add to Cart and redirect to the cart page
    const handleAddToCart = () => {
        const isLoggedIn = localStorage.getItem("user"); // Check if user is logged in

        if (!isLoggedIn) {
            // If not logged in, redirect to the login page
            navigate("/login");
            return; // Exit the function early to prevent adding to cart
        }

        // Store the product and quantity in localStorage
        const cartItem = {
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            totalPrice: (parseFloat(product.price) * quantity).toFixed(2),
        };

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(cartItem);
        localStorage.setItem("cart", JSON.stringify(cart));

        // Redirect to the cart page
        navigate("/cart");
    };

    if (error) {
        return <div style={styles.errorMessage}>{error}</div>; // Display error message
    }

    if (!product) {
        return <div style={styles.loadingMessage}>Loading product details...</div>; // Show loading state
    }

    // Calculate the updated price
    const totalPrice = (parseFloat(product.price) * quantity).toFixed(2);

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>{product.name}</h1>
            <div style={styles.content}>
                <img
                    src={product.image}
                    alt={product.name}
                    style={styles.image}
                />
                <div style={styles.details}>
                    <p style={styles.description}>{product.description}</p>
                    <p style={styles.price}>Price: ${product.price}</p>
                    <p style={styles.stock}>Stock: {product.stock}</p>

                    <div style={styles.quantityControls}>
                        <button onClick={handleDecrease} style={styles.quantityButton}>
                            -
                        </button>
                        <span style={styles.quantity}>{quantity}</span>
                        <button onClick={handleIncrease} style={styles.quantityButton}>
                            +
                        </button>
                    </div>

                    <p style={styles.totalPrice}>Total: ${totalPrice}</p>

                    <button onClick={handleAddToCart} style={styles.addToCartButton}>
                        Add to Cart
                    </button>
                </div>
            </div>

            <div style={styles.backLinkContainer}>
                <Link to="/" style={styles.backLink}>Back to Home</Link>
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: "20px",
        maxWidth: "800px",
        margin: "50px auto",
        backgroundColor: "#111",
        color: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    },
    title: {
        fontSize: "24px",
        marginBottom: "20px",
    },
    content: {
        display: "flex",
        flexDirection: "row",
    },
    image: {
        maxWidth: "50%",
        maxHeight: "300px",
        marginRight: "20px",
        borderRadius: "8px",
    },
    details: {
        flex: 1,
    },
    description: {
        fontSize: "16px",
        marginBottom: "10px",
    },
    price: {
        fontSize: "18px",
        fontWeight: "bold",
        marginBottom: "10px",
    },
    stock: {
        fontSize: "16px",
        color: "#aaa",
    },
    quantityControls: {
        display: "flex",
        alignItems: "center",
        marginBottom: "15px",
    },
    quantityButton: {
        fontSize: "18px",
        padding: "5px 10px",
        margin: "0 10px",
        backgroundColor: "#333",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
    quantity: {
        fontSize: "18px",
        fontWeight: "bold",
    },
    totalPrice: {
        fontSize: "18px",
        fontWeight: "bold",
        marginTop: "10px",
        marginBottom: "15px",
    },
    addToCartButton: {
        padding: "10px 20px",
        backgroundColor: "#4CAF50",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
    },
    backLinkContainer: {
        marginTop: "20px",
        textAlign: "center",
    },
    backLink: {
        fontSize: "16px",
        color: "#4CAF50",
        textDecoration: "none",
    },
    errorMessage: {
        textAlign: "center",
        color: "#ff4d4f",
        fontWeight: "bold",
    },
    loadingMessage: {
        textAlign: "center",
        color: "#aaa",
    },
};

export default ProductDetailPage;
