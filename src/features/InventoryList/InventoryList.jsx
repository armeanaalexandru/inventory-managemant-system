import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Modal,
  ToastBody,
  Form,
} from "react-bootstrap";
import styles from "./InventoryList.module.css";

export function InventoryList() {
  const [items, setItems] = useState(null);
  const [showInvetoryModal, setShowInvetoryModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

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
                    {items?.map((item) => (
                      <tr key={item.id}>
                        <td className="text-center">{item.id}</td>
                        <td>{item.name}</td>
                        <td className="text-center">{item.quantity}</td>
                        <td className="text-center">{item.addedDate}</td>
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
                    ))}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Modal show={showInvetoryModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className="border-0"></Modal.Header>
        <Modal.Body>
          <Form>
            <p className="secondaryTitle">Add new item to your invetory</p>
            <Form.Group className="mb-3" controlId="addItemName">
              <Form.Label>Item Name</Form.Label>
              <Form.Control placeholder="Enter item name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="addItemDescription">
              <Form.Label>Item Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter item description"
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="addItemQuantity">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter item quantity"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="addItemDate">
                  <Form.Label>Date Added</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-end gap-2">
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={handleCloseModal}
                >
                  Add Item
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
