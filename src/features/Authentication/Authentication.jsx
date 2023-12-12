import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import styles from "./Authentication.module.css";

export function Authentication() {
  return (
    <>
      <section className="introSection">
        <Container>
          <Row className="justify-content-center align-items-center">
            <Col lg={6}>
              <div className="h-100 ">
                <div className="card">
                  <p className="mainTitle">Log into your account</p>
                  <Form>
                    <Form.Group className="mb-3" controlId="logInEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="loginPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter your password"
                      />
                    </Form.Group>
                    <div className="text-center">
                      <Button
                        type="submit"
                        className={styles.authenticationButton}
                      >
                        Register
                      </Button>
                      <p className="my-2">
                        New user? You can register{" "}
                        <NavLink to="#">here</NavLink>.
                      </p>
                    </div>
                  </Form>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="h-100 ">
                <div className="card">
                  <p className="mainTitle">Register</p>
                  <Form>
                    <Row>
                      <Col>
                        <Form.Group
                          className="mb-3"
                          controlId="registerFirstName"
                        >
                          <Form.Label>First Name</Form.Label>
                          <Form.Control placeholder="Your first name" />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group
                          className="mb-3"
                          controlId="registerLastName"
                        >
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control placeholder="Your last name" />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="registerPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter your password"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="registerRePassword">
                      <Form.Label>Re-type Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Re-type your password"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" id="registerTerms">
                      <Form.Check
                        type="checkbox"
                        label="I agree with the Terms & Conditions."
                      />
                    </Form.Group>
                    <div className="text-center">
                      <Button
                        type="submit"
                        className={styles.authenticationButton}
                      >
                        Log in
                      </Button>
                      <p className="my-2">
                        Already have an account? Log in{" "}
                        <NavLink to="#">here</NavLink>.
                      </p>
                    </div>
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
