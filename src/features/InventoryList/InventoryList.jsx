import { useState, useEffect } from "react";
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
import { toast } from "react-toastify";
import styles from "./InventoryList.module.css";

export function InventoryList() {
  const [items, setItems] = useState(null);
  const [showInvetoryModal, setShowInvetoryModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    itemName: "",
    itemDescription: "",
    itemQuantity: "",
    itemDate: "",
    itemSerialNumber: "",
  });

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

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const handleShowDeleteModal = (itemId) => {
    const itemObject = items.find((item) => item.id === itemId);
    setShowDeleteModal(true);
    setItemToDelete(itemObject);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function handleAddItem(e) {
    const addNewItemForm = e.currentTarget;

    if (addNewItemForm.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      toast.error("Please fill the required fields.");
    } else {
      e.preventDefault();

      const newItem = {
        name: formData.itemName,
        description: formData.itemDescription,
        quantity: formData.itemQuantity,
        addedDate: formData.itemDate,
        serialNumber: formData.itemSerialNumber,
      };

      try {
        const itemData = await fetch("http://localhost:3000/items", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(newItem),
        });

        if (!itemData.ok) {
          toast.error("Failed to add item");
          throw new Error("Failed to add item");
        }

        const addedItem = await itemData.json();

        setItems((prevItems) => [...prevItems, addedItem]);
        toast.success(`${formData.itemName} has been added to the list.`);
        handleCloseModal();

        setFormData({
          itemName: "",
          itemDescription: "",
          itemQuantity: "",
          itemDate: "",
          itemSerialNumber: "",
        });
      } catch (error) {
        console.error("Error adding item:", error);
        toast.error(error);
      }
    }
    setValidated(true);
  }

  async function handleDeleteItemConfirmed() {
    try {
      const response = await fetch(
        `http://localhost:3000/items/${itemToDelete.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      setItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemToDelete.id)
      );

      toast.success(`${itemToDelete.name} has been deleted.`);
    } catch (error) {
      toast.error("Failed to delete item.");
      console.error("Error deleting item:", error);
    } finally {
      handleCloseDeleteModal();
    }
  }

  return (
    <>
      <section className="mb-0 introSection">
        <h1 className="mainTitle text-center">Your Inventory</h1>
        <Container>
          <Row>
            <Col>
              <div className="my-3 mainDescription">
                This is your current item list. Add new items or view/delete
                items from the action buttons.
              </div>
              <Button variant="primary" onClick={handleShowModal}>
                <i className="bi bi-clipboard-plus"></i> Add Item
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="mt-3 section">
        <Container>
          <Row className="justify-content-center align-items-center">
            <Col>
              <div className="card">
                <Table responsive striped bordered hover>
                  <thead>
                    <tr>
                      <th></th>
                      <th className="text-center align-middle">Serial No.</th>
                      <th className="text-center align-middle">Item</th>
                      <th className="text-center align-middle">Quantity</th>
                      <th className="text-center align-middle">Date Added</th>
                      <th className="text-center align-middle" colSpan={3}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items && items.length > 0 ? (
                      items?.map((item) => (
                        <tr key={item.id}>
                          <td className="text-center align-middle">
                            {item.id}
                          </td>
                          <td className="text-center align-middle">
                            {item.serialNumber}
                          </td>

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
                            <Button
                              variant="danger"
                              onClick={() => handleShowDeleteModal(item.id)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="text-center">
                          There are no items in your list. Start adding new
                          items.
                        </td>
                      </tr>
                    )}
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
          <Form noValidate validated={validated} onSubmit={handleAddItem}>
            <p className="secondaryTitle">Add new item to your invetory</p>
            <Form.Group className="mb-3" controlId="addSerialNumberName">
              <Form.Label>Serial Number</Form.Label>
              <Form.Control
                required
                placeholder="Enter item serial number"
                name="itemSerialNumber"
                value={formData.itemSerialNumber}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="addItemName">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                required
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
                    required
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
                    required
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
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
        <Modal.Header closeButton className="border-0"></Modal.Header>
        <Modal.Body>
          <p className="mb-5 text-center">
            Are you sure you want to delete <b>{itemToDelete?.name}</b>?
          </p>
          <Row>
            <Col className="d-flex justify-content-center gap-2">
              <Button variant="secondary" onClick={handleCloseDeleteModal}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDeleteItemConfirmed}>
                Delete
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}
