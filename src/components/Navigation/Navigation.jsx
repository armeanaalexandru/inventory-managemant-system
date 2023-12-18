import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../features/Authentication/AuthContext";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import styles from "./Navigation.module.css";

export function MainNav() {
  const { user, logout } = useAuthContext();

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
            <NavLink to="inventory">Inventory</NavLink>
          </Nav>
          {user === null && (
            <Nav className={styles.authNavigation}>
              <NavLink to="login">Login</NavLink>
              <NavLink to="register">Register</NavLink>
            </Nav>
          )}
          {user && (
            <Nav className={styles.authNavigation}>
              <NavLink to="profile">Hello, {user.firstName}!</NavLink>
              <NavLink to="login" onClick={() => logout()}>
                Logout
              </NavLink>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
