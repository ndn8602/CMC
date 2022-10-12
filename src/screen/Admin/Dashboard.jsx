import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import "./Dashboard.css";
const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = UserAuth();
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
    <Row className="dashboard m-0">
      <Col md={2} className="sidebar">
        <div className="dashboard-title">ADMIN</div>
        <div className="dashboard-info">
          <img src="./image/Logo.png" className="dashboard-avatar" alt="" />
          <span>{user && user.email}</span>
        </div>
        <Link to="./content">
          <Button variant="warning" className="w-100 mb-2">
            Content
          </Button>
        </Link>
        <Link to="./contact">
          <Button variant="primary" className="w-100 mb-2">
            Contact
          </Button>
        </Link>
        <Button variant="primary" onClick={handleShow} className="w-100">
          Launch
        </Button>

        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <div className="admin-brand">Dashboard</div>
              <div className="admin-avartar">
                {/* <img src="./image/Logo.png" alt="" /> */}
              </div>
              <div className="admin-name">User:{user && user.email}</div>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Link to="./content">
              <Button variant="warning" className="w-100">
                Content
              </Button>
            </Link>
            <Link to="./contact">
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
      <Col md={10} className="p-0">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto justify-content-end">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Col>
    </Row>
  );
};
export default Dashboard;
