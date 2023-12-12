import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import styles from "./Navigation.module.css";

export function MainNav() {
  return (
    <Navbar expand="lg" className={`py-4 bg-body-white ${styles.navigation}`}>
      <Container>
        <Navbar.Brand>
          <NavLink to="/">
            <img
              src="./images/ventoroo-logo.png"
              alt="Ventoroo Logo"
              className={styles.brandLogo}
            />
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`me-auto ${styles.mainNavigation}`}>
            <NavLink to="/about-us">About Us</NavLink>
            <NavLink to="/inventory">Inventory</NavLink>
          </Nav>
          <Nav className={styles.authNavigation}>
            <NavLink to="/authentication">Login</NavLink>
            <NavLink to="/authentication">Register</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
