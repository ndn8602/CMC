import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";
import { Row, Col } from "react-bootstrap";

const Contact = () => {
  const navigate = useNavigate();
  const { logout } = UserAuth();
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
    <>
      <Row>
        <Col md={2} className=''></Col>
        <Col md={10}></Col>
      </Row>
    </>
  );
};

export default Contact;
