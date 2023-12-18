import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../Authentication/AuthContext";
import { useApi } from "../../hooks/useApi";
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
  const [showEditModal, setShowEditModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemEdit, setItemEdit] = useState(null);
  const [validated, setValidated] = useState(false);
  const [editValidated, setEvitValidated] = useState(false);
  const { accessToken, user } = useAuthContext();
  const { get, post, patch, remove } = useApi("items");
  const [formData, setFormData] = useState({
    itemName: "",
    itemDescription: "",
    itemQuantity: "",
    itemDate: "",
    itemSerialNumber: "",
  });
  const [editFormData, setEditFormData] = useState({
    itemName: "",
    itemDescription: "",
    itemQuantity: "",
    itemDate: "",
    itemSerialNumber: "",
  });

  /*--- Modal Handles ---*/
  const handleShowModal = () => setShowInvetoryModal(true);
  const handleCloseModal = () => setShowInvetoryModal(false);

  const handleShowDeleteModal = (itemId) => {
    const itemObject = items.find((item) => item.id === itemId);
    setShowDeleteModal(true);
    setItemToDelete(itemObject);
  };
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const handleShowEditModal = (itemId) => {
    const itemObject = items.find((item) => item.id === itemId);
    setShowEditModal(true);
    setItemEdit(itemObject);

    setEditFormData({
      itemName: itemObject?.name || "",
      itemDescription: itemObject?.description || "",
      itemQuantity: itemObject?.quantity || "",
      itemDate: itemObject?.addedDate || "",
      itemSerialNumber: itemObject?.serialNumber || "",
    });
  };
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setItemEdit(null);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditInputChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  /*--- Get Items ---*/
  useEffect(() => {
    async function getItemList() {
      const data = await get({ userId: user.id }, null, { accessToken });
      setItems(data);
    }
    getItemList();
  }, [accessToken, user, get]);

  /*--- Add Item Handle ---*/
  async function handleAddItem(e) {
    const addNewItemForm = e.currentTarget;

    if (addNewItemForm.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      toast.error("Please fill the required fields.");
    } else {
      e.preventDefault();

      const newItem = {
        userId: user.id,
        name: formData.itemName,
        description: formData.itemDescription,
        quantity: formData.itemQuantity,
        addedDate: formData.itemDate,
        serialNumber: formData.itemSerialNumber,
      };

      const itemData = await post(newItem, { accessToken });

      setItems((prevItems) => [...prevItems, itemData]);
      toast.success(`${formData.itemName} has been added to the list.`);
      handleCloseModal();

      setFormData({
        itemName: "",
        itemDescription: "",
        itemQuantity: "",
        itemDate: "",
        itemSerialNumber: "",
      });
    }
    setValidated(true);
  }

  /*--- Edit Item Handle ----*/
  async function handleEditItemSubmit(e) {
    const editItemForm = e.currentTarget;

    if (editItemForm.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      toast.error("Please fill the required fields");
    } else {
      e.preventDefault();

      const editedItem = {
        userId: user.id,
        name: editFormData.itemName,
        description: editFormData.itemDescription,
        quantity: editFormData.itemQuantity,
        addedDate: editFormData.itemDate,
        serialNumber: editFormData.itemSerialNumber,
      };

      const editedData = await patch(itemEdit.id, editedItem, { accessToken });

      setItems((prevItems) =>
        prevItems.map((item) => (item.id === itemEdit.id ? editedData : item))
      );

      toast.success(`${itemEdit.name} has been updated`);
      handleCloseEditModal();
    }
    setEvitValidated(true);
  }

  /*--- Delete Item Handle ---*/
  async function handleDeleteItemConfirmed() {
    await remove(itemToDelete.id, { accessToken });

    setItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemToDelete.id)
    );

    toast.success(`${itemToDelete.name} has been deleted.`);
    handleCloseDeleteModal();
  }

  if (typeof items !== "object") {
    return "Please login and try again.";
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
              <Button className="primaryButton" onClick={handleShowModal}>
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
                            <Button
                              className="viewButton"
                              onClick={() => handleShowEditModal(item.id)}
                            >
                              <i className="bi bi-pencil"></i> Edit
                            </Button>
                          </td>
                          <td className="text-center align-middle">
                            <Button
                              className="deleteButton"
                              onClick={() => handleShowDeleteModal(item.id)}
                            >
                              <i className="bi bi-trash"></i> Delete
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
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="addItemName">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                required
                placeholder="Enter item name"
                name="itemName"
                value={formData.itemName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="addItemDescription">
              <Form.Label>Item Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter item description"
                name="itemDescription"
                value={formData.itemDescription}
                onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-end gap-2">
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
                <Button className="primaryButton" type="submit">
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
              <Button
                className="deleteButton"
                onClick={handleDeleteItemConfirmed}
              >
                Delete
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
        <Modal.Header closeButton className="border-0"></Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <p className="secondaryTitle">Edit Item</p>
            <p>
              You are currently editing: <b>{itemEdit?.name}</b>
            </p>
          </div>
          <Form
            noValidate
            validated={editValidated}
            onSubmit={handleEditItemSubmit}
          >
            <Form.Group className="mb-3" controlId="editSerialNumberName">
              <Form.Label>Serial Number</Form.Label>
              <Form.Control
                required
                placeholder="Enter item serial number"
                name="itemSerialNumber"
                value={editFormData.itemSerialNumber}
                onChange={handleEditInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="editItemName">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                required
                placeholder="Enter item name"
                name="itemName"
                value={editFormData.itemName}
                onChange={handleEditInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="editItemDescription">
              <Form.Label>Item Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter item description"
                name="itemDescription"
                value={editFormData.itemDescription}
                onChange={handleEditInputChange}
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="editItemQuantity">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    placeholder="Enter item quantity"
                    name="itemQuantity"
                    value={editFormData.itemQuantity}
                    onChange={handleEditInputChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="editItemDate">
                  <Form.Label>Date Added</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    name="itemDate"
                    value={editFormData.itemDate}
                    onChange={handleEditInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-end gap-2">
                <Button variant="secondary" onClick={handleCloseEditModal}>
                  Close
                </Button>
                <Button className="viewButton" type="submit">
                  <i className="bi bi-check"></i> Save
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
