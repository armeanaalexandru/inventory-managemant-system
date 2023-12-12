import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Container, Row, Col, Table, Button, Modal } from "react-bootstrap";
import styles from "./InventoryList.module.css";

export function InventoryList() {
  const [showInvetoryModal, setShowInvetoryModal] = useState(false);

  const handleCloseModal = () => setShowInvetoryModal(false);
  const handleShowModal = () => setShowInvetoryModal(true);
  return (
    <>
      <section className="mb-0 introSection">
        <h1 className="mainTitle text-center">Your Inventory</h1>
        <Container>
          <Row>
            <Col>
              <Button variant="primary" onClick={handleShowModal}>
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
                      <th></th>
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
                      <td className="text-center">1</td>
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
      <Modal show={showInvetoryModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add new item to your invetory</Modal.Title>
        </Modal.Header>
        <Modal.Body>Here comes the form to add items!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
