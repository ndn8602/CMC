import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./footer.css";
import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
const Footer = () => {
  const [modalShow, setModalShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const contactCollectionRef = collection(db, "contact");
  const sendContact = async (props) => {
    await addDoc(contactCollectionRef, {
      name: name,
      email: email,
      subject: subject,
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
          <p>{name}</p>
          <p>{email}</p>
          <p>{subject}</p>
          <p>{message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            onClick={(e) => {
              sendContact();
              props.onHide();
            }}
            variant="success"
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  return (
    <footer>
      <div className="footer-brand ">
        <p>C.C.Global </p>
        <p>&copy;2021-2022</p>
        <p>C.C.Global L.L.C</p>
      </div>
      <Row className="m-0 footer-info">
        <Col md={4}>
          <img src="./image/logo.png" alt="" />
        </Col>
        <Col md={8}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>NAME(*)</Form.Label>
                <Form.Control
                  value={name}
                  type="text"
                  placeholder="Enter Your Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>EMAIL(*)</Form.Label>
                <Form.Control
                  required
                  type="email"
                  value={email}
                  placeholder="Enter Your Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>SUBJECT</Form.Label>
            <Form.Control
              type="text"
              value={subject}
              placeholder="Enter You Subject"
              onChange={(e) => setSubject(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>MESSAGE</Form.Label>
            <Form.Control
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              as="textarea"
              placeholder="Enter Your Message"
              style={{ height: "100px" }}
            />
          </Form.Group>
          <Button
            variant="success"
            onClick={() => {
              setModalShow(true);
            }}
          >
            Submit
          </Button>
        </Col>
      </Row>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onClick={(e) => {
          setEmail("");
          setName("");
          setSubject("");
          setMessage("");
        }}
      />
    </footer>
  );
};

export default Footer;
