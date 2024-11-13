import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from 'axios';

function HomeScreen() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('/products/');
        setProducts(response.data);  
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);  

  return (
    <Container>
      <h1>Welcome to womens Bag Collections</h1>
      <Row>
        {products.map(product => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{product.productname}</Card.Title>
                <Card.Text>Category: {product.category}</Card.Text>
                <Card.Text>Price: ₹{product.price}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default HomeScreen;
