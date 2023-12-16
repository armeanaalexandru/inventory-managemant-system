import { NavLink, useLocation } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { object, string, boolean, ref } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useAuthContext } from "./AuthContext";
import styles from "./Authentication.module.css";

const commonSchema = {
  email: string()
    .email("Please enter a valid email address.")
    .required("Please enter your email address"),
  password: string()
    .required("Password is required")
    .min(8, "The passwords needs to be at least 8 characters long"),
};

const registerSchema = object({
  ...commonSchema,
  firstName: string().required("First name is required"),
  lastName: string().required("Last name is required"),

  retypePassword: string()
    .required("Type your password again")
    .oneOf([ref("password")], "The passwords you entered do not match"),
  terms: boolean().oneOf([true], "You must agree to the Terms & Conditions"),
});

const loginSchema = object(commonSchema);

export function Authentication() {
  const { pathname } = useLocation();
  let isRegister = false;
  if (pathname === "/register") {
    isRegister = true;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(isRegister ? registerSchema : loginSchema),
  });

  const { login } = useAuthContext();

  async function handleAuthSubmit(values) {
    const dataForServer = { ...values };
    delete dataForServer.retypePassword;
    delete dataForServer.terms;

    const data = await fetch(
      `http://localhost:3000/${isRegister ? "register" : "login"}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(dataForServer),
      }
    ).then(async (response) => {
      const data = response.json();
      return data;
    });

    if (!data.accessToken) {
      toast.error(data);
      return;
    }

    if (isRegister) {
      toast.success(
        "You registered successfully. You can now log in intro your account!"
      );
    } else {
      toast.success("You have logged in successfully");
      login(data);
    }
  }

  return (
    <>
      <section className="introSection">
        <Container>
          <Row className="justify-content-center align-items-center">
            <Col lg={6}>
              <div className="h-100 ">
                <div className="card">
                  <p className="mainTitle">
                    {isRegister ? "Register" : "Log into your account"}
                  </p>
                  <Form onSubmit={handleSubmit(handleAuthSubmit)}>
                    <Row>
                      {isRegister && (
                        <>
                          <Col>
                            <Form.Group
                              className="mb-3"
                              controlId="registerFirstName"
                            >
                              <Form.Label>First Name</Form.Label>
                              <Form.Control
                                placeholder="Your first name"
                                autoComplete="username"
                                {...register("firstName")}
                                className={errors.firstName ? "is-invalid" : ""}
                              />
                              {errors.firstName && (
                                <p className="invalid-feedback">
                                  {errors.firstName.message}
                                </p>
                              )}
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group
                              className="mb-3"
                              controlId="registerLastName"
                            >
                              <Form.Label>Last Name</Form.Label>
                              <Form.Control
                                placeholder="Your last name"
                                autoComplete="username"
                                {...register("lastName")}
                                className={errors.lastName ? "is-invalid" : ""}
                              />
                              {errors.lastName && (
                                <p className="invalid-feedback">
                                  {errors.lastName.message}
                                </p>
                              )}
                            </Form.Group>
                          </Col>
                        </>
                      )}
                    </Row>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        autoComplete="username"
                        {...register("email")}
                        className={errors.email ? "is-invalid" : ""}
                      />
                      {errors.email && (
                        <p className="invalid-feedback">
                          {errors.email.message}
                        </p>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="registerPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        autoComplete="new-password"
                        {...register("password")}
                        className={errors.password ? "is-invalid" : ""}
                      />
                      {errors.password && (
                        <p className="invalid-feedback">
                          {errors.password.message}
                        </p>
                      )}
                    </Form.Group>
                    {isRegister && (
                      <>
                        <Form.Group
                          className="mb-3"
                          controlId="registerRePassword"
                        >
                          <Form.Label>Re-type Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Re-type your password"
                            autoComplete="new-password"
                            {...register("retypePassword")}
                            className={
                              errors.retypePassword ? "is-invalid" : ""
                            }
                          />
                          {errors.retypePassword && (
                            <p className="invalid-feedback">
                              {errors.retypePassword.message}
                            </p>
                          )}
                        </Form.Group>
                        <Form.Group className="mb-3" id="registerTerms">
                          <Form.Check
                            type="checkbox"
                            label="I agree with the Terms & Conditions."
                            {...register("terms")}
                            className={errors.terms ? "is-invalid" : ""}
                          />
                          {errors.terms && (
                            <p className="invalid-feedback">
                              {errors.terms.message}
                            </p>
                          )}
                        </Form.Group>
                      </>
                    )}
                    <div className="text-center">
                      <Button
                        type="submit"
                        className={styles.authenticationButton}
                      >
                        {isRegister ? "Register" : "Log in"}
                      </Button>
                      {isRegister ? (
                        <p className="my-2">
                          Already have an account? Log in{" "}
                          <NavLink className={styles.anchor} to="/login">
                            here
                          </NavLink>
                          .
                        </p>
                      ) : (
                        <p className="my-2">
                          New user? You can register{" "}
                          <NavLink className={styles.anchor} to="/register">
                            here
                          </NavLink>
                          .
                        </p>
                      )}
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
