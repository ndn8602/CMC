import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./footer.css";
import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import "react-toastify/dist/ReactToastify.css";
import { contactFormSchema } from "./Schema";

const onSubmit = () => {
  console.log("submitted");
};

const Footer = () => {
  const initalState = -1;
  const [count, setCount] = useState(initalState);
  const [modalShow, setModalShow] = useState(false);
  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
    validationSchema: contactFormSchema,
    onSubmit,
  });
  console.log("errors");
  console.log(errors);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const contactCollectionRef = collection(db, "contact");
  const { register } = useForm();
  const sendContact = async (props) => {
    await addDoc(contactCollectionRef, {
      name: name,
      email: email,
      subject: subject,
      phone: phone,
      message: message,
      createDate: new Date(),
      ModifiedDate: new Date(),
    });
  };
  const showToastMessage = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
    return;
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
          <p>Full Name: {name}</p>
          <p>Email: {email}</p>
          <p>Subject: {subject}</p>
          <p>Phone: {phone}</p>
          <p>Message: {message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            onClick={(e) => {
              sendContact();
              props.onHide();
              setEmail("");
              setName("");
              setSubject("");
              setPhone("");
              setMessage("");
            }}
            variant="success"
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  // const validationForm = () => {
  //   if (errors.name?.type === "required") {
  //     return showToastMessage("Name is required !");
  //   } else if (errors.email?.type === "required") {
  //     return showToastMessage("Email is required !");
  //   } else if (errors.email?.type === "pattern") {
  //     return showToastMessage("Email did not match format - test@example.com");
  //   }
  // };
  const onSubmitData = (data) => {
    setCount(count + 1);
  };
  // useEffect(() => {
  //   validationForm();
  // }, [errors]);
  console.log(values);
  return (
    <footer id="contact" className="footer">
      <div className="footer-brand ">
        <p>C.C.Global </p>
        <p>&copy;2021-2022</p>
        <p>C.C.Global L.L.C</p>
      </div>
      {/* <Form onSubmit={handleSubmit(onSubmitData)}>
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
                    ref={register}
                    name="name"
                    {...register("name", {
                      required: true,
                    })}
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
                    name="email"
                    ref={register}
                    {...register("email", {
                      required: true,
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    })}
                    value={email}
                    placeholder="Enter Your Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>SUBJECT</Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    value={subject}
                    placeholder="Enter You Subject"
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>PHONE(*)</Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    value={phone}
                    {...register("subject", { required: true })}
                    placeholder="Enter You Subject"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>MESSAGE</Form.Label>
              <Form.Control
                type="text"
                name="message"
                {...register("message")}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                as="textarea"
                placeholder="Enter Your Message"
                style={{ height: "100px" }}
              />
            </Form.Group>
            <Button
              type="submit"
              variant="success"
              onClick={() => {
                if (Object.keys(errors).length !== 0 || count <= 0) {
                  validationForm();
                }
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
        />
      </Form> */}

      <Form onSubmit={handleSubmit}>
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
                    type="text"
                    placeholder="Enter Your Name"
                    id="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>EMAIL(*)</Form.Label>
                  <Form.Control
                    value={values.email}
                    id="email"
                    type="email"
                    placeholder="Enter Your Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>SUBJECT</Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    placeholder="Enter You Subject"
                    id="subject"
                    value={values.subject}
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
                    placeholder="Enter You Subject"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Group>
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
            <Button
              type="submit"
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
        />
      </Form>
    </footer>
  );
};

export default Footer;
