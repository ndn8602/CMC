import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";

const Content = () => {
  const navigate = useNavigate();
  const { logout } = UserAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/signin");
      console.log("you logout");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div>
      <Row>
        <Col md={3}>
          <Button variant="primary" onClick={handleShow}>
            Launch
          </Button>

          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>
                <div className="admin-brand">Dashboard</div>
                <div className="admin-avartar">
                  {/* <img src="./image/Logo.png" alt="" /> */}
                </div>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Link to="/admin/content">
                <Button variant="warning" className="w-100">
                  Content
                </Button>
              </Link>
              <Link to="/admin/contact">
                <Button variant="primary" className="w-100">
                  Contact
                </Button>
              </Link>
              <Button variant="warning" onClick={handleLogout}>
                Logout
              </Button>
            </Offcanvas.Body>
          </Offcanvas>
        </Col>
        <Col md={9}>
          <Navbar>
            <Container>
              <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                  Signed in as: <a href="#login">Mark Otto</a>
                </Navbar.Text>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Col>
      </Row>
    </div>
  );
};

export default Content;
