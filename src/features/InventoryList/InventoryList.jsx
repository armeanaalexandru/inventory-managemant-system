import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import styles from "./InventoryList.module.css";

export function InventoryList() {
  const [formData, setFormData] = useState({
    itemName: "",
    itemDescription: "",
    itemQuantity: "",
    itemDate: "",
  });

  const [items, setItems] = useState(null);
  const [showInvetoryModal, setShowInvetoryModal] = useState(false);

  useEffect(() => {
    async function getItemList() {
      const data = await fetch("http://localhost:3000/items").then((response) =>
        response.json()
      );
      setItems(data);
    }
    getItemList();
  }, []);

  const handleCloseModal = () => setShowInvetoryModal(false);
  const handleShowModal = () => setShowInvetoryModal(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function handleAddItem(e) {
    e.preventDefault();

    const newItem = {
      name: formData.itemName,
      description: formData.itemDescription,
      quantity: formData.itemQuantity,
      addedDate: formData.itemDate,
    };

    const item = fetch("http://localhost:3000/items", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newItem),
    }).then((response) => response.json());

    setItems([...items, item]);
    handleCloseModal();
  }

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
                      <th className="text-center align-middle">Item</th>
                      <th className="text-center align-middle">Quantity</th>
                      <th className="text-center align-middle">Date Added</th>
                      <th className="text-center align-middle" colSpan={3}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items?.map((item) => (
                      <tr key={item.id}>
                        <td className="text-center align-middle">{item.id}</td>
                        <td className="align-middle">{item.name}</td>
                        <td className="text-center align-middle">
                          {item.quantity}
                        </td>
                        <td className="text-center align-middle">
                          {item.addedDate}
                        </td>
                        <td className="text-center align-middle">
                          <Button variant="primary">View</Button>
                        </td>
                        <td className="text-center align-middle">
                          <Button variant="primary">Edit</Button>
                        </td>
                        <td className="text-center align-middle">
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
          <Form onSubmit={handleAddItem}>
            <p className="secondaryTitle">Add new item to your invetory</p>
            <Form.Group className="mb-3" controlId="addItemName">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                placeholder="Enter item name"
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="addItemDescription">
              <Form.Label>Item Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter item description"
                name="itemDescription"
                value={formData.itemDescription}
                onChange={handleChange}
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="addItemQuantity">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter item quantity"
                    name="itemQuantity"
                    value={formData.itemQuantity}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="addItemDate">
                  <Form.Label>Date Added</Form.Label>
                  <Form.Control
                    type="date"
                    name="itemDate"
                    value={formData.itemDate}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-end gap-2">
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
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
