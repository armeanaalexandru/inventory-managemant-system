import { NavLink } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import styles from "./NotFound.module.css";

export function NotFound() {
  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center">
      <Row>
        <Col className="text-center">
          <h1 className={styles.notFoundTitle}>Uppsss. Te-ai pierdut.</h1>
          <p className={styles.notFoundNumbers}>404</p>
          <p>Pagina pe care o cauți ar putea fi într-un alt castel.</p>
          <div className="my-5">
            <NavLink className="primaryButton" to="/">
              Înapoi acasă
            </NavLink>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
