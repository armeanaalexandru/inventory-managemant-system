import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./Home.module.css";

export function Home() {
  return (
    <section className="introSection">
      <Container>
        <Row>
          <Col lg={{ order: "last" }}>
            <div className="h-100 d-flex justify-content-center align-items-center">
              <img src="./images/placeholder-img.png" alt="placeholder" />
            </div>
          </Col>
          <Col lg={{ span: 5, order: "first" }}>
            <h1 className="mainTitle">Total control of your inventory</h1>
            <p className="mainDescription">
              Easy to use and highly intuitive, Ventoroo optimizes the processes
              of monitoring and managing products in a way that brings
              efficiency to your daily operations.
            </p>

            <NavLink className="primaryButton" to="/authentication">
              Start Now
            </NavLink>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
