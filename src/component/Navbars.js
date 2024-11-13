import React from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Navbars() {
  return (
    <Navbar expand="lg" bg="light" variant="light">
      <div className="container-fluid">
        <LinkContainer to="/">
          <Navbar.Brand>BagNest</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="navbarColor03" />
        <Navbar.Collapse id="navbarColor03">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/cart">
              <Nav.Link>Cart</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
            <NavDropdown title="Login" id="navbarScrollingDropdown">
              <LinkContainer to="/login">
                <NavDropdown.Item>Login</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/signup">
                <NavDropdown.Item>Registration</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="secondary" type="submit">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default Navbars;
