import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./footer.css";
import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useFormik } from "formik";
import { contactFormSchema } from "./Schema";

const Footer = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const contactCollectionRef = collection(db, "contact");
  const [modalShow, setModalShow] = useState(false);
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(-2);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        phone: "",
        address: "",
        message: "",
      },
      validationSchema: contactFormSchema,
    });
  useEffect(() => {
    setCount((count) => count + 1);
  }, [errors]);

  const submitForm = () => {
    setName(values.name);
    setEmail(values.email);
    setPhone(values.phone);
    setAddress(values.address);
    setMessage(values.message);
  };
  const sendContact = async (props) => {
    await addDoc(contactCollectionRef, {
      name: name,
      email: email,
      address: address,
      phone: phone,
      message: message,
      createDate: new Date(),
      ModifiedDate: new Date(),
    });
  };

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <img src="./image/Logo.png" alt="" className="img-fluid" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>C.C Global Agency</h4>
          <h5>Hello, thansk for visitting C.C Global Website</h5>
          <p>Who I am speaking with</p>
          <p>FullName: {name}</p>
          <p>Email: {email}</p>
          <p>Phone: {phone}</p>
          <p>Address: {address}</p>
          <p>Message: {message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            onClick={(e) => {
              setEmail(() => {
                values.email = "";
              });
              setName(() => {
                values.name = "";
              });
              setAddress(() => {
                values.address = "";
              });
              setPhone(() => {
                values.phone = "";
              });
              setMessage(() => {
                values.message = "";
              });
              sendContact();
              props.onHide();
              handleShow();
            }}
            variant="success"
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <footer id="contact" className="footer">
      <div className="footer-brand ">
        <p>C.C.Global </p>
        <p>&copy;2021-2022</p>
        <p>C.C.Global L.L.C</p>
      </div>
      <Form onSubmit={handleSubmit}>
        <Row className="m-0 footer-info">
          <Col md={4}>
            <img src="./image/Logo.png" alt="" />
            <div className="text-brand">
              <h3>LET'S GET STARTED</h3>
              <p>
                We'r here to help answer your questions. Judicial matters can be
                complicated, our experts are on hand to help inform you of every
                aspect regarding your topic. We take great pride in usong our
                experties for you and look forward to hearing from you.{" "}
              </p>
            </div>
          </Col>
          <Col md={8} className='footerForm-contact'>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>FULLNAME(*)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Your Name"
                    id="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Group>
                {errors.name && touched.name && (
                  <p className="error noticeError">{errors.name}</p>
                )}
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>EMAIL(*)</Form.Label>
                  <Form.Control
                    value={values.email}
                    id="email"
                    placeholder="Enter Your Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.email && touched.email ? "error" : ""}
                  />
                </Form.Group>
                {errors.email && touched.email && (
                  <p className="error noticeError">{errors.email}</p>
                )}
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>ADDRESS</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    placeholder="Enter You address"
                    id="address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>PHONE(*)</Form.Label>
                  <Form.Control
                    type="text"
                    id="phone"
                    placeholder="Enter You Phone"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Group>
                {errors.phone && touched.phone && (
                  <p className="error noticeError">{errors.phone}</p>
                )}
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>MESSAGE</Form.Label>
              <Form.Control
                type="text"
                id="message"
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                as="textarea"
                placeholder="Enter Your Message"
                style={{ height: "100px" }}
              />
            </Form.Group>

            <div className="button" disabled>
              <Button
                type="submit"
                variant="success"
                onClick={() => {
                  if (Object.keys(errors).length === 0 && count > 0) {
                    setModalShow(true);
                    submitForm();
                  }
                }}
              >
                Submit
              </Button>
            </div>
          </Col>
        </Row>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </Form>
      <div className="modalThank">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <img src="./image/Logo.png" alt="" className="img-fluid" />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="thankYou">
              Your information is noted, we will contact you as soon as posible!
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </footer>
  );
};

export default Footer;
