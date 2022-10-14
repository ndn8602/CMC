import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";
import { Row, Col } from "react-bootstrap";
import "./Contact.css";
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
      <div className="area">
        <nav className="main-menu">
          <ul>
            <li>
              <a href="http://justinfarrow.com">
                <i className="fa fa-home fa-2x" />
                <span className="nav-text">Dashboard</span>
              </a>
            </li>
            <li className="has-subnav">
              <a href="#">
                <i className="fa fa-laptop fa-2x" />
                <span className="nav-text">Stars Components</span>
              </a>
            </li>
            <li className="has-subnav">
              <a href="#">
                <i className="fa fa-list fa-2x" />
                <span className="nav-text">Forms</span>
              </a>
            </li>
            <li className="has-subnav">
              <a href="#">
                <i className="fa fa-folder-open fa-2x" />
                <span className="nav-text">Pages</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-bar-chart-o fa-2x" />
                <span className="nav-text">Graphs and Statistics</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-font fa-2x" />
                <span className="nav-text">Quotes</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-table fa-2x" />
                <span className="nav-text">Tables</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-map-marker fa-2x" />
                <span className="nav-text">Maps</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-info fa-2x" />
                <span className="nav-text">Documentation</span>
              </a>
            </li>
          </ul>
          <ul className="logout">
            <li>
              <a href="#">
                <i className="fa fa-power-off fa-2x" />
                <span className="nav-text">Logout</span>
              </a>
            </li>
          </ul>
        </nav>
        <h1>HEllo</h1>
      </div>
    </>
  );
};

export default Contact;
