import React, { useState } from "react";
import { Container, Nav, Navbar, Form, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCart } from "./ContextReducer";

const Navb = ({ onSearch, showBar }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const cart = useCart();

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("email");
    navigate('/login');
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="sticky-top">
      <Container fluid>
        <Navbar.Brand href="#">GoFood</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          
            {!localStorage.getItem("authToken") ? (
              <Nav className="me-auto">
                <Nav.Link>
                  <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                    Home
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
                    Login
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/signup" style={{ textDecoration: "none", color: "inherit" }}>
                    Signup
                  </Link>
                </Nav.Link>
              </Nav>
            ) : (
              <Nav className="me-auto">
                <Nav.Link>
                  <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                    Home
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/myorder" style={{ textDecoration: "none", color: "inherit" }}>
                    My Order
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/cart" style={{ textDecoration: "none", color: "inherit" }}>
                    Cart{" "}
                    <Badge pill bg="danger"> {cart.state.length} </Badge>
                  </Link>
                </Nav.Link>
                <Nav.Link >
                <Link to="#" onClick={handleLogout} style={{ textDecoration: "none", color: "inherit" }}>
                  Logout
                </Link>
              </Nav.Link>
              </Nav>
            )}

          {localStorage.getItem("authToken") && (
            <div className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button onClick={handleSearch} variant="outline-success" type="submit">
                Search
              </Button>
              
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navb;
