import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

function CartPage() {
  const [cartItems, setCartItems] = useState([]); // Track items in the cart
  const [totalPrice, setTotalPrice] = useState(0); // Track total price of the cart
  const [error, setError] = useState(""); // Store error messages

  useEffect(() => {
    // Get cart items from local storage (assuming cart data is stored there)
    const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCartItems);

    // Calculate total price based on cart items
    const total = storedCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  }, []);

  const handleRemoveItem = (productId) => {
    // Remove item from the cart by filtering out the product with productId
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save updated cart to local storage
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    // Update item quantity in the cart
    const updatedCart = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save updated cart to local storage
  };

  const handleCheckout = () => {
    // Redirect to checkout page (you can change the path to the actual checkout page in your app)
    alert("Proceeding to checkout");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Shopping Cart</h2>

      {error && <div style={styles.errorMessage}>{error}</div>}

      {cartItems.length === 0 ? (
        <p style={styles.emptyCartMessage}>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} style={styles.cartItem}>
              <img
                src={`http://localhost:8000${item.image}`}
                alt={item.name}
                style={styles.cartItemImage}
              />
              <div style={styles.cartItemDetails}>
                <h3 style={styles.cartItemName}>{item.name}</h3>
                <p style={styles.cartItemPrice}>${item.price}</p>

                <div style={styles.quantityContainer}>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity - 1)
                    }
                    style={styles.quantityButton}
                    disabled={item.quantity <= 1} // Disable if quantity is 1
                  >
                    -
                  </button>
                  <span style={styles.quantity}>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity + 1)
                    }
                    style={styles.quantityButton}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => handleRemoveItem(item.id)}
                  style={styles.removeButton}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div style={styles.totalContainer}>
            <p style={styles.totalPrice}>Total Price: ${totalPrice}</p>
            <button onClick={handleCheckout} style={styles.checkoutButton}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}

      <Link to="/home" style={styles.backToHomeLink}>
        Back to Home
      </Link>
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
  emptyCartMessage: {
    textAlign: "center",
    fontSize: "18px",
    color: "#bbb",
  },
  cartItem: {
    display: "flex",
    alignItems: "center",
    padding: "15px",
    borderBottom: "1px solid #ccc",
    marginBottom: "15px",
  },
  cartItemImage: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "4px",
    marginRight: "20px",
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemName: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  cartItemPrice: {
    fontSize: "16px",
    marginBottom: "10px",
  },
  quantityContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
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
  removeButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
  },
  totalContainer: {
    textAlign: "right",
    marginTop: "20px",
  },
  totalPrice: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  checkoutButton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  backToHomeLink: {
    display: "block",
    textAlign: "center",
    marginTop: "30px",
    fontSize: "16px",
    color: "#007bff",
    textDecoration: "none",
  },
};

export default CartPage;
