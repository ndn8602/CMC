import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
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
      <Col md={9}></Col>
    </Row>
  );
};
export default Dashboard;
