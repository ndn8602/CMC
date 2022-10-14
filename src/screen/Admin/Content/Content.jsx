import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";
import { Navbar, Row, Col, Button, Alert, Table, Form } from "react-bootstrap";

const Content = () => {
  const navigate = useNavigate();
  const { user, logout } = UserAuth();
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
    <>
      <Row className="overflow-hidden">
        <Col md={2} className="sidebar">
          <div className="area">
            <nav className="main-menu">
              <div className="sidebar-logo">
                <img src="./image/Logo.png" alt="" />
              </div>
              <div className="sidebar-avatar">
                <img
                  src="https://images.unsplash.com/photo-1440589473619-3cde28941638?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                  alt=""
                />
                <span>{user && user.email}</span>
              </div>
              <ul>
                <li className="has-subnav">
                  <Link to="../admin">
                    <i className="fa fa-laptop fa-2x" />
                    <span className="nav-text">Admin</span>
                  </Link>
                </li>
                <li className="has-subnav">
                  <Link to="../admin/content">
                    <i className="fa fa-laptop fa-2x" />
                    <span className="nav-text">Content</span>
                  </Link>
                </li>
                <li className="has-subnav">
                  <Link to="../admin/contact">
                    <i className="fa fa-list fa-2x" />
                    <span className="nav-text">Contact</span>
                  </Link>
                </li>
              </ul>

              <ul className="logout">
                <li>
                  <Button onClick={handleLogout}>
                    <i className="fa fa-power-off fa-2x" />
                    <span className="nav-text">Logout</span>
                  </Button>
                </li>
              </ul>
            </nav>
          </div>
        </Col>
        {/* <!--- Content ---> */}
        <Col md={10} className="p-0">
          <Alert variant="dark">Add mew content</Alert>
          <Form>
            <Row className="m-0 ">
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter Your Name" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Position</Form.Label>
                    <Form.Select>
                      <option value={1}>Top</option>
                      <option value={2}>Mid</option>
                      <option value={3}>Bottom</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Number</Form.Label>
                    <Form.Control
                      type="Number"
                      placeholder="Enter You Subject"
                      id="subject"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                      type="text"
                      id="phone"
                      placeholder="Enter You Phone"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Row>
          </Form>
          Here is ckeditor
        </Col>
      </Row>
    </>
  );
};

export default Content;
