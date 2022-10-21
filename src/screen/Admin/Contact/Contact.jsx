import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Button, Alert, Table } from "react-bootstrap";
import "./Contact.css";
import TableContact from "./TableContact";
import { UserAuth } from "../../../context/ServiceContext";

const Contact = () => {
  const navigate = useNavigate();
  const { user, logout } = UserAuth();
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
  let width = window.innerWidth;
  const [open, setOpen] = useState(false);
  const HandleOpenMenu = () => {
    if (open) {
      setOpen(!open);
    } else {
      setOpen(!open);
    }
  };
  return (
    <div>
      <Row className="pannelAdmin overflow-hidden m-0">
        <Col md={2} className={open ? "sidebar active p-0" : "sidebar p-0"}>
          <div className="menu d-flex flex-column justify-content-between">
            <div className="menu-head">
              <div className="menu-headLogo sidebar-logo">
                <img src="../image/Logo.png" alt="" />
              </div>
              <div className="menu-headAdmin sidebar-avatar d-flex align-items-center">
                <img
                  src="https://images.unsplash.com/photo-1440589473619-3cde28941638?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                  alt=""
                />
                <p>{user && user.email}</p>
              </div>
              <div className="menu-headDirection">
                <ul>
                  <Link to="../admin">
                    <li className=" headDirection d-flex align-items-center ">
                      <i className="fa-solid fa-palette fa-2x" />
                      <span className="nav-text">Admin</span>
                    </li>
                  </Link>
                  <Link to="../admin/content">
                    <li className=" headDirection d-flex align-items-center ">
                      <i className="fa-sharp fa-solid fa-file-contract fa-2x" />
                      <span className="nav-text">Content</span>
                    </li>
                  </Link>
                  <Link to="../admin/contact">
                    <li className="headDirection d-flex align-items-center ">
                      <i class="fa-solid fa-address-book fa-2x" />
                      <span className="nav-text">Contact</span>
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
            <div className="menu-bot d-flex align-items-center justify-content-center flex-column">
              <ul>
                <li>
                  <Button
                    onClick={handleLogout}
                    className="headDirection d-flex align-items-center "
                    variant="warning"
                  >
                    <i className="fa-sharp fa-solid fa-right-from-bracket fa-2x" />
                    <span className="nav-text">Logout</span>
                  </Button>
                </li>
                <li className={width < 768 ? "" : "d-none"}>
                  <Button
                    onClick={HandleOpenMenu}
                    className="headDirection d-flex align-items-center "
                  >
                    <i className="fa-solid fa-up-right-and-down-left-from-center fa-2x" />
                    <span className="nav-text">Close</span>
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </Col>
        {/* <!--- Content ---> */}
        <Col md={10} className="p-0">
          <Alert variant="secondary text-center font-weight-bold">
            <h3>CONTACT</h3>
          </Alert>
          <Table bordered hover size="sm">
            <TableContact lists={lists} />
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default Contact;
