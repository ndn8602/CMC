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
import "react-toastify/dist/ReactToastify.css";
const Footer = () => {
  const initalState = -1;
  const [count, setCount] = useState(initalState);
  const [modalShow, setModalShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const contactCollectionRef = collection(db, "contact");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
  console.log("rerender");
  console.log(count);
  const validationForm = () => {
    if (errors.name?.type === "required") {
      return showToastMessage("Name is required !");
    } else if (errors.email?.type === "required") {
      return showToastMessage("Email is required !");
    } else if (errors.email?.type === "pattern") {
      return showToastMessage("Email did not match format - test@example.com");
    }
  };
  console.log("on submit data");
  const onSubmitData = (data) => {
    setCount(count + 1);
    console.log(data);
  };
  console.log(errors);
  useEffect(() => {
    validationForm();
  }, [errors]);
  return (
    <footer id="contact">
      <div className="footer-brand ">
        <p>C.C.Global </p>
        <p>&copy;2021-2022</p>
        <p>C.C.Global L.L.C</p>
      </div>
      <Form onSubmit={handleSubmit(onSubmitData)}>
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
                {/* {errors.name?.type === "required" &&
                  showToastMessage("Name is required !")} */}
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
                {/* {errors.email?.type === "required" &&
                  showToastMessage("Email is required !")} */}
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>SUBJECT</Form.Label>
              <Form.Control
                type="text"
                name="subject"
                value={subject}
                {...register("subject", { required: true })}
                placeholder="Enter You Subject"
                onChange={(e) => setSubject(e.target.value)}
              />
            </Form.Group>
            {/* {errors.subject?.type === "required" &&
              showToastMessage("Email is required !")} */}
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
          onClick={(e) => {
            setEmail("");
            setName("");
            setSubject("");
            setMessage("");
          }}
        />
      </Form>
      <ToastContainer />
    </footer>
  );
};

export default Footer;
