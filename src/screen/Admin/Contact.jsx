import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import TableContact from "./TableContact";
const ResFromUser = () => {
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
  const tablecontent = lists;
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
              <Link to="./content">
                <Button variant="warning" className="w-100">
                  Content
                </Button>
              </Link>
              <Link to="./resfromuser">
                <Button variant="primary" className="w-100">
                  Message
                </Button>
              </Link>
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
            {lists.map((list) => (
              <TableContact lists={list} />
            ))}
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default ResFromUser;
