import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch categories on component mount
  useEffect(() => {
    axios
      .get("/api/categories") // Update with your correct API endpoint
      .then((response) => {
        setCategories(response.data.data); // Assuming response contains data with category list
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch categories");
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);

    if (categoryId) {
      formData.append("category", categoryId);
    }

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/product/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        setSuccess("Product successfully added!");
        resetForm(); // Clear the form fields
      }
    } catch (error) {
      console.error("Error while adding product: ", error);
      setError("Failed to add product");
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setStock("");
    setImage(null);
    setCategoryId("");
    setError("");
  };

  const styles = {
    container: {
      width: "25%",
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
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
    },
    label: {
      fontWeight: "bold",
      marginBottom: "5px",
    },
    input: {
      padding: "8px",
      fontSize: "14px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      width: "100%",
    },
    textarea: {
      padding: "8px",
      fontSize: "14px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      resize: "vertical",
      height: "80px",
    },
    select: {
      padding: "8px",
      fontSize: "14px",
      border: "1px solid #ccc",
      borderRadius: "4px",
    },
    button: {
      padding: "10px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "16px",
    },
    errorMessage: {
      backgroundColor: "#f8d7da",
      color: "#721c24",
      padding: "10px",
      borderRadius: "4px",
      textAlign: "center",
    },
    successMessage: {
      backgroundColor: "#d4edda",
      color: "#155724",
      padding: "10px",
      borderRadius: "4px",
      textAlign: "center",
    },
    link: {
      textAlign: "center",
      marginTop: "10px",
      color: "#007bff",
      textDecoration: "none",
      fontSize: "14px",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add Product</h2>
      {error && <div style={styles.errorMessage}>{error}</div>}
      {success && <div style={styles.successMessage}>{success}</div>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={styles.textarea}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
            style={styles.select}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Product Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.button}>
          Add Product
        </button>
      </form>

      <Link to="/adminhome" style={styles.link}>
        Go Back
      </Link>
    </div>
  );
};

export default ProductForm;
