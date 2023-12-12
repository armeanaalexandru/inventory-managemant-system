import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import styles from "./InventoryList.module.css";

export function InventoryList() {
  return (
    <>
      <section className="mb-0 introSection">
        <h1 className="mainTitle text-center">Your Inventory</h1>
        <Container>
          <Row>
            <Col>
              <Button>
                <i className="bi bi-clipboard-plus"></i> Add Item
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="section">
        <Container>
          <Row className="justify-content-center align-items-center">
            <Col>
              <div className="card">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th className="text-center">Item</th>
                      <th className="text-center">Quantity</th>
                      <th className="text-center">Date Added</th>
                      <th className="text-center" colSpan={3}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Add your table rows here */}
                    <tr>
                      <td>Item 1</td>
                      <td className="text-center">10</td>
                      <td className="text-center">12-12-2023</td>
                      <td className="text-center">
                        <Button variant="primary">View</Button>
                      </td>
                      <td className="text-center">
                        <Button variant="primary">Edit</Button>
                      </td>
                      <td className="text-center">
                        <Button variant="danger">Delete</Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
