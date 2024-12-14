import React, { useState, useEffect } from "react";
import axios from "axios";

function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const token = localStorage.getItem("token"); // Get token
                if (!token) throw new Error("Not logged in");

                const response = await axios.get("http://localhost:8000/api/cart/", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCartItems(response.data);
            } catch (error) {
                setError("Failed to load cart.");
            }
        };

        fetchCart();
    }, []);

    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Your Cart</h2>
            {cartItems.length > 0 ? (
                cartItems.map((item) => (
                    <div key={item.id}>
                        <p>{item.product.name}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Total: ${item.total_price}</p>
                    </div>
                ))
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
}

export default CartPage;
