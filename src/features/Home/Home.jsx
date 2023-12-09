import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Home.module.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export function Home() {
  return (
    <section className="introSection">
      <Container>
        <Row>
          <Col lg={{ order: "last" }}>
            <div className="h-100 d-flex justify-content-center align-items-center">
              <img
                src="./images/placeholder-img.png"
                alt="placeholder"
                className={styles.brandLogo}
              />
            </div>
          </Col>
          <Col lg={{ span: 5, order: "first" }}>
            <h1 className="mainTitle">Control total al inventarului tău</h1>
            <p className="mainDescription">
              Simplu de utilizat și extrem de intuitiv, Ventoroo optimizează
              procesele de monitorizare și administrare a produselor într-un mod
              care îți aduce eficiență în activitatea zilnică.
            </p>

            <NavLink className="primaryButton" to="/log-in">
              Începe acum
            </NavLink>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
