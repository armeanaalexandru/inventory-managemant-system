import { useState, useEffect } from "react";
import { useAuthContext } from "../Authentication/AuthContext";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

import styles from "./Profile.module.css";

export function Profile() {
  const [userData, setUserData] = useState(null);
  const { accessToken, user } = useAuthContext();
  const [userFormData, setUserFormData] = useState({
    firstName: "",
    lastName: "",
    job: "",
    phone: "",
  });

  /*--- Get user Data ---*/
  useEffect(() => {
    async function getUserData() {
      fetch(`http://localhost:3000/users/${user.id}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
          setUserFormData({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            job: data.job || "",
            phone: data.phone || "",
          });
        });
    }
    getUserData();
  }, []);

  const handleUserInputChange = (e) => {
    setUserFormData({ ...userFormData, [e.target.name]: e.target.value });
  };

  /*--- Edit Item Handle ----*/
  async function handleEditUserSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(userFormData),
      });

      if (response.ok) {
        const updatedUserData = await fetch(
          `http://localhost:3000/users/${user.id}`,
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        ).then((response) => response.json());

        setUserData(updatedUserData);
        setUserFormData({
          firstName: updatedUserData?.firstName || "",
          lastName: updatedUserData?.lastName || "",
          job: updatedUserData?.job || "",
          phone: updatedUserData?.phone || "",
        });
        toast.success("Profile updated successfully");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating profile");
    }
  }

  return (
    <section className="introSection">
      <Container className="fluid">
        <Row>
          <Col lg={3}>
            <div className="my-4 d-flex flex-column align-items-center gap-3">
              <img
                className={styles.userAvatar}
                src="./images/illustration-businessman.jpg"
                alt="placeholder"
              />
              <div className="text-center">
                <p className={styles.userName}>
                  {userData?.firstName} {userData?.lastName}
                </p>
                <p className={styles.userPosition}>{userData?.job}</p>
              </div>
            </div>
            <div>
              <p className={styles.userDetails}>Email</p>
              <p className={styles.userData}>{userData?.email}</p>
              <p className={styles.userDetails}>Phone</p>
              <p className={styles.userData}>{userData?.phone}</p>
            </div>
          </Col>
          <Col>
            <div className="card">
              <Form noValidate onSubmit={handleEditUserSubmit}>
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="editUserFirstName">
                      <Form.Label>First name</Form.Label>
                      <Form.Control
                        required
                        placeholder="Edit your first name"
                        name="firstName"
                        value={userFormData.firstName}
                        onChange={handleUserInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="editUserLastName">
                      <Form.Label>Last name</Form.Label>
                      <Form.Control
                        required
                        placeholder="Edit your last name"
                        name="lastName"
                        value={userFormData.lastName}
                        onChange={handleUserInputChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="editUserJob">
                      <Form.Label>Job title</Form.Label>
                      <Form.Control
                        required
                        placeholder="Edit your job title"
                        name="job"
                        value={userFormData.job}
                        onChange={handleUserInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="editUserPhone">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        required
                        placeholder="Edit your phone number"
                        name="phone"
                        value={userFormData.phone}
                        onChange={handleUserInputChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col className="d-flex justify-content-center">
                    <Button className="viewButton" type="submit">
                      Save changes
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
