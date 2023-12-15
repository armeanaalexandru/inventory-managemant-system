import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./Home.module.css";

export function Home() {
  return (
    <>
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
                Easy to use and highly intuitive, Ventoroo optimizes the
                processes of monitoring and managing products in a way that
                brings efficiency to your daily operations.
              </p>

              <NavLink className="primaryButton" to="/authentication">
                Start Now
              </NavLink>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="section">
        <Container>
          <Row>
            <Col sm={6} xl={3} className="mb-3">
              <div className="d-flex flex-column justify-content-between h-100 card borderHighlight">
                <div>
                  <p className="ternaryTitle">Efficiency Boost</p>
                  <p className="bodyDescription">
                    Ventoroo streamlines inventory management, enhancing overall
                    resource efficiency.
                  </p>
                </div>
                <NavLink className="anchor" to="/authentication">
                  <span>Find out more</span>{" "}
                  <i className="bi bi-chevron-right"></i>
                </NavLink>
              </div>
            </Col>
            <Col sm={6} xl={3} className="mb-3">
              <div className="d-flex flex-column justify-content-between h-100 card borderHighlight">
                <div>
                  <p className="ternaryTitle">Complete Oversight</p>
                  <p className="bodyDescription">
                    With Ventoroo, enjoy full control over stock levels,
                    ensuring real-time visibility of product availability.
                  </p>
                </div>
                <NavLink className="anchor" to="/authentication">
                  <span>Find out more</span>{" "}
                  <i className="bi bi-chevron-right"></i>
                </NavLink>
              </div>
            </Col>
            <Col sm={6} xl={3} className="mb-3">
              <div className="d-flex flex-column justify-content-between h-100 card borderHighlight">
                <div>
                  <p className="ternaryTitle">Error Reduction</p>
                  <p className="bodyDescription">
                    Ventoroo eliminates human errors in inventory management,
                    ensuring precision and minimizing stock discrepancies.
                  </p>
                </div>
                <NavLink className="anchor" to="/authentication">
                  <span>Find out more</span>{" "}
                  <i className="bi bi-chevron-right"></i>
                </NavLink>
              </div>
            </Col>
            <Col sm={6} xl={3} className="mb-3">
              <div className="d-flex flex-column justify-content-between h-100 card borderHighlight">
                <div>
                  <p className="ternaryTitle">User-Friendly Design</p>
                  <p className="bodyDescription">
                    Ventoroo's intuitive interface makes it accessible to all
                    team members, promoting quick adoption and seamless use.
                  </p>
                </div>
                <NavLink className="anchor" to="/authentication">
                  <span>Find out more</span>{" "}
                  <i className="bi bi-chevron-right"></i>
                </NavLink>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="section">
        <Container>
          <Row>
            <Col
              xl={6}
              className="d-flex flex-column justify-content-center mb-3"
            >
              <p className="mainTitle">For who is Ventoroo?</p>
              <p className="mainDescription">
                Ventoroo is ideal for businesses seeking streamlined inventory
                management, offering a user-friendly solution for efficient
                control and oversight. It caters to diverse industries,
                providing a precise and accessible tool for organizations of all
                sizes.
              </p>
            </Col>
            <Col sm={6} xl={3} className="mb-3">
              <i className="bi bi-building iconsSize"></i>
              <p className="secondaryTitle">Business Usage</p>
              <ul>
                <li>
                  Boost efficiency with Ventoroo's streamlined inventory
                  management.
                </li>
                <li>
                  Gain total control over stock levels for real-time oversight.
                </li>
                <li>
                  Eliminate errors, optimize supply processes, and enhance
                  resource management.
                </li>
              </ul>
            </Col>
            <Col sm={6} xl={3} className="mb-3">
              <i className="bi bi-person iconsSize"></i>
              <p className="secondaryTitle">Personal Usage</p>
              <ul>
                <li>
                  Simplify your life with Ventoroo's user-friendly personal
                  inventory tool.
                </li>
                <li>
                  Easily track and manage personal belongings in real time.
                </li>
                <li>
                  Stay organized and minimize errors with Ventoroo's intuitive
                  personal inventory solution.
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
