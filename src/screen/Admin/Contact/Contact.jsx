import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import TableContact from "./TableContact";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";
const ResFromUser = () => {
  const navigate = useNavigate();
  const { logout } = UserAuth();
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [lists, setList] = useState([]);

  useEffect(() => {
    const getDatas = async () => {
      const contactCollectionRef = collection(db, "contact");

      const data = await getDocs(contactCollectionRef);
      setList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getDatas();
  }, []);

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
          <Table bordered hover size="sm">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Subject</th>
                <th>Create Date</th>
                <th>Modified Date</th>
              </tr>
            </thead>
            <tbody>
              {lists.map((list) => (
                <TableContact key={list.id} lists={list} />
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default ResFromUser;
