import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export function Nav() {
  return (
    <Container fluid>
      <Row>
        <Col>
          <div className={styles.navigation}>
            <div className={styles.mainNavigation}>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/inventory">Inventory</NavLink>
            </div>
            <div className={styles.authNavigation}>
              <NavLink to="/log-in">Log In</NavLink>
              <NavLink to="/register">Register</NavLink>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
